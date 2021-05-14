import React, { useState, useEffect } from 'react';
import './product.css'

export default function ProductCheckout({ product, addItemsToCart }) {
    const [productInfo, setProductInfo] = useState([])
    async function fetchData() {
        try {
            const data = await fetch(`http://:7520/api/Products/${product.productId}`)
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
    </div >)
}