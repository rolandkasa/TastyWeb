import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';

export default function Modal({ itemsInCart ,setModalOpen}) {
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
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
            <button type="button" className="modal-button">Confirm Order</button>
        </div>
    </div>)
}