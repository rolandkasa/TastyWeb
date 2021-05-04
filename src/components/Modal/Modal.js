import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';

export default function Modal({ itemsInCart, setModalOpen, setMyOrder}) {
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }

    const submitCheckout = () => {
        var productIds = [];
        var quantities = [];
        var n = 0;

        itemsInCart.forEach(item => {
            productIds[n] = item.product.productId;
            n++;
        })
        n = 0;
        itemsInCart.forEach(item => {
            quantities[n] = item.count;
            n++;
        })

        fetch("http://localhost:7520/api/Orders",{
            method:"POST",
            body:JSON.stringify({
                productId: productIds,
                quantity: quantities,
                observations: ""
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => setMyOrder(response));

        setModalOpen(false);
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
    </div>)
}