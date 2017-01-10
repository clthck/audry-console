'use strict';

import uuid from 'uuid';
import React from 'react';
import styles from 'comsass/ServiceCategory.scss';
import ServiceCard from './ServiceCard.js';
import ServiceCardNew from './ServiceCardNew.js';

export default class ServiceCategory extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      services: props.categoryData.services
    };
  }

  handleOnClickAddNewService = () => {
    this.props.onClickAddNew(this);
  }

  handleOnClickDeleteService = service => {
    const { categoryData: category, onClickDeleteService: triggerOnClickDeleteService } = this.props;
    const { services } = this.state;
    const serviceIndex = services.findIndex(s => s.name.toLowerCase() === service.name.toLowerCase());
    services.splice(serviceIndex, 1);
    this.setState({ services });
    triggerOnClickDeleteService(category, services);
  }

  render() {
    const { id: comId } = this;
    const { className, onClickAddNew, categoryData: category } = this.props;
    const { services } = this.state;

    return (
      <div id={comId} className={className}>
        <p>
          Category: <strong className="text-capitalize">{category.name}</strong>
        </p>
        <div className="bg-inverse rounded">
          <div className={`text-muted text-capitalize ${styles.title}`}>{category.name}</div>
          <div className={`ml-3 ${styles.servicesWrapper}`}>
            {services.map(service => (
              <ServiceCard key={uuid()} className={`ml-1 ${styles.serviceCard}`} serviceData={service} onClickDelete={this.handleOnClickDeleteService} />
            ))}
            <ServiceCardNew className={`ml-1 ${styles.serviceCard}`} onClick={this.handleOnClickAddNewService} />
          </div>
        </div>
      </div>
    );
  }
}
