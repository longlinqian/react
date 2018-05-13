import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import projectService from '../../../services/ProjectService'
import local from '../../../utils/Local.js'

export default class RemoveAppModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false
    };
  }

  render() {
    return (
      <div className="removeAppModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    <div className="box">
                      <div className="title">{local.data.Common_delete_title}</div>
                      <div className="content">{local.data.Common_delete_content_1},<br />
                        {local.data.Common_delete_content_2}？</div>
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

  cancelButtonTouchTap(e) {
    e.preventDefault();
    this.emitter.emit('close');
  }

  submitButtonTouchTap(e) {
    e.preventDefault();
    try {
      projectService.remove(this.project.id);
      this.emitter.emit('close', true);
    } catch (e) {
      toast.error(e, 2000);
    }
  }

  async open(project) {
    this.project = project;
    return new Promise((resolve, reject) => {
      this.setState({
        isShow: true
      });
      this.emitter.on('close', (result) => {
        this.setState({
          isShow: false
        });
        resolve(result);
      });
    });
  }
}