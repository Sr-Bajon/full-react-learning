import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './11-redux-reducer.js';
import { fetchPeople, savePeople } from './11-redux-actions.js';

const Form = require('./11-redux-form.js');

// creamos nuestra store con el reducer creado y aplicamos el middleware
// thunkMiddleware que permite acciones que devuelven funciones que ejecutan
// codigo asincrono
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// TODO esto no lo entiendo muy bien, himbestigar ^^
const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

module.exports = class extends React.Component {
  static displayName = "11-redux-app";

  componentWillMount() {
    store.dispatch(fetchPeople());
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (people) => {
      dispatch(savePeople(people));
    },
  };
}
