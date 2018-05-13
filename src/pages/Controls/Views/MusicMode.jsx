import React from 'react'
import robotManage from '../../../services/robot/RobotManage'
import christmas from '../../../config/sound/christmas';
import star from '../../../config/sound/star';
import tiger from '../../../config/sound/tiger';
import bug from '../../../config/sound/bug';
import Utils from '../../../config/sound/utils';
import enums from '../../../enums'
import local from '../../../utils/Local.js'


export default class MusicMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: ''
    };
    this.robot = null;
    this.playing = [];
    this.last = 0; 
  }

  componentDidMount() {
    this.robot = robotManage.getCurrentRobot();
    this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.sleepFlag = false;
    this.touchEnable = true;
  }

  componentWillUnmount () {
    this.sleepFlag = true;
  }

  render() {
    return (
      <div className="musicModeView">
        <div className="container">
          <div className="playlist">
            <div className="item" onTouchTap={this.playlistButtonTouchTap.bind(this, 1)}>
              <div className="icon icon1"></div>
              <div className="name">{local.data.Song_list[0]}</div>
            </div>
            <div className="item" onTouchTap={this.playlistButtonTouchTap.bind(this, 2)}>
              <div className="icon icon2"></div>
              <div className="name">{local.data.Song_list[1]}</div>
            </div>
            <div className="item" onTouchTap={this.playlistButtonTouchTap.bind(this, 3)}>
              <div className="icon icon3"></div>
              <div className="name">{local.data.Song_list[2]}</div>
            </div>
            <div className="item" onTouchTap={this.playlistButtonTouchTap.bind(this, 4)}>
              <div className="icon icon4"></div>
              <div className="name">{local.data.Song_list[3]}</div>
            </div>
          </div>
         <div className="keyboard">
           <div className={"key keyWhite " + (this.state.currentKey === 'C4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'C4')} onTouchEnd={this.keyTouchEnd.bind(this, 'C4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'C4')}>
             <div className="name">Do</div>
           </div>
           <div className={"key keyBlack " + (this.state.currentKey === 'C3' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'C3')} onTouchEnd={this.keyTouchEnd.bind(this, 'C3')} onTouchTap={this.toneButtonTouchTap.bind(this, 'C3')}></div>
           <div className={"key keyWhite " + (this.state.currentKey === 'D4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'D4')} onTouchEnd={this.keyTouchEnd.bind(this, 'D4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'D4')}>
             <div className="name">Re</div>
           </div>
           <div className={"key keyBlack " + (this.state.currentKey === 'D3' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'D3')} onTouchEnd={this.keyTouchEnd.bind(this, 'D3')} onTouchTap={this.toneButtonTouchTap.bind(this, 'D3')}></div>
           <div className={"key keyWhite " + (this.state.currentKey === 'E4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'E4')} onTouchEnd={this.keyTouchEnd.bind(this, 'E4')}onTouchTap={this.toneButtonTouchTap.bind(this, 'E4')}>
             <div className="name">Mi</div>
           </div>
           <div className={"key keyWhite " + (this.state.currentKey === 'F4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'F4')} onTouchEnd={this.keyTouchEnd.bind(this, 'F4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'F4')}>
             <div className="name">Fa</div>
           </div>
           <div className={"key keyBlack " + (this.state.currentKey === 'E3' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'E3')} onTouchEnd={this.keyTouchEnd.bind(this, 'E3')}  onTouchTap={this.toneButtonTouchTap.bind(this, 'E3')}></div>
           <div className={"key keyWhite " + (this.state.currentKey === 'G4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'G4')} onTouchEnd={this.keyTouchEnd.bind(this, 'G4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'G4')}>
             <div className="name">So</div>
           </div>
           <div className={"key keyBlack " + (this.state.currentKey === 'F3' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'F3')} onTouchEnd={this.keyTouchEnd.bind(this, 'F3')} onTouchTap={this.toneButtonTouchTap.bind(this, 'F3')}></div>
           <div className={"key keyWhite " + (this.state.currentKey === 'A4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'A4')} onTouchEnd={this.keyTouchEnd.bind(this, 'A4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'A4')}>
             <div className="name">La</div>
           </div>
           <div className={"key keyBlack " + (this.state.currentKey === 'G3' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'G3')} onTouchEnd={this.keyTouchEnd.bind(this, 'G3')} onTouchTap={this.toneButtonTouchTap.bind(this, 'G3')}></div>
           <div className={"key keyWhite " + (this.state.currentKey === 'B4' ? 'active' : '')} onTouchStart={this.keyTouchStart.bind(this, 'B4')} onTouchEnd={this.keyTouchEnd.bind(this, 'B4')} onTouchTap={this.toneButtonTouchTap.bind(this, 'B4')}>
             <div className="name">Ti</div>
           </div>
         </div>
        </div>
      </div>
    );
  }

  /**
   * 播放歌曲
   * @param index
   * @returns {Promise.<void>}
   */
  async playlistButtonTouchTap(index, e) {
    e.preventDefault();
    if (!this.touchEnable) {
      return false;
    }
    // 如果歌曲列表中有歌曲正在播放，清空列表，等待片刻，让上一首的逻辑跑完
    if (this.playing &&this.last == index){
      this.touchEnable = false
      await this.wait(500);
    } 
    this.last = index;
    this.playing++;
    this.touchEnable = true;

    switch (index) {
      case 1:
        this.playHandle(christmas, this.playing);
        break;
      case 2:
        this.playHandle(tiger, this.playing);
        break;
      case 3:
        this.playHandle(star, this.playing);
        break;
      case 4:
        this.playHandle(bug, this.playing);
        break;
    }
  }

  /**
   * 播放逻辑
   */
  async playHandle(song, index) {
    for(let i = 0; i < song.length; i++) {
      if (this.sleepFlag || this.playing !== index) {
        return;
      }
      const key = song[i].s;
      if (Utils[key] === 'wait') {
        await this.wait(song[i].t);
      } else {
        this.robot.setBuzzer(enums.robot.ports.board_buzzer, Utils[key], song[i].t);
        await this.wait(song[i].t);
      }
      // 播放完成后，把这首歌曲踢出队列
      if (i === song.length - 1) {
        this.playing = 0;
        this.touchEnable = true;
      }
    }
  }


  /**
   * 音调功能
   */
  async toneButtonTouchTap(key, e) {
    this.delayEvent(1,300);
    e.preventDefault();
    this.playing = [];  // 关闭歌曲
    this.robot.setBuzzer(enums.robot.ports.board_buzzer, Utils[key], 300);
  }

  /**
   * 手指按下键
   */
  keyTouchStart(key, e) {
    e.preventDefault;
    this.setState({
      currentKey: key
    })
  }

  /**
   * 手指松开
   */
  keyTouchEnd(key, e) {
    e.preventDefault;
    this.setState({
      currentKey: ''
    })
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
   * 关闭音乐
   */
  closeMusic() {
    this.sleepFlag = true;
    setTimeout( async() => {
      this.sleepFlag = false;
      this.touchEnable = true;
      this.playing = [];
    }, 500);
  }

  /**
   * 响应外部传入事件
   */
  async onconnect(temp){
    this.robot = robotManage.getCurrentRobot();
    this.sleepFlag = false;
    this.touchEnable = true;
    this.playing = [];
  }

  /**
   * 断开连接
   */
  ondisconnect() {
    this.sleepFlag = false;
    this.touchEnable = true;
    this.playing = [];
  }
  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type,data){
  }
  /**
   * 中断操作事件
   */
  onsleep() {
    this.closeMusic();
  }

  /**
   * 在被挂起的应用转到前台时触发:IOS电话打断不会触发
   */
  onlive() {
    this.sleepFlag = true;
    // document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';
  }
  
  async wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  }
}