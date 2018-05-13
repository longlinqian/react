import React from 'react'
import robotManage from '../../../services/robot/RobotManage.js'
import enums from '../../../enums.js'
import Common from '../../../utils/Common'

const robotK1 = {
  left: 75,
  right: 75
}

export default class TestMode extends React.Component {
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
    this.randio = 30;
      this.number= 1;
     this.radi1= 30;
     this.radi2= 30;
     this.light = 0; 
     this.wen = 0;
     this.voice = 0;
  }

  async componentDidMount() {
    this.left = 0;
    this.right = 0;
    this.robot = robotManage.getCurrentRobot();
    // <img src="./res/images/control/carVoice.png" className="carVoice"/>
  }

  render() {
    return (
      <div className="testView">
       
         
            <div className="steeringEngine" onTouchTap={this.setSteeringEngineTouchTap.bind(this)}>
            设置电机
            </div>
           <br/>
              <div className="switchButton" onTouchTap={this.switchButtonTouchTap.bind(this)}>
              巡线取值
              </div>
       
       
      
          <input type='text' className="inputOne"  id="inputOne" />
          <input type='text' className="inputOne"  id="inputTwo" />
          <input type='text' className="inputOne"  id="inputThree" />
          <br />
          <div className="switchButton" onTouchTap={this.LightButtonTouchTap.bind(this)}>
              光线传感器取值{this.light}
              </div>
              <br />
              <div className="switchButton" onTouchTap={this.VoiceTouchTap.bind(this)}>
              声音传感器取值{this.voice}
              </div>
              <br />
              <div className="switchButton" onTouchTap={this.temperatureTouchTap.bind(this)}>
              温湿度传感器取值{this.wen}
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

  async setSteeringEngineTouchTap() {
    this.number= document.getElementById("inputOne").value;
    this.radi1 =  document.getElementById("inputTwo").value;
    this.radi2 =  document.getElementById("inputThree").value;
    console.log(this.number);
      console.log(this.radi1);
      console.log(this.radi2);
    if (this.delayEvent(0, 1000)) return;
    try {
      console.log("kaishi");
      this.robot = robotManage.getCurrentRobot();
      this.result = await this.robot.setSteeringEngine(4, this.number, this.radi1,this.radi2);
      this.randio += 30;
      console.log("设置舵机" + this.result);
    } catch (e) {
      console.log("出错");
      console.error(e);
    }
  }

  handleNameChange(i) {
      console.log(this.number);
      console.log(this.radi);
  }

  /**
   * 开启超声波避障模式
   */
  async openLineTrack() {
    try {
      this.robot = robotManage.getCurrentRobot();
      let result = await this.robot.getLinePatrolValue(1);
      console.log("获取巡线传感器值:" + result);
    } catch (e) {
      console.error(e);
    }
  }
 /**
   * 声音传感器取值
   */
  async VoiceTouchTap(){
    try {
      this.robot = robotManage.getCurrentRobot();
      this.voice = await this.robot.getVoiceSensorValue(1);
      console.log("声音传感器值:" + this.voice);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 光线传感器取值
   */
  async LightButtonTouchTap(){
    try {
      this.robot = robotManage.getCurrentRobot();
      this.light = await this.robot.getLightSensorValue(2);
      console.log("获取光线传感器值:" + this.light);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 温湿度传感器取值
   */
  async temperatureTouchTap(){
    try {
      this.robot = robotManage.getCurrentRobot();
      this.wen = await this.robot.getTemperatureHumidityValue(3);
      let wen1 = parseInt(this.wen/65536),wen2 = this.wen%65536;
      console.log("获取温湿度传感器值:" + wen2);
      console.log(parseInt(wen1/256)+","+wen2/256)
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
        setTimeout(async () => {
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
    let result = await robot.setWorkMode(port, type, value);
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
      this.linePort = p4 !== -1 ? p4 + 1 : this.props.baseData.control.defaultPort[2];
      if (!this.linePort && this.modalAlert) {
        await this.props.openDialog(0);
      }
    } catch (e) {
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
      this.linePort = p3 !== -1 ? p3 + 1 : this.props.baseData.control.defaultPort[2];
    } else {
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
  onUpdate(type, data) {
    if (type === 1) {
      let p3 = data.indexOf(4);
      this.linePort = p3 !== -1 ? p3 + 1 : this.props.baseData.control.defaultPort[2];
    }
  }
}