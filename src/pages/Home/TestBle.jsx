import React from 'react'
import robotManage from '../../services/robot/RobotManage'
import "../../sass/home/TestBle.scss"

import enums from '../../enums'
/**
 * 测试固件升级：
 */
class TsPageConnectMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logList: ["log:"],
      waitConnectionList: [],
      connectionList: [],
      robotA: null,
    }
    this.initLoad(); //监听所有数据；
    this.flagUpdate = false;
    //this.urlHex = 'http://192.168.0.171:8106/test/data/up_hex.php'; //31.121 ; 0.171
    this.urlHex = 'http://119.23.232.182:8080/update_0.0.1.bin';
    //this.urlHex = 'http://localhost:8106/test/data/update_0.0.1.bin' ; //up_hex.bin';
    this.urlVersion = 'http://119.23.232.182:8080/version.json';//31.121 ; 0.171
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  //1.scan
  async scan() {
    this.log('扫描事件：开始');
    const b2 = await robotManage.bleIsEnabled();
    this.log('蓝牙状态：' + b2 + '【注意要打开蓝牙和定位】');
    const scanList = await robotManage.getScanList();
    const ls = robotManage.getDeviceList(scanList);
    this.log("扫描结果:" + JSON.stringify(ls));
    if (!ls) return;
    this.setState({
      waitConnectionList: ls
    });
  }

  //2.conn
  async connectDevice(deviceId) {
    this.log('准备连接设备:' + deviceId);
    const robot = robotManage.getRobotById(deviceId, robotManage.getWaitConnectionList());
    let flag = await robotManage.connectRobot(robot);
    this.log('连接设备状态:' + flag);
    if (!flag)return;

    let waitConnectionList = robotManage.getDeviceList(robotManage.getWaitConnectionList());
    let connectionList = robotManage.getDeviceList(robotManage.getConnectionList());

    if (this.state.robotA == null) {
      //robot.regListenOnDataComplete('test1',this.AutoCallDelegate.bind(this));
      robot.setListen(this.listenSendData.bind(this), this.listenOnData.bind(this));
      this.setState({
        connectionList: connectionList,
        waitConnectionList: waitConnectionList,
        robotA: robot
      })
    }
  }

  setCurrentDevice(deviceId) {
    this.disconnect2(deviceId);
  }

  //10.write
  //11.write self
  async writeDeviceTest(i) {
    let st = '';
    if (i == 1) {
      st = (this.refs.fdb1.value) + '';

    }
    console.log('设备' + i + 'write:' + st);
    this.log('设备' + i + '准备写数据：' + st);
    let buffer = new Buffer(st, "hex");
    //this.stringToBytes(st);
    if (i == 1 && this.state.robotA) {
      let rs = await this.state.robotA.sendData(buffer);
      this.log('A写数据结果:' + rs);
    }
  }

//12
  async disconnect(i) {
    this.log('准备断开连接：' + i);
    let flag = false;
    if (i == 1 && this.state.robotA) {
      //flag = await this.state.robotA.disconnect();
      let robot = this.state.robotA;
      //robot.removeListenOnDataComplete('test1');
      flag = await robotManage.disconnectRobot(robot);
      this.setState({
        robotA: null,
        waitConnectionList: robotManage.getDeviceList(robotManage.getWaitConnectionList()),
        connectionList: robotManage.getDeviceList(robotManage.getConnectionList())
      });
    }
    this.log('断开连接结果:' + flag);
  }

  async disconnect2(deviceID) {
    const robot = robotManage.getRobotById(deviceID, robotManage.getConnectionList());
    let ii = 0;
    if (this.state.robotA) {
      let id = this.state.robotA.getBleInfo().id;
      if (id == deviceID) {
        ii = 1;
        this.disconnect(ii);
        return;
      }
    }
  }

//13
  listenSendData(buffer) {
    if(this.flagUpdate)return;
    this.log('onSend=' + buffer.toString('hex'));
  }

  listenOnData(buffer) {
    if(this.flagUpdate)return;
    this.log('onBack=' + buffer.toString('hex'));
  }

  AutoCallDelegate(buffer) {
    this.log('onDelegate=' + buffer.toString('hex'));
  }

  sendDataBack(buffer) {
    this.log('onSend=' + buffer.toString('hex'));
  }

  goHome(){
    this.props.history.push('/home');
  }

  async test() {
    //this.testListen();
    //let data = await this.getVersionFile(this.urlVersion);
    //this.log('test::=='+JSON.stringify( data) );

    let data = await  this.readHexFile(this.urlHex);
    console.log(data);

    //this.teestFile();

  }

  testDevList() {
    var d1 = {"name": "Nordic_Blinky2", "id": "F0:DC:DF:95:AF:7D", "advertising": {}, "rssi": -66};
    var d2 = {"name": "XMCTD2", "id": "F82441E98A16:F8:24:41:E9:8A:16", "advertising": {}, "rssi": -80};
    var d3 = {"name": "XMCTD3", "id": "F3:24:41:E9:8A:16", "advertising": {}, "rssi": -90};
    var d4 = {"name": "XMCTD4", "id": "F4:24:41:E9:8A:16", "advertising": {}, "rssi": -90};
    let vv = this.state.waitConnectionList;
    vv.unshift(d1);
    vv.unshift(d2);
    vv.unshift(d3);
    vv.unshift(d4);
    this.setState({
      waitConnectionList: vv,
    })
  }

  testListen() {
    let st = '524207000200a3';
    let buffer = new Buffer(st, "hex");
    let robotId = '';
    robotManage.doListenOnDataComplete(buffer, robotId, 1);
  }

  //14
  bleButtonTest(i) {
    if (!this.state.robotA)return;
    if (i == 1) {
      this.ble_getHardware();
      return;
    }
    if (i === 2) {
      this.ble_setLed();
      return;
    }
    if (i === 3) {
      this.ble_setMotor1();
      return;
    }
    if (i === 4) {
      this.ble_setMotor2();
      return;
    }
    if (i === 5) {
      this.ble_setMotor3();
      return;
    }

    if (i === 6) {
      this.ble_setUltrasonicLight();
      return;
    }
    if (i === 7) {
      this.ble_setBuzzer();
      return;
    }
    if (i === 8) {
      this.ble_setMatrix1();
      return;
    }
    if (i === 9) {
      this.ble_setMatrix2();
      return;
    }

    if (i === 10) {
      this.ble_setLowBatteryBack0();
      return;
    }
    if (i === 11) {
      this.ble_setLowBatteryBack1();
      return;
    }
    if (i === 12) {
      this.ble_setClickButton0();
      return;
    }
    if (i === 13) {
      this.ble_setClickButton1();
      return;
    }
    if (i === 14) {
      this.ble_getUltrasonicValue();
      return;
    }
    if (i === 15) {
      this.ble_getButtonInfo();
      return;
    }
    if(i === 16){
      this.ble_lineinspectionInfo();
    }
    if(i === 17){
      this.ble_setServo();
    }
    if(i === 18){
      this.ble_getTemperatureHumidity();
    }
    if(i === 19){
      this.ble_getlightvalue();
    }
    if(i === 20){
      this.ble_getvoicevalue();
    }
    if(i === 21){
      this.ble_setOutEngineer();
    }
  }

//15
  async roboState() {
    if (!this.state.robotA)return;
    let flag = await this.state.robotA.isConnected();
    this.log('roboState:状态:' + flag);
  }


  async ble_getHardware() {
    if (this.delayEvent(1, 1000))return;
    this.log('ble_getHardware::开始');
    let result = await this.state.robotA.getHardware();
    this.logBuffer('ble_getHardware:结果=', result);
  }

  async ble_setLed() {
    if (this.delayEvent(2, 1000))return;
    this.log('ble_setLed::开始');
    let r = this.random(0, 255);
    let b = this.random(0, 255);
    let g = this.random(0, 255);
    try {
      this.state.robotA.setLed(enums.robot.ports.board_led_1, r, g, b);
      let result = await this.state.robotA.setLed(enums.robot.ports.board_led_2, g, b, r);
      this.log('ble_setLed:结果=' + result);
    } catch (error) {
    }
  }

  async ble_setMotor1() {
    if (this.delayEvent(3, 1000))return;
    this.log('ble_setMotor1::开始');
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m1, 90);
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m2, 90);
    this.log('ble_setMotor1::结果');
  }

  async ble_setMotor2() {
    if (this.delayEvent(4, 1000))return;
    this.log('ble_setMotor2::开始');
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m1, -90);
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m2, -90);
    this.log('ble_setMotor2::结果');
  }

  async ble_setMotor3() {
    if (this.delayEvent(5, 1000))return;
    this.log('ble_setMotor3::开始');
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m1, 0);
    this.state.robotA.setMotor(enums.robot.ports.board_motor_m2, 0);
    this.log('ble_setMotor3::结果');
  }

  async ble_setUltrasonicLight() {
    if (this.delayEvent(6, 1000))return;
    this.log('ble_setUltrasonicLight::开始');
    let r = this.random(0, 255);
    let b = this.random(0, 255);
    let g = this.random(0, 255);
    try {
      let result = await this.state.robotA.setUltrasonicLight(enums.robot.ports.interface3, r, g, b);
      this.log('ble_setUltrasonicLight:结果=' + result);
    } catch (error) {
    }
  }

  async ble_setBuzzer() {
    if (this.delayEvent(7, 1000))return;
    this.log('ble_setBuzzer::开始');
    let result = await this.state.robotA.setBuzzer(enums.robot.ports.board_buzzer, 1322, 1000);
    //if(result)this.logBuffer(result);
    console.log('ble_setBuzzer:结果=' + result);
  }

  async ble_setMatrix1() {
    if (this.delayEvent(8, 1000))return;
    this.log('ble_setMatrix1::开始');
    let result = await this.state.robotA.setMatrix(enums.robot.ports.interface2, [0, 6240, 6240, 0, 0, 4128, 2112, 1920, 0, 0]);
    this.log('ble_setMatrix1:结果=' + result);
  }

  async ble_setMatrix2() {
    if (this.delayEvent(9, 1000))return;
    this.log('ble_setMatrix2::开始');
    let result = await this.state.robotA.setMatrix(enums.robot.ports.interface2, [0, 6240, 6240, 0, 0, 1920, 2112, 4128, 0, 0]);
    console.log('ble_setMatrix2:结果=' + result);
  }

  async ble_setLowBatteryBack0() {
    if (this.delayEvent(10, 1000))return;
    this.log('ble_setLowBatteryBack0::开始');
    let result = await this.state.robotA.setLowBatteryBack(enums.robot.ports.board_power, 0);
    this.log('ble_setLowBatteryBack0:结果=' + result);
  }

  async ble_setLowBatteryBack1() {
    if (this.delayEvent(11, 1000))return;
    this.log('ble_setLowBatteryBack1::开始');
    let result = await this.state.robotA.setLowBatteryBack(enums.robot.ports.board_power, 1);
    this.log('ble_setLowBatteryBack1:结果=' + result);
  }

  async ble_setClickButton0() {
    if (this.delayEvent(12, 1000))return;
    this.log('ble_setClickButton0::开始');
    let result = await this.state.robotA.setClickButton(enums.robot.ports.board_button, 0);
    this.log('ble_setClickButton0:结果=' + result);
  }

  async ble_setClickButton1() {
    if (this.delayEvent(13, 1000))return;
    this.log('ble_setClickButton1::开始');
    let result = await this.state.robotA.setClickButton(enums.robot.ports.board_button, 1);
    this.log('ble_setClickButton1:结果=' + result);
  }

  async ble_getUltrasonicValue() {
    if (this.delayEvent(14, 1000))return;
    this.log('ble_getUltrasonicValue::开始');
    let result = await this.state.robotA.getUltrasonicValue(enums.robot.ports.interface3);
    this.log('ble_getUltrasonicValue:结果=:'+ result );
    //this.logBuffer('ble_getUltrasonicValue:结果=', result);
  }

  async ble_getButtonInfo() {
    if (this.delayEvent(15, 1000))return;
    this.log('ble_getButtonInfo::开始');
    let result = await this.state.robotA.getButtonInfo(enums.robot.ports.board_button);
    this.logBuffer('ble_getButtonInfo:结果:', result);
  }

  async ble_lineinspectionInfo() {
    if (this.delayEvent(16, 1000))return;
    this.log('ble_lineinspectionInfo::开始');
    let result = await this.state.robotA.getLinePatrolValue(parseInt(this.refs.fdb2.value));
    this.logBuffer('ble_lineinspectionInfo:结果:', result);
  }

  async ble_setServo() {
    if (this.delayEvent(17, 1000))return;
    this.log('ble_setServo::开始');
    let result = await this.state.robotA.setSteeringEngine(enums.robot.ports.interface4, parseInt(this.refs.fdb2.value), parseInt(this.refs.fdb3.value),parseInt(this.refs.fdb4.value));
    this.logBuffer('ble_setServo:结果:', result);
  }

  async ble_getlightvalue() {
    if (this.delayEvent(19, 1000))return;
    this.log('ble_getlightvalue::开始');
    let result = await this.state.robotA.getLightSensorValue(parseInt(this.refs.fdb2.value));
    this.logBuffer('ble_getlightvalue:结果:', result);
  }

  async ble_getvoicevalue() {
    if (this.delayEvent(20, 1000))return;
    this.log('ble_getvoicevalue::开始'+this.refs.fdb2.value);
    let result = await this.state.robotA.getVoiceSensorValue(parseInt(this.refs.fdb2.value));
    this.logBuffer('ble_getvoicevalue:结果:', result);
  }

  async ble_getTemperatureHumidity(){
    if (this.delayEvent(20, 1000))return;
    this.log('ble_getvoicevalue::开始');
    let result = await this.state.robotA.getTemperatureHumidityValue(parseInt(this.refs.fdb2.value));
    this.logBuffer('ble_getvoicevalue:结果:', result);
  }

  async ble_setOutEngineer(){
    if (this.delayEvent(20, 1000))return;
    this.log('ble_getvoicevalue::开始');
    let value3 = 0; 
    if(this.refs.fdb3.value < 0){
      value3 = -parseInt(-this.refs.fdb3.value);
    }else{
      value3 = parseInt(this.refs.fdb3.value);
    }
    let result = await this.state.robotA.setExternalMotor(parseInt(this.refs.fdb2.value),value3);
    this.logBuffer('ble_getvoicevalue:结果:', result);
  }

  //tool
  clearLog() {
    this.setState({
      logList: []
    })
  }

  render() {
    let robotIDA = this.state.robotA ? this.state.robotA.getBleInfo().id : '';

    var repos = this.state.logList;
    var repoList = repos.map((repo, index) => {
      return (
        <div key={index}>{index}.{repo}</div>
      );
    });

    var leftList = this.state.waitConnectionList.map((item, index) => {
      return (
        <div className="tsDevItem" key={index}
             onClick={this.connectDevice.bind(this, (item.id))}>{item.name} - {item.id}</div>
      );
    });

    var rightList = this.state.connectionList.map((item, index) => {
      return (
        <div className="tsDevItem" key={index}
             onClick={this.setCurrentDevice.bind(this, (item.id))}>{item.name}-{item.id}</div>
      );
    });

    return (
      <div className="tsPageConnectionMore">
        <div className="testHeader">测试连接机器人:</div>
        <div >
          <input type='button' value='开始扫描' className="ts_bt1" onClick={this.scan.bind(this)} />
          <input type='button' value='清理日志' className="ts_bt1" onClick={this.clearLog.bind(this)} />
          <input type="button" value="固件升级" className="ts_bt1" onClick={this.ble_setHardwareUpdate.bind(this)} />
          <input type="button" value="Home" className="ts_bt1" onClick={this.goHome.bind(this)} />
          <input type="button" value="Test" className="ts_bt1" onClick={this.test.bind(this)} />
          ID:{robotIDA}
        </div>
        <div>
          16进:<input type="text" ref="fdb1" defaultValue="52420602019d" className="ts_input" />
          端口:<input type="text" ref="fdb2" defaultValue="1" className="ts_input1" />
          转速1:<input type="text" ref="fdb3" defaultValue="90" className="ts_input1" />
          转速2:<input type="text" ref="fdb4" defaultValue="180" className="ts_input1" />
          <input type="button" value="发送1" className="ts_bt1" onClick={this.writeDeviceTest.bind(this, 1)} />
          <input type='button' value='断开' className="ts_bt1" onClick={this.disconnect.bind(this, 1)} />
          <input type='button' value='状态' className="ts_bt1" onClick={this.roboState.bind(this)} />

        </div>
        <div >
          <input type='button' value='硬件信息' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 1)} />
          <input type='button' value='LED' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 2)} />
          <input type='button' value='电机前进' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 3)} />
          <input type='button' value='电机后退' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 4)} />
          <input type='button' value='电机停' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 5)} />
          <input type='button' value='超声波灯光' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 6)} />
          <input type='button' value='蜂鸣器' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 7)} />
          <input type='button' value='点阵屏1' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 8)} />
          <input type='button' value='点阵屏2' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 9)} />

          <input type='button' value='低电压0' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 10)} />
          <input type='button' value='低电压1' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 11)} />

          <input type='button' value='按键上报0' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 12)} />
          <input type='button' value='按键上报1' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 13)} />
          <input type='button' value='超声波数值' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 14)} />

          <input type='button' value='按钮信息' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 15)} />
          <input type='button' value='获取巡线数值' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 16)} />
          <input type='button' value='设置舵机' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 17)} />
          <input type='button' value='获取温湿度' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 18)} />
          <input type='button' value='获取光线数值' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 19)} />
          <input type='button' value='获取声音数值' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 20)} />
          <input type='button' value='设置外置电机' className="ts_bt1" onClick={this.bleButtonTest.bind(this, 21)} />


        </div>


        <div>
          日志打印：新的在前面：
        </div>
        <div className="tsLogList">
          {repoList }
        </div>
        <div>
          扫描的设备：
        </div>
        <div className="devicelist">
          <div className="leftList">
            { leftList }
          </div>
          <div className="rightList">
            { rightList }
          </div>
        </div>
      </div>
    );
  }

  random(Min, Max) {
    const Range = Max - Min;
    const Rand = Math.random();
    const num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  }

  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }

  logBuffer(tit, data) {
    let buffer = new Buffer(new Uint8Array(data));
    this.log(tit + '=' + buffer.toString('hex'));
  }

  log(v) {
    let vv = this.state.logList;
    vv.unshift(v);
    this.setState({
      logList: vv
    })
    console.log(v);
  }

  stringToBytes(string) {
    let array = new Uint8Array(string.length);
    for (let i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  bytesToLog(buffer) {
    let array = new Uint8Array(buffer);
    let string = "";
    for(let i=0;i<array.length;i++){
      string+=array[i];
    }
    return string;
  }

  initLoad() {
    robotManage.regListenOnDataComplete('container', this.listenOnDataComplete.bind(this));
  }

  listenOnDataComplete(buffer, robotId) {
    if(this.flagUpdate)return;
    this.logBuffer(robotId + '包结果：', buffer);
  }


// 固件升级：：
  async ble_setHardwareUpdate() {
    if (this.delayEvent(16, 1000))return;
    let time0 = (new Date()).getTime();
    this.log('ble_setHardwareUpdate::开始');

    //发送开始的命令
    //let result = await this.state.robotA.setHardwareUpdate(1);
    //this.log('ble_setHardwareUpdate:发送升级命令,结果=' + result);

    //let url = './res/demo/RB_TM1680_example.ino.text';
    let url = this.urlHex;
    this.log('ble_setHardwareUpdate:读hex文件');
    let buffer = await this.readHexFile(url);
    if (!buffer) {
      this.log('ble_setHardwareUpdate:读取hex文件有误！');
      return ;
    }
    let timeF1 = (new Date()).getTime();
    this.log('处理文件，共花时间(毫秒)：' + (timeF1 - time0));

    this.flagUpdate = true;//不打日志；
    //let flag = this.sendFileToBle(buffer, this.state.robotA);
    let flag = await this.sendFileToBle(buffer, this.state.robotA);
    this.flagUpdate = false;
    if (flag >= 1) {
      this.log('ble_setHardwareUpdate:发送完成！');
      let time1 = (new Date()).getTime();
      this.log('发送'+flag+' 个包，共花时间(毫秒)：' + (time1 - time0));
      return;
    }
    this.log('ble_setHardwareUpdate:发送有误！=' + flag);
  }

  async teestFile(){
    let string ='xcxcxcvcvcvcvcvcvcvcvcdfdfdfd';
    let butter1 = this.stringToBytes(string);
    console.log(butter1);
    console.log('-------1-----------');
    console.log(new Buffer(butter1));
    console.log('=============== 2 ==============')
    let buffer2 = await this.readHexFile(this.urlHex);
    //console.log(buffer2);
}


  /**
   //let responseText = await response.text();
   //let buffer = new Buffer(this.stringToBytes(responseText));
   //let buffer2 = new Uint8Array(blob);
   //let buffer = new Buffer(buffer2);
   */
  /**
   * 读取升级的hex文件
   * 返回  Uint8Array.buffer
   */
  async readHexFile(url) {
    try {
      console.log('开始读文件：22==' + url);
      let response = await fetch(url);
      let blob = await response.blob();// blob()
      // Blob -> ArrayBuffer
      let arrayBuffer = await this.blobToButter(blob);
      let buffer = new Buffer(arrayBuffer);
      //console.log('------- readHexFile ---');
      //console.log( buffer);
      return buffer ;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  blobToButter(blob) {
    return new Promise((resolve, res) => {
      try {
        let reader = new FileReader();
        reader.onload = (e)=>{
          let arrayBuffer = reader.result;
          //console.log(arrayBuffer);
          resolve(arrayBuffer);
        }
        reader.readAsArrayBuffer(blob);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async readHexFile99(url) {
    try {
      console.log('开始读文件：22==' + url);
      let response = await fetch(url);
      let blob = await response.blob();// blob()

      let reader = new FileReader();
      reader.onload = (e)=>{
        console.log(reader);
        console.log(e);
      }

      let arrayBuffer = reader.readAsArrayBuffer(blob);
      return blob;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  /**
   * 发送hex文件到蓝牙
   */
  //sendFileToBle(buffer, robot) {
  async sendFileToBle(buffer, robot) {
    let time0 = (new Date()).getTime();
    let pkgSize = 20;
    let number = buffer.length / pkgSize;
    if (buffer.length % pkgSize > 0) number = parseInt(number) + 1;
    this.log('准备好了，共要发送包： ' + number);
    let start =0, size=0 ,end=0 ;
    let testString ='';
    let imax = 9 ;
    for (let i = 0; i < number; i++) {
       start = i * pkgSize;
       size = buffer.length - start;
       end = size >= pkgSize ? pkgSize * (i + 1) : pkgSize * (i) + size;
      let bufferItem = Buffer.from(buffer.slice(start, end)); // Buffer.from((buffer.slice(start, end)))
      //let progressValue = (i + 1) * 100 / number;
      //console.log(i + '--' + '=准备发送=' + bufferItem.toString('hex'));
      //testString +=  bufferItem.toString('hex') ;

      //发包到ble
      robot.writeWithoutResponse(bufferItem.buffer);

      //let reult = await robot.sendData(bufferItem.buffer);
      //let reult = true;
      // if (!reult) {
      //   return (-i);
      // }

      //testString = testString + this.bytesToString(bufferItem.buffer) ;
      //if(imax <= i) break;
      await this.wait(5);//模拟等待
    }
    //console.log(testString);
    //this.log('发送完成，共发送包： ' + number);
    let time1 = (new Date()).getTime();
    console.log('AA发送'+number+' 个包，共花时间(毫秒)：' + (time1 - time0));
    return number ;
  }

  async wait(time) {
    return new Promise((a, b) => {
      setTimeout(() => {
        a();
      }, time);
    })
  }

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  /**
   * 取系统的最新版本
   */
  async getVersionFile(url) {
    try {
      console.log('responseText url='+url);
      let response = await fetch(url);
      let responseText = await response.text();
      //console.log('responseText=='+ responseText );
      //let responseJson = await response.text();
      //console.log(responseText);
      //console.log('responseText=='+ (responseJson ) );
      return JSON.parse(responseText);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

}

export default TsPageConnectMore ;

