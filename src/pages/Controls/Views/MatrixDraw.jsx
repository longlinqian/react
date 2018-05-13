import React from 'react'
import robotManage from '../../../services/robot/RobotManage.js'
import enums from '../../../enums.js'
import Common from '../../../utils/Common'

/**
 * 矩阵绘制工具
 */
export default class MatrixDraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
    this.activity = {
      enable: false,
      default: false
    };
    this.data=null;
    this.axusx = Math.round(1/49.9875 * 4 * document.documentElement.clientWidth * .335880059970015);
    this.width=this.axusx*13.93;
    this.height=this.axusx*10.08;
    this.matrixPort =null;      
    this.rows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.robot = robotManage.getCurrentRobot();
  }
  
  componentDidMount() {
    if (this.state.isShow) {
      this.draw();
    }
  }

  render() {
    if (this.state.isShow) {
      return (
        <div className="matrixDraw">
          <div className="mask"></div>
          <div className="container" style={{'width':(this.width+3)+'px',height:this.height+'px'}}>
            <div className="boardBox">
              <canvas ref="board" width={this.width+5} height={this.height+4} onTouchStart={this.boardTouchStart.bind(this)} onTouchEnd={this.boardTouchEnd.bind(this)} onTouchMove={this.boardTouchMove.bind(this)} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  boardTouchStart(e) {
    e.stopPropagation();
    let touche = e.touches[0];
    let indexs = this.findIndexs(touche.clientX, touche.clientY);
    if (indexs) {
      let selected = this.getValue(indexs.row, indexs.col);
      this.activity.enable = true;
      this.activity.default = !selected;
      this.setValue(indexs.row, indexs.col, this.activity.default);
      this.draw();
    } else {
      this.activity.enable = false;
    }
  }

  boardTouchEnd(e) {
    e.stopPropagation();
    this.activity.enable = false;
    this.sendData(this.rows);
  }

  boardTouchMove(e) {
    e.stopPropagation();
    if (this.activity.enable) {
      let touche = e.touches[0];
      let indexs = this.findIndexs(touche.clientX, touche.clientY);
      if (indexs) {
       let result  = this.setValue(indexs.row, indexs.col, this.activity.default);
       if(result){
        this.draw();
       }
      }
    }
  }

  okButtonTouchTap(e) {
    this.done(this.rows);
    this.close();
  }

  /**
   * 绘制矩阵面板
   */
  draw() {
    let context = this.refs.board.getContext("2d");
    console.log(this.rows);
    this.rows.forEach((row, rowIndex) => {
      let cols = [];
      for (let i = 15; i > 1; i--) {
        cols.push((1 << i & row) >> i);
      }
      cols.forEach((col, colIndex) => {
        if (col) {
          context.fillStyle = "#1c85fe";
          context.fillRect(colIndex * this.axusx, rowIndex *this.axusx, this.axusx-1, this.axusx-1);
        } else {
          context.fillStyle = "#171724";
          context.fillRect(colIndex *this.axusx, rowIndex *this.axusx, this.axusx-1, this.axusx-1);
        }
      });
     
    });
  }

  /**
   * 获取矩阵面板特定点位状态
   */
  getValue(row, col) {
    let value = this.rows[row];
    return (1 << (15 - col) & value) >> (15 - col);
  }

  /**
   * 设置矩阵面板特定点位状态
   */
  setValue(row, col, selected) {
    let value = this.rows[row];
    let newValue = selected ? (1 << (15 - col)) | value : ~(1 << (15 - col)) & value;
    if (selected) {
      this.rows[row] = (1 << (15 - col)) | value;
    } else {
      this.rows[row] = ~(1 << (15 - col)) & value;
    }
    if(value == this.rows[row]){
      return false;
    }
    return true;
  }

  /**
   * 根据屏幕特定坐标获取矩阵面板中的特定点位索引
   */
  findIndexs(x, y) {
    let rect = this.refs.board.getBoundingClientRect();
    let left = x - rect.left;
    let top = y - rect.top;
    if (left > -1 && top > -1) {
      let row = Math.floor(top / (this.axusx));
      let col = Math.floor(left / (this.axusx));
      if (row < 10 && col < 14) {
        return {
          row: row,
          col: col
        }
      }
    }
    return undefined;
  }

  /**
   * 显示面板
   */
  show(data, done) {
    this.done = done;
    this.rows = data;
    this.setState({
      isShow: true
    });
  }

/**
 * 设置点阵版
 * @param {*} data 
 */
  async setPanel(data){
    if(data == this.data)return;
    this.rows = data;
    this.data = data;
    this.draw();
    this.setState({
      isShow: true
    });
    this.sendData(this.rows);
  }

  /**
   * 发送数据
   */
  async sendData(data){
    if(!this.robot){
      this.robot = robotManage.getCurrentRobot();    
      }
      if(!this.robot){
        return ;
        }
     if(this.props.onData){
      this.matrixPort = this.props.onData;
     }
    if(!this.matrixPort ){
      await this.checkPort();
    }
    this.robot.setMatrix(this.matrixPort, [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9]]);
  }

  /**
   * 关闭面板
   */
  close() {
    this.setState({
      isShow: false
    });
  }

  /**
   * 应用端口
   */
  async checkPort() {
    const robot = this.robot;
    try {
      const userInterfaceInfo = await robot.getUserInterfaceInfo();
      this.matrixPort = userInterfaceInfo.indexOf(3);
      this.matrixPort = this.matrixPort !== -1 ? this.matrixPort + 1 : this.matrixPort;
    } catch(e) {
      console.error(e);
    }
  }

    /**
   * 响应外部传入事件
   */
  onconnect(temp) {
    this.robot = robotManage.getCurrentRobot();
  }
}