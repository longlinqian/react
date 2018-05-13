import Order from './Order'
import protocol from '../Protocol'
import enums from '../../../enums'
import bufferCache from '../BufferCache'
import robotManage from '../RobotManage'
const actions = enums.robot.actions;

/**
 * 机器人执行顺序管理器
 */
export default class OrderManager {
  constructor() {
    this.index = 0;
    this.list = [];
    this.indexList = [];
    this.autoCallEvent = [];
  }

  /**
   * 根据执行行为创建订单，并加入到订单队列
   */
  create() {
    let order = new Order(this.generateId());
    this.list.push(order);
    return order;
  }

  /**
   * 生成订单ID
   */
  generateId() {
    this.index++;
    const maxId = 255;
    if (this.index >= maxId) {
      this.index = 1;
    }
    if (this.indexList.length > 250) {
      this.indexList.length = 0;
    }
    this.index = this.checkIndex(this.index);
    this.indexList.push(this.index);
    return this.index;
  }

  checkIndex(i) {
    const count = (this.indexList.filter(item => item === i)).length;
    if (count <= 0) return i;
    i++;
    return this.checkId(i);
  }

  /**
   * 处理机器人的响应数据
   * 机器人主动发送的数据不会分包，RC以外的数据都为主动请求的数据；
   */
  handle(buffer, robotId) {
    //this.autoCallEvent = autoCallEvent ;
    bufferCache.handle(buffer, this.completeDataSplit.bind(this), robotId);
  }

  /**
   * 拆分数据类型：主动，被动请求数据；
   */
  completeDataSplit(buffer, robotId) {
    //检查数据的完整性
    let check = buffer.readUInt8(buffer.length - 1, false);
    let checkTrue = protocol.sumCheck(buffer.slice(0, buffer.length - 1));
    if (check !== checkTrue) {
      console.error('包检测出错，检证位=' + check + ',应该=' + checkTrue+'，包='+buffer.toString('hex'));
      return false;
    }
    //拆分
    let orderId = buffer.readUInt8(3, false);
    if (orderId === 0) {
      robotManage.doListenOnDataComplete(buffer, robotId, 1);
    } else {
      robotManage.doListenOnDataComplete(buffer, robotId, 0);
      this.completeOrder(buffer);
    }
  }

  /**
   * 完成机器人的执行订单(主动请求的回应)
   */
  completeOrder(buffer) {
    let orderId = protocol.parseOrderId(buffer);
    if (orderId) {
      let order = this.getOrder(orderId);
      if (order) {
        let success = protocol.parseExecResult(buffer);
        order.complete(success, buffer);
      }
    } else {
      console.error('没有找到order...');
    }
  }

  /**
   * 获取执行订单对象，并从队列中删除
   */
  getOrder(orderId) {
    let index = this.list.findIndex((item) => {
      return item.id === orderId;
    });
    let index2 = this.indexList.findIndex((item) => {
      return item === orderId;
    });
    this.indexList = this.indexList.splice(index2, 1);
    if (index >= this.list.length)return null;
    let order = this.list[index];
    this.list = this.list.splice(index, 1);
    return order;
  }
}