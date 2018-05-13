import React from 'react'
import robotManage from '../../../services/robot/RobotManage'
import UIConvert from '../../../utils/UIConvert'

const modes = {
  edit: 0,
  ready: 1,
  play: 2
};

export default class PathMode extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: modes.edit
    };
    this.robot = null;
    this.sleepFlag = false;
    this.pathFlag = false;
    this.coeficient = Math.round(1 / 49.9875 * document.documentElement.clientWidth * 749.15) / 10000;
    this.aliveWidth = (screen.width > screen.height ? screen.width : screen.height) - 129 * this.coeficient;
  }

  componentDidMount() {
    this.robot = robotManage.getCurrentRobot();
    let rect = this.refs.board.getBoundingClientRect();
    this.refs.canvas.width = rect.width - 10;
    this.refs.canvas.height = rect.height - 10;
    this.refs.runCanvas.width = rect.width - 10;
    this.refs.runCanvas.height = rect.height - 10;
    this.context = this.refs.canvas.getContext('2d');
    this.runContext = this.refs.runCanvas.getContext('2d');
  }

  render() {
    let cleanButtonClassName = this.state.mode === modes.ready ? 'cleanButton' : 'cleanButton disable';
    let playButtonClassName = this.state.mode === modes.edit ? 'playButton disable' : 'playButton';
    let playButtonIcon = this.state.mode === modes.play ? 'fa fa-stop' : 'fa fa-play';
    return (
      <div className="pathModeView">
        <div className="buttons">
          <button className={cleanButtonClassName} onTouchTap={this.cleanButtonTouchTap.bind(this)}>
            <div className="fa fa-refresh"></div>
          </button>
          <button className={playButtonClassName} onTouchTap={this.playButtonTouchTap.bind(this)}>
            <div className={playButtonIcon}></div>
          </button>
        </div>
        <div ref="board" className="board">
          <canvas ref="canvas" className="canvas"></canvas>
          <canvas ref="runCanvas" className="canvas" onTouchStart={this.canvasTouchStart.bind(this)} onTouchMove={this.canvasTouchMove.bind(this)} onTouchEnd={this.canvasTouchEnd.bind(this)}></canvas>
        </div>
      </div>
    );
  }

  cleanButtonTouchTap() {
    if (this.state.mode === modes.ready) {
      this.context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      this.runContext.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      this.setState({
        mode: modes.edit
      });
    }
  }

  async playButtonTouchTap() {
    if (this.state.mode === modes.ready) {
      this.setState({
        mode: modes.play
      });
      this.drawRobot();
      // for (let i = 0; i < this.points.length; i++) {
      //   let point = this.points[i];
      //   this.drawRobot(point[0], point[1]);
      //   console.log(JSON.stringify(this.points))
      //   await this.wait();
      //   if (this.state.mode === modes.ready) {
      //     break;
      //   }
      // }
      this.setState({
        mode: modes.ready
      });
    } else if (this.state.mode === modes.play) {
      this.setState({
        mode: modes.ready
      });
    }
  }

  async wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    })
  }

  canvasTouchStart(e) {
    if (this.state.mode === modes.edit) {
      this.points = [];
      this.boardRect = this.refs.board.getBoundingClientRect();
      let touche = e.touches[0];
      let x = touche.clientX - this.boardRect.left;
      let y = touche.clientY - this.boardRect.top;
      if (this.pathFlag == false) {
        this.drawStart(x, y);
        this.pathFlag = false;
      }
      this.context.beginPath();
      this.context.lineWidth = 5;
      this.context.strokeStyle = '#fff';
      this.drawPoint(x, y);
    }
  }

  canvasTouchMove(e) {
    if (this.state.mode === modes.edit) {
      this.pathFlag = true;
      let touche = e.touches[0];
      let x = touche.clientX - this.boardRect.left;
      let y = touche.clientY - this.boardRect.top;
      x = x <= 0 ? 1 : x;
      x = x > this.aliveWidth ? this.aliveWidth : x;
      y = y <= 0 ? 1 : y
      if (y != 1)
        y = y > 260 * this.coeficient ? 260 * this.coeficient - .5 : y;
      this.drawPoint(x, y);
    }
  }

  canvasTouchEnd(e) {
    if (this.state.mode === modes.edit) {
      let touche = e.changedTouches[0];
      let x = touche.clientX - this.boardRect.left;
      let y = touche.clientY - this.boardRect.top;
      x = x <= 0 ? 1 : x;
      x = x > this.aliveWidth ? this.aliveWidth : x;
      y = y <= 0 ? 1 : y
      if (y != 1)
        y = y > 260 * this.coeficient ? 260 * this.coeficient - .5 : y;
      this.drawPoint(x, y);
      this.context.closePath();
      this.drawEnd(x, y);
      this.state.mode = modes.ready;
      this.setState({
        mode: modes.ready
      });
      if (!this.pathFlag) {
        this.cleanButtonTouchTap();
        return;
      }
      this.pathFlag = false;
    }
  }

  drawStart(x, y) {
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#fff';
    this.context.fillStyle = '#fff';
    this.context.arc(x, y, 10, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }

  drawEnd(x, y) {
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#fff';
    this.context.fillStyle = '#fff';
    this.context.arc(x, y, 10, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }

  drawPoint(x, y) {
    this.context.lineTo(x, y);
    this.context.stroke();
    this.points.push([x, y]);
  }

  async drawRobot() {
    const points = this.points;
    for (let i = 0; i < points.length; i++) {
      if (this.sleepFlag) {
        this.robot.setMove(false, 0, 0);
        break;
      } else {
        if (i > 0) {
          let x = points[i][0] - points[0][0];
          let y = points[i][1] - points[0][1];
          await this.setMoveByAngle(this.coordinateToAngle(y, x));
        }
        if (i === points.length - 1) {
          this.robot.setMove(false, 0, 0);
        }
      }
    }
  }

  // 坐标转角度绝对值
  coordinateToAngle(y, x) {
    const num = Math.atan2(y, x);
    return num * 180 / Math.PI;
  }


  async setMoveByAngle(angle) {
    if (angle >= -180 && angle < -150) {
      // 左
      this.setMove(true, 60, 90);
      await this.wait(200);
    } else if (angle >= -150 && angle < -120) {
      // 左前
      this.setMove(true, 70, 90);
      await this.wait(200);
    } else if (angle >= -120 && angle < -90) {
      // 前
      this.setMove(true, 90, 90);
      await this.wait(200);
    } else if (angle >= -90 && angle < -60) {
      // 前
      this.setMove(true, 90, 90);
      await this.wait(200);
    } else if (angle >= -60 && angle < -30) {
      // 右前
      this.setMove(true, 90, 70);
      await this.wait(200);
    } else if (angle >= -30 && angle < 0) {
      // 右
      this.setMove(true, 90, 60);
      await this.wait(200);
    } else if (angle >= 0 && angle < 30) {
      // 右
      this.setMove(true, -90, -60);
      await this.wait(200);
    } else if (angle >= 30 && angle < 60) {
      // 后右
      this.setMove(true, -90, -70);
      await this.wait(200);
    } else if (angle >= 60 && angle < 90) {
      // 后
      this.setMove(true, -90, -90);
      await this.wait(200);
    } else if (angle >= 90 && angle < 120) {
      // 后
      this.setMove(true, -90, -90);
      await this.wait(200);
    } else if (angle >= 120 && angle < 150) {
      // 后左
      this.setMove(true, -70, -90);
      await this.wait(200);
    } else if (angle >= 150 && angle <= 180) {
      // 左
      this.setMove(true, -60, -90);
      await this.wait(200);
    }
  }

  setMove(flag, left, right) {
    if (this.sleepFlag) {
      this.robot.setMove(false, 0, 0);
    } else {
      this.robot.setMove(flag, left, right);
    }
  }

  /**
   * 响应外部传入事件
   */
  async onconnect(temp) {
    this.robot = robotManage.getCurrentRobot();
    this.sleepFlag = false;
  }

  /**
   * 断开连接
   */
  ondisconnect() {
    this.sleepFlag = true;
  }

  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type, data) {

  }

  /**
   * 中断操作事件
   */
  onsleep() {
    this.sleepFlag = true;
    this.robot.setMove(true, 0, 0);
  }

  onlive() {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';  
    this.sleepFlag = false;
  }
}