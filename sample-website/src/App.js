import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');

  const onButtonCLick = async (endpoint) => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/${endpoint}`);
      const json = await response.json();
      setApiResponse(JSON.stringify(json));
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse(`Error fetching data: ${error}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Test website</h1>
        {apiResponse && <h3>api response: {apiResponse}</h3>}
        <button onClick={() => onButtonCLick('test')}>Call /test</button>
        <button onClick={() => onButtonCLick('test-cors')}>Call /test-cors</button>
      </header>
    </div>
  );
}

export default App;
