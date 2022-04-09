import './App.css';

import React, { useState } from "react";


// simple/price?ids=bitcoin&vs_currencies=usd

const api = {
  base: "https://api.coingecko.com/api/v3/coins/"
}
function App() {
  // const [coins, setCoins] = useState([]);
  // const [filteredCoins, setFilteredCoins] = useState(coins);
  // useEffect(async () => {

  //   const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h");
  //   const data = await response.json();
  //   console.log(data)
  //   return response.json();
  //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd


  // }, []);
  //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}${query}` )
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
        <div className='name'>Coin Name               :{coins.name}</div>
        <div className="rank">Coin Gecko Rank : {coins.market_cap_rank}</div>
        <div className='symbol'> Symbol            : {coins.symbol}</div>
        {/* <div class="Genesis Date"> Genesis Date          : {coins.market_data.ath[0]} </div>  */}

        

        
        


       



      </main>


      

    </div>
  );
}

export default App;
