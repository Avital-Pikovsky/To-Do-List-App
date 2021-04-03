import React from "react";
import "./Weekly.css";

class Weekly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weektasks: [],
            input: "",
            weekdonetasks: [],
        };
    }

    componentDidMount() {
        const stor = localStorage.getItem("weektasks");
        if (stor) {
            const weektasks = stor.split(",");
            this.setState({
                weektasks: weektasks,
            });
        }
        const stor2 = localStorage.getItem("weekdonetasks");
        if (stor2) {
            const weekdonetasks = stor2.split(",");
            this.setState({
                weekdonetasks: weekdonetasks,
            });
        }

        window.addEventListener("beforeunload", () => {
            localStorage.setItem("weektasks", this.state.weektasks);
            localStorage.setItem("weekdonetasks", this.state.weekdonetasks);

        });
    }

    render() {
        return (
            <div className="week">
                <h2>Weekly To Do List:</h2>
                <ul className="order_list">
                    {this.state.weektasks.map((task, i) => (
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
                    {this.state.weekdonetasks.map((done, j) => (
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
            weektasks: [...state.weektasks, state.input],
            input: "",
        }));
    };

    deleteTask = (event) => {
        // give access to the index of the button.
        const index = event.target.dataset.index;

        this.setState((state) => {
            const weektasks = [...state.weektasks];
            weektasks.splice(index, 1);
            return {
                weektasks: weektasks,
            };
        });
    };
    deleteDoneTask = (event) => {
        // give access to the index of the button.
        const index = event.target.dataset.index;

        this.setState((state) => {
            const weekdonetasks = [...state.weekdonetasks];
            weekdonetasks.splice(index, 1);
            return {
                weekdonetasks: weekdonetasks,
            };
        });
    };
    checkTask = (event) => {
        // give access to the index of the button.
        const index = event.target.dataset.index;
        let removed;

        this.setState((state) => {
            const weektasks = [...state.weektasks];
            removed = weektasks.splice(index, 1);
            return {
                weektasks: weektasks,
            };
        });
        this.setState((state) => ({
            weekdonetasks: [...state.weekdonetasks, removed],
            input: "",
        }));
    };

    returnTask = (event) => {
        // give access to the index of the button.
        const index = event.target.dataset.index;
        let removed;

        this.setState((state) => {
            const weekdonetasks = [...state.weekdonetasks];
            removed = weekdonetasks.splice(index, 1);
            return {
                weekdonetasks: weekdonetasks,
            };
        });
        this.setState((state) => ({
            weektasks: [...state.weektasks, removed],
            input: "",
        }));
    };

}

export default Weekly;
