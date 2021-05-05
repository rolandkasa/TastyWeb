import React, { useState, useEffect } from 'react';
import './product.css'
import { MdAddCircleOutline } from 'react-icons/md';

export default function Product({ product, addItemsToCart }) {
    const [productInfo, setProductInfo] = useState([])
    async function fetchData() {
        try {
            const data = await fetch(`https://localhost:44309/api/Products/${product.productId}`)
            setProductInfo(await data.json());
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const onAdd = () => {
        addItemsToCart(product)
    }

    return (<div className="product-card">
        <img className="product-image" src={productInfo.imageUrl} />
        <div className="product-info">
            <span className="product-name">{productInfo.name}</span>
            <span>({productInfo.weight} g)</span>
            <span className="product-price">{productInfo.price} RON</span>
            <p className="product-description">{productInfo.description}</p>
        </div>
        <button className="product-add" onClick={onAdd}><MdAddCircleOutline size={26} color="#FFF"/></button>
    </div >)
}