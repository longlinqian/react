import React from 'react'
import RockerControl from '../Views/RockerControl.jsx'
import robotManage from '../../../services/robot/RobotManage'
import enums from '../../../enums.js'
import Common from '../../../utils/Common.js'

/**
 * 遥控模式
 */
export default class RemoteMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whistleButtonClass: 'whistleButtonDisabled',
      whistleUrl:'./res/images/control/voice.png',
      headlampsButtonClass: 'headlampsButtonDisabled',
      headlampsUrl:'./res/images/control/light.png',
      noticeButtonClass: 'noticeButtonDisabled',
      noticeUrl:'./res/images/control/warning.png',
      applauseButtonClass: 'applauseButtonDisabled',
      applauseUrl:'./res/images/control/applause.png',
      musicButtonClass:'musicButtonDisabled',
      musicUrl:'./res/images/control/music.png',
      smileButtonClass:'smileButtonDisabled',
      smileUrl:'./res/images/control/smile.png',
      personButtonClass:'personButtonDisabled',
      personUrl:'./res/images/control/person.png',
      positionButtonClass2:' positionButtonClass2',
      positionButtonClassLeft4:' positionButtonClassLeft4',
      positionButtonClassRight4:' positionButtonClassRight4',
      mask: null
    };
    this.robot = null;
    // this.ultrasonicPort = 3;
  }

  async componentDidMount() {
    this.left = 0;
    this.right = 0;
    this.robot = robotManage.getCurrentRobot();
    this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.matrixCurrent = 0;
    this.matrixList = [
      [0x0000,0x0000,0x3870,0x3870,0x0840,0x0000,0x0840,0x0780,0x0000,0x0000],
      [0x0000,0x0000,0x0840,0x0480,0x0840,0x0300,0x0780,0x0840,0x0000,0x0000],
      [0x0000,0x0000,0x1CE0,0x0000,0x0000,0x0FC0,0x0780,0X0300,0X0000,0X0000],
      [0x0000,0x0000,0x1CE0,0X0000,0X0000,0X0300,0X0780,0X0300,0X0000,0X0000],
      [0x0000,0x0000,0x0CC0,0X0CC0,0X0840,0X0000,0X0840,0X0780,0X0000,0X0000],
      [0x0000,0x0000,0x0CC0,0X0CC0,0X0440,0x0000,0x0780,0x0300,0x0000,0x0000],
      [0x0000,0x0000,0x0480,0x0480,0x0000,0x0000,0x0840,0x0780,0x0000,0x0000],
      [0x0000,0x0000,0x14A0,0X0840,0X0000,0X0000,0X0780,0X0300,0X0000,0X0000]
    ];
    this.ultrasonicPort = this.props.baseData.control.defaultPort[0];
    this.matrixPort = this.props.baseData.control.defaultPort[1];
  }

  render() {
    return (
      <div className="remoteModeView">
        <div className="container">
        <div className="coverLeft">
          <RockerControl onMove={this.rockerControlMove.bind(this)} ref="rockerControl" baseData={this.props.baseData}/>
          </div>
          <div className="coverRight">
          {(() => {
            if(this.props.baseData.control.modalPosition ==0){
              return this.props.baseData.control.buttons.map(function (item) {
                switch (item) {
                  case 1: return (
                    <div className={this.state.whistleButtonClass} key='1' onTouchTap={this.remoteButtonTouchTap.bind(this, 1)}>
                      <img className="remoteButtonImage" src={this.state.whistleUrl} />
                    </div>)
                    break;
                  case 2: return (
                    <div className={this.state.headlampsButtonClass} key='2' onTouchTap={this.remoteButtonTouchTap.bind(this, 2)}>
                      <img className="remoteButtonImageHeadlamps" src={this.state.headlampsUrl} />
                    </div>)
                    break;
                  case 3: return (
                    <div className={this.state.noticeButtonClass} key='3' onTouchTap={this.remoteButtonTouchTap.bind(this, 3)}>
                    <img className="remoteButtonImageNotice" src={this.state.noticeUrl} />
                    </div>)
                    break;
                }
              }.bind(this))
            }else if(this.props.baseData.control.modalPosition ==1){
              return this.props.baseData.control.buttons.map(function (item) {
                switch (item) {
                  case 1: return (
                    <div className={this.state.whistleButtonClass} key='1' onTouchTap={this.remoteButtonTouchTap.bind(this, 1)}>
                      <img className="remoteButtonImage" src={this.state.whistleUrl} />
                    </div>)
                    break;
                  case 3: return (
                    <div className={this.state.noticeButtonClass} key='2' onTouchTap={this.remoteButtonTouchTap.bind(this, 3)}>
                      <img className="remoteButtonImageNotice" src={this.state.noticeUrl} />
                    </div>)
                    break;
                  case 4: return (
                    <div className={this.state.applauseButtonClass} key='3' onTouchTap={this.remoteButtonTouchTap.bind(this, 5)}>
                    <img className="remoteButtonImageApplause" src={this.state.applauseUrl} />
                    </div>)
                    break;
                }
              }.bind(this))
            }else if(this.props.baseData.control.modalPosition ==2){
              return this.props.baseData.control.buttons.map(function (item) {
                switch (item) {
                  case 1: return (
                    <div className={this.state.whistleButtonClass} key='1' onTouchTap={this.remoteButtonTouchTap.bind(this, 1)}>
                      <img className="remoteButtonImage" src={this.state.whistleUrl} />
                    </div>)
                    break;
                  case 4: return (
                    <div className={this.state.applauseButtonClass} key='2' onTouchTap={this.remoteButtonTouchTap.bind(this, 5)}>
                      <img className="remoteButtonImageApplause" src={this.state.applauseUrl} />
                    </div>)
                    break;
                  case 5: return (
                    <div className={this.state.smileButtonClass} key='3' onTouchTap={this.remoteButtonTouchTap.bind(this, 12)}>
                      <img className="remoteButtonImage" src={this.state.smileUrl} />
                    </div>)
                    break;
                }
              }.bind(this))
            }
          })()}
          </div>
        </div>
      </div>
    );
  }

  rockerControlMove(left, right) {
    if (!this.robot) {
      return;
    }
    if (left !== 0 || right !== 0) if (this.delayEvent(0, 200)) return;
    if (this.left !== left || this.right !== right) {
      this.left = left;
      this.right = right;
      try {
          //前驱模式
          //后驱模式
          this.robot.setMove(false, left, right);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async remoteButtonTouchTap(index, e) {
    e.preventDefault();
    // if (!this.robot) {
    //   return;
    // }
    switch (index) {
      case 1:
        if (this.delayEvent(1, 1000)) return;
        if (this.state.whistleButtonClass == 'whistleButton') {
          this.setState({
            whistleButtonClass: 'whistleButtonCheck',
            whistleUrl:'./res/images/control/voice-1.png',
          });
          setTimeout(() => {
            this.setState({
              whistleButtonClass: 'whistleButton',
              whistleUrl:'./res/images/control/voice.png',
            });
          }, 1000);
        }
        try {
          this.robot.setBuzzer(enums.robot.ports.board_buzzer, 1322, 1000);
        } catch (e) {
          console.error(e);
        }
        break;
      case 2:
        if(this.ultrasonicPort <= 0){
          this.checkPort();
          return false;
        }
        if (this.delayEvent(1, 100)) return;

        if (this.state.headlampsButtonClass == 'headlampsButton') {
          try {
            this.setState({
              headlampsButtonClass: 'headlampsButtonCheck',
              headlampsUrl:'./res/images/control/light-1.png',
            });
            let result = await this.robot.setUltrasonicLight(this.ultrasonicPort, 245, 245, 0);
          } catch (error) {
            console.error(error);
          }
        } else if (this.state.headlampsButtonClass == 'headlampsButtonCheck') {
          try {
            this.setState({
              headlampsButtonClass: 'headlampsButton',
              headlampsUrl:'./res/images/control/light.png',
            });
            let result = await this.robot.setUltrasonicLight(this.ultrasonicPort, 0, 0, 0);
          } catch (error) {
            console.error(error);
          }
        }
        break;
      case 3:
        if (this.delayEvent(1, 100)) return;

        if (this.state.noticeButtonClass === 'noticeButton') {
          try {
            this.robot.setLed(enums.robot.ports.board_led_0, 250, 0, 0);
            // this.robot.setLed(enums.robot.ports.board_led_2, 250, 0, 0);
            this.setState({
              noticeButtonClass: 'noticeButtonCheck',
              noticeUrl:'./res/images/control/warning-1.png',
            });
          } catch (error) {
            console.error(error);
          }
        } else if (this.state.noticeButtonClass == 'noticeButtonCheck') {
          try {
            this.robot.setLed(enums.robot.ports.board_led_0, 0, 0, 0);
            // this.robot.setLed(enums.robot.ports.board_led_2, 0, 0, 0);
            this.setState({
              noticeButtonClass: 'noticeButton',
              noticeUrl:'./res/images/control/warning.png',
            });
          } catch (error) {
            console.error(error);
          }
        }
        break;
        case 5:
        if (this.delayEvent(1, 1000)) return;
        if (this.state.applauseButtonClass === 'applauseButton') {
          try {

            this.setState({
              applauseButtonClass: 'applauseButtonCheck',
              applauseUrl:'./res/images/control/applause-1.png',
            });

            this.robot.setMove(false, 100, -100);
            await this.wait(400);
            this.robot.setMove(false, -100, 100);
            await this.wait(400);
            this.robot.setMove(false, 0, 0);

            this.setState({
              applauseButtonClass: 'applauseButton',
              applauseUrl:'./res/images/control/applause.png',
            });
          } catch (error) {
            console.error(error);
          }
        } else  {
          try {
            this.setState({
              applauseButtonClass: 'applauseButton',
              applauseUrl:'./res/images/control/applause.png',
            });
          } catch (error) {
            console.error(error);
          }
        }
        break;
        case 11:
        if (this.state.musicButtonClass === 'musicButton') {
          try {
            this.setState({
              musicButtonClass: 'musicButtonCheck',
              musicUrl:'./res/images/control/music-2.png',
            });
          } catch (error) {
            console.error(error);
          }
        } else  {
          try {
            this.setState({
              musicButtonClass: 'musicButton',
              musicUrl:'./res/images/control/music.png',
            });
          } catch (error) {
            console.error(error);
          }
        }
        break;
        case 12:
          if(this.matrixPort <= 0){
            this.checkPort();
            return false;
          }
          if (this.delayEvent(1, 100)) return;
          if (this.state.smileButtonClass === 'smileButton') {
          try {
            let result = false;

            this.setState({
              smileButtonClass: 'smileButtonCheck',
              smileUrl:'./res/images/control/smile-1.png',
            });

            if(this.matrixCurrent >= 0 && this.matrixCurrent < this.matrixList.length - 1) {
              this.robot.setMatrix(this.matrixPort, [this.matrixList[this.matrixCurrent][0], this.matrixList[this.matrixCurrent][1], this.matrixList[this.matrixCurrent][2], this.matrixList[this.matrixCurrent][3], this.matrixList[this.matrixCurrent][4], this.matrixList[this.matrixCurrent][5], this.matrixList[this.matrixCurrent][6], this.matrixList[this.matrixCurrent][7], this.matrixList[this.matrixCurrent][8], this.matrixList[this.matrixCurrent][9]]);
              this.matrixCurrent = this.matrixCurrent + 1;
            } else {
              this.robot.setMatrix(this.matrixPort, [this.matrixList[this.matrixCurrent][0], this.matrixList[this.matrixCurrent][1], this.matrixList[this.matrixCurrent][2], this.matrixList[this.matrixCurrent][3], this.matrixList[this.matrixCurrent][4], this.matrixList[this.matrixCurrent][5], this.matrixList[this.matrixCurrent][6], this.matrixList[this.matrixCurrent][7], this.matrixList[this.matrixCurrent][8], this.matrixList[this.matrixCurrent][9]]);
              this.matrixCurrent = 0;
            }

            await this.wait(500);

            this.setState({
              smileButtonClass: 'smileButton',
              smileUrl:'./res/images/control/smile.png',
            });

          } catch (error) {
            console.error(error);
          }
        } else  {
          try {
            this.setState({
              smileButtonClass: 'smileButton',
              smileUrl:'./res/images/control/smile.png',
            });
          } catch (error) {
            console.error(error);
          }
        }
        break;
        case 13:
        if (this.state.personButtonClass === 'personButton') {
          try {
            this.setState({
              personButtonClass: 'personButtonCheck',
              personUrl:'./res/images/control/person-1.png',
            });
          } catch (error) {
            console.error(error);
          }
        } else  {
          try {
            this.setState({
              personButtonClass: 'personButton',
              personUrl:'./res/images/control/person.png',
            });
          } catch (error) {
            console.error(error);
          }
        }
        break;
    }
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
   * 检测是否断开连接
   */
  isconnectCurrent() {
    if (this.robot) {
      this.setState({
        whistleButtonClass: 'whistleButton',
        headlampsButtonClass: 'headlampsButton',
        noticeButtonClass: 'noticeButton',
        applauseButtonClass:'applauseButton',
        musicButtonClass:'musicButton',
        smileButtonClass:'smileButton',
        personButtonClass:'personButton',
        whistleUrl:'./res/images/control/voice.png',
        headlampsUrl:'./res/images/control/light.png',
        noticeUrl:'./res/images/control/warning.png',
        applauseUrl:'./res/images/control/applause.png',
        musicUrl:'./res/images/control/music.png',
        smileUrl:'./res/images/control/smile.png',
        personUrl:'./res/images/control/person.png',
      });
      this.refs.rockerControl.changeClassName(true);
    } else {
      this.setState({
        whistleButtonClass: 'whistleButtonDisabled',
        headlampsButtonClass: 'headlampsButtonDisabled',
        noticeButtonClass: 'noticeButtonDisabled',
        applauseButtonClass:'applauseButtonDisabled',
        musicButtonClass:'musicButtonDisabled',
        smileButtonClass:'smileButtonDisabled',
        personButtonClass:'personButtonDisabled',
        whistleUrl:'./res/images/control/voice.png',
        headlampsUrl:'./res/images/control/light.png',
        noticeUrl:'./res/images/control/warning.png',
        applauseUrl:'./res/images/control/applause.png',
        musicUrl:'./res/images/control/music.png',
        smileUrl:'./res/images/control/smile.png',
        personUrl:'./res/images/control/person.png',
      });
      this.refs.rockerControl.changeClassName(false);
    }
  }

  /**
   * 应用端口
   */
  async checkPort() {
    const robot = this.robot;
    try {
      const userInterfaceInfo = await robot.getUserInterfaceInfo();
      this.ultrasonicPort = userInterfaceInfo.indexOf(2);
      this.ultrasonicPort = this.ultrasonicPort !== -1 ? this.ultrasonicPort + 1 : this.ultrasonicPort;
      this.matrixPort = userInterfaceInfo.indexOf(3);
      this.matrixPort = this.matrixPort !== -1 ? this.matrixPort + 1 : this.matrixPort;
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * 中断操作事件
   */
  onsleep() {
    this.refs.rockerControl.pauseEvent();
  }

  /**
   * 在被挂起的应用转到前台时触发:IOS电话打断不会触发
   */
  onlive() {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';  
    this.refs.rockerControl.resumeEvent();
  }

  /**
   * 响应外部传入事件
   */
  async onconnect(temp){
    this.robot = null
    this.robot = robotManage.getCurrentRobot();
    if(temp){
      //this.ultrasonicPort = temp;
      const userInterfaceInfo = temp;
      let p1 = userInterfaceInfo.indexOf(2);
      this.ultrasonicPort = p1 !== -1 ? p1 + 1 : this.props.baseData.control.defaultPort[0] ;
      let p2 = userInterfaceInfo.indexOf(3);
      this.matrixPort = p2 !== -1 ? p2 + 1 : this.props.baseData.control.defaultPort[1];
    }else {
      await this.checkPort();
    }
    this.isconnectCurrent();
    // if (this.props.baseData.control.checkPort[1]) {
    //   if (this.ultrasonicPort == -1) {      
    //     await this.props.openDialog(0);
    //   }
    // }

    // if (this.props.baseData.control.checkPort[2]) {
    //   if (this.matrixPort == -1) {
    //     try{
    //       this.props.openDialog(1);
    //     }catch(e){
    //       console.error(e);
    //     }
    //   }
    // }
  }
    
  /**
   * 断开连接
   */
  ondisconnect(){
    
  }
  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type,data){
    if(type===1){
      const userInterfaceInfo = data;
      let p1 = userInterfaceInfo.indexOf(2);
      this.ultrasonicPort = p1 !== -1 ? p1 + 1 : this.props.baseData.control.defaultPort[0] ;
      let p2 = userInterfaceInfo.indexOf(3);
      this.matrixPort = p2 !== -1 ? p2 + 1 : this.props.baseData.control.defaultPort[1];
    }
  }
  /**
   * 等待时间
   * @param time
   * @returns {Promise}
   */
  async wait(time) {
    return new Promise((a, b) => {
      setTimeout(() => {
        a();
      }, time);
    })
  }
}