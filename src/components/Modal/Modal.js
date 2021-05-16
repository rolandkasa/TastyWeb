import React, { useState, useEffect } from 'react';
import './modal.css'
import ProductCheckout from '../Product/ProductCheckout'
import { MdClose } from 'react-icons/md';
import { MdAddCircleOutline } from 'react-icons/md';
import { MdRemoveCircleOutline } from 'react-icons/md';
export default function Modal({ itemsInCart, setModalOpen, setMyOrder}) {
    const [value,setValue] = useState();
    const getTotal = () => {
        let total = 0;

        itemsInCart.forEach(item => {
            total += item.product.price * item.count
        }) 

        return total
    }
    const convertToJson =() =>{
        const orderItems = []
        itemsInCart.forEach(item => {
            const map = {productId: item.product.productId, quantity: item.count}
            orderItems.push(map)
        })

        return {orderItems:orderItems, obeservations:""}
    }
    async function fetchData (request){
        try{
            const data = await fetch(`https://localhost:44309/api/Orders`, request)
            const order = await data.json()
            setMyOrder(order)
        }catch(err){
            console.log(err)
        }
    }
    const handleRefresh = () =>{
        setValue({});
    }
    const addItemsToCart = (item) =>{
        ++item.count;
        getTotal();
        handleRefresh();
    }
    const removeItemsToCart = (item) =>{
        if(item.count === 1){
            var index=itemsInCart.indexOf(item)
            if(index !== -1){
                itemsInCart.splice(index,1);
            }
        }
        --item.count;
        getTotal();
        handleRefresh();
    }
   
    const submitCheckout = () => {
        const data = convertToJson()
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }
        fetchData(request)
    }

    return (<div className="modal">
        <div className="modal-title"><h2>Checkout</h2><MdClose size={32} onClick={() => setModalOpen(false)}/></div>
        <div className="modal-inner">
            {itemsInCart.map((item) => {
                return <div>
                    <MdAddCircleOutline color='green' onClick={() => addItemsToCart(item)}/>
                    <MdRemoveCircleOutline color='red' onClick={() => removeItemsToCart(item)}/>
                    <span className="item-count">{item.count}x</span><ProductCheckout product={item.product} /></div>
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