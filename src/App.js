import './App.css';
import React, { useState } from "react";
import { ListGroup, Card, ListGroupItem, Button, Modal } from 'react-bootstrap';
import Popup from './popup';



const api = {
  // base: "https://api.coingecko.com/api/v3/coins/"
  base: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
}
function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

        ;

    }
  }
  //Arama  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


  let arz_oran = coins.total_supply / coins.circulating_supply;
  let ath_oran = coins.current_price / coins.ath * 100;

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

          <Card className="w-100" style={{ width: '18rem', }}>
            <Card.Img className='coinIcon ' variant="top" src={coins.image} />
            <Card.Body>
              <Card.Title>{coins.name}</Card.Title>

            </Card.Body>
            <ListGroup className="list-group-flush" >
              <ListGroupItem >Symbol      :      {coins.symbol} </ListGroupItem>
              <ListGroupItem>Current Price : {coins.current_price} $</ListGroupItem>
              <ListGroupItem>  Price Change Percentage   :  %{coins.price_change_percentage_24h} </ListGroupItem>
              <ListGroupItem>Market Cap   :  {coins.market_cap} $  </ListGroupItem>

              <Button className="mb-2" variant="success" as="input" type="button"
                value=" Learn Risks and Advantages "
                onClick={togglePopup} />

              <Button className="mb-2" variant="outline-warning" onClick={handleShow}>
                Learn Your 	Risk Appetite
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Learn Your 	Risk Appetite</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <ListGroup as="ul">
                    <ListGroup.Item className='metin' as="li" active>
                      To find out if you are suitable for high risk, choose the one that suits you from the answers to the questions and collect your points
                    </ListGroup.Item>

                    <ListGroup.Item className='metin' as="li">
                      1.	How would you feel if you lost 10% of your capital??
                      Very Worried (5)
                      Worried (3)
                      Normal (1)
                    </ListGroup.Item>

                    <ListGroup.Item className='metin' as="li">2.On the relevant chart, the coin has opened a red candle and continues to fall, approaching stop-loss. How would you act in this situation??
                      Very Worried (5)
                      Worried (3)
                      Normal (1)
                    </ListGroup.Item>

                    <ListGroup.Item className='metin' as="li" >
                      3.How do you feel about re-trading when you stop many times in a limited time??
                      Very Worried (5)
                      Worried (3)
                      Normal (1)

                    </ListGroup.Item>

                    <ListGroup.Item className='metin' as="li">4.	How would you feel about investing your total volume in the same ongoing trade in a single ongoing trade where you have overpaid?
                      Very Worried (5)
                      Worried (3)
                      Normal (1)
                    </ListGroup.Item>
                    <ListGroup.Item className='metin' variant="danger" as="li">
                      If your total score is above 10, you should not enter into risky transactions. We recommend that you turn to long-term investments.

                    </ListGroup.Item>

                  </ListGroup>

                </Modal.Body>

                <Modal.Footer>

                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button> */}

                </Modal.Footer>
              </Modal>

            </ListGroup>




            {isOpen && <Popup
              content={<>

                {coins.market_cap >= 10000000000 &&
                  <li className='metin'>
                    Büyük Market Hacmi
                  </li>
                }
                {coins.market_cap < 10000000000 &&
                  <li className='metin'>
                    Market Sıralaması düşük ,Güvenilir varlık olmayabilir.
                  </li>
                }

                {arz_oran = 1 &&
                  <li className='metin'>
                    Arz oranı güvenilir ,üretimden dolayı fiyat baskılanma ihtimali düşük
                  </li>
                }
                {arz_oran > 1 &&
                  <li className='metin'>
                    Arz oranı güvenilir değil ,üretimden dolayı fiyat baskılanma ihtimali yüksek
                  </li>
                }
                {coins.price_change_percentage_24h > 3 &&
                  <li className='metin'>
                    Günlük olarak yükseliş ivmesinde.Yukarı yönlü hareket düşünülebilir.
                  </li>
                }
                {coins.price_change_percentage_24h < 1 && coins.price_change_percentage_24h > -1 &&
                  <li className='metin'>
                    Günlük olarak stabil bir durumda.Düşük  volatilite !
                  </li>
                }
                {coins.price_change_percentage_24h < -3 &&
                  <li className='metin'>
                    Günlük olarak düşüş ivmesinde.Yüksek risk ve volatilite !
                  </li>
                }

                {ath_oran > 25 &&
                  <li className='metin'>
                    Varlık bearish durumda.Dönüş sinyali olmadan yatırım tavsiye edilmez.
                  </li>
                }
                {ath_oran < 10 &&
                  <li className='metin'>
                    Varlık en yüksek seviyesine yakın durumda.Teknik olarak uyumsuzlara dikkat edilmeli ve kar alma unutulmamalı.
                  </li>
                }
                {ath_oran === 1 &&
                  <li className='metin'>
                    Varlık en yüksek seviyesine ulaşmış durumda.Geri çekilmelere ve uyumsuzluklara dikkat edilmeli.
                  </li>
                }



              </>}




              handleClose={togglePopup}


            />}



          </Card>



        ) : ('')}






        <Button className=' w-100' variant="outline-warning" size="sm" href="https://www.coingecko.com">Click if you don't know the coin ID</Button>


        {/*Searched Coin Data List XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}





      </main>




    </div >
  );
}

export default App;
