class Common {
  /**
   * 查看某个devices在某个端口
   * millisec 超时返回
   */
  async getPortInfo(robot,devices,millisec){
    let flag =0;
    return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      if(flag === 0){
        resolve( false);
      }
    }, millisec);
    let json = await robot.getUserInterfaceInfo();
    if(!json)resolve(false);
    for(let i=0;i< json.length;i++){
      if(json[i] === devices){
        flag = 1;
        resolve( i+1);
      }
    }
    resolve( false);
  });
  }

  /**
   * 返回 8个用户的端口信息
   * @param robot
   * @param millisec
   * @return {Promise}
   */
  async getUserPortInfo(robot,millisec){
    let flag =0;
    return new Promise(async (resolve, reject) => {
      setTimeout( () => {
        if(flag === 0){
          flag =2;
          resolve( []);
        }
      }, millisec);
      let json = await robot.getUserInterfaceInfo();
      if(flag === 0){
        flag =1;
        if(!json)resolve([]);
        resolve( json);
      }
    });
  }

  /**
   * 取固件版本信息
   * @param robot
   * @param millisec
   * @return {Promise}
   */
  async getHardware(robot,millisec){
    let flag =0;
    return new Promise(async (resolve, reject) => {
      setTimeout( () => {
        if(flag === 0){
          flag =2;
          resolve( []);
        }
      }, millisec);
      let json = await robot.getHardware();
      
      if(flag === 0){
        flag =1;
        if(!json)resolve([]);
        resolve( json);
      }
    });
  }

  /**
   * 查看某个devices在电机端口
   * millisec 超时返回
   */
  async getPort2(robot,millisec){
    let flag =0;
    setTimeout(async () => {
      if(flag === 0){
        return undefined;
      }
    }, millisec);
    let json = await robot.getMotorInterfaceInfo();
    if(!json)return undefined;
    for(let i=0;i< json.length;i++){
      if(json[i] !== 1){
        flag = 1;
        return undefined;
      }
    }
    return true;
  }


  /**
   * 运行某函数，超时返回指定值
   */
  /*
  async overTime(fun, millisec, value) {
    return new Promise((resolve, res) => {
      try {
        setTimeout(async () => {
          resolve(value);
        }, millisec);
        resolve(await fun);
      } catch (error) {
        console.error(error);
        resolve(value);
      }
    });
  }*/
}

export default new Common();