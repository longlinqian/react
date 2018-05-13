import React from 'react'
import robotManage from '../../services/robot/RobotManage'
import SettingPanel from './components/SettingPanel.jsx'
import FirmwareModal from './components/FirmwareModal.jsx'
import AboutUsModal from './components/AboutUsModal.jsx'
import CheckUpdate from './components/CheckUpdate.jsx'
import ConnectionView from '../Home/components/ConnectionView.jsx'
import LanguageModal from './components/LanguageModal.jsx'
import local from '../../utils/Local'

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      ble: false,
    }
  }

  componentDidMount() {
    //TODU
  }
  // <div className="areaD" onTouchTap={this.goTouchTap.bind(this, 4)}></div>
  render() {
    let bleIcon = this.state.ble ? 'bleConnect' : 'bleDisconnect';
    return (
      <div className="indexPage">
       <div className="setting" onTouchTap={this.settingButtonTouchTap.bind(this)}>
        <div className="settingButton" >
        </div>
      </div>
        {/*<div className="connectionButton" onTouchTap={this.connectionButtonTouchTap.bind(this)}>*/}
          {/*<div className={bleIcon}></div>*/}
        {/*</div>*/}
        <div className="workspace">
          <div className="areaA" onTouchTap={this.goTouchTap.bind(this, 1)}></div>
          <div className="areaB" onTouchTap={this.goTouchTap.bind(this, 2)}></div>
          <div className="areaC" onTouchTap={this.goTouchTap.bind(this, 3)}></div>
          
          <div className="textA" onTouchTap={this.goTouchTap.bind(this, 1)}>{local.data.Q_corps}</div>
          <div className="textB" onTouchTap={this.goTouchTap.bind(this, 2)}>{local.data.Q_scout}</div>
          <div className="textC" onTouchTap={this.goTouchTap.bind(this, 3)}>{local.data.Home_Menu_2}</div>
        </div>
        <SettingPanel ref="settingPanel" onLanguageModal={this.onLanguageModal.bind(this)} showAboutUsModal={this.showAboutUsModal.bind(this)} showCheckUpdate={this.showCheckUpdate.bind(this)}  onfirmwareModal={this.showfirmwareModal.bind(this)} closefirmwareModal={this.closefirmwareModal.bind(this)}/>
        <FirmwareModal ref="firmwareModal" />
        <AboutUsModal ref="aboutUsModal" />
        <LanguageModal ref="languageMode" />
        <CheckUpdate ref="checkUpdate"/>
        <ConnectionView ref="connectionView" onBack={this.connectionControlBack.bind(this)}></ConnectionView>
      </div>
    );
  }

  /**
   * 跳转到不同的链接
   * @param index
   */
  goTouchTap(index) {
    switch (index) {
      case 1:
        this.props.history.push('/list/k1');
        break;
      case 2:
        this.props.history.push('/list/k2');
        break;
      case 3:
        this.props.history.push('/app');
        break;
      case 4:
        this.props.history.push('/testBle');
        break;
    }
  }

  settingButtonTouchTap() {
    this.refs.settingPanel.open();
  }

  /**
   * 进入机器人连接窗口
   */
  connectionButtonTouchTap() {
    this.refs.connectionView.open();
  }

  /**
   * 蓝牙连接机器人的回调函数
   * @param {*} isSuccess
   */
  async connectionControlBack(isSuccess) {
    try{
      if (isSuccess) {
        this.onConnection();
      } else {
        let robot = robotManage.getCurrentRobot();
        if (!robot) {
          this.onDisConnect();
        }
      }
    }catch(error){
      console.error(error);
    }
  }

  onConnection() {
    let robot = robotManage.getCurrentRobot();
    this.setState({
      ble: true
    });
  }

  onDisConnect() {
    this.setState({
      ble: false,
    });
  }

  async showfirmwareModal(version){
    return await this.refs.firmwareModal.open(version);
  }

  closefirmwareModal(){
    this.refs.firmwareModal.close();
  }

  showAboutUsModal() {
    this.refs.aboutUsModal.show();
  }

  hideAboutUsModal() {
    this.refs.aboutUsModal.hide();
  }

  onLanguageModal(ty) {
    console.log('chagelanguageModal:---'+ ty);
    if(ty)this.refs.languageMode.show();
    else this.refs.languageMode.hide();
  }

  async showCheckUpdate(mode,curVersion,lastVersion){
    return await this.refs.checkUpdate.show(mode,curVersion,lastVersion);
  }
}