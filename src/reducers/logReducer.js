import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS
} from "../actions/types.js";


const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      }
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      }
    case SET_CURRENT:
      let current = null;
      if (action.payload !== null) {
        current = state.logs.find(item => item.id === action.payload);
      }
      return {
        ...state,
        current: current,
        loading: false
      }
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      }
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(item => item.id === action.payload.id ? action.payload : item),
        current: null
      }
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(item => item.id !== action.payload),
        loading: false
      }

    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}