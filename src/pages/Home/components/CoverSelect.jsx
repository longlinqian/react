import React from 'react'
import enums from '../../../enums'

export default class CoverSelect extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      value: this.props.defaultValue
    }
  }

  render() {
    return (
      <div className="coverSelect">
        <div className="items">
          {(() => {
            return enums.project_covers.map((cover, index) => {
              return (
                <div key={index} className={this.state.value === cover ? 'item active' : 'item'}>
                  <img className="image" src={"res/images/covers/small/" + cover} alt="" onTouchTap={this.itemTouchTap.bind(this, cover)} />
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  }

  itemTouchTap(value) {
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
}