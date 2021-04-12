import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList/ProductList'
import './categories.css'
export default function Categories({addItemsToCart}) {
    const [categories, setCategories] = useState([])
    async function fetchData() {
        try{
            const data = await fetch('http://localhost:8080/api/Products/info')
            setCategories(await data.json()); 
        } catch( err ){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="category-container">
            {
                categories.map((product) => {
                    return <ProductList productCategory={product} addItemsToCart={addItemsToCart}/>
                })
            }
        </div>)
}