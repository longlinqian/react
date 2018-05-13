import React from 'react'
import robotManage from '../../../services/robot/RobotManage.js'
import enums from '../../../enums.js'
import Common from '../../../utils/Common'

const robotK1 = {
  left: 75,
  right: 75
}

export default class LineTrackingMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: false,
      mask: false
    }
    this.robot = undefined;
    this.actionflag = [0, 0, 0, 0];
    this.linePort = this.props.baseData.control.defaultPort[2];
    this.modalAlert = false;
  }

  async componentDidMount() {
    this.left = 0;
    this.right = 0;
    this.robot = robotManage.getCurrentRobot();
    // <img src="./res/images/control/carVoice.png" className="carVoice"/>
  }

  render() {
    return (
      <div className="LineTrackingView">
        <div className="LineContainer">
       
          <div className="out-container">
          <img src="./res/images/lineTracking/LineTracking_carx.png" className="car"/>

          <img src="./res/images/lineTracking/LineTracking_22.png" className="urltwo"/>
          </div>
          <div className="outBorder">
            <div className="switchButtonOut">
              <div className="switchButton" onTouchTap={this.switchButtonTouchTap.bind(this)}>
                <div className="textOn">
                </div>
                <div className="textOff">
                </div>
                <div className={this.state.trigger ? 'switchOff' : 'switchOn'}></div>
              </div>
            </div>
            <div className="robotPrevious" id='robotPrevious'>
            </div>
            <div className="voice">
            </div>
            <div className="robotSprinting">
            </div>
            <div className="path">
            </div>
          </div>
        </div>
      </div>
    );
  }

  async switchButtonTouchTap() {
    if (this.delayEvent(0, 1000)) return;
    if (!this.state.trigger) {
      this.openLineTrack();
    } else {
      this.closeLineTrack();
    }
  }

  /**
   * 开启超声波避障模式
   */
  async openLineTrack() {
    this.modalAlert = true;
    try {
      this.robot = robotManage.getCurrentRobot();
      //TODO:弹窗超声波端口没找到
      // this.linePort =  await Common.getPortInfo(this.robot,enums.robot.devices.ultrasonic,2000);
      // if(!this.linePort){
      //   this.props.openDialog(0);
      //   return;
      // }
      this.setState({ trigger: true });
      let back = await this.setWorkMode(this.robot, 2, this.linePort);
    } catch (e) {
      console.error(e);
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
   * 关闭巡线模式
   */
  closeLineTrack() {
    this.modalAlert = false;
    try {
      this.robot = robotManage.getCurrentRobot();
      if (this.robot)
        setTimeout( async() => {
          this.setWorkMode(this.robot, 0, this.port);
          await this.wait(100);
          this.robot.setMove(false, 0, 0);
          this.setState({ trigger: false });
        }, 10);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 连接蓝牙后刷新robot
   */
  handleMask() {
    this.robot = robotManage.getCurrentRobot();
    if (this.robot) {
      this.setState({
        mask: true
      })
    } else {
      this.setState({
        mask: false
      })
    }
  }

  /**
   * 提示会自动消息的信息
   * @param message
   * @param type
   */
  showNotification(message, type) {
    this.refs.notification.show(message, 5000, type);
  }

  /**
   * 防止多次点击
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
   * 取超声波在哪个口
   */
  async getPortInfo(robot) {
    let port = await Common.getPortInfo(robot, enums.robot.devices.ultrasonic, 8000);
    return port;
  }

  /**
   * 更改工作模式
   * @param type类型
   */
  async setWorkMode(robot, type, port) {
    let value = this.props.baseData.control.catType;
    let result = await robot.setWorkMode(port, type,value);
    return result;
  }

  /**
   * 应用端口
   */
  async checkPort() {
    const robot = this.robot;
    try {
      const userInterfaceInfo = await robot.getUserInterfaceInfo();
      let p4 = userInterfaceInfo.indexOf(4);
      this.linePort = p4 !== -1 ? p4 + 1 : this.props.baseData.control.defaultPort[2] ;
      if (!this.linePort && this.modalAlert) {
        await this.props.openDialog(0);
      }
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * 响应外部传入事件
   */
  onconnect(temp) {
    // this.checkPort(); 
    this.robot = robotManage.getCurrentRobot();
    if (temp) {
      //this.linePort = temp;
      let p3 = temp.indexOf(4);
      this.linePort = p3 !== -1 ? p3 + 1 : this.props.baseData.control.defaultPort[2] ;
    }else {
      this.linePort = this.props.baseData.control.defaultPort[2];
    }
    //this.closeLineTrack();
  }

  /**
   * 断开连接
   */
  ondisconnect() {
  }

  /**
   * 中断操作事件
   */
  onsleep() {
    if (this.state.trigger) {
      this.closeLineTrack();
    }
  }

  /**
   * 在被挂起的应用转到前台时触发:IOS电话打断不会触发
   */
  onlive() {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';
  }

  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type,data){
    if(type ===1){
      let p3 = data.indexOf(4);
      this.linePort = p3 !== -1 ? p3 + 1 : this.props.baseData.control.defaultPort[2] ;
    }
  }
}