import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import local from '../../../utils/Local.js'

export default class ConnectionDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      // 1:打开蓝牙；2 连接失败；3 断开连接
      modle: 1
    };
  }

  render() {
    let modleUi = null;
    if (this.state.modle === 1) {
      modleUi = this.renderOpenBle();
    } else if (this.state.modle === 3) {
      modleUi = this.renderDisconnect();
    } else {
      modleUi = this.renderConnectFail();
    }
    return (
      <div className="connectionDialog">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    {modleUi}
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

  renderOpenBle() {
    return (
      <div className="box">
      <div className="title">{local.data.common_prompt}</div>
        <div className="content1">{local.data.Common_connect_content_1}。</div>
        <div className="submitButton2" onTouchTap={this.submitButtonTouchTap.bind(this, 11)}>{local.data.Common_comfirm}</div>
      </div>
    );
  }

  renderConnectFail() {
    return (
      <div className="box">
      <div className="title">{local.data.common_prompt}</div>
        <div className="content1">{local.data.Common_connect_content_2}。</div>
        <div className="cancelButton" onTouchTap={this.cancelButtonTouchTap.bind(this)}>{local.data.Common_close}</div>
        <div className="submitButton" onTouchTap={this.submitButtonTouchTap.bind(this, 21)}>{local.data.Common_retry}</div>
      </div>
    );
  }

  renderDisconnect() {
    return (
      <div className="box">
      <div className="title">{local.data.common_prompt}</div>
        <div className="content1">{local.data.Common_connect_content_3}？</div>
        <div className="cancelButton" onTouchTap={this.cancelButtonTouchTap.bind(this)}>{local.data.Common_cancel}</div>
        <div className="submitButton" onTouchTap={this.submitButtonTouchTap.bind(this, 31)}>{local.data.Common_break}</div>
      </div>
    );
  }

  submitButtonTouchTap(type) {
    this.setState({
      isShow: false
    });
    if (this.props.onBack) {
      this.props.onBack(type);
    }
  }

  cancelButtonTouchTap() {
    this.setState({
      isShow: false
    });
  }

  open(modle) {
    this.setState({
      isShow: true,
      modle: modle
    });
  }
}