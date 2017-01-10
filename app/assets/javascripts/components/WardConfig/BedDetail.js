'use strict';

import uuid from 'uuid';
import React from 'react';

const defaultBedInfo = {
  beaconMinor: '',
  buttonId: '',
  taskLightId: '',
  mainLightId: '',
  remoteId: '',
};

export default class BedDetail extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = Object.assign({}, defaultBedInfo, props.bed);
  }

  handleFieldValueChange = e => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bed.id !== this.props.bed.id) {
      this.setState(Object.assign({}, defaultBedInfo, nextProps.bed));
    }
  }

  render() {
    const { id: comId } = this;
    const { beaconMinor, buttonId, taskLightId, mainLightId, remoteId } = this.state;

    return (
      <div id={comId}>
        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Beacon Minor:</label>
          <div className="col-sm-7">
            <input className="form-control" name="beaconMinor" value={beaconMinor} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Button ID:</label>
          <div className="col-sm-7">
            <input className="form-control" name="buttonId" value={buttonId} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Task Light ID:</label>
          <div className="col-sm-7">
            <input className="form-control" name="taskLightId" value={taskLightId} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Main Light ID:</label>
          <div className="col-sm-7">
            <input className="form-control" name="mainLightId" value={mainLightId} onChange={this.handleFieldValueChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Remote ID:</label>
          <div className="col-sm-7">
            <input className="form-control" name="remoteId" value={remoteId} onChange={this.handleFieldValueChange} />
          </div>
        </div>
      </div>
    );
  }
}
