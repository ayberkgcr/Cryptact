import './App.css';
import React, { useState, useEffect } from "react";


function App() {
  const [coins, setCoins] = useState([]);
  useEffect(async () => {

    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h");
    const data = await response.json();
    console.log(data)


  }, []);

  return (
    <div className="app" >
      <main>



        <div className='search-box'>
          <input type="text"
            className='search-bar'
            placeholder='Search Coins'
          // onChange={e=>fonksiyon(e.target.value)}
          // value={query}
          // onKeyPress={search}


          />
        </div>

        {/* <tbody>
          {coins.map((coins) => {
            return (
              <tr key={coins.name}>
                <td>{coins.id}</td>

              </tr>
            );
          })}</tbody> */}



      </main>

1M 

    </div>
  );
}

export default App;
