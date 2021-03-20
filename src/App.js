import { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
/**
 * Pages
 */
import ToDo from './Components/Pages/ToDo/ToDo';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contacts';
import NotFound from './Components/Pages/404/404';
import SingleTask from './Components/Pages/SingleTask/SingleTask';

const pages = [
  {
    path: "/",
    component: ToDo
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/task/:id",
    component: SingleTask
  },
  {
    path: "/404",
    component: NotFound
  }
];

class App extends Component {

  render() {
    const pagesList = pages.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          component={item.component}
          exact
        />
      );
    });
    return (
      <div className="App">
        <div className="menu">
          <Navbar />
          <Switch>
            {pagesList}
            <Redirect to="/404" />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
