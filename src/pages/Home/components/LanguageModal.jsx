import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import toast from '../../../components/Toast.jsx'
import robotManage from '../../../services/robot/RobotManage'
import local from '../../../utils/Local.js'

export default class LanguageModal extends React.Component {
  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      isShow: false,
      sele: local.type - 1
    };
    this.languages = [
      'English',
      '中文',
      '한국어',
      'Français',
      'Español'
    ];
    this.language = 0;
  }

  componentDidMount() {
    // console.log(local.type);
    // document.getElementById("sel")[0].selected = true;
  }

  render() {
    return (
      <div className="languageMode">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow) {
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                    {(() => {
                      return (
                        <div className='box' onTouchTap={this.closeStopTouchTap.bind(this)}>
                          <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                            <div className="close"></div>
                          </div>
                          <div className="settingLanguage">{local.data.Home_settingLanguage}</div>
                        
                          <nav className="nav">
                            <ul className="nav_menu">
                              <li className="nav_menu-item" >
                                <a onTouchTap={this.openLanguage.bind(this)}>{this.languages[this.state.sele]}</a>
                                <ul className="nav_submenu" id="nav_submenu">
                                  <li className="nav_submenu-item" onTouchTap={this.changeLanguage.bind(this,0)}> {this.languages[0]}</li>
                                  <li className="nav_submenu-item" onTouchTap={this.changeLanguage.bind(this,1)}> {this.languages[1]}</li>
                                  <li className="nav_submenu-item" onTouchTap={this.changeLanguage.bind(this,2)}> {this.languages[2]}</li>
                                  <li className="nav_submenu-item" onTouchTap={this.changeLanguage.bind(this,3)}> {this.languages[3]}</li>
                                  <li className="nav_submenu-item" onTouchTap={this.changeLanguage.bind(this,4)}> {this.languages[4]}</li>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                          <div className="buttonBox"><div className="buttonBoxText" onTouchTap={this.setButton.bind(this)} >{local.data.Common_sure}</div></div>
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

  changeLanguage(e) {
    var v = e;
    this.setState({ sele: v });
    this.language = parseInt(v) ;
    document.getElementById("nav_submenu").style.display='none';
  }

  async setButton() {
    if (this.language === '0') return;
    local.setData(this.language+1);
    try{
      let robot = robotManage.getCurrentRobot();
      if (robot) {
        await robotManage.disconnectRobot(robot);
      }
    }catch (error)
    {
      console.log(error);
    }
    this.setState({
      connectionFlag: 0
    });
    location.reload();
  }

  openLanguage(){
    document.getElementById("nav_submenu").style.display='block';
  }

  closeStopTouchTap(event) {
    event.stopPropagation();
    // event.preventDefault()
  }

  closeButtonTouchTap(e) {
    this.setState({
      isShow: false
    });
  }
}