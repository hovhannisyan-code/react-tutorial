import './App.css';
import Welcome from './Components/Welcome';
import Counter from './Components/Counter';

function App() {
  
  return (
    <div className="App">
      <div className="welcome">
        <Welcome />
      </div>
      <Counter counter={2} /> 
    </div>
  );
}

export default App;
