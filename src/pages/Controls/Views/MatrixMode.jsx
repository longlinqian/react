import React from 'react'
import MatrixDraw from './MatrixDraw.jsx'
import MatrixIcon from './MatrixIcon.jsx'
import matrixData1 from '../../../config/matrixMode.js'
import robotManage from '../../../services/robot/RobotManage.js'

export default class MatrixMode extends React.Component {
  constructor(props) {
    super(props);
    this.matrixData =  matrixData1[0];
    this.state = {
      mode: '',
      rightClass: 'right_close',
      src0: this.matrixData.matrix[0].src1[0],
      src1: this.matrixData.matrix[1].src1[0],
      src2: this.matrixData.matrix[2].src1[0],
      src3: this.matrixData.matrix[3].src1[0],
      src4: this.matrixData.matrix[4].src1[0],
      src5: this.matrixData.matrix[5].src1[0]
    };
    this.sleepFlag = false;
    this.lastIndex = 0;
    this.index = 0;
    this.isSend = false;
    this.dataIndex = 0;
  }

  componentDidMount() {
    try {
      this.data = {
        src: 0, src1: [
          'res/images/matrix/01/1.png',
          'res/images/matrix/01/2.png'], action: [
            [0, 0, 0, 1280, 3968, 3968, 1792, 512, 0, 0],
            [0, 14560, 32240, 32752, 16352, 8128, 3968, 1792, 512, 0],
          ]
      };
    } catch (e) {
      console.error(e);
    }
    window.xxxx = this;
  }

  componentWillUnmount() {
    this.sleepFlag = false;
  }

  render() {
    return (
      <div className="matriModeModeView">
        <div className="containern">
          <div className="matrixcons">
            <MatrixIcon onShowMatrix={this.onShowMatrix.bind(this)} />
          </div>
          <div className="matrixI">
            <MatrixDraw ref="matrixDraw" onData={this.matrixPort} />
          </div>
        </div>
        <div className="matxFoot">
          <div className="left">
            <div className="leftContentor">
              {(() => {
                return this.matrixData.matrix.map((item, index) => {
                  return (
                    <div className="matrixItem" key={index} onTouchTap={this.selectData.bind(this, item, index)}>
                      <img src={this.state['src' + index]} className="matrixFoot" />
                    </div>
                  );
                })
              })()}
            </div>
          </div>
          <div className={this.state.rightClass} onTouchTap={this.switch.bind(this)}>
          </div>
        </div>
      </div>
    );
  }

  onShowMatrix(icon) {
    this.setMatrixDraw(icon);
  }

  setMatrixDraw(icon) {
    this.icon = icon;
    this.refs.matrixDraw.setPanel(icon);
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
      if (!this.ultrasonicPort && this.modalAlert) {
        await this.props.openDialog(0);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 响应外部传入事件
   */
  async onconnect(temp) {
    this.robot = robotManage.getCurrentRobot();
    window.robot = this.robot;
    try {
      this.ultrasonicPort = this.props.baseData.control.defaultPort[0];// this.ultrasonicPort !== -1 ? this.ultrasonicPort + 1 : this.ultrasonicPort;
      this.matrixPort = this.props.baseData.control.defaultPort[1];//this.matrixPort !== -1 ? this.matrixPort + 1 : this.matrixPort;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 开启或关闭动画
   */
  async switch() {
    if (this.state.rightClass == 'right_switch') {
      this.isSend = false;
      this.refs.matrixDraw.setPanel(this.icon);
      this.setState({
        rightClass: 'right_close'
      });
    } else {
      this.setState({
        rightClass: 'right_switch'
      });
      if(!this.sleepFlag){
        this.sleepFlag = true;
        this.pictureAction();
      }
      this.isSend = true;
    }
  }

  /**
   * 面板发送数据
   */
  async sendSwitch() {
    while (1) {
      for (let i = 0; i < this.data.action.length; i++) {
        if (!this.isSend) return;
        await this.sendData(this.data.action[i]);
        if (!this.isSend) return;
        await this.wait(1000);
      }
    }
  }

  /**
   * 选择动图
   */
  selectData(item, index) {
    this.data = item;
    this.index = index;
    if(!this.sleepFlag){
      this.sleepFlag = true;
      this.pictureAction();
    }
  }

  /**
   * 图片动起来
   */
  async pictureAction() {
    let index = this.index;
    while (this.sleepFlag) {
      if (this.isSend) {
        this.data = JSON.parse(JSON.stringify(matrixData1[0].matrix[index]));
        let temp = this.data.action[this.matrixData.matrix[index].src];
        this.onShowMatrix(temp);
      }
      await this.wait(600);
      if (index != this.index) {
        let item = this.matrixData.matrix[index];
        this.matrixData.matrix[index].src = 0;
        this.setState({
          src0: index == 0 ? item.src1[this.matrixData.matrix[index].src] : this.state.src0,
          src1: index == 1 ? item.src1[this.matrixData.matrix[index].src] : this.state.src1,
          src2: index == 2 ? item.src1[this.matrixData.matrix[index].src] : this.state.src2,
          src3: index == 3 ? item.src1[this.matrixData.matrix[index].src] : this.state.src3,
          src4: index == 4 ? item.src1[this.matrixData.matrix[index].src] : this.state.src4,
          src5: index == 5 ? item.src1[this.matrixData.matrix[index].src] : this.state.src5,
        });
        index = this.index;
      }
      let item = this.matrixData.matrix[index];
      this.matrixData.matrix[index].src++;
      this.matrixData.matrix[index].src = this.matrixData.matrix[index].src % this.matrixData.matrix[index].src1.length;
      this.setState({
        src0: index == 0 ? item.src1[this.matrixData.matrix[index].src] : this.state.src0,
        src1: index == 1 ? item.src1[this.matrixData.matrix[index].src] : this.state.src1,
        src2: index == 2 ? item.src1[this.matrixData.matrix[index].src] : this.state.src2,
        src3: index == 3 ? item.src1[this.matrixData.matrix[index].src] : this.state.src3,
        src4: index == 4 ? item.src1[this.matrixData.matrix[index].src] : this.state.src4,
        src5: index == 5 ? item.src1[this.matrixData.matrix[index].src] : this.state.src5,
      });
      // await this.wait(400);
    }
  }

  /**
   * 发送数据
   */
  async sendData(data) {
    if (!this.robot) {
      this.robot = robotManage.getCurrentRobot();
    }
    if (!this.robot) {
      return;
    }
    if (!this.matrixPort) {
      await this.checkPort();
    }
    this.robot.setMatrix(this.matrixPort, [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9]]);
  }

  /**
   * 断开连接
   */
  ondisconnect() {
    this.sleepFlag = false;
  }

  /**
   * 中断操作事件
   */
  onsleep() {
    this.sleepFlag = false;
  }

  /**
   * 统一更新的数据事件
   * @param type 更新类型：1为 8个端口值；
   * @param data
   */
  onUpdate(type, data) {
    if (type === 1) {
      const userInterfaceInfo = data;
      this.ultrasonicPort = userInterfaceInfo.indexOf(2);
      this.ultrasonicPort = this.ultrasonicPort !== -1 ? this.ultrasonicPort + 1 : this.props.baseData.control.defaultPort[0];
      this.matrixPort = userInterfaceInfo.indexOf(3);
      this.matrixPort = this.matrixPort !== -1 ? this.matrixPort + 1 : this.props.baseData.control.defaultPort[1];
    }
  }
  /**
   * 在被挂起的应用转到前台时触发:IOS电话打断不会触发
   */
  onlive(i) {
    if(i==1){
      this.sleepFlag = true;
      return;}
    if(!this.sleepFlag){
      this.sleepFlag = true;
      this.pictureAction();
    }
    this.robot = robotManage.getCurrentRobot();
    // document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';
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