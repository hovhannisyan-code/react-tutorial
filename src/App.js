import { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
/**
 * Pages
 */
import ToDo from './Components/Pages/ToDo/ToDo';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contacts';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="menu">
          <Navbar />
          <Switch>
            <Route path="/" component={ToDo} exact/>
            <Route path="/contact" component={Contact} exact/>
            <Route path="/about" component={About} exact />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
