import Robot from './Robot'

/**
 * 管理机器人
 */
class RobotManage {
  constructor() {
    this.waitConnectionList = [];
    this.connectionList = [];
    this.listenOnDataComplete = [];
    this.maxNumber = 1;
    this.isScan = false;
    this.services = [];
    this.namePrefix = 'ROBOBLOQ';
    this.rssiNear = -61;
    this.scanInterval = undefined;
  }

  /**
   * @summary 是否开启蓝牙
   * @returns {Promise}
   * true: 已开启蓝牙
   * @example
   * let isOpen = await robotServiceManage.bleIsEnabled();
   */
  bleIsEnabled() {
    return new Promise((resolve, res) => {
      try {
        ble.isEnabled(() => {
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
   * 开始监听BLE状态
   */
  startStateNotifications(callBack) {
    try {
      ble.startStateNotifications(
        (state) => {
          let isNo = false;
          if (state === 'on' || state === 'turningOn') {
            isNo = true;
          }
          callBack(isNo);
        }
      );
    } catch (error) {
      //console.error(error);
    }
  }

  /**
   * 停止BLE监听状态
   */
  stopStateNotifications() {
    try {
      ble.stopStateNotifications({}, {});
    } catch (error) {
      //console.error(error);
    }
  }

  /**
   * 获取扫描机器人列表对象
   * @return {Promise.<*>}
   */
  async getScanList() {
    try {
      const scanList = await this.scan();
      if (!scanList || scanList === undefined || scanList === []) {
        this.waitConnectionList = [];
        return [];
      }
      const robotList = this.getRobotFromDevice(scanList);
      const sortList = this.listSort(robotList);
      this.waitConnectionList = sortList;
      return sortList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * 获取当前机器人对象
   * @return {*}
   */
  getCurrentRobot() {
    const count = this.connectionList.length;
    if (count <= 0) {
      return undefined;
    }
    return this.connectionList[count - 1];
  }

  /**
   * @summary 获取待连接机器人列表对象
   * @return {*|Array}
   */
  getWaitConnectionList() {
    return this.waitConnectionList;
  }

  /**
   * @summary 获取已连接机器人列表对象
   * @return {*|Array}
   */
  getConnectionList() {
    return this.connectionList;
  }

  /**
   * @summary 根据设备ID 取某设备对象
   * @ignore
   * @param deviceId
   * @param list
   * @return {{}}
   */
  getRobotById(deviceId, list) {
    if ((!list) || list.length <= 0 || list === []) {
      return undefined;
    }
    let filter = list.filter(item => item.getBleInfo().id == deviceId);
    if ((!filter) || filter.length <= 0) {
      return undefined;
    }
    return filter[0];
  }

  /**
   * 连接某机器人
   * @param robot
   * @return {Promise.<*>}
   */
  async connectRobot(robot) {
    const maxNum = this.maxNumber;
    if (!robot) {
      return false;
    }
    if (this.connectionList.length >= maxNum) {
      let removeList = [];
      for (let i = maxNum - 1; i < this.connectionList.length; i++) {
        let robot2 = this.connectionList[i];
        robot2.disconnect();
        //this.waitConnectionList = this.addRobotToList(robot2, this.waitConnectionList);
        this.connectionList = this.removeRobotById(robot2.getBleInfo().id, this.connectionList);
      }
    }
    const flag = await robot.connect();
    if (!flag) {
      return flag;
    }
    robot.connectSuccessDelayEvent();
    const waitConnection = this.removeRobotById(robot.getBleInfo().id, this.waitConnectionList);
    this.waitConnectionList = waitConnection;
    const connection = this.listSort(this.addRobotToList(robot, this.connectionList));
    this.connectionList = connection;
    return flag;
  }

  /**
   * 断开连接
   * @param robot
   * @return {Promise.<*>}
   */
  async disconnectRobot(robot) {
    const flag = await robot.disconnect();
    if (!flag) {
      return flag;
    }
    //const waitConnection = this.listSort(this.addRobotToList(robot, this.waitConnectionList));
    //this.waitConnectionList = waitConnection;
    const connection = this.removeRobotById(robot.getBleInfo().id, this.connectionList);
    this.connectionList = connection;
    return flag;
  }

  /**
   * 取设备蓝牙信息列表
   * @param list
   * @return {Array}
   */
  getDeviceList(list) {
    if (!list || list.length <= 0 || list === []) {
      return [];
    }
    let newList = [];
    for (let i = 0; i < list.length; i++) {
      newList.push(list[i].getBleInfo())
    }
    return newList;
  }

  /**
   * 从蓝牙信息列表返回机器人列表
   * @param list
   * @return {Array}
   */
  getRobotFromDevice(list) {
    if (!list)return [];
    const robotList = list.map((item, index) => {
      let robot = new Robot();
      robot.setBleInfo(item);
      return robot;
    });
    return robotList;
  }

  /**
   * @summary 扫描
   * @ignore
   */
  scan() {
    return new Promise((resolve, res) => {
      if (this.isScan) {
        ble.stopScan(() => {
        }, () => {
        });
      }
      this.isScan = true;
      let devices = [];
      ble.startScan(this.services, (device) => {
        if (this.checkCompanyBle(device.name)) {
          devices.push(device);
        }
      }, (error) => {
        console.error(error);
      });
      setTimeout(ble.stopScan,
        5000,
        () => {
          this.isScan = false;
          resolve(devices);
        },
        () => {
          console.error('stopScan failed');
          this.isScan = false;
          resolve(devices);
        }
      );
    });
  }

  /**
   * 定时自动扫描，会对设备重新扫描
   */
  autoScan(callBack) {
    if (this.scanInterval) {
      return;
    }
    this.scanInterval = setInterval(() => {
      if (this.isScan) {
        this.isScan = false;
        ble.stopScan(() => {
          this.startScan(callBack);
        }, () => {
        });
      } else {
        this.startScan(callBack);
      }
    }, 5000);
  }

  /**
   * 不断扫描，直到找到设备,过滤的设备不会重新扫描
   * @param callBack
   */
  startScan(callBack) {
    if (this.isScan) {
      return;
    }
    this.isScan = true;
    ble.startScan(this.services, (device) => {
      if (device && device.rssi >= this.rssiNear && this.checkCompanyBle(device.name)) {
        if (this.scanInterval) {
          clearInterval(this.scanInterval);
          this.scanInterval = undefined;
        }
        ble.stopScan(() => {
        }, () => {
        });
        this.isScan = false;
        const robotList = this.getRobotFromDevice([device]);
        this.waitConnectionList = robotList;
        callBack(device);
      }
    }, (error) => {
      console.error(error);
      this.isScan = false;
      ble.stopScan(() => {
      }, () => {
      });
      callBack(undefined);
    });
  }

  /**
   * 停止扫描
   */
  stopScan() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = undefined;
    }
    ble.stopScan(() => {
      this.isScan = false;
    }, () => {
    });
  }

  /**
   * @summary 对数组按信号强弱排序
   * @ignore
   */
  listSort(list) {
    let sortRule = ((name) => {
      return ((aheadObj, backObj) => {
        let ahead, back;
        if (typeof aheadObj === "object" && typeof backObj === "object" && aheadObj && backObj) {
          ahead = (aheadObj.getBleInfo())[name];
          back = (backObj.getBleInfo())[name];
          if (ahead === back) {
            return 0;
          }
          if (typeof ahead === typeof back) {
            return ahead > back ? -1 : 1;
          }
          return typeof ahead > typeof back ? -1 : 1;
        }
        else {
          return 0;
        }
      });
    });
    return list.sort(sortRule("rssi"));
  }

  /**
   * @summary 根据ID 移除 设备信息
   * @ignore
   * @param deviceId
   * @param list
   */
  removeRobotById(deviceId, list) {
    const newlist = list.filter(item => deviceId !== (item.getBleInfo()).id);
    return newlist;
  }

  /**
   * @summary 把设备信息添加到列表中
   * @ignore
   * @param device 设备信息,对象，必填
   * @param list 要加入的列表，必填
   * @example
   * let list = addDeviceToList(robot,[]);
   */
  addRobotToList(robot, list) {
    const count = (list.filter(item => item.getBleInfo().id === robot.getBleInfo().id)).length;
    if (count >= 1) {
      return list;
    }
    list.push(robot);
    return this.listSort(list);
  }

  /**
   * 注册委托事件:
   */
  regListenOnDataComplete(key, callBack) {
    let item = {key: key, callBack: callBack};
    this.listenOnDataComplete.push(item);
  }

  /**
   * 删除委托事件:
   */
  removeListenOnDataComplete(key) {
    const newlist = this.listenOnDataComplete.filter(item => key !== item.key);
    this.listenOnDataComplete = newlist;
  }

  /**
   * 处理临听返回数据的所有委托；
   * @param buffer
   * @param robotId 机器人的识别ID
   * @param type : 0 主动请求的，1 被动请求；
   */
  doListenOnDataComplete(buffer, robotId, type) {
    try {
      if (type === 1 && this.listenOnDataComplete && this.listenOnDataComplete.length >= 1) {
        for (let i = 0; i < this.listenOnDataComplete.length; i++) {
          this.listenOnDataComplete[i].callBack(buffer, robotId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 是否是公司的BLE
   * @ignore
   */
  checkCompanyBle(name) {
    try {
      if (!name || name.length <= 7) {
        return false;
      }
      let left = this.namePrefix;
      let check = (name.slice(0, left.length)).toUpperCase();
      if (left == check) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  /**
   * 显示设备名称
   */
  formatName(name, id) {
    let right = id.slice(-5);
    let back = name + '_' + right.slice(0, 2) + right.slice(-2);
    return back;
  }

  /**
   * 根据信号强度转换成图标
   */
  rssiToCss(number) {
    if (!number) {
      return 'rssiIntensity0';
    }
    if (number >= -60) {
      return 'rssiIntensity4';
    }
    if (number >= -70) {
      return 'rssiIntensity3';
    }
    if (number >= -80) {
      return 'rssiIntensity2';
    }
    if (number >= -100) {
      return 'rssiIntensity1';
    }
    return 'rssiIntensity0';
  }
}

export default new RobotManage();