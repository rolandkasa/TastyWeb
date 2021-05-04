import './App.css';
import {useState, useEffect} from 'react'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Modal from './components/Modal/Modal'

require('dotenv').config()

function App() {
  const [itemsInCart, setItemsInCart] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [myOrders, setMyOrders] = useState({})
  const [orderStatus, setOrderStatus] = useState()

  const addItemsToCart = (item) => {
    const itemAlreadyInCart = itemsInCart.find((it) => it.product.name === item.name)
    if( itemAlreadyInCart ){
      itemAlreadyInCart.count++;
      setItemsInCart(itemsInCart.map((item) => {
        if( item.product.name === item.name ){
          return itemAlreadyInCart;
        }
        return item
      }))
    }else{
      setItemsInCart([...itemsInCart, { count: 1, product: item}])
    }
  }



  async function fetchStatus(orderId) {
    const response = await fetch(`https://localhost:44392/api/Orders/${orderId}`)
    const data = await response.text()
    setOrderStatus(data)
    console.log(data)
  }
 
  useEffect(() => {
    if (myOrders) {
      const interval = setInterval(() => {
        fetchStatus(myOrders.orderId);
      }, 2000 );
      return () => clearInterval(interval);
    }
    else return () => {};
  }, [])

  return (
    <div className="App">
      <Header itemsInCart={itemsInCart} setModalOpen={setModalOpen}/>
      {isModalOpen ? <Modal itemsInCart={itemsInCart} setModalOpen={setModalOpen} setMyOrder={setMyOrders}/> : ""}
      
      {myOrders ? <div className="my-orders">
        
        {`Order ${myOrders.orderId} is: ${orderStatus}`}
        {/*
        TODO: Once you have the orders, you can list it over here, and check for it's status every 10 seconds, 
        until the status is "Done"
        */}
      </div> : ""}
      <div className={`container-main ${isModalOpen ? 'blur' : ''}`}>
          <div className="top-image"></div>
          <Categories addItemsToCart={addItemsToCart}/>
      </div>
    </div>
  );
}

export default App;
