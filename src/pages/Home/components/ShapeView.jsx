import React from 'react'
import Swiper from 'swiper'
import UIConvert from '../../../utils/UIConvert'
import robotList from '../../../config/robotList'
import local from '../../../utils/Local.js'

export default class ShapeView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let width = UIConvert.restore(627);
    this.swiper = new Swiper('#shapeSwiper', {
      pagination: '#shapeSwiperPagination',
      width: width,
      slidesPerView: 3,
      paginationClickable: false
    });
  }

  render() {
    return (
      <div className="shapeView">
        <div className="list">
          <div id="shapeSwiper" className="swiper-container">
            <div className="swiper-wrapper">
              {(() => {
                return robotList[this.props.version].map((item, index) => {
                  return (
                    <div key={index} className="swiper-slide">
                      <div className="item">
                        <div className="header">
                          <div className="background"></div>
                          <div className="title text-ellipsis">{item.name}</div>
                        </div>
                        <div className="shape" onTouchTap={this.controlTouchTap.bind(this, item.id)}>
                          <img className="image" src={item.frames2[0]} alt="" />
                        </div>
                        <div className="buttons">
                          <div className="buildButton" onTouchTap={this.buildTouchTap.bind(this,item.id)}>
                          <img className="buildImage" src="./res/images/test/build.png"/>
                         <div className="buildText text-ellipsis">
                         {local.data.Robot_function_build}
                          </div>
                          </div>
                          <div className="controlButton" onTouchTap={this.shapeTouchTap.bind(this,item.id)}>
                          <img className="controlImage" src="./res/images/test/control.png"/>
                         <div className="controlText text-ellipsis">
                         {local.data.Robot_function_control}
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
          <div id="shapeSwiperPagination" className="swiper-pagination"></div>
        </div>
      </div>
    );
  }

  shapeTouchTap(shapeId) {
    this.props.onDetail(shapeId);
  }

  buildTouchTap(index){
   this.props.onBuild(index);
  }

  controlTouchTap(index) {
    this.props.onControl(index);
  }

  reset() {
    this.swiper.slideTo(0);
  }
}