import React from 'react'
import Swiper from 'swiper'
import ShapeView from './components/ShapeView.jsx'
import AppView from './components/AppView.jsx'
import ShapeDetailModal from './components/ShapeDetailModal.jsx'
import CreateAppModal from './components/CreateAppModal.jsx'
import EditAppModal from './components/EditAppModal.jsx'
import RemoveAppModal from './components/RemoveAppModal.jsx'
import SettingPanel from './components/SettingPanel.jsx'
import FirmwareModal from './components/FirmwareModal.jsx'
import AboutUsModal from './components/AboutUsModal.jsx'
import CheckUpdate from './components/CheckUpdate.jsx'
import local from '../../utils/Local'

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'shape'
    };
  }

  componentDidMount() {
    this.swiper = new Swiper('#pageSwiper', {
      onlyExternal: true
    });
    document.onselectstart = function(){
      event.returnValue = false;
    }
    // 或者直接返回整个事件
    document.onselectstart = function(){
        return false;
    }
    // 判断当前的slide，方便返回时能正确显示相应的slide
    if (this.props.location.search === '?slide=app') {
      this.swiper.slideTo(1, 0, false);
      this.setState({
        view: 'app'
      });
    }
  }

  render() {
    return (
      <div className="homePage">
        {(() => {
          let shapeClassName = this.state.view === 'shape' ? 'link active' : 'link';
          let appClassName = this.state.view === 'app' ? 'link active' : 'link';
          return (
            <div className="links">
              <a  className={shapeClassName} onTouchTap={this.shapeLinkTouchTap.bind(this)}>{local.data.Home_Menu_1}</a>
              <a  className={appClassName} onTouchTap={this.appLinkTouchTap.bind(this)}>{local.data.Home_Menu_2}</a>
            </div>
          );
        })()}
        <div className="setting" onTouchTap={this.settingButtonTouchTap.bind(this)}>
          <div className="settingButton" >
          </div>
        </div>
        <div className="views">
          <div id="pageSwiper" className="swiper-container" style={{ height: '100%' }}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <ShapeView ref="shapeView" onDetail={this.shapeViewDetail.bind(this)} onControl={this.shapeViewControl.bind(this)} onBuild={this.shapeViewBuild.bind(this)} />
              </div>
              <div className="swiper-slide">
                <AppView ref="appView" onCreate={this.appViewCreate.bind(this)} onEdit={this.appViewEdit.bind(this)} onRemove={this.appViewRemove.bind(this)} onContral={this.appViewControl.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <ShapeDetailModal ref="shapeDetailModal" />
        <CreateAppModal ref="createAppModal" />
        <EditAppModal ref="editAppModal" />
        <RemoveAppModal ref="removeAppModal" />
        <SettingPanel ref="settingPanel" showAboutUsModal={this.showAboutUsModal.bind(this)} showCheckUpdate={this.showCheckUpdate.bind(this)}  onfirmwareModal={this.showfirmwareModal.bind(this)} closefirmwareModal={this.closefirmwareModal.bind(this)}/>
        <FirmwareModal ref="firmwareModal" />
        <AboutUsModal ref="aboutUsModal" />
        <CheckUpdate ref="checkUpdate"/>
      </div>
    );
  }

  shapeLinkTouchTap() {
    this.refs.shapeView.reset();
    this.setState({
      view: 'shape'
    });
    this.props.history.push('/?slide=shape');
    this.swiper.slideTo(0, 500, false);
  }

  appLinkTouchTap() {
    this.refs.appView.reset();
    this.setState({
      view: 'app'
    });
    this.props.history.push('/?slide=app');
    this.swiper.slideTo(1, 500, false);
  }

  settingButtonTouchTap() {
    this.refs.settingPanel.open();
  }

  shapeViewDetail(shapeId) {
    this.refs.shapeDetailModal.open(shapeId);
  }

  shapeViewControl(index){
    this.props.history.push('/control/'+index);
  }

  shapeViewBuild(index){
    this.props.history.push('/build/'+index);
  }

  async appViewCreate() {
    return await this.refs.createAppModal.open();
  }

  async appViewEdit(project) {
    return await this.refs.editAppModal.open(project);
  }

  appViewControl(index) {
    this.props.history.push('/myproject/'+index);
  }

  async appViewRemove(project) {
    return await this.refs.removeAppModal.open(project);
  }

  // async showfirmwareModal(mode,flag){
  //   if(mode === 0){
  //     return await this.refs.firmwareModal.open(local.data.Setting_content_2+'...', '',0);
  //   }else if(mode === 1){
  //     return await  this.refs.firmwareModal.open(local.data.Setting_content_1, '',1);
  //   }else if(mode === 2){
  //     return await  this.refs.firmwareModal.open(local.data.Setting_content_3, '',2);
  //   }else if(mode == 3){
  //     if(flag == true){
  //       return await  this.refs.firmwareModal.open(local.data.Setting_content_4+'!', '',3);
  //     }else{
  //       return await  this.refs.firmwareModal.open(local.data.Setting_content_5+'!', '',3);
  //     }
  //   }
  // }
  async showfirmwareModal(version){
    return await this.refs.firmwareModal.open(version);
  }

  closefirmwareModal(){
    this.refs.firmwareModal.close();
  }

  showAboutUsModal() {
    this.refs.aboutUsModal.show();
  }

  hideAboutUsModal() {
    this.refs.aboutUsModal.hide();
  }
 async showCheckUpdate(mode,curVersion,lastVersion){
   return await this.refs.checkUpdate.show(mode,curVersion,lastVersion);
  }
}