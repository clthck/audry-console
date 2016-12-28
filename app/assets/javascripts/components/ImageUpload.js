'use strict';

import $ from 'jquery';
import uuid from 'uuid';
import React from 'react';
import styles from 'comsass/ImageUpload.scss';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  componentDidMount() {
    const props = this.props;
    const $containerEl = $(`#${this.id}`);
    const $previewImgEl = $containerEl.find('img');

    $containerEl
      .on('dblclick', `.${styles.preview}`, e => {
        $containerEl.find(`.${styles.file}`).trigger('click');
      })
      .on('change', `.${styles.file}`, e => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();
          const useBlob = true && window.URL;

          reader.addEventListener('load', () => {
            $previewImgEl.attr('src', useBlob ? window.URL.createObjectURL(file) : reader.result);
            if (useBlob) {
              window.URL.revokeObjectURL(file);
            }
          });
          reader.readAsDataURL(file);
        } else {
          $previewImgEl.attr('src', props.placeholderImage);
        }
      });
  }

  render() {
    const props = this.props;

    return (
      <div className={[styles.topContainer, props.className].join(' ')} id={this.id}>
        <input type="file" className={styles.file} accept="image/*" />
        <p className={styles.title}>{props.title}</p>
        <div className={styles.preview}>
          <img src={props.placeholderImage} />
        </div>
      </div>
    );
  }
}
