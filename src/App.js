import './App.css';

import React, { useState } from "react";
import { ListGroup, Card, ListGroupItem } from 'react-bootstrap';

// const linked={
//   link:"https://www.coingecko.com/en/coins/"

// }

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=terra-luna&order=market_cap_desc&per_page=100&page=1&sparkline=false

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


        {/* <ListGroup className=''  as="ul">
          <ListGroup.Item as="li" disabled>
            Coin Name               :{coins.name}
          </ListGroup.Item>
          <ListGroup.Item as="li"> 
          Symbol            : {coins.symbol}
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Coin Gecko Rank : {coins.market_cap_rank}
          </ListGroup.Item>
          
          <ListGroup.Item as="li"> 
          Community Score: {coins.community_score}
          </ListGroup.Item>
          
        </ListGroup> */}

        {/*Searched Coin Data List XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}


        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>{coins.name}</Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Coin Gecko Rank : {coins.image}</ListGroupItem>

            <ListGroupItem>Symbol            : {coins.symbol}</ListGroupItem>
            <ListGroupItem>Community Score: {coins.community_score}</ListGroupItem>
            <ListGroupItem>kat: {coins.description}  </ListGroupItem>

          </ListGroup>
          <Card.Body>
            <Card.Link href="https://www.coingecko.com/en/coins/"></Card.Link>

          </Card.Body>
        </Card>










      </main>




    </div>
  );
}

export default App;
