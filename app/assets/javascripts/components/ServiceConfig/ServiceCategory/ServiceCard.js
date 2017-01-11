'use strict';

import uuid from 'uuid';
import React from 'react';
import $ from 'jquery';
import styles from 'comsass/ServiceConfig/ServiceCategory/ServiceCard.scss';

export default class ServiceCard extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentDidMount() {
    const { serviceData: service, onClickDelete: triggerOnClickDelete } = this.props;
    const $container = $(`#${this.id}`);

    $container
      .on('click', `.${styles.cornerButton}`, e => {
        triggerOnClickDelete(service);
      });
  }

  render() {
    const { id: comId } = this;
    const { className, serviceData: service } = this.props;

    return (
      <div id={comId} className={`d-inline-block ${styles.wrapper} ${className}`}>
        <div className={`card ${styles.mainCard}`}>
          <div className="bg-faded p-1 rounded">
            <img className={`card-img-top ${styles.serviceIcon}`} src={service.id ? service.icon : service.iconImgTagSrc} alt={service.name} />
          </div>
          <div className="card-block text-xs-center p-0">
            <p className={`card-text text-capitalize ${styles.title}`}>{service.name}</p>
          </div>
        </div>
        <img className={`${styles.cornerButton}`} src="/assets/minus.png" />
      </div>
    );
  }
}
