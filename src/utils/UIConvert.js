class UIConvert {

  /**
   * 将设计稿px像素转换成rem
   */
  rem(px) {
    return px * 0.0625 * 1;
  }

  /**
   * 将设计稿px像素还原成真实像素
   */
  restore(px){
    let rem = document.documentElement.clientWidth * 0.0239880059970015;
    return this.rem(px) * rem;
  }
}

export default new UIConvert();