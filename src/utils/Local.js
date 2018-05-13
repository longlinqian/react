import languageZh from './language/all/zh'
import languageEn from './language/all/en'
import languageKo from './language/all/korean'
import languageFr from './language/all/french'
import languageEs from './language/all/spain'
import enums from '../enums'

/**
 * 单实例：
 * @example
 * import local from '../utils/Local'
 * 取值：local.get().Hello ; or {local.data.Home_Menu_1}
 *
 */
class Local {
  constructor() {
    this.type = enums.language.zh;
    this.data = languageZh.data;
    try{
      this.InitCheck();
      
      //this.set(1);
    }catch(e){
      console.error(e);
    }
  }

  /*
   if (language.indexOf('en') > -1) document.location.href = 'english.htm';
   else if (language.indexOf('nl') > -1) document.location.href = 'dutch.htm';
   else if (language.indexOf('fr') > -1) document.location.href = 'french.htm';
   else if (language.indexOf('de') > -1) document.location.href = 'german.htm';
   else if (language.indexOf('ja') > -1) document.location.href = 'japanese.htm';
   else if (language.indexOf('it') > -1) document.location.href = 'italian.htm';
   else if (language.indexOf('pt') > -1) document.location.href = 'portuguese.htm';
   else if (language.indexOf('es') > -1) document.location.href = 'Spanish.htm';
   else if (language.indexOf('sv') > -1) document.location.href = 'swedish.htm';
   else if (language.indexOf('zh') > -1) document.location.href = 'chinese.htm';
   */
  checkLanguage() {
    let language = 'en';
    try {
      language = (navigator.languages==undefined)?navigator.language:navigator.languages[0];
    } catch (e) {
      
      console.error(e);
    }
    //navigator.browserLanguage?navigator.browserLanguage:navigator.language;
    let type = undefined;
    if (language.indexOf('en') > -1) {
      type = 1 ;// enums.language.en;//english
    }
    else if (language.indexOf('zh') > -1) {
      type = 2 ;//enums.language.zh; //chinese
    }
    else if(language.indexOf('ko') > -1){
      type = 3;//enums.language.ko;
    }
    else if(language.indexOf('fr') > -1){
      type = 4;//enums.language.fr;
    }else if(language.indexOf('es') > -1){
      type = 5;//enums.language.es;
    }
    //type = Number(type);
    this.set(type);
  }

  set(type) {
    type = Number(type);
    this.type = type;
    
    switch (type) {
      case  enums.language.en:
        this.data = languageEn.data;
        break;
      case enums.language.zh:
        this.data = languageZh.data;
        break;
      case enums.language.ko:
        //this.type = enums.language.ko;
        this.data = languageKo.data;
        break;
      case enums.language.fr:
        //this.type = enums.language.fr;
        this.data = languageFr.data;
        break;
      case enums.language.es:
        //this.type = enums.language.es;
        this.data = languageEs.data;
      default:
        this.data = languageEn.data;
        break;
    }
    LOCAL = this.data ;
  }

  get() {
    return this.data;
  }

  getType() {
    return this.type;
  }

  InitCheck(){
    var type = Number(this.getData());
    //console.log('InitCheck:'+ type);
    if(type == null || type == -1 || type == 0 ){
      this.checkLanguage();
    }else{
      this.set(type);
    }
  }

  setData(type){
    try{
      localStorage.setItem('gslanguage2', JSON.stringify(type));
    }
    catch (error){
      console.error(error);
    }
  }

  getData(){
    try{
      return JSON.parse(localStorage.getItem('gslanguage2'));
    }catch(error){
      console.error(error);
    }
    return -1 ;
  }

}

export default new Local();