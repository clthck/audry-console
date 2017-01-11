'use strict';

import uuid from 'uuid';
import $ from 'jquery';
import React from 'react';
import styles from 'comsass/WardConfig/BedList.scss';

const { router } = SHARED_DATA;

export default class BedList extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      beds: [],
      activeBed: {},
    }
  }

  async componentDidMount() {
    try {
      const { props, id: comId } = this;
      const $containerEl = $(`#${comId}`);
      const $form = $containerEl.find('form');

      $form.parsley();

      $containerEl
        .on('hidden.bs.modal', '.new-bed-modal', e => {
          $form[0].reset();
        })
        .on('ajax:success', 'form', (e, data) => {
          $containerEl.find('.new-bed-modal').modal('hide');
          this.setState(prevState => ({
            beds: prevState.beds.concat(data)
          }));
        })
        .on('click', '.list-group-item-action', async e => {
          try {
            e.preventDefault();
            await this._activateBedItem(this.props, $(e.target).data('bed-id'));
          } catch (error) {
            // Handles ajax error here...
            console.log(error);
          }
        });
    }
    catch (error) {
      // Handles error here...
      console.log(error);
    }
  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.roomId !== this.props.roomId) {
        await this._updateInfo(nextProps);
      }
    } catch (error) {
      // Handles error here...
      console.log(error);
    }
  }

  async _updateInfo(props) {
    const { roomId, onBedSelect: triggerBedSelect } = props;
    let beds = [];

    if (roomId) {
      beds = await $.ajax({ url: router.bedsPath(roomId) });
      if (beds.length > 0) {
        await this._activateBedItem(props, beds[0].id);
      }
    }

    if (roomId === undefined || beds.length <= 0) {
      triggerBedSelect({});
    }

    this.setState({ beds });
  }

  async _activateBedItem(props, bedId) {
    const { roomId, onBedSelect: triggerBedSelect } = props;
    const activeBed = await $.ajax({ url: router.bedPath(roomId, bedId ) });
    this.setState({ activeBed });
    triggerBedSelect(activeBed);
  }

  render() {
    const { id: comId } = this;
    const { roomId } = this.props;
    const { beds, activeBed } = this.state;

    return (
      <div id={comId}>
        <div className="list-group">
          <li className={`list-group-item ${styles.bedListHeader}`}>
            <h6>Beds</h6>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={`#${comId} .new-bed-modal`} disabled={!roomId}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </li>
          {beds.map(bed => (
            <a key={uuid()} className={`list-group-item list-group-item-action ${bed.id === activeBed.id ? 'active' : ''}`} href="#" data-bed-id={bed.id}>{bed.name}</a>
          ))}
        </div>

        <div className="modal fade new-bed-modal">
          <div className="modal-dialog" role="document">
            <form action={router.bedsPath(roomId)} method="post" data-remote>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title">Create New Bed</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_name`}>Name:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="name" id={`${comId}_name`} required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_beaconMinor`}>Beacon Minor:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="beaconMinor" id={`${comId}_beaconMinor`} required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_buttonId`}>Button ID:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="buttonId" id={`${comId}_buttonId`} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_taskLightId`}>Task Light ID:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="taskLightId" id={`${comId}_taskLightId`} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_mainLightId`}>Main Light ID:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="mainLightId" id={`${comId}_mainLightId`} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor={`${comId}_remoteId`}>Remote ID:</label>
                    <div className="col-sm-9">
                      <input className="form-control" name="remoteId" id={`${comId}_remoteId`} />
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
