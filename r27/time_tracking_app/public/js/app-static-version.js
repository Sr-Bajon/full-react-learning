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
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList />
          <ToggleableTimerForm
            isOpen={true}
          />
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
    return (
      <div id='timers'>
        <EditableTimer
          title='Learn React'
          project='Web Domination'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={true}
        />
        <EditableTimer
          title='Learn extreme ironing'
          project='World Domination'
          elapsed='3890985'
          runningSince={null}
          editFormOpen={false}
        />
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  // contenedor de timer o timer en modo edicion
  // usa el prop editFormOpen

  // sin estado, los recibe del padre.
  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
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

  // al ser un formulario se trata de una forma especial de estado
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
              <input type='text' defaultValue={this.props.title}/>
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project}/>
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
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'>
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