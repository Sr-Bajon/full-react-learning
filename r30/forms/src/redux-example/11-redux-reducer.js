import {
  FETCH_PEOPLE_REQUEST, FETCH_PEOPLE_SUCCESS,
  SAVE_PEOPLE_REQUEST, SAVE_PEOPLE_FAILURE, SAVE_PEOPLE_SUCCESS
} from './11-redux-actions.js';

const initialState = {
  people    : [],
  isLoading : false,
  saveStatus: 'READY',
  person    : {
    name      : '',
    email     : '',
    course    : null,
    department: null
  },
};

export function reducer(state = initialState, action) {
  // la primera vez action es undefined
  switch (action.type) {
    case FETCH_PEOPLE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case FETCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        people   : action.people,
        isLoading: false
      });
    case SAVE_PEOPLE_REQUEST:
      return Object.assign({}, state, {
        saveStatus: 'SAVING'
      });
    case SAVE_PEOPLE_FAILURE:
      return Object.assign({}, state, {
        saveStatus: 'ERROR'
      });
    // el action puede recibir otros parametros a parte del type, en este
    // ejemplo tb recibe una clave people en el objeto action.
    case SAVE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        people    : action.people,
        person    : {
          name      : '',
          email     : '',
          course    : null,
          department: null
        },
        saveStatus: 'SUCCESS'
      });
    default:
      return state;
  }

}
