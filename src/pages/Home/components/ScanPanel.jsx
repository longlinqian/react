import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import robotManage from '../../../services/robot/RobotManage'
import local from '../../../utils/Local.js'

export default class ScanPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      isScan: false,
      list: []
    };
  }

  render() {
    return (
      <div className="scanPanel">
        <ReactTransitionGroup transitionName="panel" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div key="scan">
                  <div className="masking"></div>
                  <div key="panel" className="panel">
                    <div className="header">
                      <div className="scanRefreshButton" onTouchTap={this.refreshButtonTouchTap.bind(this)}>
                        <div className="scanRefresh"></div>
                      </div>
                      <div className="title">{local.data.Connection_device}</div>
                      <div className="scanCloseButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                        <div className="scanClose"></div>
                      </div>
                    </div>
                    {this.state.isScan ? this.renderScanWaiting() : this.renderShowScanList()}
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

  renderShowScanList() {
    let list = this.state.list.map((item, index) => {
      const number = Number(item.rssi);
      return (
        <div className="item" key={index} onTouchTap={this.connectButtonTouchTap.bind(this, item.id)}>
          <div className="name">{robotManage.formatName(item.name, item.id)}</div>
          <div className="rssi">
            <div className={`icon ${robotManage.rssiToCss(number)}`}></div>
          </div>
        </div>
      );
    });
    return (
      <div className="bleList">
        {list}
      </div>
    );
  }

  renderScanWaiting() {
    return (
      <div className="loading">
        <div className="fa fa-spinner fa-pulse fa-3x fa-fw"></div>
      </div>
    );
  }

  async refreshButtonTouchTap() {
    this.refresh();
  }

  connectButtonTouchTap(deviceId) {
    if (this.props.onConnect) {
      this.props.onConnect(deviceId);
    }
    this.setState({
      isShow: false
    });
  }

  closeButtonTouchTap() {
    this.setState({
      isShow: false
    });
  }

  open() {
    this.setState({
      isShow: true
    });
    this.refresh();
  }

  async refresh() {
    if (this.state.isScan) {
      return;
    }
    const bleIsEnabled = await robotManage.bleIsEnabled();
    if (!bleIsEnabled) {
      return;
    }
    this.setState({
      list: [],
      isScan: true
    });
    const robotList = await robotManage.getScanList();
    const deviceList = robotManage.getDeviceList(robotList);
    this.setState({
      list: deviceList,
      isScan: false
    });
  }
}