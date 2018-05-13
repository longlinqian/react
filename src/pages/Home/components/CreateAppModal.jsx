import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import CoverSelect from './CoverSelect.jsx'
import toast from '../../../components/Toast.jsx'
import projectService from '../../../services/ProjectService'
import local from '../../../utils/Local.js'

export default class CreateAppModal extends React.Component {
  constructor() {
    super();
    this.title = local.data.MyProject_creact;
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false
    };
    this.actionflag = [0, 0, 0, 0];
  }

  render() {
    return (
      <div className="createAppModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    <div className="box">
                      <div className="title">{this.title}</div>
                      <div className="form">
                        <input type="text" className="nameText" defaultValue={this.value.name} onChange={this.nameTextChange.bind(this)} />
                        <CoverSelect defaultValue={this.value.cover} onChange={this.coverSelectChange.bind(this)} />
                      </div>
                      <button className="cancelButton" onTouchTap={this.cancelButtonTouchTap.bind(this)}>{local.data.Common_cancel}</button>
                      <button className="submitButton" onTouchTap={this.submitButtonTouchTap.bind(this)}>{local.data.Common_comfirm}</button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </ReactTransitionGroup>
      </div>
    );
  }

  nameTextChange(e) {
    this.value.name = e.target.value;
  }

  coverSelectChange(value) {
    this.value.cover = value;
  }

  cancelButtonTouchTap(e) {
    e.preventDefault();
    this.emitter.emit('close');
  }

  submitButtonTouchTap(e) {
    e.preventDefault();
    if (this.delayEvent(0, 1800)) return;
    this.submit();
  }

  async open() {
    return new Promise((resolve, reject) => {
      this.setDefault();
      this.setState({
        isShow: true
      });
      this.emitter.on('close', (project) => {
        this.setState({
          isShow: false
        });
        resolve(project);
      });
    });
  }

  setDefault() {
    this.value = {
      name: local.data.Home_Menu_text,
      cover: 'cover_1.png'
    };
  }

  submit() {
    try {
      let project = projectService.create(this.value.name, this.value.cover);
      this.emitter.emit('close', project);
    } catch (e) {
      toast.error(e, 2000);
    }
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