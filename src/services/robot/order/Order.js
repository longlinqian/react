import { EventEmitter } from 'events'

/**
 * 机器人执行订单
 */
export default class Order {
  constructor(id) {
    this.id = id;
    this.emitter = new EventEmitter();
    this.result = undefined;
    this.backData = undefined;
    this.finish = false;
  }

  /**
   * 等待机器人执行
   * 1:返回原始数据；
   */
  async wait(isBackData) {
    return new Promise((resolve, reject) => {
      if (this.finish) {
        let result = isBackData ? this.backData : this.result;
        this.finish = false;
        resolve(result);
      } else {
        this.emitter.once('done', (success, data) => {
          let result = isBackData ? data : success;
          this.finish = false;
          resolve(result);
        });
      }
    });
  }

  /**
   * 完成执行
   */
  complete(success, data) {
    this.finish = true;
    this.result = success;
    this.backData = data;
    this.emitter.emit('done', success, data);
  }
}