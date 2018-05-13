import React from 'react'
import Swiper from 'swiper'
import AppItem from './AppItem.jsx'
import UIConvert from '../../../utils/UIConvert'
import projectService from '../../../services/ProjectService'
import local from '../../../utils/Local.js'

export default class AppView extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: projectService.getAll()
    };
  }

  componentDidMount() {
    let width = UIConvert.restore(627);
    this.swiper = new Swiper('#appSwiper', {
      pagination: '#appSwiperPagination',
      width: width,
      slidesPerView: 3,
      paginationClickable: false
    });
  }

  componentDidUpdate() {
    this.swiper.update(true);
  }

  render() {
    return (
      <div className="appView" onTouchStart={this.appViewTouchStart.bind(this)}>
        <div className="list">
          <div id="appSwiper" className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="create" onTouchTap={this.createTouchTap.bind(this)}>
                  <div className="createIcon"></div>
                  <div className="createTitle text-ellipsis">{local.data.MyProject_new}</div>
                </div>
              </div>
              {(() => {
                return this.state.projects.map((project, index) => {
                  return (
                    <div key={index} className="swiper-slide" >
                      <AppItem ref={`appItem${index}`} project={project} onEdit={this.appItemEdit.bind(this, project)} onRemove={this.appItemRemove.bind(this, project)} onView={this.itemTouchTap.bind(this, project)} />
                    </div>
                  );
                });
              })()}
            </div>
          </div>
          <div id="appSwiperPagination" className="swiper-pagination"></div>
        </div>
      </div>
    );
  }

  appViewTouchStart() {
    for (let key in this.refs) {
      if (key.indexOf('appItem') === 0) {
        this.refs[key].closeMenu();
      }
    }
  }

  async createTouchTap() {
    let result = await this.props.onCreate();
    if (result) {
      this.refresh();
    }
  }

  async appItemEdit(project) {
    let result = await this.props.onEdit(project);
    if (result) {
      this.refresh();
    }
  }

  async appItemRemove(project){
    let result = await this.props.onRemove(project);
    if (result) {
      this.refresh();
    }
  }

  refresh() {
    this.setState({
      projects: projectService.getAll()
    });
  }

  reset() {
    this.swiper.slideTo(0);
  }

  itemTouchTap(project) {
    let index = project.id ;
    this.props.onContral(index);
  }
}