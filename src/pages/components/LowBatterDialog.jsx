import EventEmitter from 'events'
import React from 'react'
import local from '../../utils/Local.js'

export default class LowBatterDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
    };
    this.lastTime = undefined;
  }

  render() {
    if (this.state.isShow) {
      return (
        <div className="lowBatterDialog">
          <div className="masking"></div>
          <div className="container">
            <div className="box">
              <div className="info">{local.data.low_power_hint}</div>
              <div className="submitButton" onTouchTap={this.submitButtonTouchTap.bind(this)}>{local.data.Common_comfirm}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
    ;
  }

  submitButtonTouchTap() {
    this.setState({
      isShow: false
    });
  }

  open() {
    if (this.state.isShow)return;
    let now = (new Date()).getTime();
    //12S内不要弹多次
    if (this.lastTime && (now - this.lastTime) < 12000) {
      return;
    }
    this.lastTime = now;
    this.setState({
      isShow: true,
    });
  }
}
