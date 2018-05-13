import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import robotManage from './services/robot/RobotManage'
import enums from './enums'
import LowBatterDialog from './pages/components/LowBatterDialog.jsx'
//页面
import Index from './pages/Home/Index.jsx'
import Home from './pages/Home/Home.jsx'
import App from './pages/Home/App.jsx'
import RobotList from './pages/Home/RobotList.jsx'
import Control1 from './pages/Controls/Control1.jsx'
import MyProject from './pages/Code/MyProject2.jsx'
import Build from './pages/Home/Build.jsx'
//test
import TestBle from './pages/Home/TestBle.jsx'

export default class Container extends React.Component {
  constructor() {
    super();
    robotManage.regListenOnDataComplete('container',this.listenOnDataComplete.bind(this));
  }

  componentDidMount(){
  }

  componentWillUnmount() {
    robotManage.removeListenOnDataComplete('container');
  }

  render() {
    return (
      <HashRouter>
        <div style={{ height: '100%' }}>
          {/*<Route exact path="/" component={Home} />*/}
          <Route exact path="/" component={Index} />
          <Route exact path="/app" component={App} />
          <Route exact path="/testBle" component={TestBle} />
          <Route exact path="/list/:version" component={RobotList} />
          <Route exact path="/control/:index" component={Control1} />
          <Route exact path="/myproject/:index" component={MyProject} />
          <Route exact path="/build/:index" component={Build} />
          <LowBatterDialog ref="lowBatterDialog" />
        </div>
      </HashRouter>
    );
  }

  /**
   * 监听蓝牙反馈信息
   * @param buffer
   * @param robotId
   */
  listenOnDataComplete(buffer,robotId){
    let orderId = buffer.readUInt8(3, false);
    if(orderId !==0)return;
    let action = buffer.readUInt8(4, false);
    if(action === enums.robot.autoAction.low_battery){
      this.showLowBatter();
    }
  }

  /**
   * 显示低电弹窗：如果已打开就不要重打
   */
  showLowBatter() {
    this.refs.lowBatterDialog.open();
  }
}