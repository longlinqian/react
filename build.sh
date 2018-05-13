#!/bin/sh

mode=$1
platform=$2

function cleanTask(){
  echo "[\033[36m 清除 \033[0m]"
  rm -rf ./cordova/platforms
  rm -rf ./cordova/plugins
  echo "[\033[36m 清除完成 \033[0m]"
}

function webpackTask(){
  echo "[\033[36m 打包 \033[0m]"
  cd ./src
  rm -rf ./dist
  webpack
  cd ..
  echo "[\033[36m 打包完成 \033[0m]"
}

function updateWWWTask(){
  echo "[\033[36m 更新文件 \033[0m]"
  rm -rf ./cordova/www
  mkdir ./cordova/www
  mkdir ./cordova/www/dist
  mkdir ./cordova/www/res
  mkdir ./cordova/www/blockly
  cp ./src/index.html ./cordova/www/
  cp -R ./src/dist/* ./cordova/www/dist/
  cp -R ./src/res/* ./cordova/www/res/
  cp -R ./src/blockly/* ./cordova/www/blockly/
  echo "[\033[36m 更新文件完成 \033[0m]"
}

function prepareTask(){
  echo "[\033[36m 生成应用 \033[0m]"
  cd ./cordova
  cordova prepare ${platform}
  cd ..
  echo "[\033[36m 生成应用完成 \033[0m]"
}

function updateTask(){
  echo "[\033[36m 更新应用 \033[0m]"
  cd ./cordova
  cordova platform update ${platform}
  echo "[\033[36m 更新应用完成 \033[0m]"
}

function runTask(){
  echo "[\033[36m 运行应用 \033[0m]"
  cd ./cordova
  cordova run ${platform}
  cd ..
  echo "[\033[36m 运行应用完成 \033[0m]"
}

if [ $mode = "init" ]; then
  cleanTask
fi

webpackTask

updateWWWTask

if [ $mode = "init" ]; then
  prepareTask
elif [ $mode = "update" ]; then
  updateTask
fi

runTask