import React, { useEffect, useState } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ itemsInCart ,setModalOpen, setMyOrder}) {

    const [toggleRefresh, setToggleRefresh] = useState();

    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }

    async function postOrder(requestOptions) {
        const response = await fetch('https://localhost:44392/api/Orders', requestOptions);
        const data = await response.json()
        setMyOrder(data)
    }

    useEffect(() => {
    }, [toggleRefresh])
  

    const submitCheckout = () => {
        
        const order = {
            orderItems: itemsInCart.map(item => ({productId: item.product.productId, quantity: item.count})),
            observations: "none"
        } 

        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
        };

        if (order.orderItems.length == 0) return;

        postOrder(requestOptions)
        

        setModalOpen(false);
        // TODO: make the api call, and handle the response
        // Create the Body of the POST request based on the `itemsInCart` variable
        // The request URL is /api/Orders
        // The response has to be saved in the state by using the setMyOrder method
    }

    const removeItemFromCart = (item) => {
        if (item.count == 1) {
            let idx = itemsInCart.indexOf(item);
            if (idx > -1) {
                itemsInCart.splice(idx, 1);
              }
        }
        item.count-=1;
        getTotal();
        setToggleRefresh(prevCheck => !prevCheck);
    }

    const addItemToCart = (item) => {
        item.count+=1;
        getTotal();
        setToggleRefresh(prevCheck => !prevCheck);
    }

    return (<div className="modal">
        <div className="modal-title"><h2>Checkout</h2><MdClose size={32} onClick={() => setModalOpen(false)}/></div>
        <div className="modal-inner">
            {itemsInCart.map((item) => {
                return (
                <div className="item-in-cart">
                    <div>
                        <FontAwesomeIcon icon={faMinusCircle} size='2x' color='red' onClick={() => removeItemFromCart(item)}/>
                       <span className="item-count">{item.count}x</span>
                       
                       <FontAwesomeIcon icon={faPlusCircle}  size="2x" color='green' onClick={() => addItemToCart(item)} />
                    </div>
                       <ProductCheckout product={item.product} />

                </div>
                )
            })}
        </div>
        <div className="total">
            Total: <span className="total-sum">{getTotal()} RON</span>
        </div>
        <div className="modal-footer">
            <button type="button" onClick={submitCheckout} className="modal-button">Confirm Order</button>
        </div>
    </div>)
}