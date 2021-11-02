import React, { useEffect, useState } from 'react';
import Preloader from '../layout/Preloader';
import TechItem from './TechItem';
import PropTypes from 'prop-types'
import { getTechs, deleteTech, updateTech } from '../../actions/techActions';
import { connect } from 'react-redux';

const TechListModal = ({ tech: tech, deleteTech, getTechs, updateTech }) => {

  const { techs, loading } = tech;

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);


  if (loading) {
    return <div className="tech-list-modal">
      <Preloader />
    </div>;
  }
  return (
    <div id="tech-list-modal" className="modal" style={modalStyle}>
      <ul className="collection with-header">
        <li className="collection-header">
          <h3 className="center">Technicians</h3>
        </li>
        {!loading && techs.length === 0 ? (
          <p className="center">No techs found</p>
        ) : (
          techs.map((item) => <TechItem tech={item} deleteTech={deleteTech} updateTech={updateTech} key={item.id} />)
        )}

      </ul>
    </div >
  )
}

const modalStyle = {
  with: "75%",
  height: "auto",
  padding: "3em 2em"
};

const mapStateToProps = state => ({
  tech: state.tech
})

export default connect(mapStateToProps, { getTechs, deleteTech, updateTech })(TechListModal)
