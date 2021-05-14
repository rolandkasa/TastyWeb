import React, { } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';

export default function Modal({ itemsInCart ,setModalOpen, setMyOrder}) {
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        })

        return total
    }

    async function postOrder(_myOrder){
        const response = await fetch("http://localhost:56782/api/Orders",{
            method:"POST",
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(_myOrder)});
            const data = await response.json()
            setMyOrder(data);
    }

    const submitCheckout = async () => {
        const _myOrder = {
            orderitems: itemsInCart.map(item => ({productId: item.product.productId, quantity:item.count})),
            observations: "-"
        }
    postOrder(_myOrder)
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