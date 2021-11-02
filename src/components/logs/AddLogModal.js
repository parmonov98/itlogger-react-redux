import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
// import { techs } from '../../actions/techActions';

const AddLogModal = ({ addLog, tech }) => {
  const { techs } = tech;
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [currentTech, setCurrentTech] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    if (message === '' || attention === '' || currentTech === '') {
      M.toast({ html: "Please, fill in all fields!", dismissible: false });
    } else {

      console.log(message, attention, currentTech);
      const newLog = {
        message,
        attention,
        currentTech,
        date: new Date()
      };

      addLog(newLog);
      M.toast({ html: `New log added by ${currentTech}`, displayLength: 4000 })
      // Clear Fields
      setMessage('');
      setCurrentTech('');
      setAttention(false);
    }

  }

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <h3>Enter System Log</h3>
      <div className="row">
        <div className="input-field">
          <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
          <label htmlFor="message" className="active">Log message</label>
        </div>
      </div>
      <div className="row input-field">
        <select name="tech" value={currentTech} className="browser-default" onChange={e => setCurrentTech(e.target.value)}>
          <option value="" disabled>Select technician</option>
          {techs.map(item => <option key={item.id} value="Murod">{item.name} </option>)}
        </select>
      </div>
      <div className="modal-footer valign-wrapper" style={{ justifyContent: "space-between" }}>
        <label className="left">
          <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
          <span>Needs attention</span>
        </label>
        <div>
          <a href="#!" className="modal-close waves-effect waves-red btn-flat white-text red lighten-2" style={{ marginRight: "10px" }}>Disagree</a>
          <a href="#!" className="waves-effect white-text waves-green btn-flat green lighten-2 " onClick={onSubmit}>Add</a>
        </div>
      </div>

    </div>
  )
};

const modalStyle = {
  with: "75%",
  height: "auto",
  padding: "3em 2em"
};



AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  tech: state.tech
})

export default connect(mapStateToProps, { addLog })(AddLogModal)
