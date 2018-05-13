import React from 'react'
import robotManage from '../../services/robot/RobotManage'
import RobotBlocks from '../../services/robot/RobotBlocks'
import projectService from '../../services/ProjectService'
import ConnectionView from '../Home/components/ConnectionView.jsx'
import enums from '../../enums'
import CloseControlModal from '../Controls/Views/CloseControlModal.jsx'
import local from '../../utils/Local.js'

import "../../sass/code/myProject2.scss"

let Scratch2 = window.Scratch = window.Scratch || {};

export default class MyProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robot: undefined,
      ble: false,
      rssi: undefined
    };
    this.robotBlocks = new RobotBlocks();
    this.projectId = this.props.match.params.index == undefined ? 0 : this.props.match.params.index;
    this.projectData = undefined;
    this.oldCode = undefined;
    this.isiOS = false;
    this.projectData = projectService.get(this.projectId);
    this.robotBlocks.initData(this.robotBlocksBack.bind(this),Scratch2);
    this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0];
    this.writeToolbox();
  }

  render() {
    let title = this.projectData ? this.projectData.name : '';
    let bleIcon = this.state.ble ? 'bleConnect' : 'bleDisconnect';
    return (
      <div className="myProjectPage2">
        <div className="blocklyHead">
          <div className="backButton" onTouchTap={this.backButtonTouchTap.bind(this)}>
            <div className="goBack"></div>
          </div>
          <div className="connectionButton" onTouchTap={this.connectionButtonTouchTap.bind(this)}>
            <div className={bleIcon}></div>
          </div>
          <div className="rssiIcon">
            <div className={`icon ${robotManage.rssiToCss(this.state.rssi)}`}></div>
          </div>
          <div className="title">{title}</div>
        </div>
        <div className="blocklyBody">
          <div id="blocklyDiv"></div>
        </div>

        <ConnectionView ref="connectionView" onBack={this.connectionControlBack.bind(this)}></ConnectionView>
        <CloseControlModal ref="closeControlModal" />
        <div className="testBlock">
          <button className="button1" onClick={this.testShowList.bind(this,true)}>显示</button>
          <button className="button2" onClick={this.testShowList.bind(this,false)}>隐藏</button>
          <button className="button3" onClick={this.testSetCode.bind(this)}>设置码</button>
          <button className="button3" onClick={this.testGetCode.bind(this)}>取码</button>
        </div>
        <textarea id="blocklyCode"></textarea>
        <div className="demoList" id="testList"><div className="item" onClick={this.testSetCodeFromWeb.bind(this,1)}>圣诞歌</div></div>
      </div>
    )
  }

  componentDidMount() {
    this.initData();
    this.initRobot();
    setTimeout(() => {
      this.initWorkspace();
      this.initVirtualMachine();
    }, 1);
    setTimeout(() => {
      this.openProject();
    }, 1000);
    setTimeout(() => {
      this.startAutoSave();
    }, 2000);
    if (this.isiOS) {
      document.addEventListener('resign', this.onSleep.bind(this));
    } else {
      document.addEventListener('pause', this.onSleep.bind(this));
    }
    document.addEventListener('resume', this.onLive.bind(this));
    this.onComeIn();
  }

  componentWillUnmount() {
    robotManage.stopStateNotifications();
    if (this.isiOS) {
      document.removeEventListener('resign', this.onSleep.bind(this));
    } else {
      document.removeEventListener('pause', this.onSleep.bind(this));
    }
    document.removeEventListener('resume', this.onLive.bind(this));
    this.dispose();
    this.onGoAway();
  }

  /**
   * 返回按钮事件
   */
  async backButtonTouchTap() {
    let robot = robotManage.getCurrentRobot();
    if (robot) {
      this.onSleep(0);
      let result = false;// await this.refs.closeControlModal.open(''+ local.data.Common_discon_content1);
      if (result === true) {
        robotManage.disconnectRobot(robot);
        this.props.history.push('/?slide=app');
        return;
      }
    }
    this.props.history.push('/?slide=app');
  }

  /**
   * 进入机器人连接窗口
   */
  connectionButtonTouchTap() {
    this.onSleep(0);
    this.refs.connectionView.open();
  }

  onConnection() {
    let robot = robotManage.getCurrentRobot();
    this.setState({
      ble: true,
      robot: robot,
      rssi: -50
    });
    this.robotBlocks.setRobot(robot);
    robot.readRSSI(this.readRssiBack.bind(this));
  }

  onDisConnect() {
    this.setState({
      ble: false,
      robot: undefined,
      rssi: undefined
    });
    try {
      this.robotBlocks.setRobot(undefined);
    } catch (error) {
      console.error(error);
    }
  }

  onLive() {
    this.robotBlocks.onLive();
  }

  onSleep(type) {
    this.robotBlocks.onSleep();
  }

  //进入时处理
  async onComeIn(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        let isConn = await robot.isConnected();
        if(isConn){
          this.connectionControlBack(true);//
        }
      }
    }catch (error){}
  }

  //离开时处理
  onGoAway(){
    try{
      //查机器人是否已连接：
      let robot = robotManage.getCurrentRobot();
      if(robot){
        robot.readRSSI(undefined);
      }
    }catch (error){}
  }

  initRobot() {
    let robot = robotManage.getCurrentRobot();
    if (robot) {
      this.onConnection();
    } else {
      this.onDisConnect();
    }
  }

  /**
   * 初始化工作区
   */
  initWorkspace() {
    let toolbox = document.getElementById('toolbox-gs2');
    Scratch2.workspace = Blockly.inject('blocklyDiv', {
      comments: false,
      disable: false,
      collapse: false,
      readOnly: false,
      rtl: false,
      scrollbars: true,
      toolboxPosition: 'start',
      horizontalLayout: false,
      sounds: true,
      trashcan: true,
      media: 'blockly/s2/media/',
      toolbox: toolbox,
      grid: {
        spacing: 40,
        length: 40,
        colour: '#8c8d8d',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.6,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6,
        workspace: '#171937',
        flyout: '#2e2f50',
      },
    });
  }

  /**
   * 初始化虚拟机
   */
  initVirtualMachine() {
    const vm = new window.VirtualMachine();
    Scratch2.vm = vm;
    vm.loadProject(
      '{' +
      '"objName": "Stage",' +
      '"variables": [],' +
      '"scripts": [],' +
      '"sounds": [],' +
      '"costumes": [],' +
      '"currentCostumeIndex": 10,' +
      '"penLayerMD5": "5c81a336fab8be57adc039a8a2b33ca9.png",' +
      '"penLayerID": -1,' +
      '"tempoBPM": 60,' +
      '"videoAlpha": 0.5,' +
      '"children": [],' +
      '"info": {' +
      '"spriteCount": 1,' +
      '"swfVersion": "v454",' +
      '"userAgent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/56.0.2924.87 Safari\/537.36",' +
      '"videoOn": false,' +
      '"projectID": "119615669",' +
      '"flashVersion": "MAC 25,0,0,127",' +
      '"hasCloudData": false,' +
      '"scriptCount": 1' +
      '}' +
      '}'
    );
    Scratch2.workspace.addChangeListener(vm.blockListener);
    Scratch2.workspace.addChangeListener(vm.variableListener);
    const flyoutWorkspace = Scratch2.workspace.getFlyout().getWorkspace();
    flyoutWorkspace.addChangeListener(vm.flyoutBlockListener);
    flyoutWorkspace.addChangeListener(vm.monitorBlockListener);

    // bind data
    // VM handlers.
    // Receipt of new playground data (thread, block representations).
    vm.on('playgroundData', function (data) {
      this.updateBlockExplorer(data.blocks);
      this.updateThreadExplorer(data.threads);
    });
    // Receipt of new block XML for the selected target.
    vm.on('workspaceUpdate', function (data) {
      try {
        Scratch2.workspace.clear();
        const dom = window.Blockly.Xml.textToDom(data.xml);
        window.Blockly.Xml.domToWorkspace(dom, Scratch2.workspace);
      } catch (error) {
        console.error(error);
      }
    });
    vm.on('SCRIPT_GLOW_ON', function (data) {
      Scratch2.workspace.glowStack(data.id, true);
    });
    vm.on('SCRIPT_GLOW_OFF', function (data) {
      Scratch2.workspace.glowStack(data.id, false);
    });
    vm.on('BLOCK_GLOW_ON', function (data) {
      Scratch2.workspace.glowBlock(data.id, true);
    });
    vm.on('BLOCK_GLOW_OFF', function (data) {
      Scratch2.workspace.glowBlock(data.id, false);
    });
    vm.on('VISUAL_REPORT', function (data) {
      Scratch2.workspace.reportValue(data.id, data.value);
    });

    vm.setGsCallback(this.gsBlockCallBack.bind(this));
    Scratch2.workspace.toolbox_.gsType = 1 ;
    vm.start();

    Scratch2.workspace.getFlyout().hide();
    Scratch2.workspace.toolbox_.flyout_.autoClose = true;
  }

  updateBlockExplorer(blocks) {
  };

  // Thread representation tab.
  updateThreadExplorer(newJSON) {
  };

  saveProject() {
    try {
      let newCode = Scratch2.vm.toJSON() || {};
      let oldCode = this.oldCode;
      if (oldCode != newCode) {
        var jsonName = 'Sc' + this.projectId;
        localStorage.setItem(jsonName, JSON.stringify(newCode));
        this.oldCode = newCode;
      }
    } catch (error) {
      this.oldCode = undefined;
        console.error(error);
    }
  }

  openProject() {
    try {
      var jsonName = 'Sc' + this.projectId;
      let data = localStorage.getItem(jsonName) || {};
      if (data ===null  || data === undefined || !data || data === "" || data === {}) {
        return;
      }
      data = JSON.parse(data);
      this.oldCode = data;
      Scratch2.vm.fromJSON(data);
    } catch (error) {
      console.error(error);
    }
  }

  async gsBlockCallBack(type, data, isWait) {
    return await this.robotBlocks.callBack(type, data, isWait);
  }

  greenFlag() {
    Scratch2.vm.greenFlag();
  }

  stopAll() {
    Scratch2.vm.stopAll();
  }

  /**
   * 释放页面用到的所有资源
   */
  dispose() {
    this.stopAutoSave();
    Scratch2.vm.clear();
    let blocklyWidgetDiv = document.getElementsByClassName("blocklyWidgetDiv");
    try{
    for(let i = 0; i < blocklyWidgetDiv.length;i++){
      blocklyWidgetDiv[0].style.display="none";
    }
  }catch(e){
    console.error(e);
  }
    // blocklyHtmlInput
    this.robotBlocks.onDispose();
    try {
      Blockly.DropDownDiv.hide();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   */
  initData() {
    let blocklyWidgetDiv = document.getElementsByClassName("blocklyWidgetDiv");
    try{
      for(let i = 0; i < blocklyWidgetDiv.length;i++){
        blocklyWidgetDiv[0].style.display="block";
      }
    }catch(e){
      console.error(e);
    }
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    robotManage.startStateNotifications(this.bleDisconnetionBack.bind(this));
  }

  /**
   * 开始自动保存
   */
  startAutoSave() {
    this.saveInterval = setInterval(() => {
      try{
        this.saveProject();
      }catch (erroe){}
    }, 200);
  }

  /**
   * 停止自动保存
   */
  stopAutoSave() {
    if (this.saveInterval) clearInterval(this.saveInterval);
    this.saveInterval = undefined;
  }

  /**
   * 蓝牙连接机器人的回调函数
   * @param {*} isSuccess
   */
  async connectionControlBack(isSuccess) {
    try {
      if (isSuccess) {
        this.onConnection();
      } else {
        let robot = robotManage.getCurrentRobot();
        if (!robot) {
          this.onDisConnect();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async robotBlocksBack(data) {
    let type = data.type;
    if (this.delayEvent(type, 600000))return;
    if (type === 0) {
      //没连接机器人
      let result = await this.refs.closeControlModal.open(local.data.Connection_robot);
      if (result === true) {
        this.refs.connectionView.open();
      }
      return;
    }
    if (type === 1) {
      //获取端口值有误；
      let result = await this.refs.closeControlModal.open(local.data.Common_port_break);
      if (result === true) {
        this.refs.connectionView.open();
      }
      return;
    }

  }

  /**
   * 蓝牙断开处理
   */
  async bleDisconnetionBack(flag) {
    if (!flag) {
      let robot = robotManage.getCurrentRobot();
      if (robot) {
        robotManage.disconnectRobot(robot);
      }
      this.onDisConnect();
      //是否在机器人连接页面
      let state = this.refs.connectionView.getState();
      if (state) {
        this.refs.connectionView.refresh();
        return;
      }
      //提示打开蓝牙
      let result = await this.refs.closeControlModal.open(local.data.Connection_Blue_open);
      if (result === true) {
        this.refs.connectionView.open();
      }
    }
  }

  /**
   * 更新信号强度
   */
  async readRssiBack(rssi) {
    let old = this.state.rssi;
    if (old && !rssi) {
      if (this.delayEvent(5, 1000)) return;
      //突然断开事件
      this.onDisConnect();
      try {
        let robot = robotManage.getCurrentRobot();
        if (robot) {
          robotManage.disconnectRobot(robot);
        }
      } catch (error) {
        console.error(error);
      }
      //600 秒提示一下
      if (this.delayEvent(6, 600000)) return;
      //提示打开连接
      try {
        //是否在机器人连接页面
        let state = this.refs.connectionView.getState();
        if (!state) {
          let result = await this.refs.closeControlModal.open(local.data.Common_device_break);
          if (result === true) {
            this.refs.connectionView.open();
          }
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }
    if (old !== rssi) {
      this.setState({
        rssi: rssi,
      });
    }
  }

  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }

  toolBoxContent(){
    return (
      '<xml id="toolbox-gs2" >'+
      '<category name="'+LOCAL.category_start +'" colour="#FFD500" secondaryColour="#CC9900">'+
      '<block type="gs_event_whenflagclicked" id="gs_event_whenflagclicked"></block>'+
      '<block type="gs_event_whenthisspriteclicked" id="gs_event_whenthisspriteclicked"></block>'+
      '</category>'+
      '<category name="'+LOCAL.category_motion +'" colour="#4C97FF" secondaryColour="#3373CC">'+
      '<block type="gs_motion_move" id="gs_motion_move">'+
      '<value name="LEFT">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="RIGHT">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_motion_move_2" id="gs_motion_move_2">'+
      '<value name="SPEED">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_motion_move_3" id="gs_motion_move_3">'+
      '<value name="SPEED">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_motion_steering_engine" id="gs_motion_steering_engine">'+
      '<value name="s1">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="s2">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_motion_external_motor" id="gs_motion_external_motor">'+
      '<value name="s1">'+
      '<shadow type="math_number">'+
      '<field name="NUM">0</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_motion_stopMove" id="gs_motion_stopMove"></block>'+
      '</category>'+
      '<category name="'+LOCAL.category_light +'" colour="#9966FF" secondaryColour="#774DCB">'+
      '<block type="gs_light_change" id="gs_light_change">'+
      '</block>'+
      '<block type="gs_light_change_2" id="gs_light_change">'+
      '<value name="RED">'+
      '<shadow type="math_number">'+
      '<field name="NUM">205</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="GREEN">'+
      '<shadow type="math_number">'+
      '<field name="NUM">92</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="BLUE">'+
      '<shadow type="math_number">'+
      '<field name="NUM">92</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_light_change_3" id="gs_light_change_3">'+
      '<value name="COLOR">'+
      '<shadow type="colour_picker">'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      //'<block type="gs_matrix_change_2" id="gs_matrix_change_2">'+
      //'</block>'+
      // '<block type="gs_matrix_change_3" id="gs_matrix_change_3">'+
      // '<value name="VALUE">'+
      // '<shadow type="gs_matrix_change_6_C">'+
      // '</shadow>'+
      // '</value>'+
      // '</block>'+
      '<block type="gs_matrix_change_4" id="gs_matrix_change_4">'+
      '</block>'+
      '<block type="gs_matrix_change_5" id="gs_matrix_change_5">'+
      '</block>'+
      '<block type="gs_matrix_change_5A" id="gs_matrix_change_5A">'+
      '</block>'+
      '<block type="gs_matrix_change_5B" id="gs_matrix_change_5B">'+
      '</block>'+
      '<block type="gs_matrix_change_5C" id="gs_matrix_change_5C">'+
      '</block>'+
      '<block type="gs_matrix_change_6" id="gs_matrix_change_6">'+
      '</block>'+
      '<block type="gs_matrix_change_6A" id="gs_matrix_change_6A">'+
      '</block>'+
      '<block type="gs_matrix_change_6B" id="gs_matrix_change_6B">'+
      '</block>'+
      '<block type="gs_matrix_change_6C" id="gs_matrix_change_6C">'+
      '</block>'+
      '<block type="gs_matrix_change_7" id="gs_matrix_change_7">'+
      '</block>'+
      '<block type="gs_matrix_change_8" id="gs_matrix_change_8">'+
      '</block>'+
      //'<block type="gs_light_ultrasonic" id="gs_light_ultrasonic">'+
      //'</block>'+
      '<block type="gs_light_ultrasonic_2" id="gs_light_ultrasonic_2">'+
      '<value name="RED">'+
      '<shadow type="math_number">'+
      '<field name="NUM">205</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="GREEN">'+
      '<shadow type="math_number">'+
      '<field name="NUM">92</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="BLUE">'+
      '<shadow type="math_number">'+
      '<field name="NUM">92</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_light_ultrasonic_3" id="gs_light_ultrasonic_3">'+
      '<value name="COLOR">'+
      '<shadow type="colour_picker">'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_light_ultrasonic_4" id="gs_light_ultrasonic_4">'+
      '</block>'+
      '</category>'+
      '<category name="'+LOCAL.category_sound +'" colour="#D65CD6" secondaryColour="#BD42BD">'+
      // '<block type="gs_sound_play" id="gs_sound_play">'+
      //   '<value name="SECOND">'+
      //     '<shadow type="math_number">'+
      //       '<field name="NUM">125</field>'+
      //     '</shadow>'+
      //   '</value>'+
      // '</block>'+
      '<block type="gs_sound_play_2" id="gs_sound_play_2">'+
      '</block>'+
      '<block type="gs_sound_play_3" id="gs_sound_play_3">'+
      '</block>'+
      '<block type="gs_sound_play_4" id="gs_sound_play_4">'+
      '</block>'+
      '<block type="gs_sound_play_5" id="gs_sound_play_5">'+
      '</block>'+
      '<block type="gs_sound_play_6" id="gs_sound_play_6">'+
      '</block>'+
      '<block type="gs_sound_play_7" id="gs_sound_play_7">'+
      '</block>'+
      '<block type="gs_sound_play_8" id="gs_sound_play_8">'+
      '</block>'+
      '</category>'+
      '<category name="'+LOCAL.category_control +'" colour="#FFAB19" secondaryColour="#CF8B17">'+
      '<block type="gs_control_wait" id="gs_control_wait">'+
      '<value name="DURATION">'+
      '<shadow type="math_positive_number">'+
      '<field name="NUM">1</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_control_forever" id="gs_control_forever"></block>'+
      '<block type="gs_control_repeat" id="gs_control_repeat">'+
      '<value name="TIMES">'+
      '<shadow type="math_positive_number">'+
      '<field name="NUM">2</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_control_repeat_until" id="gs_control_repeat_until"></block>'+
      '<block type="gs_control_if" id="gs_control_if"></block>'+
      '<block type="gs_control_if_else" id="gs_control_if_else"></block>'+
      '<block type="gs_control_wait_until" id="gs_control_wait_until"></block>'+
      '<block type="gs_control_stop" id="gs_control_stop"></block>'+
      '</category>'+
      '<category name="'+LOCAL.category_operator +'" colour="#40BF4A" secondaryColour="#389438">'+
      '<block type="gs_operator_add" id="gs_operator_add">'+
      '<value name="NUM1">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="NUM2">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_subtract" id="gs_operator_subtract">'+
      '<value name="NUM1">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="NUM2">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_multiply" id="gs_operator_multiply">'+
      '<value name="NUM1">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="NUM2">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_divide" id="gs_operator_divide">'+
      '<value name="NUM1">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="NUM2">'+
      '<shadow type="math_number">'+
      '<field name="NUM"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_random" id="gs_operator_random">'+
      '<value name="FROM">'+
      '<shadow type="math_number">'+
      '<field name="NUM">1</field>'+
      '</shadow>'+
      '</value>'+
      '<value name="TO">'+
      '<shadow type="math_number">'+
      '<field name="NUM">10</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_lt" id="gs_operator_lt">'+
      '<value name="OPERAND1">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="OPERAND2">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_equals" id="gs_operator_equals">'+
      '<value name="OPERAND1">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="OPERAND2">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_gt" id="gs_operator_gt">'+
      '<value name="OPERAND1">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '<value name="OPERAND2">'+
      '<shadow type="text">'+
      '<field name="TEXT"></field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_operator_and" id="gs_operator_and"></block>'+
      '<block type="gs_operator_or" id="gs_operator_or"></block>'+
      '<block type="gs_operator_not" id="gs_operator_not"></block>'+
      '</category>'+
      '<category name="'+LOCAL.category_sensing +'" colour="#4CBFE6" secondaryColour="#2E8EB8">'+
      '<block type="gs_sensing_distanceto" id="gs_sensing_distanceto"></block>'+
      '<block type="gs_sensing_linePatrolValue" id="gs_sensing_linePatrolValue">'+
      '<field name="PORT">6</field>'+
      '</block>'+
      '<block type="gs_sensing_lightValue" id="gs_sensing_lightValue">'+
      '<field name="PORT">3</field>'+
      '</block>'+
      '<block type="gs_sensing_voiceValue" id="gs_sensing_voiceValue">'+
      '<field name="PORT">2</field>'+
      '</block>'+
      '<block type="gs_sensing_temperatureValue" id="gs_sensing_temperatureValue">'+
      '<field name="PORT">1</field>'+
      '</block>'+
      '<block type="gs_sensing_humidityValue" id="gs_sensing_humidityValue">'+
      '<field name="PORT">1</field>'+
      '</block>'+
      '<block type="gs_sensing_mousedown" id="gs_sensing_mousedown"></block>'+
      '</category>'+
      '<category name="'+LOCAL.category_variable +'" colour="#FF8C1A" secondaryColour="#DB6E00" >'+
      '<block type="gs_data_variable" id="gs_data_variable"></block>'+
      '<block type="gs_data_setvariableto" id="gs_data_setvariableto">'+
      '<value name="VALUE">'+
      '<shadow type="math_number">'+
      '<field name="NUM">5</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '<block type="gs_data_changevariableby" id="gs_data_changevariableby">'+
      '<value name="VALUE">'+
      '<shadow type="math_number">'+
      '<field name="NUM">5</field>'+
      '</shadow>'+
      '</value>'+
      '</block>'+
      '</category>'+
      '</xml>'
    );
  }

  writeToolbox(){
    /*
     let st ='<xml id="toolbox-gs2" style="display: none;">'+
     '<category name="开始" colour="#FFD500" secondaryColour="#CC9900">'+
     '<block type="gs_event_whenflagclicked" id="gs_event_whenflagclicked"></block>'+
     '<block type="gs_event_whenthisspriteclicked" id="gs_event_whenthisspriteclicked"></block>'+
     '</category>'+
     '</xml>' +
     '';
     */
    document.getElementById('toolbox').innerHTML = this.toolBoxContent();
  }

  //test
  testShowList(show){
    if(show){
      this.changeStateByID(true,'blocklyCode');
      this.changeStateByID(true,'testList');
    }else {
      this.changeStateByID(false,'blocklyCode');
      this.changeStateByID(false,'testList');
    }
  }

  changeStateByID(show, divid) {
    try {
      var ob = document.getElementById(divid);
      if (show) {
        ob.style.display = "block";
      } else {
        ob.style.display = "none";
      }
    } catch (error) {
    }
  };

  //设置新的代码：
  async testSetCodeFromWeb(i) {
    let url ='http://www.robobloq.com/api/data/scratch/song/demo.json';
    try {
      let response = await fetch(url);
      let data = await response.text();
       //data = JSON.parse(data);
      //console.log(data);
      if (!data || data === "" || data === {}) {
        return;
      }
      Scratch2.vm.fromJSON(data);
    } catch (error) {
      console.error(error);
    }
  }

  testSetCode() {
    try {
      var data = document.getElementById('blocklyCode').value ;
      //console.log(data);
      if (!data || data === "" || data === {}) {
        return;
      }
      //data = JSON.parse(data);
      Scratch2.vm.fromJSON(data);
    } catch (error) {
      console.error(error);
    }
  }

  //取当前代码
  testGetCode() {
    var output = document.getElementById('blocklyCode');
    var json = Scratch2.vm.toJSON();
    //console.log(json);
    output.value = json;
  }
}