import React from 'react'
import Swiper from 'swiper'
import AppView from './components/AppView.jsx'
import CreateAppModal from './components/CreateAppModal.jsx'
import EditAppModal from './components/EditAppModal.jsx'
import RemoveAppModal from './components/RemoveAppModal.jsx'
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
        <div className="links">
          {local.data.Home_Menu_2}
        </div>
        <div className="backButton" onTouchTap={this.backButtonTouchTap.bind(this)}></div>
        <div className="views">
          <div id="pageSwiper" className="swiper-container" style={{ height: '100%' }}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <AppView ref="appView" onCreate={this.appViewCreate.bind(this)} onEdit={this.appViewEdit.bind(this)} onRemove={this.appViewRemove.bind(this)} onContral={this.appViewControl.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <CreateAppModal ref="createAppModal" />
        <EditAppModal ref="editAppModal" />
        <RemoveAppModal ref="removeAppModal" />
      </div>
    );
  }

  backButtonTouchTap() {
    this.props.history.goBack();
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
}