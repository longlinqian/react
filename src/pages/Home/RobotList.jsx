import React from 'react'
import Swiper from 'swiper'
import ShapeView from './components/ShapeView.jsx'
import ShapeDetailModal from './components/ShapeDetailModal.jsx'
import local from '../../utils/Local'

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      version: ''
    }
  }
  componentWillMount(){
    if (this.props.match.params && this.props.match.params.version === 'k1') {
      const search = this.props.location.search;
      this.setState({
        version: 'k1'
      });
    } else {
      this.setState({
        version: 'k2'
      });
    }
  }
  componentDidMount() {
    this.swiper = new Swiper('#pageSwiper', {
      onlyExternal: true
    });
    document.onselectstart = function(){
      event.returnValue = false;
    };
    // 或者直接返回整个事件
    document.onselectstart = function(){
      return false;
    };
  }

  render() {
    return (
      <div className="homePage">
        {(() => {
          let title = this.state.version === 'k1' ? local.data.Q_corps : local.data.Q_scout;
          return (
            <div className="links">
              {title}
            </div>
          );
        })()}
        <div className="backButton" onTouchTap={this.backButtonTouchTap.bind(this)}></div>
        <div className="views">
          <div id="pageSwiper" className="swiper-container" style={{ height: '100%' }}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <ShapeView ref="shapeView" version={this.state.version} onDetail={this.shapeViewDetail.bind(this)} onControl={this.shapeViewControl.bind(this)} onBuild={this.shapeViewBuild.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <ShapeDetailModal ref="shapeDetailModal" version={this.state.version}/>
      </div>
    );
  }

  backButtonTouchTap() {
    this.props.history.goBack();
  }

  shapeViewDetail(shapeId) {
    this.refs.shapeDetailModal.open(shapeId);
  }

  async shapeViewControl(index){
    await this.wait(100);
    this.props.history.push('/control/'+index);
  }

  shapeViewBuild(index){
    this.props.history.push('/build/'+index);
  }

    
  /**
   * 等待时间
   * @param time
   * @returns {Promise}
   */
  async wait(time) {
    return new Promise((a, b) => {
      setTimeout(() => {
        a();
      }, time);
    })
  }
}