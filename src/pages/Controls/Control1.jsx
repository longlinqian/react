import React from 'react'
import RemoteMode from './Views/RemoteMode.jsx'
import DodgeMode from './Views/DodgeMode.jsx'
import PathMode from './Views/PathMode.jsx'
import MusicMode from './Views/MusicMode.jsx'
import MatrixMode from './Views/MatrixMode.jsx'
import LineTrack from './Views/LineTrackingMode.jsx'
import Test from './Views/TestModal.jsx'
import CloseControlModal from './Views/CloseControlModal.jsx'
import robotManage from '../../services/robot/RobotManage'
import ConnectionModal from './Views/ConnectionModal.jsx'
import ConnectionView from '../Home/components/ConnectionView.jsx'
import robots from '../../config/robotList.js'
import Common from '../../utils/Common.js'
import enums from '../../enums'
import local from '../../utils/Local.js'
import platforms from '../../config/current.js'

/*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5 */
const modes = {
  remoteMode: 1,
  dodgeMode: 2,
  pathMode: 3,
  musicMode: 4,
  matrixMode: 5,
  lineTrackMode: 6,
  testMode:7
};

export default class Control1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rssi: undefined,
      view: 1,
      ble: false,
      mask: false
    };
    this.getAllInterfaceInfoFlag = true;
    this.isiOS = false;
    this.index = this.props.match.params.index == undefined ? 0 : this.props.match.params.index;
    this.baseData = null;
    this.ultrasonicPort = null;
    this.dataInterval = undefined;//取数据线程
    this.dataFlag = [0, 0, 0];// 0 取版本信息；1 取8个端口；2取电机
    this.hardwareVerson = [0, 0, 0];
    this.dataFlagTimes = [0, 0, 0];//读取的次数
    this.modeList = [];//玩法保存的数组 ：
    this.version =window.location.href.substring(window.location.href.length-6,window.location.href.length-4);
    this.robotData = this.version == 'k2'?robots.k2:robots.k1;
    this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  async componentDidMount() {
    this.initLoad();
    if (this.isiOS) {
      document.addEventListener('resign', this.onsleep.bind(this));
    } else {
      document.addEventListener('pause', this.onsleep.bind(this));
    }
    document.addEventListener('resume', this.onlive.bind(this));
    //this.openDialog(2);
    this.onComeIn();
  }

  componentWillUnmount() {
    robotManage.stopStateNotifications();
    if (this.isiOS) {
      document.removeEventListener('resign', this.onsleep.bind(this));
    } else {
      document.removeEventListener('pause', this.onsleep.bind(this));
    }
    document.removeEventListener('resume', this.onlive.bind(this));
    this.dataIntervalWork(0);
    this.onGoAway();
  }

  render() {
    let bleIcon = this.state.ble ? 'bleConnect' : 'bleDisconnect';
    this.baseData = this.robotData.find(function (item) {
      return item.id === this.index;
    }.bind(this));
    // platforms.curPlatform = 'chrome';
    if (platforms.curPlatform != 'chrome') {
      this.maskDiv = (<div className={!this.state.mask ? 'maskBlock' : 'maskNone'}
      onTouchStart={this.maskBlockTouchTap.bind(this)}></div>);
    }
    return (
      <div className="controlPage">
      <div className="containerLinks">
        <div className="links">
          {(() => {
            this.modeList = this.baseData.control.playTypes;
            return this.modeList.map(function (item) {
              switch (item) {
                case 1:
                  return (<a className={this.state.view === modes.remoteMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_rocker}</a>)
                  break;
                case 2:
                  return (<a className={this.state.view === modes.dodgeMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_avoidance}</a>)
                  break;
                case 3:
                  return (<a className={this.state.view === modes.pathMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_path}</a>)
                  break;
                case 4:
                  return (<a className={this.state.view === modes.musicMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_music}</a>)
                  break;
                case 5:
                  return (<a className={this.state.view === modes.matrixMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_matrix}</a>)
                  break;
                case 6:
                  return (<a className={this.state.view === modes.lineTrackMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>{local.data.Control_linetracking}</a>)
                  break;
                case 7:
                  return (<a className={this.state.view === modes.testMode ? 'link active' : 'link'} key={item}
                             onTouchTap={this.linkTouchTap.bind(this, item)}>测试</a>)
                  break;
              }
            }.bind(this))
          })()}
        </div>
        </div>
        {this.maskDiv}
        <div className="backButton" onTouchTap={this.backButtonTouchTap.bind(this)}>
          <div className="goBack"></div>
        </div>
        <div className="connectionButton" onTouchTap={this.connectionButtonTouchTap.bind(this)}>
          <div className={bleIcon}></div>
        </div>
        <div className="rssiIcon">
          <div className={`icon ${robotManage.rssiToCss(this.state.rssi)}`}></div>
        </div>
        <div className="views">
          <div id="pageSwiper" className="swiper-container" style={{height: '100%'}}>
            <div className="swiper-wrapper">

              {(function () {
                return this.baseData.control.playTypes.map(function (item) {
                  switch (item) {
                    case 1:
                      return (<div className="swiper-slide" key={1}>
                        <RemoteMode onChangeState={this.changeLinkState.bind(this)}
                                    onOpenBlue={this.onOpenBlue.bind(this)} ref="remoteMode" baseData={this.baseData}
                                    openDialog={this.openDialog.bind(this)}/>
                      </div>);
                      break;
                    case 2:
                      return (<div className="swiper-slide" key={item}>
                        <DodgeMode onOpenBlue={this.onOpenBlue.bind(this)} ref="dodgeMode"
                                   openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                    case 3:
                      return (<div className="swiper-slide" key={item}>
                        <PathMode onOpenBlue={this.onOpenBlue.bind(this)} ref="pathMode"
                                  openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                    case 4:
                      return (<div className="swiper-slide" key={item}>
                        <MusicMode onOpenBlue={this.onOpenBlue.bind(this)} ref="musicMode"
                                   openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                    case 5:
                      return (<div className="swiper-slide" key={item}>
                        <MatrixMode onOpenBlue={this.onOpenBlue.bind(this)} ref="matrixMode"
                                    openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                    case 6:
                      return (<div className="swiper-slide" key={item}>
                        <LineTrack onOpenBlue={this.onOpenBlue.bind(this)} ref="lineTrackMode"
                                    openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                    case 7:
                      return (<div className="swiper-slide" key={item}>
                        <Test onOpenBlue={this.onOpenBlue.bind(this)} ref="Test"
                                    openDialog={this.openDialog.bind(this)} baseData={this.baseData}/>
                      </div>);
                      break;
                  }
                }.bind(this))
              }.bind(this))()}

            </div>
          </div>
        </div>
        <ConnectionView ref="connectionView" onBack={this.connectionControlBack.bind(this)}></ConnectionView>
        <ConnectionModal ref="ConnectionModal"/>
        <CloseControlModal ref="closeControlModal"/>
      </div>
    );
  }

  /**
   * 返回按钮事件
   */
  async backButtonTouchTap() {
    let robot =  robotManage.getCurrentRobot();
    if (robot) {
      try{
        this.onsleep();
      }catch(error){
        console.error(error);
      }
    }
      this.props.history.goBack();
  }

  /**
   * 没连接机器人时，蒙版事件
   */
  async maskBlockTouchTap(a, e) {
    e.preventDefault();
    await this.checkIsConnectionAll();
  }

  /**
   *
   */
  changeLinkState(flag) {
    if (!flag) {
      this.refs.links.style.display = 'block';
    } else {
      this.refs.links.style.display = 'none';
    }
  }

  /**
   * 打开连接机器人窗口
   */
  onOpenBlue() {
    //测试
    this.refs.connectionView.open();
  }

  /**
   * 点击不同玩法按钮
   */
  linkTouchTap(mode, e) {
    e.preventDefault();
    if (this.refs.remoteMode.left !== 0 || this.refs.remoteMode.right !== 0) return;
    let oldMode = this.state.view;
    if (mode == oldMode) {
      return;
    }
    this.setState({
      view: mode
    });
    if (mode !== modes.remoteMode && oldMode === modes.remoteMode) {
      try {
        this.refs.remoteMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    }
    if (mode !== modes.dodgeMode && oldMode === modes.dodgeMode) {
      try {
        this.refs.dodgeMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    }
    if (mode !== modes.musicMode && oldMode === modes.musicMode) {
      try {
        this.refs.musicMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    }
    if (mode !== modes.pathMode && oldMode === modes.pathMode) {
      try {
        this.refs.pathMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    }
    if (mode !== modes.lineTrackMode && oldMode === modes.lineTrackMode) {
      try {
        this.refs.lineTrackMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    }
    if (mode !== modes.matrixMode && oldMode === modes.matrixMode) {
      try {
        this.refs.matrixMode.onsleep();
      } catch (e) {
        console.error(e);
      }
    } else if (mode == modes.matrixMode && oldMode !== modes.matrixMode) {
      try {
        if (this.refs.matrixMode)
          this.refs.matrixMode.onlive();
      } catch (e) {
        console.error(e);
      }
    }else if (mode == modes.pathMode && oldMode !== modes.pathMode) {
      try {
        if (this.refs.pathMode)
          this.refs.pathMode.onlive();
      } catch (e) {
        console.error(e);
      }
    }
    let index = this.modeList.indexOf(mode);
    this.swiper.slideTo(index, 500, false);
  }

  /**
   * 进入机器人连接窗口
   */
  connectionButtonTouchTap() {
    if (this.refs.remoteMode.left !== 0 || this.refs.remoteMode.right !== 0) return;
    this.refs.connectionView.open();
    if (this.state.view === modes.dodgeMode) {
      this.refs.dodgeMode.onsleep();
    }
  }

  /**
   * 蓝牙连接机器人的回调函数
   * @param {*} isSuccess
   */
  async connectionControlBack(isSuccess) {
    console.log(isSuccess)
    if (isSuccess) {
      this.initRssi();
      let robot = robotManage.getCurrentRobot();
      this.setState({
        mask: true,
        ble:true
      });
      // 连接成功后，先取8个口值，然后传到每个子控件的 onconnect
      let ay8 = robot.hardWareInfo.userPort;// await Common.getUserPortInfo(robot, 1000);
      try {
        this.refs.remoteMode.onconnect(ay8);
      } catch (e) {
        console.error(e);
      }
      try {
        this.refs.dodgeMode.onconnect(ay8);
      } catch (e) {
        console.error(e);
      }
      try {
        this.refs.pathMode.onconnect(ay8);
      } catch (e) {
        console.log(e)
      }
      try {
        this.refs.musicMode.onconnect(ay8);
      } catch (e) {
        console.error(e);
      }
      try {
        this.refs.lineTrackMode.onconnect(ay8);
      } catch (e) {
        console.error(e);
      }
      try {
        this.refs.matrixMode.onconnect(ay8);
      } catch (e) {
        console.error(e);
      }
      //取值硬件信息
      this.dataFlag = [1, 1, 1];
      this.dataFlagTimes =[0,0,0];
      this.dataIntervalWork(1);
      if (this.state.view == modes.matrixMode) {
        try {
          this.refs.matrixMode.onlive();
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      let robot = robotManage.getCurrentRobot();
      try {
        this.refs.musicMode.closeMusic();
        this.refs.matrixMode.ondisconnect();
      } catch (e) {
        console.error(e);
      }
      if (!robot) {
        //断开连接了：
        this.onDisConnect();
        try {
          this.refs.remoteMode.ondisconnect();
        } catch (e) {
          console.error(e);
        }

        try {
          this.refs.dodgeMode.ondisconnect();
        } catch (e) {
          console.error(e);
        }
        try {
          this.refs.pathMode.ondisconnect();
        } catch (e) {
          console.error(e);
        }
        try {
          this.refs.musicMode.ondisconnect();
        } catch (e) {
          console.error(e);
        }
        try {
          this.refs.lineTrackMode.ondisconnect();
        } catch (e) {
          console.error(e);
        }
        try {
          this.refs.matrixMode.ondisconnect();
        } catch (e) {
          console.log(e);
        }
        this.dataFlagTimes = [0, 0, 0];
      }
      if (this.state.view == modes.matrixMode) {
        try {
          this.refs.matrixMode.onlive(1);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  /**
   * 等待
   */
  async wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }

  /**
   * 初始化取信号强度
   */
  initRssi() {
    let robot = robotManage.getCurrentRobot();
    if (!robot) {
      this.setState({
        rssi: undefined
      });
      return;
    }
    try {
      robot.readRSSI(this.readRssiBack.bind(this));
      this.readRssiBack(robot.getBleInfo.rssi);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 更新信号强度
   */
  readRssiBack(rssi) {
    let old = this.state.rssi;
    if (old && !rssi) {
      //突然断开事件
      let state = this.refs.connectionView.getState();
      if (!state) {
        //300 秒提示一下
        if (this.delayEvent(6, 300000)) return;
        this.disconnetion();
      }
    }
    if (old !== rssi) {
      this.setState({
        rssi: rssi,
      });
    }
  }

  /**
   * 蓝牙断开处理
   */
  async bleDisconnetionBack(flag) {
    this.onDisConnect();
    //是否在机器人连接页面
    let state = this.refs.connectionView.getState();
    if (state) {
      this.refs.connectionView.refresh();
      return;
    }
    if (!flag) {
      let result = await this.refs.closeControlModal.open(local.data.Connection_Blue_open);
      this.onDisConnect();
      // this.refs.remoteMode.onconnect();
      // this.refs.dodgeMode.onconnect();
      if (result === true) {
        try {
          this.refs.connectionView.open();
        } catch (e) {
          console.error(e);
        }
      } else {
      }
    }
  }

  /**
   * 设备被异常断开
   */
  async disconnetion() {
    let result = await this.refs.closeControlModal.open(local.data.Common_device_break);
    this.onDisConnect();
    // this.refs.remoteMode.onconnect();
    // this.refs.dodgeMode.onconnect();
    if (result === true) {
      try {
        try {
          this.refs.connectionView.open();
        } catch (e) {
          console.error(e);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
    }
  }

  /**
   * 检查手机与机器人的连接是否有问题并处理相关事件
   */
  async checkIsConnectionAll() {
    let resultValue = await this.checkIsConnectRobot();
    if (resultValue) {
      resultValue = true;
    } else {
      this.setState({
        mask: false,
        ble:false
      })
      try {
        this.refs.connectionView.open();
      } catch (e) {
        console.error(e);
      }
      return false;
    }
    this.setState({
      mask: true,
      ble:true
    })
    return resultValue;
  }

  onDisConnect() {
    this.setState({
      mask: false,
      ble: false,
      robot: undefined,
      rssi: undefined
    });
    try{
      this.robotBlocks.setRobot(undefined);
    }catch (error){
      console.error(error);
    }
  }

  /**
   * 检查是否连接机器人
   */
  async checkIsConnectRobot() {
    this.robot = robotManage.getCurrentRobot();
    if (!this.robot) {
      return false;
    } else {
      let isConnect = await this.robot.isConnected();
      if (!isConnect) {
        return false;
      }
    }
    return true;
  }

  /**
   * 页面初始加载
   */
  async initLoad() {
    this.swiper = new Swiper('#pageSwiper', {
      onlyExternal: true
    });
    this.initRssi();
    // robotManage.startStateNotifications(this.bleDisconnetionBack.bind(this));
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  /**
   * 中断操作事件:Home,电话
   */
  onsleep() {
    if (this.state.view === modes.remoteMode) {
      try {
        this.refs.remoteMode.onsleep();
      } catch (error) {
        console.error(error);
      }
    }
    if (this.state.view === modes.dodgeMode) {
      try {
        this.refs.dodgeMode.onsleep();
      } catch (error) {
        console.error(error);
      }
    }
    if (this.state.view === modes.lineTrackMode) {
      try {
        this.refs.lineTrackMode.onsleep();
      } catch (error) {
        console.error(error);
      }
    }
    if (this.state.view === modes.matrixMode) {
      try {
        this.refs.matrixMode.onsleep();
      } catch (error) {
        console.error(error);
      }
    }
    if (this.state.view === modes.pathMode) {
      try {
        this.refs.pathMode.onsleep();
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type, data) {
    try {
      this.refs.remoteMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
    try {
      this.refs.dodgeMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
    try {
      this.refs.pathMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
    try {
      this.refs.musicMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
    try {
      this.refs.lineTrackMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
    try {
      this.refs.matrixMode.onUpdate(type, data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 取硬件的数据，取10次，有数据就保存到 robot
   * @param type
   */
  dataIntervalWork(type) {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
    //close interval
    if (type === 0) {
      return;
    }
    let runMax = 10;
    let index =0 ;
    //open interval
    this.dataInterval = setInterval(async () => {
      try {
        await this.wait(100);
        index++ ;
        if(index > runMax ){
          clearInterval(this.dataInterval);
          return;
        }
        let robot = robotManage.getCurrentRobot();
        if (!robot) return;
        for (let i = 0; i < this.dataFlag.length; i++) {
          if (this.dataFlag[1] === 1 && robot.hardWareInfo.userPort.length<=0 ) {
            await this.wait(320);
            this.getUserPortInfo();
          }
          if (this.dataFlag[0] === 1 ) {
            await this.wait(300);
            this.getHardware();
          }
          if (this.dataFlag[2] === 1 && robot.hardWareInfo.motorInfo.length<=0 ) {
            if (this.baseData.control.checkPort[0]) {
              await this.wait(320);
              this.getMotorInterfaceInfo();
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 1300);
  }

  async getUserPortInfo() {
    try {
      let index = 1;
      let max = 10;
      let times = this.dataFlagTimes[index];
      if (times >= max) {
        this.dataFlag[index] = 0;
        return;
      }
      this.dataFlagTimes[index] = times + 1;
      let robot = robotManage.getCurrentRobot();
      let ay8 = await robot.getUserInterfaceInfo();
      if (ay8.length >= 4) {
        this.dataFlag[index] = 0;
        robot.hardWareInfo.userPort = ay8;
        this.onUpdate(index, ay8);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getHardware() {
    try {
      let index = 0;
      //己有数据了:要处理固件版本问题；
      if(robot && robot.hardWareInfo.hardWare.length >=3){
        this.dataFlag[index] = 0;
        this.hardwareVerson = robot.hardWareInfo.hardWare;
        this.hardWareVerson();
        return;
      }
      //取新数据
      let max = 10;
      let times = this.dataFlagTimes[index];
      this.dataFlagTimes[index] = times + 1;
      let robot = robotManage.getCurrentRobot();
      let info = await robot.getHardware();
      if (info && info.length >= 3) {
        this.dataFlag[index] = 0;
        this.hardwareVerson = info;
        robot.hardWareInfo.hardWare = info;
        this.hardWareVerson();
        return;
      }
      if (times >= max) {
        this.dataFlag[index] = 0;
        this.openDialog(2);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /*
  * 处理固件版本的问题
  * */
  hardWareVerson() {
    let v2 = this.hardwareVerson[2];
    if (v2 <= 1) {
      // 不能玩 自动避障
      //this.modeList =[];
      // let del = 2;
      // let index = this.modeList.indexOf(del);
      // if (index > -1) {
      //   try{
      //     this.refs.dodgeMode.onsleep();
      //   }catch (error){}
      //   this.modeList.splice(index, 1);
      // }
    }
  }

  async getMotorInterfaceInfo() {
    try {
      let robot = robotManage.getCurrentRobot();
      let info = await robot.getMotorInterfaceInfo();
      let index = 2;
      let max = 10;
      if (!info || info === []) {
        let times = this.dataFlagTimes[index];
        if (times >= max) {
          this.dataFlag[index] = 0;
          await this.refs.ConnectionModal.open(local.data.Common_engin_break, 'boxDian');
          return;
        }
        this.dataFlagTimes[index] = times + 1;
        return;
      }
      if (info) {
        this.dataFlag[index] = 0;
        robot.hardWareInfo.motorInfo = info;
      }
    }catch (error){
      console.error(error);
    }
  }

  /**
   * 在被挂起的应用转到前台时触发:Home,电话(IOS电话打断不会触发)
   */
  onlive() {
    // 还原回来原窗口
    let mode = this.state.view;
    let index = this.modeList.indexOf(mode);
    this.swiper.slideTo(index, 0, false);
    //处理事件
    if (mode === modes.remoteMode) {
      try {
        this.refs.remoteMode.onlive();
      } catch (error) {
        console.log(error);
      }
    }
    if (this.state.view === modes.pathMode) {
      try {
        this.refs.pathMode.onlive();
      } catch (error) {
        console.error(error);
      }
    }
    //add other Mode
  }

  //进入时处理
  async onComeIn(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        let isConn = await robot.isConnected();
        if(isConn){
          this.connectionControlBack(true);//
        }
      }
    }catch (error){
      console.error(error);
    }
  }

  //离开时处理
  onGoAway(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        robot.readRSSI(undefined);
      }
    }catch (error){
      console.error(error);
    }
  }

  /**
   * 打开
   */
  async openDialog(index) {
    switch (index) {
      case 0:
        let result1 = await this.refs.ConnectionModal.open(local.data.Common_voice_break, 'boxUlt');
        break;
      case 1:
        let result2 = await this.refs.ConnectionModal.open(local.data.Common_lattice_break, 'boxJuzhen');
        break;
      case 2:
        let result3 = await this.refs.closeControlModal.open(local.data.Common_firmware_break);
        //await this.refs.ConnectionModal.open('请下载最新的固件', 'boxJuzhen');
        break;
    }
  }

  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }
}