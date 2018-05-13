import React from 'react'
import nipplejs from 'nipplejs'

/**
 * 摇杆控件
 */
export default class RockerControl extends React.Component {
  constructor(props) {
    super(props);
    this.joystick = undefined;
    this.screenWith = (window.screen.width>window.screen.height?window.screen.width:window.screen.height);
    this.state = {
      rockerControlClass:'rockerControlDisabled',
    };
  }

  componentDidMount() {
    this.initRocker();
  }

  componentWillUnmount() {
    this.joystick.destroy();
  }

  render() {
    return (
      <div ref='rocker' className={this.state.rockerControlClass}></div>
    );
  }

  /**
   * 初始化摇杆
   */
  initRocker = () => {
    this.joystick = nipplejs.create({
      zone: this.refs.rocker,
      mode: 'static',
      position: { left: '50%', top: '53%' },
      size: this.screenWith * 380 / 1334,
      color:'rgb(0,0,0,0)'
    });
    this.joystick.on('move', this.rockerMove.bind(this))
      .on('end', this.rockerEnd.bind(this))
      .on('destroyed', function (event, _self) {
        event.target.manager.index = 0;
        event.target.manager.latest = 0;
      });
    this.resetRockerBackground();
  }

  /**
   * 当摇杆被操作的时候
   */
  rockerMove(e, nipple) {
    let tempx= nipple.distance/(this.screenWith * 190 / 1334);
    let left1 =  0;
    let right1 = 0;
    let left = 0;
    let right = 0;
  if(this.props.baseData.control.rockerMode == 0) {
    let x = Math.sin(nipple.angle.radian) * nipple.distance / (this.screenWith * 190 / 1334) * 100;
    let y = Math.cos(nipple.angle.radian) * nipple.distance / (this.screenWith * 190 / 1334) * 100;
    left = ((100 - Math.abs(x)) * (y / 100) + y + (100 - Math.abs(y)) * (x / 100) + x) / 2;
    right = -((100 - Math.abs(x)) * (y / 100) + y - ((100 - Math.abs(y)) * (x / 100) + x)) / 2; 
  } else if(this.props.baseData.control.rockerMode == 1){
    if(nipple.angle.degree>337.5 || nipple.angle.degree <=22.5){
      left1 = 99;
      right1 = -99;
    }else if(nipple.angle.degree<=67.5 && nipple.angle.degree >22.5){
      left1 = 99;
      right1 = 60;
    }else if(nipple.angle.degree<=112.5 && nipple.angle.degree >67.5){
      left1 = 99;
      right1 = 99;
    }else if(nipple.angle.degree<=157.5 && nipple.angle.degree >112.5){
      left1 = 60;
      right1 = 99;
    }else if(nipple.angle.degree<=202.5 && nipple.angle.degree >157.5){
      left1 =-99;
      right1 = 99;
    }else if(nipple.angle.degree<=247.5 && nipple.angle.degree >202.5){
      left1 =-99;
      right1 = 60;
    }else if(nipple.angle.degree<=292.5 && nipple.angle.degree >247.5){
      left1 = -99;
      right1 = -99;
    }else if(nipple.angle.degree<=337.5 && nipple.angle.degree >292.5){
      left1 = 60;
      right1 = -99;
    }
    left = left1*tempx;
    right = right1*tempx;
  } else if(this.props.baseData.control.rockerMode == 2){
    if(nipple.angle.degree>348.75 || nipple.angle.degree <=11.25){
      left1 = 99;
      right1 = 0;
    }else if(nipple.angle.degree<=33.75 && nipple.angle.degree >11.25){
      left1 = 99;
      right1 = 55;
    }
    else if(nipple.angle.degree<=56.25 && nipple.angle.degree >33.75){
      left1 = 99;
      right1 = 70;
    }else if(nipple.angle.degree<=78.75 && nipple.angle.degree >56.25){
      left1 = 99;
      right1 = 85;
    }
    else if(nipple.angle.degree<=101.25 && nipple.angle.degree >78.75){
      left1 = 99;
      right1 = 99;
    }else if(nipple.angle.degree<=123.75 && nipple.angle.degree >101.25){
      left1 = 85;
      right1 = 99;
    }
    else if(nipple.angle.degree<=146.25 && nipple.angle.degree >123.75){
      left1 = 70;
      right1 = 99;
    }else if(nipple.angle.degree<=168.75 && nipple.angle.degree >146.25){
      left1 = 55;
      right1 = 99;
    }
    else if(nipple.angle.degree<=191.25 && nipple.angle.degree >168.75){
      left1 =0;
      right1 = 99;
    }else if(nipple.angle.degree<=213.75 && nipple.angle.degree >191.25){
      left1 =-99;
      right1 = -55;
    }
    else if(nipple.angle.degree<=236.25 && nipple.angle.degree >213.75){
      left1 =-99;
      right1 = -70;
    }else if(nipple.angle.degree<=258.75 && nipple.angle.degree >236.25){
      left1 =-99;
      right1 = -85;
    }
    else if(nipple.angle.degree<=281.25 && nipple.angle.degree >258.75){
      left1 = -99;
      right1 = -99;
    }else if(nipple.angle.degree<=303.75 && nipple.angle.degree >281.25){
      left1 = -85;
      right1 = -99;
    }
    else if(nipple.angle.degree<=326.25 && nipple.angle.degree >303.75){
      left1 = -70;
      right1 = -99;
    }else if(nipple.angle.degree<=348.75 && nipple.angle.degree >326.25){
      left1 = -55;
      right1 = -99;
    }
    left = left1*tempx;
    right = right1*tempx;
  }
  if (this.props.onMove) {
    this.props.onMove(left , right);
    // console.log('left:'+left+',right:'+right)
  }
  }

  /**
   * 结束移动
   */
  rockerEnd(e, nipple) {
    if (this.props.onMove) {
      this.props.onMove(0, 0);
    }
  }

  /**
   * 重置摇杆背景图
   */
  resetRockerBackground = () => {
    let front = document.getElementsByClassName('front');
    let back = document.getElementsByClassName('back');
    front[0].style.background = "url('./res/images/control/yao.png')";
    front[0].style.backgroundSize='100% 100%';
    front[0].style.opacity = '1';
    back[0].style.backgroundColor = 'rbga(255,255,255,0)';
  }

  /**
   * 改变背景颜色
   */
  changeClassName(flag){
    if(flag){
      this.setState({
        rockerControlClass:'rockerControl',
      })
    }else{
      this.setState({
        rockerControlClass:'rockerControlDisabled',
      })
    }
  }

  /**
   * 中断操作事件
   */
  pauseEvent() {
    if (this.props.onMove) {
      this.props.onMove(0, 0);
    }
    this.joystick.destroy();
    this.initRocker();
  }

  /**
   * 在被挂起的应用转到前台时触发:IOS电话打断不会触发
   */
  resumeEvent() {
  }
}