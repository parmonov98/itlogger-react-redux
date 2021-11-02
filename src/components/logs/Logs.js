import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';
import PropTypes from 'prop-types';

import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  // const Logs = ({ log: { logs, loading } }) => {

  console.log(logs);
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, [loading]);

  if (loading || logs === null) {
    return <Preloader />;
  }


  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h3 className="center">System logs</h3>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs found</p>
      ) : (
        logs.map((item) => <LogItem log={item} key={item.id} />)
        // logs.map((item) => <LogItem log={item} key={item.id} deleteLog={deleteLog} setEditingLogData={setEditingLogData} />)
      )}

    </ul>
  )
}

const mapStateToProps = state => ({
  log: state.log
})

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getLogs })(Logs)
