class Bufferache {
  constructor() {
    //TODO:将来支持处理多台机器人
    this.bufferCacheList = [];
    this.callBack = undefined;
    this.robotId = undefined;
    this.head = 'RB';
  }

  /**
   * 处理机器人的响应数据
   */
  handle(buffer, callBack, robotId) {
    this.robotId = robotId;
    this.callBack = callBack;
    this.cachePackage(buffer, this.head);
  }

  /**
   * 处理一条完整数据:RB
   * @param buffer
   */
  completeData(buffer) {
    if (this.callBack) {
      this.callBack(buffer, this.robotId);
    }
  }

  /**
   * 数据包缓冲区处理
   * 可能要分几次才能接收完成；
   * @param buffer
   */
  cachePackage(buffer, head) {
    let newList = this.bufferCacheList.slice();
    newList.push(buffer);
    this.bufferCacheList.length = 0;
    const newbufferConcat = this.bufferConcat(newList);
    const newClearBuffer = this.clearBuffer(newbufferConcat, head);
    let flag = this.doPackage(newClearBuffer, head);
    this.callBack = undefined;
  }

  /**
   * @summary 合成一条条完整的数据；
   * @param buffer
   * @param head
   * @return {number}
   * 0:有数据没处理完成； 1:处理完成；-1:无用的数据，扔掉；0：断包
   */
  doPackage(buffer, head) {
    if (buffer.toString('utf8', 0, 2) === head) {
      let size = buffer.readUInt8(2);
      if (size > buffer.length) {
        this.bufferCacheList.push(buffer);
        return 0;
      }
      const bufferItem = buffer.slice(0, size);
      this.completeData(bufferItem);
      const newbuffer = buffer.slice(bufferItem.length, buffer.length);
      if (newbuffer.length <= 0) {
        return 1;
      }
      const newClearBuffer = this.clearBuffer(newbuffer, head);
      if ((!newClearBuffer) || newClearBuffer.length <= 0) {
        return 1;
      }
      return this.doPackage(newClearBuffer, head);
    }
    return -1;
  }

  /**
   * 把数据合并在一起，缓存处理；
   * @param bufferList
   */
  bufferConcat(bufferList) {
    let totalLength = 0;
    for (let i = 0; i < bufferList.length; i++) {
      totalLength += bufferList[i].length;
    }
    const bufferNew = Buffer.concat(bufferList, totalLength);
    return bufferNew;
  }

  /**
   * 清除没用的数据
   * @param buffer
   * @param head
   */
  clearBuffer(buffer, head) {
    const index = buffer.indexOf(head);
    if (index === -1) return undefined;
    if (index === 0) return buffer;
    const bufferNew = buffer.slice(index, buffer.length);
    return bufferNew;
  }
}

export default new Bufferache();