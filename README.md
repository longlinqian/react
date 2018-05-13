项目编码规范
===
## HTML编码规范
1. 只允许使用以下标签：
    * 容器
      * div (容器)
    * 功能
      * a (超链接)
      * button  (按钮)
      * img (图片)
      * input[type="text"] (输入框)
      * textarea (多行输入区)

## CSS 类名命名规范
1.  要求
    1.  命名采用驼峰式命名法。例如，要求以下：
    ``` scss
    .homePage {}
    .officialButton {}
    ```
    2.  命名组词规范，先描述名再组件名。例如，要求以下：
    ``` scss
    .homeNavbar {}
    .caneclButton {}
    .robotImage {}
    ```
    3.	善于使用层级页面嵌套，减少命名词组。例如，要求以下：
    ``` scss
    .navbar {
      .style1 {
        .title {}
        .backButton {}
        .buttonList {
          .helpButton {}
          .refreshButton {}
          .controlButton {}
        }
      }
      .style2 {
        .title {}
        .backButton {}
        .buttonList {
          .helpButton {}
          .refreshButton {}
          .controlButton {}
        }
      }
    }
    ```

    4.  功能标签的命名必须增加标签别名。例如，要求以下：
    ``` scss
    .downloadLink {}  //a
    .backButton {}    //button
    .robotImage {}    //img
    .nickNameText {}  //input[type="text"]
    .describeText {}  //textarea
    ```

2. 禁止
    1.  禁止使用缩写命名。

    2.	禁止使用元素名直接定义样式。例如，禁止以下：
    ``` scss
    h1 {}
    button {}
    img {}
    ```

    3.	禁止使用下划线或其他符号作为词组间的间隔。

    4.	禁止使用没用名词只有组件名称的命名。例如，禁止以下：
    ``` scss
    .button {}
    .btn {}
    .img {}
    .image {}
    .list {}
    ```
3.  避免
    1.  避免使用1、2、3、4、a、b、c、d等有序形式命名，需使用有意义的单词描述。
    
## ES6编码规范
1.  要求
    1.  模块引用 import 及 export 均不加 ; 结束符号

    2.	涉及模块引用的代码必须放在文件顶部，例如，要求以下：
    
    ``` javascript
    import React from 'react'
    import { FormattedMessage } from 'react-intl'
    import { Link } from 'react-router-dom'
    import Swiper from 'swiper'

    class Demo {}
    ```
    
    3.  模块引用排序顺序为，先引用外部模块，再引用内部模块。

    ``` javascript
    import React from 'react'
    import { FormattedMessage } from 'react-intl'
    import { Link } from 'react-router-dom'
    import Swiper from 'swiper'
    import BasePage from '../BasePage.jsx'
    import UIConvert from '../../utils/UIConvert'
    import enums from '../../enums'
    import navigationActions from '../../actions/NavigationActions'
    import robots from '../../config/robots'

    class Demo {}
    ```

    4.  如果模块输出的是当前模块的类对象，则直接将class输出。
    
    ``` javascript
    //正确的做法
    export default class Demo {}

    //错误的做法
    class Demo {}
    export default Demo
    ```

    5.  针对于React组件，函数的排序顺序为：

    ``` javascript
    //  1. 类构造函数。
    //  2. React事件函数。
    //  3. render函数。
    //  4. 界面事件函数。
    //  5. 自定义函数。

    class Demo extends React.Component {
      //类构造函数。
      constructor(props) {
        super(props);
      }

      //React事件函数。
      componentWillMount() {}
      componentDidMount() {}

      //render函数。
      render() {}
      renderPortion() {}

      //界面事件函数。
      submitButtonClick() {}
      projectTextChange() {}

      //自定义函数。
      getItemById() {}
      setItem() {}
    }
    ```

    6.  类级别变量在使用前必须在构造函数中赋值，即便为空对象。

    ``` javascript
    class Robot extends React.Component {
      constructor(props) {
        super(props);
        this.title = "";
      }

      /**
       * 初始化导航条
       */
      initNavbar() {
        navigationActions.show({
          title: this.title
        });
      }
    }
    ```

    7.  每个函数间使用 1 个换行符进行分隔。

### 命名
1.  要求
    1.  文件名、类名均采用帕斯卡命名法。

    2.  变量、函数均采用驼峰式命名法。

    3.  类的实例对象（派生对象、单例对象）均采用驼峰式命名法。
    
    4.  指向到控件的事件函数 以控件名称+事件名的形式命名，例如，要求以下：
    ``` html
    <button className="submitButton" onClick={this.submitButtonClick}>提交</button>
    <input type="text" className="projectText" onChange={this.projectTextChange} />
    ```
    ``` javascript
    submitButtonClick() {}
    projectTextChange() {}
    ```

    5.  其他 自定义函数 命名组词规范，先动词再名词。例如，要求以下：
    ``` javascript
    getItem() {}
    getObject() {}
    setItem() {}
    updateItem() {}
    findItem() {}
    addItem() {}
    ```
2.  禁止

    1.  禁止使用缩写命名。

    2.	禁止使用下划线或其他符号作为词组间的间隔。

3.  避免
    1.  避免使用1、2、3、4、a、b、c、d等有序形式命名，需使用有意义的单词描述。

### 注释
1.  要求
    1.  类必须写注释：

    ``` javascript
    /**
     * 机器人信息页
     */
    class RobotPage extends React.Component {}
    ```

    2.  自定义函数必须写注释

    ``` javascript
    /**
     * 机器人信息页
     */
    class RobotPage extends React.Component {

      /**
       * 初始化导航条
       */
      initNavbar() {

      }
    }
    ```

2.  禁止
    1.  禁止开发调试的代码注释

    1.  禁止遗弃代码的代码注释

    1.  禁止在函数体内编写注释

开发注意事项
===
# 解决Cordova状态条重叠的问题、appstore itunes上传不成功问题

#IOS发布时： 
ID名：com.robobloq.appstore

1.在.plist文件中添加以下配置
<key>UIStatusBarHidden</key>
<true/>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
<key>NSBluetoothPeripheralUsageDescription</key>
	<string>App需要您的同意,才能访问蓝牙</string>
	<key>NSLocationUsageDescription</key>
	<string>App需要您的同意,才能访问位置</string>

2.替换图片
  将cordova下的iconIOSres的内容替换platforms/ios/Robobloq/image.xcassets中的AppIcon,LaunchImage

3.iOS 禁止自动休眠
Robobloq/Classes/AppDelegate.m : 
第35行：    self.viewController = [[MainViewController alloc] init];
 后加上下面的：
         [UIApplication sharedApplication].idleTimerDisabled=YES;



#Android:发布时

1.打包说明：release/0.4.1  
            在android/manifests/androidmanifest.xml  
            android:android:versionCode="1712290" android:versionName="1.5.2",
            包名：com.robobloq.az
            android打包加版本号后需要处理下build.gradle的186行
            替换为versionCode defaultConfig.versionCode
         
2.adnroid:签名：

signingConfigs {
            release {
                storeFile file("/Users/long.lin/Desktop/robobloq.keystore")
                storePassword "Mokuai520"
                keyAlias "robobloq"
                keyPassword "Mokuai520"
            }
        }
3.禁止自动休眠
a. /AndroidManifest.xml
第4行后加上：<uses-permission android:name="android.permission.WAKE_LOCK" />

b.src/com/robobloq/az/MainActivity 
24 行加 import android.view.WindowManager;
32 行加 getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

4.设置一下手动更新的版本号

    
