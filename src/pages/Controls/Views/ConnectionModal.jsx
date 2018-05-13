import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import local from '../../../utils/Local.js'

export default class RemoveAppModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false,
      imageClass:'',
      imageSrc:'res/images/carousel/0011.jpg'
    };
  }

  render() {
    return (
      <div className="bluetoothConnectionModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    <div className={this.state.imageSrc}>
                      <div className="title">{this.state.imageClass}</div>
                      <div className="content">
                      </div>
                      <button className="submitButton" onTouchTap={this.submitButtonTouchTap.bind(this)}>{local.data.Common_sure}</button>
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
    this.emitter.emit('close');
  }

  submitButtonTouchTap(e) {
    e.preventDefault();
    try {
      this.emitter.emit('close', true);
    } catch (e) {
      toast.error(e, 2000);
    }
  }

  async open(imageClass,imageSrc1) {
    this.setState({
      imageClass:imageClass,
      imageSrc: imageSrc1
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

  close(e) {
    e.preventDefault();
    this.setState({
      isShow: false
    });
  }
}