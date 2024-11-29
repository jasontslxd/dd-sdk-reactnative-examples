import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiRespnose] = useState('');

  const onButtonCLick = async () => {
    const response = await fetch('http://httpbin.org/get?param=webview-test');
    const json = await response.json();
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
