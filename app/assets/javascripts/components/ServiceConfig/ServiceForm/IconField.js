'use strict';

import React from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import styles from 'comsass/ServiceConfig/ServiceForm/IconField.scss';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id || uuid();
  }

  static getServiceIconImgTagClass = () => styles.serviceIcon

  componentDidMount() {
    const $containerEl = $(`#${this.id}`);
    const $serviceIcon = $containerEl.find(`.${styles.serviceIcon}`);
    const $serviceIconFilePathField = $containerEl.find('.file-path');

    $containerEl
      .on('click', '.btn-browse', e => {
        $containerEl.find('input[type=file]').trigger('click');
      })
      .on('change', 'input[type=file]', e => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();
          const useBlob = true && window.URL;

          reader.addEventListener('load', () => {
            $serviceIcon.attr('src', useBlob ? window.URL.createObjectURL(file) : reader.result);
            if (useBlob) {
              window.URL.revokeObjectURL(file);
            }
          });
          reader.readAsDataURL(file);
          $serviceIconFilePathField.val(file.name);
        } else {
          $serviceIcon.attr('src', '');
          $serviceIconFilePathField.val('');
        }
      });
  }

  render() {
    const { id: comId } = this;
    const { name, serviceName } = this.props;

    return (
      <div id={comId} className="col-sm-12 align-items-center">
        <div className={`card bg-inverse ${styles.mainCard}`}>
          <div className="bg-faded p-1">
            <img className={`card-img-top ${styles.serviceIcon}`} alt="Action Icon" />
          </div>
          <div className="card-block text-xs-center p-0">
            <p className={`card-text text-capitalize ${styles.title}`}>{serviceName}</p>
          </div>
        </div>
        <div className="w-100 ml-1 align-items-center">
          <input type="file" className="hidden-xs-up" name={name} required />
          <input className="form-control d-inline-block file-path" readOnly />
          <button type="button" className="btn btn-outline-primary ml-1 btn-browse">Browse</button>
        </div>
      </div>
    );
  }
}
