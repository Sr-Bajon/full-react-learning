import EditableTimer from './EditableTimer';

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
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
      />
    ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}


export default EditableTimerList;