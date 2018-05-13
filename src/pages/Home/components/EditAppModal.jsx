import CreateAppModal from './CreateAppModal.jsx'
import toast from '../../../components/Toast.jsx'
import projectService from '../../../services/ProjectService'
import local from '../../../utils/Local.js'

export default class EditAppModal extends CreateAppModal {
  constructor() {
    super();
    this.title = local.data.MyProject_edit_pro;
  }

  open(project) {
    this.project = project;
    return super.open();
  }

  setDefault() {
    this.value = {
      name: this.project.name,
      cover: this.project.cover
    };
  }

  submit() {
    try {
      let project = projectService.update(this.project.id, this.value.name, this.value.cover);
      this.emitter.emit('close', project);
    } catch (e) {
      toast.error(e, 2000);
    }
  }
}