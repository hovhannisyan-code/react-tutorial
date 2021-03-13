import { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import './App.css';
/**
 * Pages
 */
import ToDo from './Components/Pages/ToDo/ToDo';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contacts';
import NotFound from './Components/Pages/404/404';
import SingleTask from './Components/Pages/SingleTask/SingleTask';

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
            <Route path="/task/:id" component={SingleTask} exact />
            <Route path="/*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
