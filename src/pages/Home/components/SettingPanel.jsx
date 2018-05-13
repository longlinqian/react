import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import robotManage from '../../../services/robot/RobotManage'
import local from '../../../utils/Local.js'
import devicesPlatform from '../../../utils/devices.js'
import configJson from '../../../config/config'
import ConnectionView from '../../Home/components/ConnectionView.jsx'

export default class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,

    };
    this.robot = undefined;
    this.actionflag = [0,0,0,0];
    this.versionUrl=configJson.url+"version.json";
    this.dataFlag=[0,0,0];// 0 取版本信息；1 取8个端口；
    this.hardwareVerson =undefined;
    this.dataFlagTimes=[0,0,0];//读取的次数

  }

  componentDidMount() {
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.onComeIn();
  }

  componentWillUnmount() {
    //this.onDisConnect();
    this.onGoAway();
  }

  render() {
    /*
    let ui_refresh = (<div className="item" onTouchTap={this.refreshButtonTouchTap.bind(this)}>
      <div className="refresh"></div>
      <div className="text-ellipsis">{local.data.Home_firmware}</div>
    </div>);
    let ui_version = (
      <div className="item aboutItem" onTouchTap={this.checkButtonTouchTap.bind(this)}>
        <div className="refresh"></div>
        <div className="text-ellipsis">{local.data.check_version}</div>
      </div>
    );
    */
    let ui_language = (
      <div className="item aboutItem" onTouchTap={this.languageButtonTouchTap.bind(this)}>
        <div className="about"></div>
        <div className="text-ellipsis">语言</div>
      </div>
    );

    return (
      <div className="settingPanel">
        <ReactTransitionGroup transitionName="panel" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div key="panel" className="panel">
                    <div className="title text-ellipsis">{local.data.Home_setting}</div>
                    <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                      <div className="close"></div>
                    </div>
                    <div className="list">
                      <div className="item aboutItem" onTouchTap={this.refreshButtonTouchTap.bind(this)}>
                        <div className="refresh"></div>
                          {local.data.Firmware_version}
                      </div>
                      <div className="item aboutItem" onTouchTap={this.aboutUsButtonTouchTap.bind(this)}>
                        <div className="about"></div>
                          {local.data.Home_about_us}
                      </div>

                      <div className="item aboutItem" onTouchTap={this.languageButtonTouchTap.bind(this)}>
                        <div className="language"></div>
                        <div className="text-ellipsis">{local.data.Home_language}</div>
                      </div>

                    </div>
                  </div>
                  <ConnectionView ref="connectionView" onBack={this.connectionControlBack.bind(this)}></ConnectionView>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </ReactTransitionGroup>
      </div>
    );
  }

  closeButtonTouchTap() {
    this.setState({
      isShow: false
    });
  }

  async refreshButtonTouchTap() {
    // SY.hardware =1;
    if (!this.robot) {
      this.refs.connectionView.open();
    } else {
      if (!this.hardwareVerson) {
        await this.getHardware();
      }
      const version  = this.hardwareVerson.join('.');
      await this.props.onfirmwareModal(version);
    }
  }

  async getHardware() {
    try {
      let index = 0;
      let max = 10;
      let times = this.dataFlagTimes[index];
      this.dataFlagTimes[index] = times + 1;
      let robot = robotManage.getCurrentRobot();
      let info = await robot.getHardware();
      console.log(info);
      
      if (info && info.length >= 3) {
        this.dataFlag[index] = 0;
        this.hardwareVerson = info;
        robot.hardWareInfo.hardWare = info;
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

  open() {
    this.setState({
      isShow: true
    });
  }

  async aboutUsButtonTouchTap() {
    if (this.delayEvent(0, 1000)) return;
    await this.props.showAboutUsModal();
  }

  async languageButtonTouchTap() {
    if (this.delayEvent(2, 500)) return;
    await this.props.onLanguageModal(true);
    //await this.props.onLanguageModal();
    //console.log('this.props',this.props);
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
   * 防止多次弹窗
   */
  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }

  /**
   * 版本检查
   */
  async checkButtonTouchTap() {
    if (this.delayEvent(0, 1000)) return;
    let version = null;
    version = await this.getVersionFile(this.versionUrl);
    window.version = version;
    window.version2 = SY.version;
    window.device = devicesPlatform.versions();
    if (devicesPlatform.versions().android) {
      if ( version.android > SY.version.android) {
        // hotpatch.updateNewVersion(configJson.url + 'www.zip');
        let result = await this.props.showCheckUpdate(1,SY.version.android,version.android);
       if(result){
        window.open(configJson.downurl);
       }
      } else {
        await this.props.showCheckUpdate(0,SY.version.android,version.android);
      }
    } else if (devicesPlatform.versions().ios) {
      if (version.ios > SY.version.ios) {
        let result = await this.props.showCheckUpdate(1,SY.version.ios,version.ios);
       if(result){
        window.open(configJson.downurl);
       }
      } else {
        await this.props.showCheckUpdate(0,SY.version.ios,version.ios);
      }
    } else {
      if (version.android > SY.version.android) {
       let result = await this.props.showCheckUpdate(1,SY.version.android,version.android);
       if(result){
        window.open(configJson.downurl);
       }
      } else {
        await this.props.showCheckUpdate(0,SY.version.android,version.android);
      }
    }
  }

  /**
   * 取系统的最新版本
   */
  async getVersionFile(url) {
    console.log(url);
    try {
      let response = await fetch(url);
      let responseText = await response.json();
      return responseText;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * 蓝牙连接机器人的回调函数
   * @param {*} isSuccess
   */
  async connectionControlBack(isSuccess) {
    try{
      if (isSuccess) {
        this.onConnection();
        await this.getHardware();
        const version  = this.hardwareVerson.join('.');
        await this.props.onfirmwareModal(version);
      } else {
        let robot = robotManage.getCurrentRobot();
        if (!robot) {
          this.onDisConnect();
        }
      }
    }catch(error){
      console.error(error);
    }
  }

  onConnection() {
    let robot = robotManage.getCurrentRobot();
    this.robot = robot;
  }

  async onDisConnect() {
    try {
      let robot = robotManage.getCurrentRobot();
      if (robot) {
        await robotManage.disconnectRobot(robot);
        this.robot = undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //进入时处理
  async onComeIn(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        let isConn = await robot.isConnected();
        if(isConn){
          this.onConnection();
          await this.getHardware();
        }
      }
    }catch (error){}
  }

  //离开时处理
  onGoAway(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        robot.readRSSI(undefined);
      }
    }catch (error){}
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
}