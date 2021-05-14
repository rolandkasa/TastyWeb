import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';
import Popup from '../Popup/Popup';

export default function Modal({ itemsInCart, setModalOpen, setMyorder}) {
    const [isPopUpOpen, setPopupOpen] = useState(false);
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }
    async function postOrder(requestOptions) {
        const response = await fetch('http://localhost:7520/api/Orders', requestOptions);
        const data = await response.json()
        setMyorder(data)
    }

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
        setPopupOpen(true);
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
        <div className="modal-footer">
            <button type="button" onClick={submitCheckout} className="modal-button">Confirm Order</button>
        </div>
        <Popup trigger={isPopUpOpen} setTrigger={setPopupOpen}>
            <h3 id="status-popup">My popup</h3>
        </Popup>
    </div>)
}