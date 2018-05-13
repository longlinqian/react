import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import robotManage from '../../../services/robot/RobotManage.js'
import local from '../../../utils/Local.js'

export default class RemoveAppModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      content:'',
      isShow: false
    };
  }

  render() {
    return (
      <div className="ControlLeaveModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    <div className="box">
                      <div className="title">{local.data.common_prompt}}</div>
                      <div className="content">{this.state.content}</div>
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
      let robot = robotManage.getCurrentRobot();
      if (robot) {
        robot.disconnect();
      }
      this.emitter.emit('close', true);
    } catch (e) {
      toast.error(e, 2000);
    }
  }

  async open(text) {
    this.setState({
      content:text
    });
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