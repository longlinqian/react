import React from 'react'

/**
 * 矩阵选择控件
 */
export default class MatrixIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
    this.axusx = 1/49.9875  * document.documentElement.clientWidth * 0.379880059970015;
    this.width = 0 ;
    this.height = 0; 
    this.flag = true;
  }
  
  render() {
    let listx = [
      [0, 10320, 31992, 14448, 4128, 0, 4032, 2112, 1152, 768],
      [0, 14560, 4160, 4160, 4160, 4160, 4672, 1792, 512, 0],
      [0, 17544, 14448, 0, 0, 0, 4032, 8160, 4032, 0],
      [14448, 17544, 21672, 14448, 0, 0, 4032, 4128, 4128, 4032],
      [14448, 17544, 21672, 14448, 0, 0, 4032, 8160, 4032, 0],
      [0, 14560, 32240, 32752, 16352, 8128, 3968, 1792, 512, 0]
    ];
    if (this.state.isShow) {
      let itemList = [];
      listx.forEach((icon, index) => {
        itemList.push(
          <div key={index} className="item" onTouchTap={this.itemTouchTap.bind(this, icon)}>
            {this.renderImage(icon)}
          </div>
        );
      });
      return (
        <div className="matrixIcon">
          <div className="mask"></div>
          <div className="container">
            {itemList}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderImage(icon) {
    let rowCount = 10;
    let colCount = 14;
    this.width = 0 ;
    this.height = 0; 

    let svgContent = `<rect x="0" y="0" width="${Math.round(this.axusx)*colCount+1.5 }" height="${Math.round(this.axusx)*rowCount+1.5 }" style="fill:#999;stroke-width:1;stroke:#000;" />`;
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        let x = Math.round(this.axusx)*col+1;
        let y = Math.round(this.axusx)*row+1;
        let value = (1 << (15 - col) & icon[row]) >> (15 - col);
        if (value) {
          svgContent += `<rect x="${Math.round(x)}" y="${Math.round(y)}" width="${Math.round(this.axusx)-.5}" height="${Math.round(this.axusx)-.5}" style="fill:rgb(23,91,170)"/>`;
        }else{
          svgContent += `<rect x="${Math.round(x)}" y="${Math.round(y)}" width="${Math.round(this.axusx)-.5}" height="${Math.round(this.axusx)-.5}" style="fill:#171724"/>`;
        }
        this.width += (4.5)*this.axusx; 
        this.height +=(4.5)*this.axusx;
      }
    }
    this.flag = false;
    let src = `data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'>${svgContent}</svg>`
    return <img src={src} />;
  }

  itemTouchTap(icon) {
    this.props.onShowMatrix(icon);
  }

  /**
   * 显示面板
   */
  show(done) {
    this.done = done;
    this.setState({
      isShow: true
    });
  }
}