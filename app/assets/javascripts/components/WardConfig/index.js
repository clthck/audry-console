'use strict';

import uuid from 'uuid';
import React from 'react';
import styles from 'comsass/WardConfig/index.scss';
import WardList from './WardList.js';
import WardDetail from './WardDetail.js';
import RoomList from './RoomList.js';
import BedList from './BedList.js';
import BedDetail from './BedDetail.js';

export default class WardConfig extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      currentWard: {},
      currentRoom: {},
      currentBed: {},
    };
  }

  refreshWardDetail = currentWard => {
    this.setState({ currentWard });
  }

  refreshRoomDetail = currentRoom => {
    this.setState({ currentRoom });
  }

  refreshBedDetail = currentBed => {
    this.setState({ currentBed });
  }

  render() {
    const { props } = this;
    const { currentWard, currentRoom, currentBed }  = this.state;

    return (
      <div id={this.id} className="row m-0">
        <div className={`col-sm-2 pt-2 ${styles.colBorderRight}`}>
          <WardList
            wards={props.wards}
            onWardSelect={this.refreshWardDetail}
          />
        </div>
        <div className="col-sm-6 pt-2">
          <WardDetail ward={currentWard} />
        </div>
        <div className={`col-sm-1 pt-2 ${styles.colBorderLeft} ${styles.colBorderRight}`}>
          <RoomList wardId={currentWard.id} onRoomSelect={this.refreshRoomDetail} />
        </div>
        <div className={`col-sm-1 pt-2 ${styles.colBorderRight}`}>
          <BedList roomId={currentRoom.id} onBedSelect={this.refreshBedDetail} />
        </div>
        <div className="col-sm-2 pt-2">
          <BedDetail bed={currentBed} />
        </div>
      </div>
    );
  }
}
