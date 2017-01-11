'use strict';

import uuid from 'uuid';
import React from 'react';
import $ from 'jquery';
import styles from 'comsass/ServiceLevelConfig/ServiceCategory/ServiceCard.scss';
import ServiceLevelBadge from './ServiceLevelBadge.js';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();

    const service = props.serviceData;
    service.serviceWards[0] = service.serviceWards[0] || {};
    this.state = { service };
  }

  componentDidMount() {
    const { onClickToggleVisibility, onClick } = this.props;
    const $container = $(`#${this.id}`);

    $container
      .on('click', `.${styles.cornerButton}`, e => {
        const { service } = this.state;
        service.serviceWards[0].visible = !service.serviceWards[0].visible;
        this.setState({ service });
        if (onClickToggleVisibility) {
          onClickToggleVisibility(service);
        }
      })
      .on('click', `.${styles.mainCard}`, e => {
        const { service } = this.state;
        onClick(service);
      });
  }

  render() {
    const { id: comId } = this;
    const { className } = this.props;
    const { service } = this.state;
    const serviceVisibility = service.serviceWards[0].visible;

    return (
      <div id={comId} className={`d-inline-block ${styles.wrapper} ${className}`}>
        <div className={`card ${styles.mainCard} ${serviceVisibility ? '' : styles.serviceInvisible}`}>
          <div className="bg-faded p-1 rounded">
            <img className={`card-img-top ${styles.serviceIcon}`} src={service.id ? service.icon : service.iconImgTagSrc} alt={service.name} />
            <ServiceLevelBadge service={service} />
          </div>
          <div className="card-block text-xs-center p-0">
            <p className={`card-text text-capitalize ${styles.title}`}>{service.name}</p>
          </div>
        </div>
        <img className={`${styles.cornerButton}`} src={`/assets/${serviceVisibility ? 'minus' : 'plus'}.png`} />
      </div>
    );
  }
}
