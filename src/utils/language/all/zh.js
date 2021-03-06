export default {
  /**
   * zh:chinese
   * 命名例子：Home_Robot1_name:'合金队长',
   */
  data:
  {
    Hello: "en Hello",
    Home_Menu_1: '官方玩法',
    Home_Menu_2: '我的应用',
    Home_Menu_text: '我的应用',
    Home_setting: '设置',
    Home_firmware: '更新固件',
    Firmware_version: '固件版本',
    Firmware_information: '固件信息',
    Current_version: '当前版本',
    Home_about_us: '关于我们',
    Home_language:'语言',
    Home_settingLanguage:'设置语言',
    Setting_content_1: '请先连接设备',
    Setting_content_2: '正在检测请稍等',
    Setting_content_3: '正在更新',
    Setting_content_4: '更新成功',
    Setting_content_5: '更新失败',
    check_version:'检查更新',
    About_us_content: '版权所有: 深圳市魔块智能有限公司',
    Robot_name_1: '探路先锋',
    Robot_name_2: '推土机甲',
    Robot_name_3: '巡逻蝎兵',
    Robot_name_4: '合金队长',
    Robot_name_5: '铁甲骑士',
    Robot_name_6: '矮人护卫',
    Robot_type:'形态功能',
    Q_corps: 'Q军团',
    Q_scout: 'Q侦察兵',
    Robot: [
      {
        name: '探路先锋',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 3,
          feature: '搭建时长：大约45分钟',
          function: '履带形态机器人，具备很强的越野操控性。具有遥控模式，自动避障模式二种官方入门玩法。'
        }
      },
      {
        name: '推土机甲',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 2,
          feature: '搭建时长：大约35分钟',
          function: '轮式推土机器人，具备很强的操作灵活性，您可以随意操控推动其他的物体进行移动，例如来踢一场迷你足球赛。'
        }
      },
      {
        name: '巡逻蝎兵',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 3,
          feature: '搭建时长：大约45分钟',
          function: '灵活运动的蝎子小兵，摇摆抖动，巡逻大千世界。具备遥控模式，自动避障模式二种官方入门玩法。'
        }
      },
      {
        name: '合金队长',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 4,
          feature: '搭建时长：大约60分钟',
          function: '“智能”中枢的合金队长，表情结合动作进行战略指挥。具有遥控模式的官方入门玩法。'
        }
      },
      {
        name: '铁甲骑士',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 4,
          feature: '搭建时长：大约70分钟',
          function: '履带形态的人形骑兵，用钢铁武装自己，用微笑秒杀敌人。具备遥控模式的入门玩法。'
        }
      },
      {
        name: '矮人护卫',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 3,
          feature: '搭建时长：大约45分钟',
          function: '扬起头的小矮人，跟随队长左右，守卫安全。具有遥控模式的官方入门玩法。'
        }
      },
      {
        name: 'Q侦察兵',
        information: {
          summary: '一款履带式的坦克形态。',
          score: 1,
          feature: '搭建时长：大约20分钟',
          function: '入门级编程教育机器人，搭建简单方便。具有遥控模式，路径模式，音乐模式等多种入门玩法。'
        }
      }
    ],
    Building_difficulty: '搭建难度：',
    Robot_function_build: '搭建',
    Robot_function_control: '介绍',
    MyProject_new: '新建一个新应用',
    MyProject_creact: '创建应用',
    MyProject_edit_pro: '编辑应用',
    MyProject_edit: '编辑',
    MyProject_delete: '删除',
    Build_Explain: '搭建说明',
    Control_rocker: '遥控模式',
    Control_avoidance: '避障模式',
    Control_path:'路径模式',
    Control_music:'音乐模式',
    Control_matrix:'点阵屏模式',
    Control_linetracking:'巡线模式',
    Connection_Blue_open: '系统蓝牙功能未打开,请先打开蓝牙功能',
    Connection_robot: '机器人没连接，请先连接机器人！',
    Connection_Blue_Break: '断开连接',
    Connection_Blue_on: '正在连接设备，请稍后',
    Connection_device:'请选择要连接的设备',
    Common_delete_title: '删除应用',
    Common_delete_content_1: '删除应用后无法找回',
    Common_delete_content_2: '您确定删除应用吗',
    Common_build_title: '恭喜, 你已经完成搭建',
    Common_build_content: '是否前往操控页, 马上让机器人动起来',
    Common_connect_content_1: '请打开蓝牙再操作',
    Common_connect_content_2: '连接不成功,请稍后再操作',
    Common_connect_content_3: '你确定要断开连接',
    Common_discon_content:'离开操控模式后与机器人的连接将会断开,你确认要离开吗？',
    Common_discon_content1:'离开页面，机器人的连接将会断开,你确认要离开吗？',
    Common_device_break:'设备连接被异常断开,是否重新进行连接？',
    Common_engin_break:'检测到电机连接异常,请检查连接状态',
    Common_voice_break:'检测到超声波连接异常，请检查连接状态',
    Common_lattice_break:'检测到点阵屏连接异常，请检查连接状态',
    Common_firmware_break : '请更新官方固件!',
    Common_port_break:'获取端口值有误，请断开重新连接机器人！',
    Common_close: '关闭',
    Common_retry: '重试',
    Common_comfirm: '确认',
    Common_cancel: '取消',
    Common_break: '断开',
    common_prompt:'提示',
    Common_sure:'确定',
    Create_applicatioin_1:'必须输入应用名称',
    Create_applicatioin_2:'应用名称必须是 2-50 位字符',
    Create_applicatioin_4:'请选择应用封面',
    Create_applicatioin_5:'无法找到该项目',
    low_power_hint:'检测到电量低于10%，会影响机器人性能，如果你要继续操作，请及时更换电池。',
    Song_list: ['圣诞歌', '两只老虎', '小星星', '虫儿飞'],

    
    category_start: '开始',
      category_motion: '运动',
      category_light: '灯光',
      category_sound: '声音',
      category_control: '控制',
      category_operator: '运算',
      category_sensing: '传感器',
      category_variable: '变量',

      gs_event_whenflagclicked: '当%1 被点击',
      gs_event_whenthisspriteclicked: '当主板顶部按钮按下',
      gs_motion_move: '设置电机转速 左轮:%1 右轮:%2',
      gs_motion_move_2: '设置%1 运动，速度为%2 ',
      gs_motion_move_0_forward: '向前',
      gs_motion_move_0_backward: '向后',
      gs_motion_move_0_left: '左转',
      gs_motion_move_0_right: '向右',
      gs_motion_move_3: '设置%1 %2 以速度%3',
      gs_motion_steering_engine: '设置%1 舵机%2 转角1%3 转角2%4',//
      gs_motion_external_motor: '设置%1 外置电机速度%2',//
      gs_light_change: '设置板载%1 的灯 颜色为%2',
      gs_light_0_all: '双灯',
      gs_light_0_left: '左灯',
      gs_light_0_right: '右灯',
      gs_light_0_red: '红色',
      gs_light_0_yellow: '黄色',
      gs_light_0_green: '绿色',
      gs_light_0_black: '关闭',
      gs_light_change_2: '设置板载%1 红%2 绿%3 蓝%4',
      gs_light_change_3: '设置板载%1 颜色为%2',
      gs_matrix_change: '设置矩阵面板%1 ',
      gs_matrix_change_VALUE1: '表情一',
      gs_matrix_change_VALUE2: '表情二',
      gs_matrix_change_VALUE3: '表情三',
      gs_matrix_change_VALUE4: '表情四',
      gs_matrix_change_VALUE5: '表情五',
      gs_matrix_change_VALUE6: '表情六',
      gs_matrix_change_VALUE7: '表情七',
      gs_matrix_change_VALUE8: '表情八',
      gs_matrix_change_2: '%1 LED矩阵 显示绘图%2',
      gs_port_1: '端口 1',
      gs_port_2: '端口 2',
      gs_port_3: '端口 3',
      gs_port_4: '端口 4',
      gs_port_5: '端口 5',
      gs_port_6: '端口 6',
      gs_port_7: '端口 7',
      gs_port_8: '端口 8',
      gs_matrix_change_3: '%1 LED矩阵 显示图标%2',
      gs_matrix_change_4: '%1 LED矩阵 显示数字%2',
      gs_matrix_change_5: '%1 LED矩阵 显示文字%2 ',
      gs_light_ultrasonic: '设置超声波灯光%1',
      gs_light_ultrasonic_2: '设置%1 超声波 红%2 绿%3 蓝%4',
      gs_light_ultrasonic_3: '设置%1 超声波 颜色为%2',
      gs_sound_play: '播放%1 音调%2 毫秒',
      gs_sound_play_2: '播放音调%1 节拍为%2',
      gs_sound_play_0_quarter: '四分之一',
      gs_sound_play_0_half: '二分之一',
      gs_sound_play_0_eighth: '八分之一',
      gs_sound_play_0_whole: '整拍',
      gs_sound_play_0_double: '双拍',
      gs_control_wait: '等待%1 秒',
      gs_control_repeat: '重复执行%1 次',
      gs_control_forever: '不断循环执行',
      gs_control_repeat_until: '重复执行 直到%1',
      gs_control_if: '如果%1 就',
      gs_control_if_else: '其它',
      gs_control_wait_until: '一直等待%1',
      gs_control_stop: '停止',
      gs_control_stop_all: '所有',
      gs_operator_random: '从%1 到%2 取随机数',
      gs_sensing_mousedown: '主板顶部按钮是否按下？',
      gs_motion_stopMove:'停止运动',
      gs_sensing_distanceto: '%1 超声波传感器数值(mm)',
      gs_sensing_linePatrolValue: '%1 巡线传感器数值',//
      gs_sensing_lightValue:'%1 光线传感器数值',
      gs_sensing_voiceValue:'%1 声音传感器数值',
      gs_sensing_temperatureValue:'%1 温度传感器数值',
      gs_sensing_humidityValue:'%1 湿度传感器数值',
      gs_data_variable_a: '变量A',
      gs_data_variable_b: '变量B',
      gs_data_variable_c: '变量C',
      gs_data_variable_d: '变量D',
      gs_data_variable_e: '变量E',
      gs_data_setvariableto: '设置%1 等于%2',
      gs_data_changevariableby: '%1 加上%2',
  }
}