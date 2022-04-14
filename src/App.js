import './App.css';
import React, { useState } from "react";
import { ListGroup, Card, ListGroupItem } from 'react-bootstrap';



const api = {
  // base: "https://api.coingecko.com/api/v3/coins/"
  base: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
}
function App() {





  //Use State ********************************************************************************************************************
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);

  //Use State XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX







  //Arama  ********************************************************************************************************************

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}${query}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(result => {
          setCoins(result[0]);
          setQuery('');
          console.log(result);

        });
    }
  }
  //Arama  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


  return (


    <div className="app" >

      <main>






        {/* //Search Box XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
        <div className='search-box'>
          <input type="text"
            className='search-bar'
            placeholder='Search Coins'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}


          />
        </div>
        {/* SearchBox XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}






        {/* Searched Coin Data List XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

        {(typeof coins.name != "undefined") ? (

          <Card style={{ width: '18rem' }}>
            <Card.Img className='coinIcon' variant="top" src={coins.image} />
            <Card.Body>
              <Card.Title>{coins.name}</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Symbol      :      {coins.symbol} </ListGroupItem>
              <ListGroupItem>Current Price : {coins.current_price}</ListGroupItem>
              <ListGroupItem>Market Cap   :  {coins.market_cap}  </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="https://www.coingecko.com/en/coins/"></Card.Link>

            </Card.Body>
          </Card>

        ) : ('')}


        {/*Searched Coin Data List XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}





      </main>




    </div>
  );
}

export default App;
