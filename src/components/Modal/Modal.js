import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';

export default function Modal({ itemsInCart, setModalOpen, setMyOrder }) {
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }

    async function fetchData(requestOptions) {
        try {
            const data = await fetch('https://localhost:44324/api/Orders', requestOptions)
            const order = await data.json()
            setMyOrder(order)
        } catch (err) {
            console.log(err)
        }
    }

    const submitCheckout = () => {
        // TODO: make the api call, and handle the response
        // Create the Body of the POST request based on the `itemsInCart` variable
        // The request URL is /api/Orders
        // The response has to be saved in the state by using the setMyOrder method

        const cart = itemsInCart.map(item => ({ productId: item.product.productId, quantity: item.count }))
        const order = {
            orderItems: JSON.stringify(cart),
            observations: ""
        }

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        };

        fetchData(requestOptions);
        setModalOpen(false)
    }

    return (<div className="modal">
        <div className="modal-title"><h2>Checkout</h2><MdClose size={32} onClick={() => setModalOpen(false)} /></div>
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
    </div>)
}