'use strict';

import React from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import getFormData from 'lib/form-data.js';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentDidMount() {
    const { id: comId } = this;
    const { onSubmit: triggerOnSubmit } = this.props;
    const $containerEl = $(`#${comId}`);
    const $modal = $containerEl.find('.modal');

    $containerEl
      .on('hidden.bs.modal', '.modal', e => {
        $containerEl[0].reset();
      })
      .on('shown.bs.modal', '.modal', e => {
        $(`#${comId}_name`).focus();
      })
      .on('submit', e => {
        triggerOnSubmit(getFormData($(e.target)));
        $modal.modal('hide');
        return false;
      });
  }

  render() {
    const { id: comId } = this;
    const { className } = this.props;

    return (
      <form id={comId}>
        <div className={`modal fade ${className}`}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Create New Service Category</h4>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <input type="hidden" name="id" value="" />
                  <label className="col-sm-3 col-form-label" htmlFor={`${comId}_name`}>Name:</label>
                  <div className="col-sm-9">
                    <input className="form-control" name="name" id={`${comId}_name`} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary mr-1" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-outline-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
