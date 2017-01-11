'use strict';

import uuid from 'uuid';
import React from 'react';
import styles from 'comsass/ServiceLevelConfig/ServiceCategory/index.scss';
import ServiceCard from './ServiceCard.js';
import ServiceLevelField from './ServiceLevelField.js';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();

    const { categoryData: category } = this.props;
    category.serviceCategoryWards[0] = category.serviceCategoryWards[0] || {};
    this.state = { category };
  }

  handleOnClickServiceCard = service => {
    const { onClickServiceCard } = this.props;
    onClickServiceCard(service);
  }

  handleOnServiceLevelFieldChange = e => {
    this.props.onCategoryScopeLevelChange(this.state.category, { [e.target.name]: e.target.value });
  }

  render() {
    const { id: comId } = this;
    const { className } = this.props;
    const { category } = this.state;

    return (
      <div id={comId} className={className}>
        <div className={`align-items-center ${styles.header}`}>
          <p>
            Category: <strong className="text-capitalize">{category.name}</strong>
          </p>
          <div className="align-items-center mb-1">
            <span>Service Levels: </span>
            <ServiceLevelField className="ml-2" mainColor="yellow" name="level1" value={category.serviceCategoryWards[0].level1} onChange={this.handleOnServiceLevelFieldChange} />
            <ServiceLevelField className="ml-2" mainColor="orange" name="level2" value={category.serviceCategoryWards[0].level2} onChange={this.handleOnServiceLevelFieldChange} />
            <ServiceLevelField className="ml-2" mainColor="red" name="level3" value={category.serviceCategoryWards[0].level3} onChange={this.handleOnServiceLevelFieldChange} />
          </div>
        </div>

        <div className="bg-inverse rounded">
          <div className={`text-muted text-capitalize ${styles.title}`}>{category.name}</div>
          <div className={`ml-3 ${styles.servicesWrapper}`}>
            {category.services.map(service => (
              <ServiceCard
                key={uuid()}
                className={`ml-1 ${styles.serviceCard}`}
                serviceData={service}
                onClick={this.handleOnClickServiceCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
