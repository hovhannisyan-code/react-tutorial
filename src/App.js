import './App.css';
import Welcome from './Components/Welcome';
import ToDo from './Components/ToDo/ToDo';
import LifeCycle from './Components/LifeCycle/LifeCycle';
import { Component } from 'react';
class App extends Component {
  state = {
    isLifeCycle: false
  }
  render() {
    return (
      <div className="App">
        <div className="welcome">
          <Welcome />
        </div>
        <ToDo /> 
        {this.state.isLifeCycle && <LifeCycle />}
      </div>
    );
  }
}

export default App;
