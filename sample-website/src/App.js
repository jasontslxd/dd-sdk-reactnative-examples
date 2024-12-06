import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiRespnose] = useState('');

  const onButtonCLick = async () => {
    const response = await fetch('http://172.26.32.1:8000/route?sides=5&rolls=10');
    const json = await response.json();
    console.log(json)
    setApiRespnose(json);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Test website</h1>
        {apiResponse && <h3>api response: {JSON.stringify(apiResponse)}</h3>}
        <button onClick={() => onButtonCLick()}>Call api</button>
      </header>
    </div>
  );
}

export default App;
