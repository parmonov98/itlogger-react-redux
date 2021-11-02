import React, { useRef, useState } from 'react';

const TechItem = ({ tech, deleteTech, updateTech }) => {

  const [editable, setEditable] = useState(false);
  const item = useRef();
  const [name, setName] = useState(tech.name);

  const onSave = () => {
    const techID = item.current.getAttribute('tech-id');
    console.log(techID);
    const editingTech = {
      name: item.current.textContent,
      id: techID,
      date: new Date
    }

    updateTech(editingTech);
    setEditable(false);
  }

  return (
    <li className="collection-item">
      <div>
        <span
          ref={item} style={{ padding: '5px 10px' }}
          contentEditable={editable} tech-id={tech.id}
          onDoubleClick={!editable ? e => setEditable(true) : onSave}
          suppressContentEditableWarning={true}
        >
          {tech.name}
        </span>
        <a href="#" className="secondary-content" onClick={e => { e.preventDefault(); deleteTech(tech.id) }}>
          <i className="material-icons red-text">delete</i>
        </a>
      </div>
    </li>
  )
}



export default TechItem;
