'use strict';

import uuid from 'uuid';
import $ from 'jquery';
import React from 'react';
import styles from 'comsass/ServiceLevelConfig/index.scss';
import ServiceCategory from './ServiceCategory';
import ServiceLevelForm from './ServiceLevelForm.js';

const { router } = SHARED_DATA;

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      categories: props.categories,
      currentService: { serviceWards: [{}] },
      serviceLevelModalOpen: false,
    };
  }

  componentDidMount() {
    $('#nav_item_save a').data('handler-func', this.handleOnClickSave);
  }

  openServiceLevelModal = service => {
    this.setState({
      currentService: service,
      serviceLevelModalOpen: true,
    });
  }

  handleServiceLevelFormHideEvent = () => {
    this.setState({ serviceLevelModalOpen: false });
  }

  handleServiceLevelFormSubmitEvent = (data) => {
    const { currentService } = this.state;
    Object.assign(currentService.serviceWards[0], data);
  }

  handleOnCategoryScopeLevelChange = (category, data) => {
    category.serviceCategoryWards[0] = category.serviceCategoryWards[0] || {};
    Object.assign(category.serviceCategoryWards[0], data);
  }

  handleOnClickSave = async e => {
    const { categories } = this.state;
    const formData = new FormData();
    const wardId = $('#dropdown_ward_select_button').data('ward-id');

    formData.append('categories', JSON.stringify(categories));
    $('.saving-indicator', `#${this.id}`).modal({ backdrop: 'static' });

    try {
      const res = await $.ajax({
        url: `${router.wardsServiceCategoriesBulkUpdatePath}?wardId=${wardId}`,
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
      });
      if (res === 'success') {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { id: comId } = this;
    const { categories, currentService, serviceLevelModalOpen } = this.state;

    return (
      <div id={comId}>
        <div className={`alert alert-info ${styles.serviceConfigHeader}`} role="alert">
          <span>Click on the icon and drag left or right to change the order. Click on the icon once to see the function to be performed or to adjust service levels for the specific action.</span>
        </div>

        <div>
          {categories.map(category => (
            <ServiceCategory
              key={uuid()}
              className={`mt-1 pt-1 ${styles.serviceCategory}`}
              categoryData={category}
              onCategoryScopeLevelChange={this.handleOnCategoryScopeLevelChange}
              onClickServiceCard={this.openServiceLevelModal}
            />
          ))}
        </div>

        <ServiceLevelForm
          service={currentService}
          open={serviceLevelModalOpen}
          onHide={this.handleServiceLevelFormHideEvent}
          onSubmit={this.handleServiceLevelFormSubmitEvent}
        />

        <div className="modal fade saving-indicator">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <p className="text-xs-center m-0">Saving...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
