import './App.css';

import React, { useState } from "react";




const api = {
  base: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h"
}
function App() {
  // const [coins, setCoins] = useState([]);
  // const [filteredCoins, setFilteredCoins] = useState(coins);
  // useEffect(async () => {

  //   const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h");
  //   const data = await response.json();
  //   console.log(data)
  //   return response.json();



  // }, []);

  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState({});


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(api.base)
        .then(res => res.json())
        .then(result => {
          setCoins(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (


    <div className="app" >

      <main>



        <div className='search-box'>
          <input type="text"
            className='search-bar'
            placeholder='Search Coins'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}


          />
        </div>
        <div>{coins.id}</div>



      </main>


      1M Community

    </div>
  );
}

export default App;
