/*
  Acerca del state

  los datos de Timer serán poseidos y manejador por TimerDashboard
  Cada EditableTimer manejará el estado de su timer en forma de edicion
  ToggleableTimerForm manejará el estado de la visibilidad del formulario
 */


class TimersDashboard extends React.Component {
  // contenedor principal
  // contiene el contenedor de timers y el boton + para crear uno nuevo
  // tiene dos componentes hijos y establece un prop, isOpen, que es un boolean
  // que es pasado a ToggleableTimerForm

  // isOpen es estado, se define aqui, cambia a lo largo del tiempo, no puede
  // ser calculado

  state = {
    timers: [
      {
        title       : 'Practice squat',
        project     : 'Gym Chores',
        id          : uuid.v4(),
        elapsed     : 5456099,
        runningSince: Date.now(),
      },
      {
        title       : 'Bake squash',
        project     : 'Kitchen Chores',
        id          : uuid.v4(),
        elapsed     : 1273998,
        runningSince: null,
      },
    ],
  };

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
          />
          <ToggleableTimerForm />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  // contenedor de timers editables
  // declara dos hijos, cada uno con los props correspondientes a EditableTimer

  // props de EditableTimer
  // son estado, se definen aqui, cambian y no pueden ser calculados.
  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
      />
    ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  // contenedor de timer o timer en modo edicion
  // usa el prop editFormOpen

  state = {
    editFormOpen: false,
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}

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

  render() {
    // si title existe se trata de un timer ya creado y por lo tanto usamos
    // update
    const submitText = this.props.title ? 'Update' : 'Create';
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
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component {
  // renderiza el boton + o el formulario de timerForm

  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({isOpen: true});
  };

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon'/>
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  // usa todos los props de timer

  // sin estado, las propiedades se pasan del padre
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon'/>
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon'/>
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);