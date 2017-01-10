'use strict';

import uuid from 'uuid';
import React from 'react';

const defaultWardInfo = {
  description: '',
  floor: '',
  nurseStationId: '',
  beaconMajor: '',
};

export default class WardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = Object.assign({}, defaultWardInfo, props.ward);
  }

  handleFieldValueChange = e => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ward.id !== this.props.ward.id) {
      this.setState(Object.assign({}, defaultWardInfo, nextProps.ward));
    }
  }

  render() {
    const { description, floor, nurseStationId, beaconMajor } = this.state;

    return (
      <div id={this.id}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <textarea className="form-control" name="description" value={description} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Floor:</label>
          <div className="col-sm-4">
            <input className="form-control" name="floor" value={floor} onChange={this.handleFieldValueChange} />
          </div>
          <label className="col-sm-2 col-form-label">Nurse Station ID:</label>
          <div className="col-sm-4">
            <input className="form-control" name="nurseStationId" value={nurseStationId} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Beacon Major:</label>
          <div className="col-sm-4">
            <input className="form-control" name="beaconMajor" value={beaconMajor} onChange={this.handleFieldValueChange} />
          </div>
        </div>
      </div>
    );
  }
}
