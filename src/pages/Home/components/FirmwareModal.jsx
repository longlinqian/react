import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import local from '../../../utils/Local.js'

export default class FirmwareModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false,
      imageClass: '',
      imageSrc: '',
      mode: 0,
      site : 1,
      version: '',
    };
  }

  render() {
    return (
      <div className="firmwareModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    {/*{(() => {*/}
                      {/*if (this.state.mode == 0) {*/}
                        {/*return (*/}
                          {/*<div className='box'>*/}
                            {/*<div className="title">{this.state.imageClass}</div>*/}
                          {/*</div>*/}
                        {/*)*/}
                      {/*} else if (this.state.mode == 1) {*/}
                        {/*return (*/}
                          {/*<div className='box'>*/}
                            {/*<div className="title1">{this.state.imageClass}</div>*/}
                            {/*<button className="submitLeftButton" onTouchTap={this.cancelButtonTouchTap.bind(this)}>{local.data.Common_cancel}</button>*/}
                            {/*<button className="submitRightButton" onTouchTap={this.submitButtonTouchTap.bind(this)}>{local.data.Common_comfirm}</button>*/}
                          {/*</div>*/}
                        {/*)*/}
                      {/*} else if (this.state.mode == 2) {*/}
                        {/*return (*/}
                          {/*<div className='box'>*/}
                            {/*<div className="title2">{this.state.imageClass}</div>*/}
                            {/*<div className="progressBg">*/}
                              {/*<div className="progressText" style={{'width':this.state.site+'%'}}></div>*/}
                            {/*</div>*/}
                          {/*</div>)*/}
                    {/*}else if(this.state.mode == 3){*/}
                      {/*return (*/}
                        {/*<div className='box'>*/}
                        {/*<div className="closeButton" onTouchTap={this.close.bind(this)}>*/}
                        {/*<div className="close"></div>*/}
                        {/*</div>*/}
                          {/*<div className="title3">{this.state.imageClass}</div> */}
                        {/*</div>)*/}
                    {/*}*/}
                    {/*})()}*/}
                    <div className='box'>
                      <div className="closeButton" onTouchTap={this.close.bind(this)}>
                        <div className="close"></div>
                      </div>
                      <div className="info">{local.data.Firmware_information}</div>
                      <div className="current">{local.data.Current_version}</div>
                      <div className="version">{this.state.version}</div>
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
    // e.preventDefault();
    this.emitter.emit('close', false);
  }

  submitButtonTouchTap(e) {
    e.preventDefault();
    try {
      this.emitter.emit('close', true);
    } catch (e) {
      toast.error(e, 2000);
    }
  }
  async open(version) {
    this.setState({
      isShow: true,
      version: version
    });
  }

  close(e) {
    //e.preventDefault();
    this.setState({
      isShow: false
    });
  }

  /**
   * 等待
   */
  async wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
}