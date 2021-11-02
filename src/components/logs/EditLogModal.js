import React, { useState, useEffect, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateLog, setCurrent } from '../../actions/logActions';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';

const EditLogModal = ({ tech: { techs }, log, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const [id, setId] = useState('');
  const [modalStatus, setModalStatus] = useState(false);

  console.log(log);
  useEffect(() => {
    if (log !== null) {
      setMessage(log.message);
      setAttention(log.attention);
      setTech(log.tech);
      setId(log.id);
      setModalStatus(true);
    }
    // eslint-disable-next-line
  }, [log])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    if (message === '' || attention === '' || tech === '') {
      M.toast({ html: "Please, fill in all fields!", dismissible: false });
    } else {

      console.log(message, attention, tech);
      const editingLog = {
        message,
        id: e.target.dataset.id,
        attention,
        tech,
        date: new Date()
      };

      console.log(editingLog);
      updateLog(editingLog);
      // Clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
      setCurrent(null);
      setModalStatus(false);
    }

  }

  const onCancel = () => {
    setCurrent(null);
    setModalStatus(false);
  }

  return (
    <Modal
      actions={[
        <Button modal="close" href="#!" className="waves-effect waves-red btn-flat white-text red lighten-2" style={{ marginRight: "10px" }} onClick={onCancel}>Cancel</Button>,
        <Button href="#!" className="modal-action waves-effect white-text waves-green btn-flat green lighten-2 " data-id={id} onClick={onSubmit}>Update</Button>
      ]}
      open={modalStatus} id="edit-log-modal" className="modal no-autoinit" style={modalStyle}>
      <h3>Update System Log</h3>

      <div className="row">
        <div className="input-field">
          <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
        </div>
      </div>
      <div className="row input-field">
        <select name="tech" value={tech} className="browser-default" onChange={e => setTech(e.target.value)}>
          {techs.map(item => <option key={item.id} value="Murod">{item.name} </option>)}
        </select>
      </div>
      <div className="modal-footer valign-wrapper" style={{ justifyContent: "space-between" }}>
        <label className="left">
          <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
          <span>Needs attention</span>
        </label>
        <div>


        </div>
      </div>
    </Modal>
  )
};

EditLogModal.propTypes = {
  log: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
}

const modalStyle = {
  with: "75%",
  height: "auto",
  padding: "1em 2em"
};

const mapStateToProps = state => ({
  log: state.log.current,
  tech: state.tech
})
export default connect(mapStateToProps, { updateLog, setCurrent })(EditLogModal);