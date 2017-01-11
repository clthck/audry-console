'use strict';

import React from 'react';
import styles from 'comsass/ServiceLevelConfig/ServiceCategory/ServiceLevelField.scss';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ fieldValue: nextProps.value || '' });
    }
  }

  handleFieldValueChange = e => {
    const { onChange } = this.props;
    this.setState({ fieldValue: e.target.value });
    if (onChange && typeof onChange === 'function') {
      onChange(e);
    }
  }

  render() {
    const { className, mainColor, name } = this.props;
    const { fieldValue } = this.state;

    return (
      <div className={`align-items-center rounded ${className} ${styles.wrapper} ${styles[mainColor]}`}>
        <span>Up to:</span>
        <input className="form-control" name={name} value={fieldValue} onChange={this.handleFieldValueChange} />
        <span>Minutes</span>
      </div>
    );
  }
}
