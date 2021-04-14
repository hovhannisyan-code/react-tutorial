import { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './App.css';
/**
 * Pages
 */
import ToDo from './Components/Pages/ToDo/ToDo';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contacts';
import NotFound from './Components/Pages/404/404';
import SingleTask from './Components/Pages/SingleTask/SingleTask';

/**
 * Context
 */
import ContactContextProvider from './Context/ContactPageContext';
/**
 * Redux
 */
import CounterReduxWithState from './Components/Counter/CounterRedux';
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
    path: "/counter",
    component: CounterReduxWithState
  },
  {
    path: "/404",
    component: NotFound
  }
];

class App extends Component {

  render() {
    const pagesList = pages.map((item, index) => {
      if (item.path === '/contact') {
        return (
          <Route
            key={index}
            path={item.path}
            exact
            render={(props) => {
              return (
                <ContactContextProvider>
                  {<item.component {...props} />}
                </ContactContextProvider>
              )
            }}
          />
        )
      }
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
          <section className="jumbotron text-center">
            <div className="container">
                <h1 className="jumbotron-heading">The Best Free To-Do App</h1>
                <p className="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
            </div>
        </section>
          <Container className="main-container">
            <Row>
                <Switch>
                  {pagesList}
                  <Redirect to="/404" />
                </Switch>
            </Row>
          </Container>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
