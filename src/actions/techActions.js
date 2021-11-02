import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
  UPDATE_TECH
} from './types';



export const getTechs = () => async dispatch => {

  try {
    setLoading();

    const res = await fetch('/techs');
    const data = await res.json();
    dispatch({
      type: GET_TECHS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
}

export const addTech = (newTech) => async dispatch => {

  console.log(newTech);
  try {
    setLoading();

    const res = await fetch('/techs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTech)
    });
    const data = await res.json();
    dispatch({
      type: ADD_TECH,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
}

export const updateTech = (tech) => async dispatch => {

  console.log(tech);
  try {
    setLoading();
    console.log(tech);
    const res = await fetch(`/techs/${tech.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tech)
    });
    const data = await res.json();
    dispatch({
      type: UPDATE_TECH,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
}

export const deleteTech = (id) => async dispatch => {

  console.log(id);
  try {
    setLoading();

    const res = await fetch(`/techs/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    dispatch({
      type: DELETE_TECH,
      payload: id
    });

  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
};