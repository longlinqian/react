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
      isShow: false
    };
  }

  render() {
    return (
      <div className="aboutUsModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container"  onTouchTap={this.closeButtonTouchTap.bind(this)}>
                    {(() => {
                      return (
                        <div className='box' onTouchTap={this.closeStopTouchTap.bind(this)}>
                          <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                            <div className="close"></div>
                          </div>
                          <div className="logo"></div>
                          <div className="copyright">{local.data.About_us_content}</div>
                          <div className="website" onTouchTap={this.link.bind(this)}>http://www.robobloq.com</div>
                          <div className="email">E-mail:support@robobloq.com</div>
                        </div>
                      )
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

  async show() {
    this.setState({
      isShow: true
    })
  }

  hide() {
    this.setState({
      isShow: false
    })
  }

  closeButtonTouchTap(e) {
    this.setState({
      isShow: false
    });
  }

  closeStopTouchTap(event){
    event.stopPropagation();
    event.preventDefault()
  }

  link(){
    window.open("http://www.robobloq.com"); 
  }
}