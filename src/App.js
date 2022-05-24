import './App.css';
import React, { useState } from "react";
import { ListGroup, Card, ListGroupItem, Button } from 'react-bootstrap';
import Popup from './popup';



const api = {
  // base: "https://api.coingecko.com/api/v3/coins/"
  base: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
}
function App() {




  //POP UP *********************************
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  //POP UP *********************************


  //Use State ********************************************************************************************************************
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);
  // const [trend, setTrend] = useState([]);

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



        })
        .catch((error) => {
          console.log(error)
        });
      ;

    }
  }
  //Arama  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


  let arz_oran = coins.total_supply / coins.circulating_supply;

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

          <Card style={{ width: '18rem', }}>
            <Card.Img className='coinIcon' variant="top" src={coins.image} />
            <Card.Body>
              <Card.Title>{coins.name}</Card.Title>

            </Card.Body>
            <ListGroup className="list-group-flush" >
              <ListGroupItem >Symbol      :      {coins.symbol} </ListGroupItem>
              <ListGroupItem>Current Price : {coins.current_price} $</ListGroupItem>
              <ListGroupItem>Market Cap   :  {coins.market_cap} $  </ListGroupItem>
              <Button as="input" type="button"
                value=" Learn Risks and Advantages "
                onClick={togglePopup} />
            </ListGroup>




            {isOpen && <Popup
              content={<>

                {coins.market_cap >= 10000000000 &&
                  <h2>
                    "Büyük Market Hacmi"
                  </h2>
                }
                {coins.market_cap < 10000000000 &&
                  <h2>
                    Market Sıralaması düşük ,Güvenilir varlık olmayabilir.
                  </h2>
                }

                {arz_oran = 1 &&
                  <h2>
                    Arz oranı güvenilir ,üretimden dolayı fiyat baskılanma ihtimali düşük
                  </h2>
                }
                {arz_oran > 1 &&
                  <h2>
                    Arz oranı güvenilir değil ,üretimden dolayı fiyat baskılanma ihtimali yüksek
                  </h2>
                }


              </>}
              handleClose={togglePopup}
            />}
          </Card>



        ) : ('')}








        <a href="https://www.coingecko.com">Check your Coin ID</a>

        {/*Searched Coin Data List XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}





      </main>




    </div>
  );
}

export default App;
