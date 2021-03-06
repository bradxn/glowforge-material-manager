import React from 'react';
import PropTypes from 'prop-types';
import { IconCircle } from './Icons';
import './SyncStatus.css';

class SyncStatus extends React.Component {
  render() {
    return (
      <div className={(this.props.synchronized) ? 'Status Status-green' : 'Status Status-red'}>
        <IconCircle click={this.props.forceSync} />
      </div>
    );
  }
}

SyncStatus.propTypes = {
  synchronized: PropTypes.bool.isRequired,
  forceSync: PropTypes.func.isRequired
}

export default SyncStatus;
