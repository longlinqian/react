import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import local from '../../../utils/Local.js'

export default class AboutUsModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false,
      mode: '',
      curVersion: '',
      lastVersion: ''
    };
  }

  render() {
    return (
      <div className="checkUpdateModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    {(() => {
                      switch (this.state.mode) {
                        case 0:
                          return (
                            <div className='box'>
                              <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                                <div className="close"></div>
                              </div>
                              <div className="curVersionText1">当前是最新版本:{this.state.curVersion}</div>
                              <button className="submitButton2" onTouchTap={this.close.bind(this)}>{local.data.Common_comfirm}</button>
                            </div>
                          );
                          break;
                        case 1:
                          return (
                            <div className='box'>
                              <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                                <div className="close"></div>
                              </div>
                              <div className="curVersionText">当前版本:{this.state.curVersion}</div>
                              <div className="lastVersionText">最新版本:{this.state.lastVersion}</div>
                              <button className="cancelButton" onTouchTap={this.close.bind(this)}>{local.data.Common_cancel}</button>
                              <button className="submitButton" onTouchTap={this.submit.bind(this)}>{local.data.Common_comfirm}</button>
                            </div>
                          );
                          break;
                        case 2:
                          return (
                            <div className='box'>
                              <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                                <div className="close"></div>
                              </div>

                            </div>
                          )
                          break;
                      }

                    })()}

                  </div>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </ReactTransitionGroup>
      </div>
    )
  }

  async show(mode,curVersion,lastVersion) {
    this.setState({
      mode: mode,
      curVersion: curVersion,
      lastVersion: lastVersion
    });
    
    return new  Promise(async (resolve, reject) => {
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

  submit(e) {
    e.preventDefault();
    try {
      console.log('true');
      this.emitter.emit('close', true);
    } catch (e) {
      toast.error(e, 2000);
    }
  }

  close() {
    this.setState({
      isShow: false
    });
    this.emitter.emit('close', false);
  }

    closeButtonTouchTap(e) {
    this.setState({
      isShow: false
    });
  }
}