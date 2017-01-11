'use strict';

import uuid from 'uuid';
import $ from 'jquery';
import React from 'react';
import styles from 'comsass/WardConfig/RoomList.scss';

const { router } = SHARED_DATA;

export default class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      rooms: [],
      activeRoom: {},
    }
  }

  async componentDidMount() {
    try {
      const { props, id: comId } = this;
      const $containerEl = $(`#${comId}`);
      const $form = $containerEl.find('form');

      $form.parsley();
      $containerEl
        .on('hidden.bs.modal', '.new-room-modal', e => {
          $form[0].reset();
        })
        .on('ajax:success', 'form', (e, data) => {
          $containerEl.find('.new-room-modal').modal('hide');
          this.setState(prevState => ({
            rooms: prevState.rooms.concat(data)
          }));
        })
        .on('click', '.list-group-item-action', async e => {
          try {
            e.preventDefault();
            await this._activateRoomItem(this.props, $(e.target).data('room-id'));
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
      if (nextProps.wardId !== this.props.wardId) {
        await this._updateInfo(nextProps);
      }
    } catch (error) {
      // Handles error here...
      console.log(error);
    }
  }

  async _updateInfo(props) {
    const { wardId, onRoomSelect: triggerRoomSelect } = props;
    const rooms = await $.ajax({ url: router.roomsPath(wardId) });
    this.setState({ rooms });

    if (rooms.length > 0) {
      await this._activateRoomItem(props, rooms[0].id);
    } else {
      triggerRoomSelect({});
    }
  }

  async _activateRoomItem(props, roomId) {
    const { wardId, onRoomSelect: triggerRoomSelect } = props;
    const activeRoom = await $.ajax({ url: router.roomPath(wardId, roomId ) });
    this.setState({ activeRoom });
    triggerRoomSelect(activeRoom);
  }

  render() {
    const { id: comId } = this;
    const { wardId } = this.props;
    const { rooms, activeRoom } = this.state;

    return (
      <div id={comId}>
        <div className="list-group">
          <li className={`list-group-item ${styles.roomListHeader}`}>
            <h6>Rooms</h6>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={`#${comId} .new-room-modal`} disabled={!wardId}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </li>
          {rooms.map(room => (
            <a key={uuid()} className={`list-group-item list-group-item-action ${room.id === activeRoom.id ? 'active' : ''}`} href="#" data-room-id={room.id}>{room.name}</a>
          ))}
        </div>

        <div className="modal fade new-room-modal">
          <div className="modal-dialog" role="document">
            <form action={router.roomsPath(wardId)} method="post" data-remote>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title">Create New Room</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor={`${comId}_name`}>Name:</label>
                    <div className="col-sm-10">
                      <input className="form-control" name="name" id={`${comId}_name`} required />
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
