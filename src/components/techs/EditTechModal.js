import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditTechModal = ({ editingTech, updateTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (editingTech) {
      setFirstName(editingTech.firstName);
      setLastName(editingTech.firstName);
    }
    // eslint-disable-next-line
  }, [editingTech])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted update tech form');
    if (firstName === '' || lastName === '') {
      M.toast({ html: "Please, fill in all fields!", dismissible: false });
    } else {

      const newTech = {
        firstName,
        lastName,
        date: new Date()
      };

      updateTech(newTech);
      // Clear Fields
      setFirstName('');
      setLastName('');
    }

  }

  return (
    <div id="add-tech-modal" className="modal" style={modalStyle}>
      <h3>Add new technician</h3>
      <div className="row">
        <div className="input-field">
          <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <label htmlFor="firstName" className="active">First Name</label>
        </div>
      </div>
      <div className="row input-field">
        <div className="input-field">
          <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
          <label htmlFor="lastName" className="active">Last Name</label>
        </div>
      </div>
      <div className="modal-footer valign-wrapper" style={{ justifyContent: "flex-end" }}>
        <a href="#!" className="modal-close waves-effect waves-red btn-flat white-text red lighten-2" style={{ marginRight: "10px" }}>Disagree</a>
        <a href="#!" className="waves-effect white-text waves-green btn-flat green lighten-2 " onClick={onSubmit}>Add</a>
      </div>

    </div>
  )
};

const modalStyle = {
  with: "75%",
  height: "auto",
  padding: "3em 2em"
};

export default EditTechModal;
