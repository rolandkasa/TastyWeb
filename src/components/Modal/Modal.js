import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';

export default function Modal({ itemsInCart ,setModalOpen, setMyOrder, setMyStatus}) {
    const [observations, setObservations] = useState("")

    function getItemData(item){
        return { productId: item.product.productId, quantity: item.count}
    }

    const getOrder = () => {
        var items = itemsInCart.map(getItemData);
        return {orderItems: items, observations: observations}
    }

    /*async function getStatus(orderStatus){
        try{
            var status = await fetch(`https://localhost:44309/api/Orders/${orderStatus.orderId}`);
        }catch(err){
            console.log(err)
        }
    }*/

    const handleObservationChange = (e) => {
        setObservations(e.target.value)
    }

    async function sendOrder(order) {
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            };
            const response = await fetch('https://localhost:44309/api/Orders', requestOptions);

            if( response.status === 201 ){
                console.log("order placed")
                console.log(await response.json())
            }
        }catch(err){
            console.log(err)
        }
    }

    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }

    const submitCheckout = () => {
        const order = getOrder();
        console.log(order)
        sendOrder(order)
        setMyOrder(order)
    }

    return (<div className="modal">
        <div className="modal-title"><h2>Checkout</h2><MdClose size={32} onClick={() => setModalOpen(false)}/></div>
        <div className="modal-inner">
            {itemsInCart.map((item) => {
                return <div><span className="item-count">{item.count}x</span><ProductCheckout product={item.product} /></div>
            })}
        </div>
        <div className="total">
            Total: <span className="total-sum">{getTotal()} RON</span>
        </div>
        <div className="order-observations">
            <textarea className="observations-text-entry" placeholder="Observations..." onChange={handleObservationChange}/>
        </div>
        <div className="modal-footer">
            <button type="button" onClick={submitCheckout} className="modal-button">Confirm Order</button>
        </div>
    </div>)
}