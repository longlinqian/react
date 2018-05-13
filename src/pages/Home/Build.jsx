import React from 'react'
import { Link } from 'react-router-dom'
import PhotoSwipeUI_Default from '../../res/lib/photoswipe/photoswipe-ui-default.js'
import PhotoSwipe from '../../res/lib/photoswipe/photoswipe.js'
import BasePage from '../BasePage.jsx'
import CompeletBuildModal from './components/CompeletBuildModal.jsx'
import enums from '../../enums'
import robots from '../../config/robotList.js'
import local from '../../utils/Local.js'

/**
 * 机器人搭建页
 */
export default class Build extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      progress: {
        leftWidth: 0,
        rightWidth: 100
      },
      currentPage: 1,
      totalPage: null,
      previousColor: '#888888',
      NextColor: 'white',
      leftProgress:'progressLeft',
      rightProgress:'progressRight1'
    };
    this.doubleT = 0;
    this.swipeStop = 0;
    this.carouselData = [];
    this.actionflag = [0, 0, 0, 0];
    this.pictureProportion = 1;
    this.gallery = null;
    this.count = 0;
    this.left = 0;
    this.right = 100;
    this.indexImage = this.props.match.params.index == undefined ? 0 : this.props.match.params.index;
    this.version =window.location.href.substring(window.location.href.length-6,window.location.href.length-4);
    this.robotData = this.version == 'k2'?robots.k2:robots.k1;
  }

  componentDidMount() {
    this.initCarouselData();
    setTimeout(function(){
      this.initPhotoSwipe();
    }.bind(this),300);
  }

  componentWillUnmount() {
    this.gallery.close();
    try{
      this.gallery.destroy();
    }catch(e){console.error(e)}
  }

  render() {
    return (
      <div className="buildPage">
        <div className="headerBarEnter headerBar" ref="headerBar">
        <div className="backButton" onTouchTap={this.closeBottonTouchTap.bind(this)}>
          <div className="goBack"></div>
        </div>
        {local.data.Build_Explain}({this.state.currentPage + '/' + this.state.totalPage})        
        </div>
        <div className="pswp" role="dialog" aria-hidden="true"  >
       <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container" >
            <div className="pswp__item" ></div>
            <div className="pswp__item" ></div>
            <div className="pswp__item" ></div>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"></div>
         
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
        <div className="handleFoot handleFootEnter" ref="handleFoot">
          <div className="previousBotton" onTouchTap={this.previousBottonTouchTap.bind(this)} ref="previousBotton">
            <img src='./res/images/svg/arrowLeft.svg' className="fa"/>
          </div>
          <div className="nextBotton" onTouchTap={this.nextBottonTouchTap.bind(this)} ref="nextBotton">
            <img src='./res/images/svg/arrowRight.svg' className="fa"/>
          </div>

          <div className="progress" onTouchMove={this.locationProgressTouchMove.bind(this)} onTouchEnd={this.locationProgressTouchEnd.bind(this)} onMouseMove={this.locationProgressonMouseMove.bind(this)} ref="progress">
            <div className="progressText">
              <div className={this.state.leftProgress} style={{ width: this.state.progress.leftWidth + '%' }}>
              </div>            
            </div>
          </div>

        </div>
        <CompeletBuildModal ref="CompeletBuildModal" />
      </div>
    );
  }

  closeBottonTouchTap() {
    window.history.go(-1);
  }

  locationProgressonMouseMove(e){
    let top = this.getY(this.refs.progress);
    let left = this.getX(this.refs.progress);
    let left2 = (e.clientX - left + document.body);
    let locationRadio = parseFloat(left2) / this.refs.progress.offsetWidth;//位置比例
    let tempottalPage = this.state.totalPage - 1
    if (locationRadio <= 0.5 / tempottalPage) {
      this.gallery.goTo(0);
      this.updateProgress();
      return;
    }
    for (let i = 0; i < tempottalPage - 1; i++) {
      if (locationRadio > (i + 0.5) / tempottalPage && locationRadio <= (i + 1.5) / tempottalPage) {
        this.gallery.goTo(i + 1);
        this.updateProgress();
        return;
      }
    }
    this.gallery.goTo(tempottalPage);
    this.updateProgress();
  }

  locationProgressTouchMove(e,event){
    let left1 = this.getX(this.refs.progress);
  this.left =  (e.touches[0].clientX - left1 + document.body.scrollLeft - 2);
  this.right =this.refs.progress.offsetWidth-this.left;
    this.updateProgressOnly(this.left/this.refs.progress.offsetWidth*100,this.right/this.refs.progress.offsetWidth*100);
  }

  locationProgressTouchEnd(a,event) {
    let left2 = this.left;
    let locationRadio = left2 / this.refs.progress.offsetWidth;//位置比例
    let tempottalPage = this.state.totalPage - 1
    if (locationRadio <= 0.5 / tempottalPage) {
      this.gallery.goTo(0);
      this.updateProgress();
      return;
    }
    for (let i = 0; i < tempottalPage - 1; i++) {
      if (locationRadio > (i + 0.5) / tempottalPage && locationRadio <= (i + 1.5) / tempottalPage) {
        this.gallery.goTo(i + 1);
        this.updateProgress();
        return;
      }
    }
    this.gallery.goTo(tempottalPage);
    this.updateProgress();
  }

  nextBottonTouchTap() {
     if (this.delayEvent(0, 500)) return;
    if (this.gallery.getCurrentIndex() === this.carouselData.length - 1) {
      return;
    }
    this.gallery.next();
    this.updateProgress();
    if (this.gallery.getCurrentIndex() === this.carouselData.length - 1) {
      this.handleOver();
    }
    let pswpImge = document.getElementsByClassName('pswp__img');
    for(let  i = 0; i < pswpImge.length;i++){
      pswpImge[i].style.width = '100% !important';
      pswpImge[i].style.height = '100% !important';
    }
  }

  previousBottonTouchTap() {
    if (this.delayEvent(0, 500)) return;
    if (this.gallery.getCurrentIndex() === 0) return;
    this.gallery.prev();
    this.updateProgress();
    let pswpImge = document.getElementsByClassName('pswp__img');
    for(let  i = 0; i < pswpImge.length;i++){
      pswpImge[i].style.width = '100% !important';
      pswpImge[i].style.height = '100% !important';
    }
  }

  swipeSwitch() {  
    this.updateProgress();
  }

  /**
   * 初始化轮播图数据
   */
  initCarouselData() {
    let shape = this.robotData.find((item, index) => {
      if (item.id == this.indexImage)
        return item;
    });
     this.carouselData = shape.buildSteps['16X12'];
    this.totalPage = this.carouselData.length;
    this.setState({
      totalPage: this.carouselData.length
    });
  }

  initPhotoSwipe() {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = [];
    this.carouselData.map((item, index) => {
      items.push({
        src: item,
        w: document.body.clientWidth,
        h: document.body.clientHeight
      })
    })
  
    var options = {
      index: 0,
      loop: false,
      pinchToClose: false,
      closeOnScroll: false,
      closeOnVerticalDrag: false,
      escKey: true,
      spacing: 0,
      allowPanToNext: false,
      modal: true,
      bgOpacity: 1,
    };
    this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.init();

    this.gallery.listen('beforeChange', function () {
      // this.showOrHideControl(true);
    }.bind(this));
    this.gallery.listen('afterChange', function () {
      this.updateProgress();
      this.swipeStop = 1;    
    }.bind(this));

    this.gallery.listen('preventDragEvent', function (e, isDown, preventObj) {
      if (isDown == false){
        this.doubleT ++; 
        setTimeout(cc.bind(this), 500);
      }
      function cc() {
        let styleClass = null;
        let index = this.gallery.getCurrentIndex()
        if (index == 0) {
          styleClass = document.getElementsByClassName('pswp__zoom-wrap')[0].style.transform;
        } else if ((index + 1) == this.carouselData.length && (index + 1) % 3 === 2) {
          styleClass = document.getElementsByClassName('pswp__zoom-wrap')[1].style.transform;
        } else {
          styleClass = document.getElementsByClassName('pswp__zoom-wrap')[(index + 1) % 3].style.transform;
        }
        styleClass = styleClass.substring(styleClass.indexOf(')') + 1);
        this.scale = styleClass.substring(styleClass.indexOf('(') + 1, styleClass.indexOf(')'));
        if(this.doubleT == 2){
          if (parseFloat(this.scale) <= 1.07) {
            this.showOrHideControl(true);
          } else {
            this.showOrHideControl(false);
          }
          this.doubleT = 0;
        }else  if ( this.doubleT == 1) {
          if(this.swipeStop == 1){
            this.swipeStop = 0;
            this.doubleT = 0;
            return;
          }
          if(parseFloat(this.scale) <= 1.07 ){
            this.showOrHideControl();
          }else{
            this.showOrHideControl(false);
          }
        } 
        this.doubleT = 0;
      }
    }.bind(this));
  }

  /**
   * 更新进度条
   */
  updateProgress() {
    let pageIndex = this.gallery.getCurrentIndex();
    let pageTotal = this.carouselData.length;
    this.setState({
      currentPage: this.gallery.getCurrentIndex() + 1
    });
    let bar = 0 ;
    let left = (1 - bar) / (pageTotal - 1) * (pageIndex) * 98 === 0 ? 0: (1 - bar) / (pageTotal - 1) * (pageIndex) * 99 ;
    let right = 99 - left ;
    this.setState({
      progress: {
        leftWidth: left,
        rightWidth: right
      }
    });
    if (pageIndex === 0) {
      this.setState({
        previousColor: '#888888',
        NextColor: 'white',
        rightProgress:'progressRight1'
      });
    } else if (pageIndex > 0 && pageIndex < (pageTotal - 1)) {
      this.setState({
        previousColor: 'white',
        NextColor: 'white',
        rightProgress:'progressRight',
        leftProgress:'progressLeft'
      });
    }
    else if (pageIndex === (pageTotal - 1)) {
      this.setState({
        previousColor: 'white',
        NextColor: '#888888',
        leftProgress:'progressLeft1'
      });
      this.handleOver();
    }
  }

   /**
   * 仅仅更新进度条
   */
  updateProgressOnly(left,right) {
    let bar = 0 ;
    this.setState({
      progress: {
        leftWidth: left,
        rightWidth: right
      }
    });
  }

  /**
   * 显示、隐藏图片以外的控件
   */
  showOrHideControl(param) {
    try {
      if (param == undefined) {
        if (this.refs.handleFoot.className === 'handleFoot handleFootEnter') {
          this.refs.handleFoot.className = 'handleFoot handleFootHide';
          this.refs.headerBar.className = 'headerBarHide headerBar';
        } else {
          this.refs.handleFoot.className = 'handleFoot handleFootEnter';
          this.refs.headerBar.className = 'headerBarEnter headerBar';
        }
      } else if (param) {
        this.refs.handleFoot.className = 'handleFoot handleFootEnter';
        this.refs.headerBar.className = 'headerBarEnter headerBar';
      } else {
        this.refs.handleFoot.className = 'handleFoot handleFootHide';
        this.refs.headerBar.className = 'headerBarHide headerBar';
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 处理搭建完毕的后续操作
   */
  async handleOver() {
    let result = await this.refs.CompeletBuildModal.open();
    if (result === true) {
      this.props.history.push(`/control/${this.indexImage}`);
    }
  }

  /**
   * 获得div相对位置X方向
   */
  getX(obj) {
    var parObj = obj;
    var left = obj.offsetLeft;
    while (parObj = parObj.offsetParent) {
      left += parObj.offsetLeft;
    }
    return left;
  }

  /**
   * 获得div相对位置X方向
   */
  getY(obj) {
    var parObj = obj;
    var top = obj.offsetTop;
    while (parObj = parObj.offsetParent) {
      top += parObj.offsetTop;
    }
    return top;
  }

  /**
   * 防止多次点击
   */
  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }
}