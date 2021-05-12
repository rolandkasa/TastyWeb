import React, { useState, useEffect } from 'react';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import './product.css'

export default function ProductCheckout({ product, count, addItemsToCart, removeItemsFromCart }) {
    const [productInfo, setProductInfo] = useState([])
    async function fetchData() {
        try {
            const data = await fetch(`https://localhost:44325/api/Products/${product.productId}`)
            setProductInfo(await data.json());
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (<div className="product-card product-card-checkout ">
        <img className="product-image" src={productInfo.imageUrl} />
        <div className="product-info">
            <span className="product-name">{productInfo.name}</span>
            <span>({productInfo.weight} g)</span>
            <span className="product-price">{productInfo.price} RON</span>
            <p className="product-description">{productInfo.description}</p>
        </div>
        <div className="items-count-container">
            <FaMinusCircle size={25} color={"#49682d96"} onClick={() => removeItemsFromCart(product)} />
            <span className="item-count">{count}</span>
            <FaPlusCircle size={25} color={"#49682d96"} onClick={() => addItemsToCart(product)} />
        </div>
    </div >)
}