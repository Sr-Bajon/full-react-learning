import React, { PropTypes } from 'react';

module.exports = class extends React.Component {
  // observa que aunque el componente recibe todos estos props el componente
  // en el render sólo usa el placeholder, los demas se usan en el state o en
  // la funcion onChange
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
    error: false,
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    // esta función onChange es la que actualizará el estado de la clase padre
    this.props.onChange({ name, value, error });
  };

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span style={{ color: 'red' }}>{ this.state.error }</span>
      </div>
    );
  }
};
