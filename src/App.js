import React, { Fragment, useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddButton from './components/layout/AddButton';
import AddLogModal from './components/logs/AddLogModal';
import TechListModal from './components/techs/TechListModal';
import AddTechModal from './components/techs/AddTechModal';
import EditLogModal from './components/logs/EditLogModal';



const App = () => {

  const [editingLog, setEditingLog] = useState(null);
  const [modal, setModal] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    M.AutoInit();
  }, []);
  // useEffect(() => {
  //   getLogs();
  // }, [])


  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <div className="container">
          <AddButton />
          <AddLogModal />
          <EditLogModal />
          <Logs />
          <AddTechModal />
          <TechListModal />
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
