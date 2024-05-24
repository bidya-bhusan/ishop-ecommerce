import React, { useEffect, useState } from "react";
import { ProductContract } from "../contract/ProductContaract";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../slicers/cart-slicer";

export function Redux() {
    const [products, setProducts] = useState<[ProductContract]>();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://127.0.0.1:2020/get-products')
            .then(res => {
                setProducts(res.data);
                console.log(products)
            })

    }, []);

    function handleAddClick(product: ProductContract) {
        dispatch(addToCart(product));
    }

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    products?.map((product) =>
                        <div key={product.ProductId} style={{ margin: '10x', padding: '10px' }}>
                            <img src={product.Image} width="200" height="200" alt="" />
                            <div>
                                <button onClick={() => { handleAddClick(product) }} >Add to Cart</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {/* <h2>Selected Products:</h2>
                <ul>
                    {cartItems.map((product) => ( // Use cartItems instead of selectedProducts
                        <li key={product.ProductId}>{product.ProductName}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}
