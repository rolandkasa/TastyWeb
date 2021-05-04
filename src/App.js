import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Modal from './components/Modal/Modal'

function App() {
  const [itemsInCart, setItemsInCart] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [myOrders, setMyorders] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [orderStatus, setOrderStatus] = useState("ok")

  const addItemsToCart = (item) => {
    const itemAlreadyInCart = itemsInCart.find((it) => it.product.name === item.name)
    if (itemAlreadyInCart) {
      itemAlreadyInCart.count++;
      setItemsInCart(itemsInCart.map((item) => {
        if (item.product.name === item.name) {
          return itemAlreadyInCart;
        }
        return item
      }))
    } else {
      setItemsInCart([...itemsInCart, { count: 1, product: item }])
    }
  }

  async function refreshStatus(orderId) {
    try {
      const data = await fetch(`https://localhost:44324/api/Orders/${orderId}`)
      const status = await data.text()
      setOrderStatus(status);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (Object.keys(myOrders).length != 0) {
      const orderId = myOrders.orderId
      refreshStatus(orderId)
      let timer = setTimeout(() => setRefresh(!refresh), 5000);
      return () => {
        clearTimeout(timer);
      };
    }

  }, [refresh])

  return (
    <div className="App">
      <Header itemsInCart={itemsInCart} setModalOpen={setModalOpen} />
      {isModalOpen ? <Modal itemsInCart={itemsInCart} setModalOpen={setModalOpen} setMyOrder={setMyorders} /> : ""}
      {Object.keys(myOrders).length != 0 ? <div className="my-orders">
        {/* TODO: Once you have the orders, you can list it over here, and check for it's status every 10 seconds,
        until the status is "Done" */}
        <span>{`Status for order ${myOrders.orderId}: `}</span>
        <span className="order-status">{orderStatus} </span>
      </div> : ""}
      <div className={`container-main ${isModalOpen ? 'blur' : ''}`}>
        <div className="top-image"></div>
        <Categories addItemsToCart={addItemsToCart} />
      </div>
    </div>
  );
}

export default App;
