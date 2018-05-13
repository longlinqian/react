import React from 'react'
import '../../../sass/connectionView.scss'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import ScanPanel from './ScanPanel.jsx'
import robotManage from '../../../services/robot/RobotManage'
import ConnectionDialog from './ConnectionDialog.jsx'
import local from '../../../utils/Local.js'

export default class ConnectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      // 0: 准备连接，1 连接中，2 已连接 ，3 蓝牙不可用
      connectionFlag: 3,
      roundList: ['']
    };
    this.interval = undefined;
    this.hardwareVerson=undefined;
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.autoScanStop();
  }

  render() {
    let connectionUi = undefined;
    let connectStatus = '';
    if (this.state.connectionFlag == 1) {
      connectionUi = this.renderConnecting();
      connectStatus = 'connecting';
    } else if (this.state.connectionFlag == 2) {
      connectionUi = this.renderConnected();
      connectStatus = 'connected';
    } else if (this.state.connectionFlag == 3) {
      connectionUi = this.renderBleNotEnabled();
      connectStatus = 'bleNotEnabled';
    } else {
      connectionUi = this.renderWaitingForConnection();
    }
    return (
      <div className="connectionView">
        <ReactTransitionGroup transitionName="content" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="connectMasking"></div>
                  <div key="content" className="content">
                    {connectionUi}
                    <div className={"robot " + connectStatus }>
                      <div className="robotIcon"></div>
                      <div className="bluetooth"></div>
                    </div>
                    <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                      <div className="close"></div>
                    </div>
                    <div className="searchButton" onTouchTap={this.searchButtonTouchTap.bind(this)}>
                      <div className="search"></div>
                    </div>
                  </div>
                  <ScanPanel ref="scanPanel" onConnect={this.scanControlConnect.bind(this)}></ScanPanel>
                  <ConnectionDialog ref="dialog" onBack={this.connectionDialogBack.bind(this)}></ConnectionDialog>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </ReactTransitionGroup>
      </div>
    )
  }

  /**
   * 自动连接界面
   */
  renderWaitingForConnection() {
    return (
      <div className="waiting">
        {
          this.state.roundList.map((item, index) => {
            return <div className="round" key={item}></div>;
          })
        }
        <div className="device"></div>
      </div>
    );
  }

  /**
   * 正在连接中
   */
  renderConnecting() {
    return (
      <div className="connecting">
        <div className="info">{local.data.Connection_Blue_on}...</div>
      </div>
    )
  }

  renderBleNotEnabled() {
    return (
      <div className="connecting">
        <div className="info">{local.data.Connection_Blue_open}。</div>
      </div>
    )
  }

  /**
   * 已连接
   */
  renderConnected() {
    return (
      <div className="connected">
        <div className="disconnectButton" onTouchTap={this.disconnectButtonTouchTap.bind(this)}>
          {local.data.Connection_Blue_Break}
        </div>
      </div>
    );
  }

  closeButtonTouchTap() {
    this.autoScanStop();
    this.hide(false);
  }

  disconnectButtonTouchTap() {
    this.refs.dialog.open(3);
  }

  connectionDialogBack(type) {
    if (type === 21) {
      this.setState({
        connectionFlag: 0
      });
      this.autoScan();
    } else if (type === 31) {
      if (this.props.onBack) {
        this.props.onBack(false);
      }
      this.disconnect();
    }
  }

  searchButtonTouchTap() {
    this.autoScanStop();
    this.refs.scanPanel.open();
  }

  scanControlConnect(deviceId) {
    this.connectDevice(deviceId);
  }

  async open() {
    await this.initLoad();
    if (!this.interval) {
      this.roundAnimation();
    }
  }

  /**
   * 隐藏本控件
   */
  hide(isSuccess) {
    if (isSuccess) {
      this.setState({
        isShow: false,
        connectionFlag: 2
      });
    } else {
      this.setState({
        isShow: false
      });
    }
    if (this.props.onBack) {
      this.props.onBack(isSuccess);
    }
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  /**
   * 产生同心圆效果
   */
  roundAnimation() {
    this.interval = window.setInterval(() => {
      if (this.state.connectionFlag === 0) {
        let list = this.state.roundList;
        list.unshift(new Date().getTime());
        if (list.length > 4) {
          list.length = 4;
        }
        this.setState({
          roundList: list
        });
      }
    }, 1000);
  }

  /**
   * 连接设备
   */
  async connectDevice(deviceId) {
    this.setState({
      connectionFlag: 1
    });
    const robot = robotManage.getRobotById(deviceId, robotManage.getWaitConnectionList());
    let flag = await robotManage.connectRobot(robot);
    if (!flag) {
      this.refs.dialog.open(2);
      return;
    }
    //等 4秒
    await this.wait(4000);
    this.hide(true);
    this.robot = robot;
    console.log(this.robot);
    await this.getHardware();
        
      // }
      // var version  = this.hardwareVerson.join('.');
      // console.log("version:"+version);
    
  }

  /** 
   * 获取硬件信息
  */
  async getHardware() {
    try {
      // let index = 0;
      // let max = 10;
      // let times = this.dataFlagTimes[index];
      // this.dataFlagTimes[index] = times + 1;
      let robot = robotManage.getCurrentRobot();
      console.log(robot);
      let info = await robot.getHardware();
      SY.hardware = info;
      
      // if (info && info.length >= 3) {
      //   this.dataFlag[index] = 0;
      //   this.hardwareVerson = info;
      //   robot.hardWareInfo.hardWare = info;
      //   return;
      // }
      // if (times >= max) {
      //   this.dataFlag[index] = 0;
      //   return;
      // }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 自动连接(连接成功后会自动停止扫描)
   */
  autoScan() {
    robotManage.autoScan(this.autoScanBack.bind(this));
  }

  autoScanBack(device) {
    this.connectDevice(device.id);
  }

  /**
   * 停止扫描
   */
  autoScanStop() {
    try {
      robotManage.stopScan();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 初始化
   */
  async initLoad() {
    let robot = robotManage.getCurrentRobot();
    if (robot) {
      let flag = await robot.isConnected();
      if (flag) {
        this.setState({
          isShow: true,
          connectionFlag: 2
        });
        return;
      }
    }
    const bleIsEnabled = await robotManage.bleIsEnabled();
    if (!bleIsEnabled) {
      this.setState({
        isShow: true,
        connectionFlag: 3
      });
      return;
    }
    this.setState({
      isShow: true,
      connectionFlag: 0
    });
    this.autoScan();
  }

 async disconnect() {
    try{
      let robot = robotManage.getCurrentRobot();
      if (robot) {
        await robotManage.disconnectRobot(robot);
      }
    }catch (error)
    {
      console.log(error);
    }
    this.setState({
      connectionFlag: 0
    });
    this.autoScan();
  }

  /**
   * 取本窗口状态
   */
  getState() {
    return this.state.isShow;
  }

  /**
   * 当环境变化时，刷新本窗口
   */
  refresh() {
    let flag = this.state.connectionFlag;
    let isShow = this.state.isShow;
    if (isShow && flag === 3) {
      this.initLoad();
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
}