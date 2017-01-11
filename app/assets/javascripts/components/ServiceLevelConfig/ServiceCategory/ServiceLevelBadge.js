'use strict';

import React from 'react';
import styles from 'comsass/ServiceLevelConfig/ServiceCategory/ServiceLevelBadge.scss';

export default class __ extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { service } = this.props;
    const level1 = service.serviceWards[0].level1 || 'N/A';
    const level2 = service.serviceWards[0].level2 || 'N/A';
    const level3 = service.serviceWards[0].level3 || 'N/A';

    if (level1 === 'N/A' && level2 === 'N/A' && level3 === 'N/A') {
      return null;
    } else {
      return (
        <div className={`align-items-center w-100 ${styles.wrapper}`}>
          <div className={`text-xs-center w-100 ${styles.yellowLevel}`}>{level1}</div>
          <div className={`text-xs-center w-100 ${styles.orangeLevel}`}>{level2}</div>
          <div className={`text-xs-center w-100 ${styles.redLevel}`}>{level3}</div>
        </div>
      );
    }
  }
}
