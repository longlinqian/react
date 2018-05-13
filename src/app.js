import React from 'react'
import ReactDom from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Container from './Container.jsx'
import './sass/home.scss'
import './sass/control.scss'
import './sass/toast.scss'
import './sass/shared.scss'
import './sass/home/building.scss'
import './sass/home/index.scss'
import './sass/controls/remoteControl.scss'
import './sass/controls/dodgeMode.scss'
import './sass/controls/matrixMode.scss'
import './sass/controls/musicMode.scss'
import './sass/controls/LineTrackingMode.scss'

window.onload = () => {
  injectTapEventPlugin();
  if (window.cordova) {
    document.addEventListener('deviceready', () => {
      document.addEventListener("backbutton", onBackKeyDown, false);  
      function onBackKeyDown() {  
               //TOTU
            }  
      StatusBar.hide();
      ReactDom.render(<Container />, document.getElementById('app'));
      setTimeout(function () {
        //document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';
        navigator.splashscreen.hide();
      }, 2000);
    }, false);
  } else {
    ReactDom.render(<Container />, document.getElementById('app'));
    //document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0239880059970015 + 'px';
  }
}