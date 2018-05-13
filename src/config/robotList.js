import local from '../utils/Local.js'

export default {
  'k1':
  [
  {
    id: '39db667b-17fe-4069-82fb-76c155273785',
    name: local.data.Robot[0].name,
    control: {
      checkPort:[1,1,0],/*电机，超声波，点振屏，*/
      playTypes:[1,2,4], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5,巡线6 */
      buttons:[1,2,3],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
      rockerMode:0,/**0是自由发送，1是分区发送 */
      modalPosition:0,/**形态布局 - 0超声波大灯、声音、红大灯，1超声波大灯、声音、手势，2声音、手势、笑脸 */
      motorMode:0, /*0 后驱模式,1 前驱模式*/
      catType:1,/*小车类型：0 自己组装车,1 轻履带后驱车,2 重履带后驱车, 3 轻轮子后驱车, 4 种轮子后驱,5 轻履带前驱车,*/
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 ,巡线2口*/
    },
    information: {
      summary: local.data.Robot[0].information.summary,
      score: local.data.Robot[0].information.score,
      feature: local.data.Robot[0].information.feature,
      function: local.data.Robot[0].information.function
    },
    frames: [
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_0.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_1.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_2.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_3.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_4.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_5.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_6.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_7.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_8.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_9.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_10.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_11.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_12.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_13.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_14.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_15.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_16.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_17.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_18.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_19.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_20.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_21.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_22.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_23.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_24.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_25.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_26.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_27.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_28.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_29.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_30.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_31.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_32.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_33.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_34.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_35.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_36.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_37.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_38.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_39.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_40.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_41.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_42.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_43.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_44.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_45.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_46.jpg',
      'res/images/robot_shape/39db667b-17fe-4069-82fb-76c155273785/0_47.jpg'
    ],
    frames2:['res/images/test/tanlu.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/1/1.gif',
        'res/images/carousel/1/2.gif',
        'res/images/carousel/1/3.gif',
        'res/images/carousel/1/4.gif',
        'res/images/carousel/1/5.gif',
        'res/images/carousel/1/6.gif',
        'res/images/carousel/1/7.gif',
        'res/images/carousel/1/8.gif',
        'res/images/carousel/1/9.gif',
        'res/images/carousel/1/10.gif',
        'res/images/carousel/1/11.gif',
        'res/images/carousel/1/12.gif',
        'res/images/carousel/1/13.gif',
        'res/images/carousel/1/14.gif',
        'res/images/carousel/1/15.gif',
        'res/images/carousel/1/16.gif',
        'res/images/carousel/1/17.gif',
        'res/images/carousel/1/18.gif',
        'res/images/carousel/1/19.gif',
        'res/images/carousel/1/20.gif',
        'res/images/carousel/1/21.gif',
        'res/images/carousel/1/22.gif',
      ]
    } 
  },
  {
    id: 'ebf9a89c-07b2-43f4-ba21-abb54b4fd32e',
    name: local.data.Robot[1].name,
    control: {
      checkPort:[1,0,0],/*电机，超声波，点振屏，*/
      playTypes:[1,4], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5 */
      buttons:[1,3,4],/*声音1，红大灯3，拍手4  */
      rockerMode:0,/**0是自由发送，1是分区发送 */
      modalPosition:1,/**形态布局 */
      motorMode:0, /*0 后驱模式,1 前驱模式*/
      catType:3,/* 小车类型 */
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 */
    },
    information: {
      summary: local.data.Robot[1].information.summary,
      score: local.data.Robot[1].information.score,
      feature: local.data.Robot[1].information.feature,
      function: local.data.Robot[1].information.function
    },
    frames: [
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_0.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_1.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_2.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_3.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_4.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_5.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_6.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_7.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_8.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_9.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_10.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_11.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_12.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_13.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_14.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_15.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_16.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_17.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_18.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_19.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_20.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_21.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_22.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_23.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_24.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_25.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_26.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_27.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_28.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_29.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_30.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_31.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_32.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_33.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_34.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_35.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_36.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_37.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_38.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_39.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_40.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_41.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_42.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_43.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_44.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_45.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_46.jpg',
      'res/images/robot_shape/ebf9a89c-07b2-43f4-ba21-abb54b4fd32e/0_47.jpg'
    ],
    frames2:['res/images/test/tuitu.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/2/1.gif',
        'res/images/carousel/2/2.gif',
        'res/images/carousel/2/3.gif',
        'res/images/carousel/2/4.gif',
        'res/images/carousel/2/5.gif',
        'res/images/carousel/2/6.gif',
        'res/images/carousel/2/7.gif',
        'res/images/carousel/2/8.gif',
        'res/images/carousel/2/9.gif',
        'res/images/carousel/2/10.gif',
        'res/images/carousel/2/11.gif',
        'res/images/carousel/2/12.gif',
        'res/images/carousel/2/13.gif',
        'res/images/carousel/2/14.gif',
        'res/images/carousel/2/15.gif',
        'res/images/carousel/2/16.gif',
        'res/images/carousel/2/17.gif',
        'res/images/carousel/2/18.gif',
        'res/images/carousel/2/19.gif',
      ]
    }
  },
  {
    id: 'f94c4b0c-90c1-47cf-a4e7-bc278adb500d',
    name: local.data.Robot[2].name,
    control: {
      checkPort:[1,1,0],/*电机，超声波，点振屏，*/
      playTypes:[1,2,4], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5 */
      buttons:[1,2,3],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
      rockerMode:2,/**0是自由发送，1，2是分区发送 */
      modalPosition:0,/**形态布局 */
      motorMode:1, /*0 后驱模式,1 前驱模式*/
      catType:7,/* 小车类型 */
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 */
    },
    information: {
      summary: local.data.Robot[2].information.summary,
      score: local.data.Robot[2].information.score,
      feature: local.data.Robot[2].information.feature,
      function: local.data.Robot[2].information.function
    },
    frames: [
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_0.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_1.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_2.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_3.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_4.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_5.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_6.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_7.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_8.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_9.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_10.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_11.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_12.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_13.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_14.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_15.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_16.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_17.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_18.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_19.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_20.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_21.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_22.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_23.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_24.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_25.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_26.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_27.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_28.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_29.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_30.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_31.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_32.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_33.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_34.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_35.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_36.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_37.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_38.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_39.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_40.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_41.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_42.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_43.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_44.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_45.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_46.jpg',
      'res/images/robot_shape/f94c4b0c-90c1-47cf-a4e7-bc278adb500d/0_47.jpg'
    ],
    frames2:['res/images/test/xunluo.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/3/1.gif',
        'res/images/carousel/3/2.gif',
        'res/images/carousel/3/3.gif',
        'res/images/carousel/3/4.gif',
        'res/images/carousel/3/5.gif',
        'res/images/carousel/3/6.gif',
        'res/images/carousel/3/7.gif',
        'res/images/carousel/3/8.gif',
        'res/images/carousel/3/9.gif',
        'res/images/carousel/3/10.gif',
        'res/images/carousel/3/11.gif',
        'res/images/carousel/3/12.gif',
        'res/images/carousel/3/13.gif',
        'res/images/carousel/3/14.gif',
        'res/images/carousel/3/15.gif',
        'res/images/carousel/3/16.gif',
        'res/images/carousel/3/17.gif',
        'res/images/carousel/3/18.gif',
        'res/images/carousel/3/19.gif',
        'res/images/carousel/3/20.gif',
        'res/images/carousel/3/21.gif',
        'res/images/carousel/3/22.gif',
        'res/images/carousel/3/23.gif',
        'res/images/carousel/3/24.gif',
        'res/images/carousel/3/25.jpg',
      ]
    }
  },
  {
    id: 'e280e255-6c0b-4daf-b211-6fc3e37bb535',
    name: local.data.Robot[3].name,
    control: {
      checkPort:[1,0,1],/*电机，超声波，点振屏，*/
      playTypes:[1,4,5], /*遥控模式1、避障模式2、路径模式3,音乐模式4， ，点阵屏5*/
      buttons:[1,5,4],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
      rockerMode:0,/**0是自由发送，1是分区发送 */
      modalPosition:2,/**形态布局 */
      motorMode:0, /*0 后驱模式,1 前驱模式*/
      catType:2,/* 小车类型 */
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 */
    },
    information: {
      summary: local.data.Robot[3].information.summary,
      score: local.data.Robot[3].information.score,
      feature: local.data.Robot[3].information.feature,
      function: local.data.Robot[3].information.function
    },
    frames: [
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_0.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_1.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_2.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_3.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_4.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_5.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_6.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_7.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_8.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_9.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_10.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_11.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_12.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_13.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_14.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_15.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_16.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_17.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_18.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_19.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_20.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_21.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_22.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_23.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_24.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_25.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_26.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_27.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_28.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_29.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_30.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_31.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_32.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_33.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_34.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_35.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_36.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_37.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_38.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_39.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_40.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_41.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_42.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_43.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_44.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_45.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_46.jpg',
      'res/images/robot_shape/e280e255-6c0b-4daf-b211-6fc3e37bb535/0_47.jpg'
    ],
    frames2:['res/images/test/hejin.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/4/1.gif',
        'res/images/carousel/4/2.gif',
        'res/images/carousel/4/3.gif',
        'res/images/carousel/4/4.gif',
        'res/images/carousel/4/5.gif',
        'res/images/carousel/4/6.gif',
        'res/images/carousel/4/7.gif',
        'res/images/carousel/4/8.gif',
        'res/images/carousel/4/9.gif',
        'res/images/carousel/4/10.gif',
        'res/images/carousel/4/11.gif',
        'res/images/carousel/4/12.gif',
        'res/images/carousel/4/13.gif',
        'res/images/carousel/4/14.gif',
        'res/images/carousel/4/15.gif',
        'res/images/carousel/4/16.gif',
        'res/images/carousel/4/17.gif',
        'res/images/carousel/4/18.gif',
        'res/images/carousel/4/19.gif',
        'res/images/carousel/4/20.gif',
        'res/images/carousel/4/21.gif',
        'res/images/carousel/4/22.gif',
        'res/images/carousel/4/23.gif',
        'res/images/carousel/4/24.gif',
        'res/images/carousel/4/25.gif',
        'res/images/carousel/4/26.gif',        
      ]
    }
  },
  {
    id: 'a5c50636-c5fa-4684-b35e-cbab5bb049d1',
    name: local.data.Robot[4].name,
    control: {
      checkPort:[1,0,1],/*电机，超声波，点振屏，*/
      playTypes:[1,4,5], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5 */
      buttons:[1,5,4],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
      rockerMode:0,/**0是自由发送，1是分区发送 */
      modalPosition:2,/**形态布局 */
      motorMode:0, /*0 后驱模式,1 前驱模式*/
      catType:2,/* 小车类型 */
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 */
    },
    information: {
      summary: local.data.Robot[4].information.summary,
      score: local.data.Robot[4].information.score,
      feature: local.data.Robot[4].information.feature,
      function: local.data.Robot[4].information.function
    },
    frames: [
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_0.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_1.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_2.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_3.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_4.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_5.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_6.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_7.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_8.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_9.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_10.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_11.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_12.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_13.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_14.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_15.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_16.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_17.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_18.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_19.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_20.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_21.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_22.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_23.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_24.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_25.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_26.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_27.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_28.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_29.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_30.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_31.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_32.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_33.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_34.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_35.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_36.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_37.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_38.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_39.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_40.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_41.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_42.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_43.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_44.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_45.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_46.jpg',
      'res/images/robot_shape/a5c50636-c5fa-4684-b35e-cbab5bb049d1/0_47.jpg'
    ],
    frames2:['res/images/test/tiejia.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/5/1.gif',
        'res/images/carousel/5/2.gif',
        'res/images/carousel/5/3.gif',
        'res/images/carousel/5/4.gif',
        'res/images/carousel/5/5.gif',
        'res/images/carousel/5/6.gif',
        'res/images/carousel/5/7.gif',
        'res/images/carousel/5/8.gif',
        'res/images/carousel/5/9.gif',
        'res/images/carousel/5/10.gif',
        'res/images/carousel/5/11.gif',
        'res/images/carousel/5/12.gif',
        'res/images/carousel/5/13.gif',
        'res/images/carousel/5/14.gif',
        'res/images/carousel/5/15.gif',
        'res/images/carousel/5/16.gif',
        'res/images/carousel/5/17.gif',
        'res/images/carousel/5/18.gif',
        'res/images/carousel/5/19.gif',
        'res/images/carousel/5/20.gif',
        'res/images/carousel/5/21.gif',
        'res/images/carousel/5/22.gif',
        'res/images/carousel/5/23.gif',
        'res/images/carousel/5/24.gif',
        'res/images/carousel/5/25.gif',
      ]
    }
  },
  {
    id: '48629938-a8c4-4f71-b48f-7095c864be15',
    name: local.data.Robot[5].name,
    control: {
      checkPort:[1,0,1],/*电机，超声波，点振屏，*/
      playTypes:[1,4,5], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5 */
      buttons:[1,5,4],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
      rockerMode:0,/**0是自由发送，1是分区发送 */
      modalPosition:2,/**形态布局 */
      motorMode:0, /*0 后驱模式,1 前驱模式*/
      catType:2,/* 小车类型 */
      defaultPort:[6,7,2], /* 超声波6号口，点阵屏7号口 */
    },
    information: {
      summary: local.data.Robot[5].information.summary,
      score: local.data.Robot[5].information.score,
      feature: local.data.Robot[5].information.feature,
      function: local.data.Robot[5].information.function
    },
    frames: [
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_0.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_1.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_2.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_3.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_4.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_5.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_6.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_7.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_8.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_9.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_10.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_11.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_12.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_13.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_14.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_15.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_16.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_17.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_18.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_19.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_20.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_21.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_22.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_23.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_24.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_25.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_26.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_27.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_28.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_29.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_30.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_31.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_32.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_33.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_34.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_35.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_36.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_37.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_38.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_39.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_40.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_41.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_42.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_43.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_44.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_45.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_46.jpg',
      'res/images/robot_shape/48629938-a8c4-4f71-b48f-7095c864be15/0_47.jpg'
    ],
    frames2:['res/images/test/airen.png'],
    buildSteps: {
      '16X12':[
        'res/images/carousel/6/1.gif',
        'res/images/carousel/6/2.gif',
        'res/images/carousel/6/3.gif',
        'res/images/carousel/6/4.gif',
        'res/images/carousel/6/5.gif',
        'res/images/carousel/6/6.gif',
        'res/images/carousel/6/7.gif',
        'res/images/carousel/6/8.gif',
        'res/images/carousel/6/9.gif',
        'res/images/carousel/6/10.gif',
        'res/images/carousel/6/11.gif',
        'res/images/carousel/6/12.gif',
        'res/images/carousel/6/13.gif',
        'res/images/carousel/6/14.gif',
        'res/images/carousel/6/15.gif',
        'res/images/carousel/6/16.gif',
        'res/images/carousel/6/17.gif'
      ]
    }

  }
],
'k2':[ {
  id: 'k2-201',
  name: local.data.Robot[6].name,
  control: {
    checkPort:[0,0,0],/*电机，超声波，点振屏，*/
    playTypes:[1,2,4,6], /*遥控模式1、避障模式2、路径模式3,音乐模式4，点阵屏5,巡线6 */
    buttons:[1,2,3],/*声音1，超声波绿灯2，红大灯3 拍手4 笑脸5 */
    rockerMode:0,/**0是自由发送，1是分区发送 */
    modalPosition:0,/**形态布局 - 0超声波大灯、声音、红大灯，1超声波大灯、声音、手势，2声音、手势、笑脸 */
    motorMode:2, /*0 后驱模式,1 前驱模式*/
    catType:1,/*小车类型：0 自己组装车,1 轻履带后驱车,2 重履带后驱车, 3 轻轮子后驱车, 4 种轮子后驱,5 轻履带前驱车,*/
    defaultPort:[3,0,2] /* 超声波3号口，点阵屏7号口 ,2巡线线口*/
  },
  information: {
    summary: local.data.Robot[6].information.summary,
    score: local.data.Robot[6].information.score,
    feature: local.data.Robot[6].information.feature,
    function: local.data.Robot[6].information.function
  },
  frames: [
    'res/images/robot_shape/k2-01/0_0.jpg',
    'res/images/robot_shape/k2-01/0_1.jpg',
    'res/images/robot_shape/k2-01/0_2.jpg',
    'res/images/robot_shape/k2-01/0_3.jpg',
    'res/images/robot_shape/k2-01/0_4.jpg',
    'res/images/robot_shape/k2-01/0_5.jpg',
    'res/images/robot_shape/k2-01/0_6.jpg',
    'res/images/robot_shape/k2-01/0_7.jpg',
    'res/images/robot_shape/k2-01/0_8.jpg',
    'res/images/robot_shape/k2-01/0_9.jpg',
    'res/images/robot_shape/k2-01/0_10.jpg',
    'res/images/robot_shape/k2-01/0_11.jpg',
    'res/images/robot_shape/k2-01/0_12.jpg',
    'res/images/robot_shape/k2-01/0_13.jpg',
    'res/images/robot_shape/k2-01/0_14.jpg',
    'res/images/robot_shape/k2-01/0_15.jpg',
    'res/images/robot_shape/k2-01/0_16.jpg',
    'res/images/robot_shape/k2-01/0_17.jpg',
    'res/images/robot_shape/k2-01/0_18.jpg',
    'res/images/robot_shape/k2-01/0_19.jpg',
    'res/images/robot_shape/k2-01/0_20.jpg',
    'res/images/robot_shape/k2-01/0_21.jpg',
    'res/images/robot_shape/k2-01/0_22.jpg',
    'res/images/robot_shape/k2-01/0_23.jpg',
    'res/images/robot_shape/k2-01/0_24.jpg',
    'res/images/robot_shape/k2-01/0_25.jpg',
    'res/images/robot_shape/k2-01/0_26.jpg',
    'res/images/robot_shape/k2-01/0_27.jpg',
    'res/images/robot_shape/k2-01/0_28.jpg',
    'res/images/robot_shape/k2-01/0_29.jpg',
    'res/images/robot_shape/k2-01/0_30.jpg',
    'res/images/robot_shape/k2-01/0_31.jpg',
    'res/images/robot_shape/k2-01/0_32.jpg',
    'res/images/robot_shape/k2-01/0_33.jpg',
    'res/images/robot_shape/k2-01/0_34.jpg',
    'res/images/robot_shape/k2-01/0_35.jpg',
    'res/images/robot_shape/k2-01/0_36.jpg',
    'res/images/robot_shape/k2-01/0_37.jpg',
    'res/images/robot_shape/k2-01/0_38.jpg',
    'res/images/robot_shape/k2-01/0_39.jpg',
    'res/images/robot_shape/k2-01/0_40.jpg',
    'res/images/robot_shape/k2-01/0_41.jpg',
    'res/images/robot_shape/k2-01/0_42.jpg',
    'res/images/robot_shape/k2-01/0_43.jpg',
    'res/images/robot_shape/k2-01/0_44.jpg',
    'res/images/robot_shape/k2-01/0_45.jpg',
    'res/images/robot_shape/k2-01/0_46.jpg',
    'res/images/robot_shape/k2-01/0_47.jpg'
  ],
  frames2:['res/images/k2/tanlu.png'],
  buildSteps: {
    '16X12':[
      'res/images/carousel_k2/1/1.gif',
      'res/images/carousel_k2/1/2.gif',
      'res/images/carousel_k2/1/3.gif',
      'res/images/carousel_k2/1/4.gif',
      'res/images/carousel_k2/1/5.gif',
      'res/images/carousel_k2/1/6.gif',
      'res/images/carousel_k2/1/7.gif',
      'res/images/carousel_k2/1/8.gif',
      'res/images/carousel_k2/1/9.gif',
      'res/images/carousel_k2/1/10.gif',
      'res/images/carousel_k2/1/11.gif',
      'res/images/carousel_k2/1/12.gif',
      'res/images/carousel_k2/1/13.gif',
      'res/images/carousel_k2/1/14.gif',
      'res/images/carousel_k2/1/15.gif',
      'res/images/carousel_k2/1/16.gif'
    ]
  } 
}]
}