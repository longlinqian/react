import uuidv4 from 'uuid/v4'
import validator from 'validator'
import enums from '../enums'
import local from '../utils/Local.js'

/**
 * @summary 项目管理单例服务
 *
 * @example
 * import projectService from './ProjectService'
 */
class ProjectService {
  constructor() { }

  /**
   * 创建一个新的项目
   */
  create(name, cover) {
    let list = window.localStorage.projectList ? JSON.parse(window.localStorage.projectList) : [];
    if (name === undefined || validator.isEmpty(name)) {
      this.inputBlur();
      throw local.data.Create_applicatioin_1;
    }
    if (!validator.isLength(name, { min: 2, max: 50 })) {
      this.inputBlur();
      throw local.data.Create_applicatioin_2;
    }
    if (cover === undefined || validator.isEmpty(cover)) {
      this.inputBlur();
      throw local.data.Create_applicatioin_4;
    }
    let project = {
      id: uuidv4(),
      name: name,
      cover: cover,
      created: new Date(),
      updated: new Date()
    };
    list.push(project);
    window.localStorage.projectList = JSON.stringify(list);
    return project;
  }

  /**
   * 获取所有项目
   */
  getAll() {
    let list = window.localStorage.projectList ? JSON.parse(window.localStorage.projectList) : [];
    list.sort((a, b) => {
      return a.updated < b.updated
    });
    return list;
  }

  /**
   * 获取项目
   */
  get(id){
    let list = window.localStorage.projectList ? JSON.parse(window.localStorage.projectList) : [];
    let project = list.find((value) => {
      return value.id === id
    });
    if (project === undefined) {
      return undefined;
    }
    return project;
  }

  /**
   * 更新项目
   */
  update(id, name, cover) {
    if (name === undefined || validator.isEmpty(name)) {
      this.inputBlur();
      throw local.data.Create_applicatioin_1;
    }
    if (!validator.isLength(name, { min: 2, max: 50 })) {
      this.inputBlur();
      throw local.data.Create_applicatioin_2;
    }
    if (cover === undefined || validator.isEmpty(cover)) {
      this.inputBlur();
      throw local.data.Create_applicatioin_4;
    }
    let list = window.localStorage.projectList ? JSON.parse(window.localStorage.projectList) : [];
    let project = list.find((value) => {
      return value.id === id
    });
    if (project === undefined) {
      this.inputBlur();
      throw local.data.Create_applicatioin_5;
    }
    project.name = name;
    project.cover = cover;
    window.localStorage.projectList = JSON.stringify(list);
    return project;
  }

  /**
   * 移除项目
   */
  remove(id) {
    let list = window.localStorage.projectList ? JSON.parse(window.localStorage.projectList) : [];
    let index = list.findIndex((value) => {
      return value.id === id
    });
    if (index === -1) {
      throw local.data.Create_applicatioin_5
    }
    list.splice(index, 1);
    window.localStorage.projectList = JSON.stringify(list);
    //delete blockly
    try {
      var jsonName = 'Sc' + id;
      localStorage.removeItem(jsonName);
    }catch (error){}
  }

/**
 * 移除输入框的光标
 */
inputBlur(){
  let nameText = document.getElementsByClassName('nameText');
  for(let i = 0; i < nameText.length;i++){
    nameText[i].blur();
  }
}
}

export default new ProjectService();