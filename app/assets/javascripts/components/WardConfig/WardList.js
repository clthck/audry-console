'use strict';

import $ from 'jquery';
import uuid from 'uuid';
import React from 'react';

const { router } = SHARED_DATA;

export default class WardList extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      wards: props.wards || [],
      activeWard: {},
    };
  }

  componentDidMount() {
    const { props, id: comId } = this;
    const { wards } = this.state;
    const $containerEl = $(`#${comId}`);
    const $form = $containerEl.find('form');

    $form.parsley();

    $containerEl
      .on('hidden.bs.modal', '.new-ward-modal', e => {
        $form[0].reset();
      })
      .on('ajax:success', 'form', (e, data) => {
        $containerEl.find('.new-ward-modal').modal('hide');
        this.setState(prevState => ({
          wards: prevState.wards.concat(data)
        }));
      })
      .on('click', '.list-group-item-action', async e => {
        try {
          e.preventDefault();
          await this._activateWardItem(props, $(e.target).data('ward-id'));
        } catch (error) {
          // Handles ajax error here...
          console.log(error);
        }
      });

    if (wards.length > 0) {
      this._activateWardItem(props, wards[0].id);
    }
  }

  async _activateWardItem(props, wardId) {
    const activeWard = await $.ajax({ url: router.wardPath(wardId) });
    this.setState({ activeWard });
    props.onWardSelect(activeWard);
  }

  render() {
    const { id: comId } = this;
    const { wards, activeWard } = this.state;

    return (
      <div id={comId}>
        <div className="list-group">
          <li className="list-group-item text-xs-right">
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={`#${comId} .new-ward-modal`}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </li>
          {wards.map(ward => (
            <a key={uuid()} className={`list-group-item list-group-item-action ${ward.id === activeWard.id ? 'active' : ''}`} href="#" data-ward-id={ward.id}>{ward.name}</a>
          ))}
        </div>

        <div className="modal fade new-ward-modal">
          <div className="modal-dialog" role="document">
            <form action={router.wardsPath} method="post" data-remote>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title">Create New Ward</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor={`${comId}_name`}>Name:</label>
                    <div className="col-sm-10">
                      <input className="form-control" name="name" id={`${comId}_name`} required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor={`${comId}_description`}>Description:</label>
                    <div className="col-sm-10">
                      <textarea className="form-control" name="description" id={`${comId}_description`} required></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor={`${comId}_floor`}>Floor:</label>
                    <div className="col-sm-3">
                      <input className="form-control" name="floor" id={`${comId}_floor`} required />
                    </div>
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_beaconMajor`}>Beacon Major:</label>
                    <div className="col-sm-4">
                      <input className="form-control" name="beaconMajor" id={`${comId}_beaconMajor`} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary mr-1" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-outline-primary btn-add">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
