import React, { useState, useEffect } from 'react';
import Product from '../Product/Product'
import './productList.css'

export default function ProductList({ productCategory, addItemsToCart }) {
    const [productList, setProductList] = useState([])
    async function fetchData() {
        try {
            const data = await fetch(`http://localhost:56782/api/Products/${productCategory.categoryId}/1/20`)
            setProductList(await data.json());
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (<div className="productList-container">
        <h2 className="category-name">{productCategory.categoryName}</h2>
            { productList.map((product) => {
                return (<Product product={product} addItemsToCart={addItemsToCart}/>)
            }) }
    </div>)
}