import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';


class TimersDashboard extends React.Component {
  // contenedor principal
  // contiene el contenedor de timers y el boton + para crear uno nuevo
  // tiene dos componentes hijos y establece un prop, isOpen, que es un boolean
  // que es pasado a ToggleableTimerForm

  // isOpen es estado, se define aqui, cambia a lo largo del tiempo, no puede
  // ser calculado

  state = {
    timers: []
  };

  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }

  loadTimersFromServer = () => {
    client.getTimers((serverTimers) => (
        this.setState({timers: serverTimers})
      )
    );
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);

    client.createTimer(t);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        // si se encuentra un timer con el mismo id se actualiza
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title  : attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });

    client.updateTimer(attrs);
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);

    client.deleteTimer(
      {id: timerId}
    );
  };

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  };

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });
  };

  startTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });

    client.startTimer(
      {id: timerId, start: now}
    );
  };

  stopTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed     : timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });

    client.stopTimer(
      {id: timerId, stop: now}
    );
  };

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}


export default TimersDashboard;