class TimerForm extends React.Component {
  // timer en su forma de edicion
  // tiene dos inputs, uno para el titulo y otro para el proyecto. Al editar un
  // timer existente, estos campos son inicializados con los valores actuales
  // del timer

  // al ser un formulario se trata de una forma especial de estado, en React los
  // formularios tienen estado
  state = {
    title  : this.props.title || '',
    project: this.props.project || '',
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  };

  handleProjectChange = (e) => {
    this.setState({project: e.target.value});
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id     : this.props.id,
      title  : this.state.title,
      project: this.state.project,
    });
  };

  render() {
    // si title existe se trata de un timer ya creado y por lo tanto usamos
    // update
    const submitText = this.props.id ? 'Update' : 'Create';

    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text'
                     value={this.state.title}
                     onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text'
                     value={this.state.project}
                     onChange={this.handleProjectChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerForm;