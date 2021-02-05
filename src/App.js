import './App.css';
import Welcome from './Components/Welcome';
import ToDo from './Components/ToDo';

function App() {
  
  return (
    <div className="App">
      <div className="welcome">
        <Welcome />
      </div>
      <ToDo /> 
    </div>
  );
}

export default App;
