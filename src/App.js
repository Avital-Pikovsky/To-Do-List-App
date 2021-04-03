import React from "react";
import Daily from "./Daily";
import Weekly from "./Weekly"
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="all">
        <h2 className="title">Avital's To Do List App</h2>
        <table classNmae="table">
          <tr>
            <th><Weekly /></th>
            <th><Daily /></th>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
