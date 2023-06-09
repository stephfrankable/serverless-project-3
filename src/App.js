import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';


const App = () => {

  const [coins, updateCoins] = useState([]);

  const [input, updateInput] = useState({ limit: 5, start: 0 });

  const [loading, updateLoading] = useState(true);

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  const fetchCoins = async() => {
    updateLoading(true);
    const { limit, start } = input;
    const data = await API.get('cryptoapi', '/coins?limit=${limit}&start=${start}');
    updateCoins(data.coins);
    updateLoading(false);
}

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      <input 
        onChange={e => updateInputValues('start', e.target.value)}
        placeholder="start"
      />
      <input 
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <hr/>
      <button
        onClick={fetchCoins}>
        Fetch Coins  
      </button>
      {loading && <h2>Loading...</h2>}
      {
        !loading && coins.map((coin, index) => (
         <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5> 
         </div>
        ))
      }
    </div>
  );
}

export default App
