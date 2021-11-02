import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTech } from '../../actions/techActions';

const AddTechModal = ({ addTech }) => {
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    if (name === '') {
      M.toast({ html: "Please, fill in all fields!", dismissible: false });
    } else {

      const newTech = {
        name,
        date: new Date()
      };

      addTech(newTech);
      // Clear Fields
      setName('');
      const instance = M.Modal.getInstance(document.querySelector('.modal'));
      instance.close();
    }

  }

  return (
    <div id="add-tech-modal" className="modal" style={modalStyle}>
      <h3>Add new technician</h3>
      <div className="row">
        <div className="input-field">
          <input type="text" name="firstName" value={name} onChange={e => setName(e.target.value)} />
          <label htmlFor="firstName" className="active">First Name</label>
        </div>
      </div>
      <div className="modal-footer valign-wrapper" style={{ justifyContent: "flex-end" }}>
        <a href="#!" className="modal-close waves-effect waves-red btn-flat white-text red lighten-2" style={{ marginRight: "10px" }}>Disagree</a>
        <a href="#!" className="modal-action waves-effect white-text waves-green btn-flat green lighten-2 " onClick={onSubmit}>Add</a>
      </div>

    </div>
  )
};

const modalStyle = {
  with: "75%",
  height: "auto",
  padding: "3em 2em"
};

const mapStateToProps = state => ({
  tech: state.tech.current
});

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { addTech })(AddTechModal);
