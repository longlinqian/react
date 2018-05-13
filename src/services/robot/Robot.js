import OrderManager from './order/OrderManager'
import protocol from './Protocol'
import enums from '../../enums'
const actions = enums.robot.actions;

/**
 * 单个机器人
 */
class Robot {

  constructor() {
    this.orderManager = new OrderManager();
    this.bleInfo = {name: '', id: '', rssi: ''};
    this.uuid = {
      server: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
      read: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
      write: "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
    };
    this.startNotificationFlag = false;
    this.listenOnData = undefined;
    this.listenSendData = undefined;
    this.rssiInterval = undefined;
    this.rssiCallBack = undefined;
    this.flagBackData = undefined;
    this.startNotificationInterval = undefined;
    this.hardWareInfo ={hardWare:[],motorInfo:[],userPort:[]}
  }

  /**
   * @summary 设置机器人的蓝牙设备信息
   */
  setBleInfo(device) {
    this.bleInfo = device;
  }

  /**
   * @summary 获取机器人的蓝牙设备信息
   */
  getBleInfo() {
    return this.bleInfo;
  }

  /**
   * @summary 连接机器人
   * @return {bool} 是否连接成功
   * true:成功
   * @example
   * const success = await robot.connect();
   */
  connect() {
    return new Promise((resolve, res) => {
      try {
        ble.connect(this.bleInfo.id, () => {
          this.flagBackData = undefined;
          this.startNotification(this.onData.bind(this));
          resolve(true);
        }, () => {
          resolve(false);
        });
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  /**
   * @summary 与已连接的机器人断开连接
   * @return {bool} 是否断开成功
   * @example
   * const success = await robot.disconnect();
   */
  disconnect() {
    return new Promise((resolve, res) => {
      try {
        this.disconnectRelation();
        ble.disconnect(this.bleInfo.id, function () {
          resolve(true);
        }, function () {
          resolve(false);
        });
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  /**
   * @summary 断开连接关联事件
   * @ignore
   */
  disconnectRelation() {
    //this.stopNotification();
    this.flagBackData = undefined;
    this.startNotificationFlag = false;
    this.listenSendData = undefined;
    this.listenOnData = undefined;
    if (this.rssiInterval) {
      clearInterval(this.rssiInterval);
      this.rssiInterval = undefined;
    }
    if (this.startNotificationInterval) {
      clearInterval(this.startNotificationInterval);
      this.startNotificationInterval = undefined;
    }
    if (this.rssiCallBack) {
      this.rssiCallBack(undefined);
      this.rssiCallBack = undefined;
    }
  }

  /**
   * @summary 实时信号
   * @example robot.readRSSI(callBack);
   */
  async readRSSI(callBack) {
    this.rssiCallBack = callBack;
    if (this.rssiInterval) {
      return;
    }
    let deviceId = this.bleInfo.id;
    await this.wait(1000);
    this.rssiInterval = setInterval(() => {
      try {
        if (this.startNotificationFlag) {
          ble.readRSSI(deviceId, (rssi) => {
            if (this.rssiCallBack) {
              this.rssiCallBack(rssi);
            }
          }, (error) => {
            console.error(error);
            if (this.rssiCallBack) {
              this.rssiCallBack(undefined);
            }
          });
        } else {
          if (this.rssiCallBack) {
            this.rssiCallBack(undefined);
          }
        }
      } catch (error) {
      }
    }, 5000);
  }

  /**
   * @summary 向已连接的机器人发送数据
   * @ignore
   * @param {byte[]} buffer 二进制数据,必填
   * @return {bool} 是否发送成功
   * @example
   * let ay = new Uint8Array(1);
   * ay[0]= 17 ;
   * const success = await robot.write(ay.buffer);
   */
  write(buffer) {
    return new Promise((resolve, res) => {
      try {
        //console.log('发送：' + (new Buffer(buffer)).toString('hex'));
        if (this.listenSendData) {
          this.listenSendData(new Buffer(buffer));
        }
        ble.write(this.bleInfo.id, this.uuid.server, this.uuid.write, buffer,
          () => {
            resolve(true);
          }, () => {
            resolve(false);
          });
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  /**
   * 透传发数据
   * @param buffer
   * @ignore
   * @return {Promise}
   */
  writeWithoutResponse(buffer) {
    if (this.listenSendData) this.listenSendData(new Buffer(buffer));
    try {
      ble.writeWithoutResponse(this.bleInfo.id, this.uuid.server, this.uuid.write, buffer,
        () => {
        }, () => {
        });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @summary 设备当前连接状态
   * @returns {Promise}
   * true:已经连接
   * @example
   * let isConn = await robot.isConnected();
   */
  isConnected() {
    return new Promise((resolve, res) => {
      try {
        ble.isConnected(this.bleInfo.id,
          () => {
            resolve(true);
          },
          () => {
            if (this.startNotificationFlag) {
              this.startNotificationFlag = false;
            }
            resolve(false);
          });
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  /**
   * 打开监听
   * @ignore
   */
  openStartNotification() {
    this.startNotification(this.onData.bind(this));
  }

  /**
   * 不断打开监听
   * @ignore
   */
  startNotificationIntervalEvent() {
    if (this.startNotificationInterval)return;
    this.startNotificationInterval = setInterval(() => {
      if (this.flagBackData) {
        clearInterval(this.startNotificationInterval);
        this.startNotificationInterval = undefined;
        return;
      }
      this.startNotification(this.onData.bind(this));
      this.getHardware();
    }, 1000);
  }

  /**
   * @summary 打开监听接收通知数据
   * @ignore
   */
  startNotification(callback) {
    try {
      this.startNotificationFlag = true;
      ble.startNotification(this.bleInfo.id, this.uuid.server, this.uuid.read,
        (buffer) => {
          this.flagBackData = true;
          callback(buffer);
        },
        (err) => {
          //callback([]);
        });
    } catch (error) {
      console.error(error);
      //callback([]);
    }
  }

  /**
   * @summary 停止监听接收通知数据
   * @ignore
   */
  stopNotification() {
    return new Promise((resolve, res) => {
      try {
        ble.stopNotification(this.bleInfo.id, this.uuid.server, this.uuid.read,
          () => {
            this.startNotificationFlag = false;
            resolve(true);
          }, () => {
            resolve(false);
          });
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  /**
   * 连接成功后，要发的命令，廷迟发；
   */
  async connectSuccessDelayEvent() {
    setTimeout(() => {
      this.setLowBatteryBack(enums.robot.ports.board_power, 1);
    }, 3800);
    setTimeout(() => {
      this.startNotificationIntervalEvent();
    }, 3200);
    return 1;
  }


  /**
   * 发送固件升级准备命令
   */
  async setHardwareUpdate(flag) {
    //TODO:固件升级开启
    let order = this.orderManager.create(actions.set_hardware_update);
    let buffer = protocol.setHardwareUpdate(order.id, enums.robot.ports.board_button, flag);
    if (buffer) {
      let flag = await this.request(false, order, buffer);
      if (flag >= 1) return true;
      return false;
    } else {
      return false;
    }
  }

  /**
   * 查询硬件信息
   */
  async getHardware() {
    let order = this.orderManager.create();
    let buffer = protocol.getHardware(order.id);
    if (buffer) {
      let data = await this.request(true, order, buffer);
      let backBuffer = new Buffer(new Uint8Array(data));
      return protocol.parseHardware(backBuffer);
    } else {
      return undefined;
    }
  }

  /**
   * 查询单个接口信息
   * @param port 范围：-2 to 8；
   * @return {Promise.<*>}
   */
  async getInterfaceInfo(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getInterfaceInfo(order.id, port);
    if (buffer) {
      let data = await this.request(true, order, buffer);
      let backBuffer = new Buffer(new Uint8Array(data));
      return protocol.parseInterfaceInfo(backBuffer, false);
    } else {
      return undefined;
    }
  }

  /**
   * 查询所有接口信息
   * @return {Promise.<*>}
   */
  async getAllInterfaceInfo() {
    let order = this.orderManager.create();
    let buffer = protocol.getAllInterfaceInfo(order.id);
    let backBuffer = await this.request(true, order, buffer);
    return protocol.parseInterfaceInfo(backBuffer, true);
  }

  /**
   * 查询用户接口信息
   * @return {Promise.<*>}
   */
  async getUserInterfaceInfo() {
    let order = this.orderManager.create();
    let buffer = protocol.getUserInterfaceInfo(order.id);
    let backBuffer = await this.request(true, order, buffer);
    return protocol.parseUserInterfaceInfo(backBuffer);
  }

  /**
   * 查询电机接口信息
   * @return {Promise.<*>}
   */
  async getMotorInterfaceInfo() {
    let order = this.orderManager.create();
    let buffer = protocol.getMotorInterfaceInfo(order.id);
    let backBuffer = await this.request(true, order, buffer);
    return protocol.parseMotorInterfaceInfo(backBuffer);
  }

  /**
   * 获取超声波数值（单位豪米）
   */
  async getUltrasonicValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getUltrasonicValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseUltrasonicValue(backBuffer);
  }

  /**
   * 获取巡线数值（单位豪米）
   */
  async getLinePatrolValue(port) {
    let order = this.orderManager.create();
    console.log("getLinePatrolValue");
    let buffer = protocol.getLinePatrolValue(order.id, port);
    console.log("获取protocol");
    let data = await this.request(true, order, buffer);
    console.log("等待结束");
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseLinePatrolValue(backBuffer);
  }

   /**
   * 获取光线传感器数值（单位豪米）
   */
  async getLightSensorValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getLightSensorValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseLightSensorValue(backBuffer);
  }

  /**
   * 获取声音传感器数值（单位豪米）
   */
  async getVoiceSensorValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getVoiceSensorValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseVoiceSensorValue(backBuffer);
  }

  /**
   * 获取温度（单位豪米）TemperatureHumidity
   */
  async getTemperatureValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getTemperatureHumidityValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseTemperatureValue(backBuffer);
  }

   /**
   * 获取湿度（单位豪米）TemperatureHumidity
   */
  async getHumidityValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getTemperatureHumidityValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseHumidityValue(backBuffer);
  }

  /**
   * 获取电池电压
   */
  async getVoltage(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getVoltage(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.getVoltage(backBuffer);
  }

  /**
   * 读取按键的值
   * @param port
   * @return {*}
   */
  async getButtonInfo(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getButtonInfo(order.id, port);
    if (buffer) {
      let data = await this.request(true, order, buffer);
      let backBuffer = new Buffer(new Uint8Array(data));
      return protocol.parseButtonInfo(backBuffer);
    } else {
      return undefined;
    }
  }

  /**
   * 设置超声波灯光
   */
  async setUltrasonicLight(port, red, green, blue, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setUltrasonicLight(0, port, red, green, blue);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setUltrasonicLight(order.id, port, red, green, blue);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * 设置剁机角度
   */
  async setSteeringEngine(port, engine, radian1,radian2, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setSteeringEngine(0, port, engine, radian1,radian2);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setSteeringEngine(order.id, port, engine, radian1,radian2);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * 设置外接电机
   */
  async setExternalMotor(port, engine, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setExternalMotor(0, port, engine);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setExternalMotor(order.id, port, engine);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * @summary 设置Led
   */
  async setLed(port, red, green, blue, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setLed(0, port, red, green, blue);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setLed(order.id, port, red, green, blue);
    if (buffer) {
      return await this.request(true, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * @summary 设置电机
   */
  async setMotor(port, speed) {
    let order = this.orderManager.create();
    let buffer = protocol.setMotor(order.id, port, speed);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * @summary 设置机器人移动
   */
  async setMove(sync, m1Speed, m2Speed) {
    if (sync) {
      let order = this.orderManager.create();
      let buffer = protocol.setMove(order.id, m1Speed, m2Speed);
      if (buffer) {
        return await this.request(false, order, buffer);
      } else {
        return false;
      }
    } else {
      let buffer = protocol.setMove(0, m1Speed, m2Speed);
      await this.sendWithoutResponse(buffer);
      await this.wait(10);
      return true;
    }
  }

  /**
   * @summary 设置蜂鸣器
   */
  async setBuzzer(port, rate, time, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setBuzzer(0, port, rate, time);
      this.send(buff);
      await this.wait(time);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setBuzzer(order.id, port, rate, time);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * @summary 设置矩阵面板
   */
  async setMatrix(port, rows, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setMatrix(0, port, rows);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setMatrix(order.id, port, rows);
    if (buffer) {
      return await this.request(true, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * 设置低电压主动上报事件
   * @param port
   * @param flag
   * @return {Promise.<*>}
   */
  async setLowBatteryBack(port, flag) {
    let order = this.orderManager.create();
    let buffer = protocol.setLowBatteryBack(order.id, port, flag);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * 设置按键按下主动上报事件
   * @param port
   * @param flag
   * @return {Promise.<*>}
   */
  async setClickButton(port, flag) {
    let order = this.orderManager.create();
    let buffer = protocol.setClickButton(order.id, port, flag);
    if (buffer) {
      let result = await this.request(false, order, buffer);
      return result;
    } else {
      return false;
    }
  }

  /**
   * 设置工作模式事件:自定义模式/ 遥控模式 0 , 自动避障1, 巡线模式2
   * @param port
   * @param flag
   * @return {Promise.<*>}
   */
  async setWorkMode(port, mode, value) {
    let v = value ? value : 0 ;
    let order = this.orderManager.create();
    let buffer = protocol.setWorkMode(order.id, port, mode, v);
    if (buffer) {
      let result = await this.request(false, order, buffer);
      return result;
    } else {
      return false;
    }
  }

  /**
   * @summary 向机器人发送请求
   * @ignore
   */
  async request(isBackData, order, buffer) {
    await this.send(buffer);
    let result = await order.wait(isBackData);
    return result;
  }

  /**
   * @summary 发送数据（拆包发送）
   * @ignore
   */
  async send(data) {
    let pkgSize = 20;
    for (let i = 0; i < data.length / pkgSize; i++) {
      let start = i * pkgSize;
      let size = data.length - start;
      let end = size >= pkgSize ? pkgSize * (i + 1) : pkgSize * (i) + size;
      let buffer = Buffer.from(data.slice(start, end));
      await this.write(buffer.buffer);
    }
  }

  async sendWithoutResponse(data) {
    let pkgSize = 20;
    for (let i = 0; i < data.length / pkgSize; i++) {
      let start = i * pkgSize;
      let size = data.length - start;
      let end = size >= pkgSize ? pkgSize * (i + 1) : pkgSize * (i) + size;
      let buffer = Buffer.from(data.slice(start, end));
      await this.writeWithoutResponse(buffer.buffer);
    }
  }

  /**
   * 当接收到数据的时候
   * @ignore
   * @param {any} data
   * @memberof RoboService
   */
  onData(data) {
    try {
      let buffer = new Buffer(new Uint8Array(data));
      //console.log('收到' + buffer.toString('hex'));
      this.orderManager.handle(buffer, this.bleInfo.id);
      if (this.listenOnData) {
        this.listenOnData(buffer);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 对所有发送，返回数据监听
   * @param callBack
   */
  setListen(listenSendData, listenOnData) {
    this.listenOnData = listenOnData;
    this.listenSendData = listenSendData;
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

export default Robot;