

import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
  UPDATE_TECH
} from '../actions/types';

const initialState = {
  techs: [],
  loading: false,
  current: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      }
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false
      }
    // case SET_CURRENT:
    //   let current = null;
    //   if (action.payload !== null) {
    //     current = state.techs.find(item => item.id === action.payload);
    //   }
    //   return {
    //     ...state,
    //     current: current,
    //     loading: false
    //   }
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(item => item.id === action.payload.id ? action.payload : item),
        current: null
      }
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(item => item.id !== action.payload),
        loading: false
      }

    case TECHS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}