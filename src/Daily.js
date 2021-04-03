import React from "react";
import "./Daily.css";

class Daily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: "",
      donetasks: [],
    };
  }

  componentDidMount() {
    const stor = localStorage.getItem("tasks");
    if (stor) {
      const tasks = stor.split(",");
      this.setState({
        tasks: tasks,
      });
    }
    const stor2 = localStorage.getItem("donetasks");
    if (stor2) {
      const donetasks = stor2.split(",");
      this.setState({
        donetasks: donetasks,
      });
    }

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("tasks", this.state.tasks);
      localStorage.setItem("donetasks", this.state.donetasks);

    });
  }

  render() {
    return (
      <div className="day">
        <h2>Daily To Do List:</h2>
        <ul className="order_list">
          {this.state.tasks.map((task, i) => (
            <li key={i}>
              {task}
              <button
                className="button check"
                data-index={i}
                onClick={this.checkTask}
              >
                ✅
              </button>
              <button
                className="button delete"
                data-index={i}
                onClick={this.deleteTask}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <ul className="order_done_list">
          {this.state.donetasks.map((done, j) => (
            <li className="doneTask" key={j}>
              {done}
              <button
                className="button check"
                data-index={j}
                onClick={this.returnTask}
              >
                ✅
              </button>
              <button
                className="button delete"
                data-index={j}
                onClick={this.deleteDoneTask}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            className="input"
            onChange={this.handleChange}
            value={this.state.input}
          />
        </div>
        <button className="button add" onClick={this.addTask}>
          Add Task
          </button>
      </div>
    );
  }
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  addTask = () => {
    this.setState((state) => ({
      tasks: [...state.tasks, state.input],
      input: "",
    }));
  };

  deleteTask = (event) => {
    // give access to the index of the button.
    const index = event.target.dataset.index;

    this.setState((state) => {
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      return {
        tasks: tasks,
      };
    });
  };
  deleteDoneTask = (event) => {
    // give access to the index of the button.
    const index = event.target.dataset.index;

    this.setState((state) => {
      const donetasks = [...state.donetasks];
      donetasks.splice(index, 1);
      return {
        donetasks: donetasks,
      };
    });
  };
  checkTask = (event) => {
    // give access to the index of the button.
    const index = event.target.dataset.index;
    let removed;

    this.setState((state) => {
      const tasks = [...state.tasks];
      removed = tasks.splice(index, 1);
      return {
        tasks: tasks,
      };
    });
    this.setState((state) => ({
      donetasks: [...state.donetasks, removed],
      input: "",
    }));
  };

  returnTask = (event) => {
    // give access to the index of the button.
    const index = event.target.dataset.index;
    let removed;

    this.setState((state) => {
      const donetasks = [...state.donetasks];
      removed = donetasks.splice(index, 1);
      return {
        donetasks: donetasks,
      };
    });
    this.setState((state) => ({
      tasks: [...state.tasks, removed],
      input: "",
    }));
  };

}

export default Daily;
