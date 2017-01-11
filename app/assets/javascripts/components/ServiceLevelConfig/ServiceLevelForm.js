'use strict';

import React from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import getFormData from 'lib/form-data.js';
import styles from 'comsass/ServiceLevelConfig/ServiceLevelForm.scss';
import ServiceLevelField from './ServiceCategory/ServiceLevelField.js';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    const { service } = this.props;
    this.state = {
      level1: service.serviceWards[0].level1,
      level2: service.serviceWards[0].level2,
      level3: service.serviceWards[0].level3
    };
  }

  componentDidMount() {
    const { id: comId } = this;
    const { open, onHide, onSubmit } = this.props;
    const $containerEl = $(`#${comId}`);

    $containerEl
      .on('hidden.bs.modal', '.modal', e => {
        onHide();
      })
      .parsley()
      .on('form:submit', e => {
        try {
          const data = getFormData($containerEl);
          onSubmit(data);
          this._toggleModal(false);
        } catch (error) {
          console.log(error);
        } finally {
          return false;
        }
      });

    this._toggleModal(open);
  }

  componentWillReceiveProps(nextProps) {
    const { open, service } = nextProps;
    const { props } = this;

    if (open !== props.open) {
      if (open) {
        this.setState({
          level1: service.serviceWards[0].level1,
          level2: service.serviceWards[0].level2,
          level3: service.serviceWards[0].level3
        });
      }
      this._toggleModal(open);
    }
  }

  handleOnServiceLevelFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _toggleModal(show) {
    const $containerEl = $(`#${this.id}`);
    $containerEl.find('.modal').modal(show ? 'show' : 'hide');
  }

  render() {
    const { id: comId } = this;
    const { service } = this.props;
    const { level1, level2, level3 } = this.state;

    return (
      <form id={comId}>
        <div className={`modal fade ${styles.wrapper}`}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">The following message will be displayed on the nurses station.</p>
                </div>
                <div className={`align-items-center mt-1 mb-1 ${styles.iconMessageWrapper}`}>
                  <img src={service.icon} alt={service.name} />
                  <p className="ml-1">{service.notificationMessage}</p>
                </div>
                <div className="row bg-faded">
                  <p className="col-sm-12 mt-1">Service levels for this action:</p>
                </div>
                <div className={`align-items-center mt-1 ${styles.serviceLevelFieldsWrapper}`}>
                  <ServiceLevelField mainColor="yellow" name="level1" value={level1} onChange={this.handleOnServiceLevelFieldChange} />
                  <ServiceLevelField mainColor="orange" name="level2" value={level2} onChange={this.handleOnServiceLevelFieldChange} />
                  <ServiceLevelField mainColor="red" name="level3" value={level3} onChange={this.handleOnServiceLevelFieldChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary mr-1" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-outline-primary">OK</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
