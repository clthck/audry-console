'use strict';

import uuid from 'uuid';
import React from 'react';
import styles from 'comsass/ServiceConfig/ServiceCategory/ServiceCardNew.scss';

export default class ServiceCardNew extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  render() {
    const { id: comId } = this;
    const { className, onClick } = this.props;

    return (
      <a id={comId} className={`d-inline-block ml-1 ${styles.button} ${className}`} onClick={onClick} href="javascript:;">
        <div className={`card ${styles.cardWrapper}`}>
          <div className={`bg-faded p-1 rounded ${styles.card}`}>
            <p className="text-xs-center">Add New Icon</p>
          </div>
        </div>
      </a>
    );
  }
}
