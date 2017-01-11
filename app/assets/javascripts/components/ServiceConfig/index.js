'use strict';

import uuid from 'uuid';
import $ from 'jquery';
import React from 'react';
import styles from 'comsass/ServiceConfig/index.scss';
import ServiceCategory from './ServiceCategory';
import ServiceCategoryForm from './ServiceCategoryForm.js';
import ServiceForm from './ServiceForm';

const { router } = SHARED_DATA;

export default class ServiceConfig extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.state = {
      categories: props.categories,
      currentCategory: {
        props: { categoryData: {} }
      },
      newServiceModalOpen: false,
    };
  }

  componentDidMount() {
    $('#nav_item_save a').data('handler-func', this.handleOnClickSave);
  }

  handleServiceCategoryFormSubmitEvent = category => {
    this.setState(ps => ({
      categories: ps.categories.concat(Object.assign({}, category, { services: [] }))
    }));
  }

  openAddNewServiceModal = (categoryComp) => {
    this.setState({
      currentCategory: categoryComp,
      newServiceModalOpen: true,
    });
  }

  handleServiceFormHideEvent = () => {
    this.setState({ newServiceModalOpen: false });
  }

  handleServiceFormSubmitEvent = (data) => {
    const { currentCategory, categories } = this.state;
    const category = categories.find(c => c.name === currentCategory.props.categoryData.name);
    category.services.push(data);
    this.setState({ categories });
  }

  handleDeleteServiceEvent = (currentCategory, services) => {
    const { categories } = this.state;
    const category = categories.find(c => c.name === currentCategory.name);
    category.services = services;
    this.setState({ categories });
  }

  handleOnClickSave = async e => {
    const { categories } = this.state;
    const formData = new FormData();

    $('.saving-indicator', `#${this.id}`).modal({ backdrop: 'static' });

    categories.forEach((category, i) => {
      formData.append(`id[${i}]`, category.id);
      formData.append(`name[${i}]`, category.name);
      category.services.forEach((service, j) => {
        formData.append(`service[id][${i}][${j}]`, service.id);
        formData.append(`service[name][${i}][${j}]`, service.name);
        formData.append(`service[icon][${i}][${j}]`, service.icon);
        formData.append(`service[description][${i}][${j}]`, service.description);
        formData.append(`service[notificationMessage][${i}][${j}]`, service.notificationMessage);
        formData.append(`service[launchAppUrl][${i}][${j}]`, service.launchAppUrl);
      });
    });

    try {
      const res = await $.ajax({
        url: router.serviceCategoriesBulkCreatePath,
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
    const { categories, currentCategory, newServiceModalOpen } = this.state;

    return (
      <div id={comId}>
        <div className={`alert alert-info ${styles.serviceConfigHeader}`} role="alert">
          <span>Click on the icon and drag left or right to change the order. Click on the icon once to see the function to be performed or to adjust service levels for the specific action.</span>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${comId} .new-service-category-modal`}>Add Service Category</button>
        </div>

        <div>
          {categories.map(category => (
            <ServiceCategory
              key={uuid()}
              className={`mt-1 pt-1 ${styles.serviceCategory}`}
              categoryData={category}
              onClickAddNew={this.openAddNewServiceModal}
              onClickDeleteService={this.handleDeleteServiceEvent}
            />
          ))}
        </div>

        <ServiceCategoryForm className="new-service-category-modal" onSubmit={this.handleServiceCategoryFormSubmitEvent} />
        <ServiceForm
          category={currentCategory}
          open={newServiceModalOpen}
          onHide={this.handleServiceFormHideEvent}
          onSubmit={this.handleServiceFormSubmitEvent}
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
