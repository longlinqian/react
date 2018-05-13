import React from 'react'
import local from '../../../utils/Local.js'

export default class AppView extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowMenu: false
    };
  }

  render() {
    return (
      <div className="item">
        <img className="image" src={"res/images/covers/big/" + this.props.project.cover} alt="" onTouchTap={this.viewTouchTap.bind(this)} />
        <div className="footer">
          <div className="title text-ellipsis1">{this.props.project.name}</div>
          <div className="moreButton" onTouchTap={this.moreButtonTouchTap.bind(this)}>
            <div className="more"></div>
          </div>
        </div>
        {(() => {
          if (this.state.isShowMenu) {
            return (
              <div className="menu" onTouchStart={this.meunTouchStart.bind(this)}>
                <div className="menuEdit" onTouchTap={this.editTouchTap.bind(this)}>{local.data.MyProject_edit}</div>
                <div className="menuDelete" onTouchTap={this.removeTouchTap.bind(this)}>{local.data.MyProject_delete}</div>
              </div>
            );
          } else {
            return null;
          }
        })()}
      </div>
    );
  }

  moreButtonTouchTap(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isShowMenu: true
    });
  }

  meunTouchStart(e) {
    e.stopPropagation();
  }

  closeMenu() {
    this.setState({
      isShowMenu: false
    });
  }

  editTouchTap(e) {
    e.stopPropagation();
    this.closeMenu();
    this.props.onEdit();
  }

  removeTouchTap(e) {
    e.stopPropagation();
    this.closeMenu();
    this.props.onRemove();
  }

  viewTouchTap(e){
    this.props.onView();
  }
}