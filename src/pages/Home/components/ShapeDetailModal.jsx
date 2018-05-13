import React from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import robotList from '../../../config/robotList'
import local from '../../../utils/Local.js'

export default class ShapeDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeImageIndex: 0,
      isShow: false
    };
    this.robotData = robotList[this.props.version];
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let shapeImageIndex = this.state.shapeImageIndex;
      shapeImageIndex++;
      if (shapeImageIndex > 47) {
        shapeImageIndex = 0;
      }
      this.setState({
        shapeImageIndex: shapeImageIndex
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    return (
      <div className="shapeDetailModal">
        <ReactTransitionGroup transitionName="modal" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
          {(() => {
            if (this.state.isShow && this.shape) {
              let shapeImageUrl = this.shape.frames[this.state.shapeImageIndex];
              return (
                <div>
                  <div className="masking"></div>
                  <div className="container">
                    <div className="box">
                      <div className="closeButton" onTouchTap={this.closeButtonTouchTap.bind(this)}>
                        <div className="close"></div>
                      </div>
                      <div className="shape">
                        <img className="shapeImage" src={shapeImageUrl} alt="" />
                      </div>
                      <div className="information">
                        <div className="content">
                          <div className="title text-ellipsis">{this.shape.name}</div>
                          <div className="section text-ellipsis">
                            <div className="scope-title">{local.data.Building_difficulty}</div>
                            <div className={"star star-" + this.shape.information.score}></div>
                          </div>
                          <div className="section text-ellipsis">{this.shape.information.feature}</div>
                          <div className="section">
                          <div className="feature">
                            {local.data.Robot_type}
                          </div>
                          <div className="intro">{this.shape.information.function}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </ReactTransitionGroup>
      </div>
    );
  }

  closeButtonTouchTap() {
    this.setState({
      isShow: false
    });
  }

  open(shapeId) {
    this.shape = this.getShape(shapeId);
    this.setState({
      isShow: true
    });
  }

  getShape(shapeId) {
      return this.robotData.find((item) => {
        if (item.id === shapeId) {
          return item;
        }
      });
  }
}