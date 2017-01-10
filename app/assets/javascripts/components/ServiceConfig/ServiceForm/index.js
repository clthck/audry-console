'use strict';

import React from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import getFormData from 'lib/form-data.js';
import IconField from './IconField.js';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.iconFieldId = uuid();
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    const { id: comId, iconFieldId } = this;
    const { open, onHide: triggerOnHide, onSubmit: triggerOnSubmit } = this.props;
    const $containerEl = $(`#${comId}`);
    const $iconImgTag = $(`.${IconField.getServiceIconImgTagClass()}`, `#${iconFieldId}`);

    $containerEl
      .on('hidden.bs.modal', '.modal', e => {
        $containerEl[0].reset();
        $iconImgTag.attr('src', '');
        this.setState({ name: '' });
        triggerOnHide();
      })
      .parsley()
      .on('form:submit', e => {
        try {
          const data = Object.assign({}, getFormData($containerEl), {
            icon: $containerEl.find('[name=icon]')[0].files[0],
            iconImgTagSrc: $iconImgTag.attr('src')
          });
          triggerOnSubmit(data);
          this._toggleModal(false);
        } catch (error) {
          console.log(error);
        } finally {
          return false;
        }
      });

    this._toggleModal(open);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this._toggleModal(nextProps.open);
    }
  }

  handleNameFieldValueChange = e => {
    this.setState({ name: e.target.value });
  }

  _toggleModal(show) {
    const $containerEl = $(`#${this.id}`);
    $containerEl.find('.modal').modal(show ? 'show' : 'hide');
  }

  render() {
    const { id: comId, iconFieldId } = this;
    const { category } = this.props;
    const { name } = this.state;

    return (
      <form id={comId} encType="multipart/form-data">
        <div className={`modal fade`}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Add New Action</h4>
              </div>
              <div className="modal-body">
                <input type="hidden" name="id" value="" />
                <div className="row">
                  <label className="col-sm-6">
                    Category: <span className="text-capitalize">{category.props.categoryData.name}</span>
                  </label>
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">ICON: 256x256 PNG or JPG file for the main screen.</p>
                </div>
                <div className="row mt-1">
                  <IconField name="icon" serviceName={name} id={iconFieldId} />
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">Short Description: Enter the description for the action to be shown to the clients. <strong>Max: 40 characters</strong></p>
                </div>
                <div className="form-group row mt-1">
                  <label className="col-sm-3 col-form-label" htmlFor={`${comId}_description`}>Description:</label>
                  <div className="col-sm-9">
                    <input className="form-control" name="description" id={`${comId}_description`} />
                  </div>
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">Action: Enter the action to be taken when user touches the ICON.</p>
                </div>
                <div className="form-group row mt-1">
                  <label className="col-sm-3 col-form-label" htmlFor={`${comId}_name`}>Name:</label>
                  <div className="col-sm-9">
                    <input className="form-control" name="name" id={`${comId}_name`} required onChange={this.handleNameFieldValueChange} value={name} />
                  </div>
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">Notify Nurses Station.</p>
                </div>
                <div className="form-group row mt-1">
                  <label className="col-sm-3 col-form-label" htmlFor={`${comId}_notification_message`}>Message:</label>
                  <div className="col-sm-9">
                    <input className="form-control" name="notificationMessage" id={`${comId}_notification_message`} />
                  </div>
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">Launch iOS Application.</p>
                </div>
                <div className="form-group row mt-1">
                  <label className="col-sm-3 col-form-label" htmlFor={`${comId}_launch_app_url`}>App URL:</label>
                  <div className="col-sm-9">
                    <input className="form-control" name="launchAppUrl" id={`${comId}_launch_app_url`} />
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
