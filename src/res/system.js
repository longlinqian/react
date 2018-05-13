var sy_channel = 8201 ;
//get: console.log(SY.channel.des);
var SY ={};
var LOCAL ={};
SY.load = function () {
  var channels ={
    //ios
    8101:{
      des:'IOS:App Store',
    },
    //local android
    8201:{
      des:'AZ:官方网站',
    },
    8202:{
      des:'AZ:应用宝',
    },
    //outSite android
    8301:{
      des:'AZ:Google市场',
    },
  };
  SY.channel = channels[sy_channel];
  SY.version={
    'android':20171229,
    'androidVersionName':'1.5.2',
    'ios':1.5
  },
 SY.hardware = 0;
};

SY.init =function () {
  try {
    SY.load();
  }catch (error){}
};

SY.init();