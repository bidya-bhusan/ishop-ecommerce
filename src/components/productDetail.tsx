import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slicers/cart-slicer";
import { ProductListContract } from "../contract/ProductListContract";
import '../css/productdetail.css';

export function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductListContract>();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://127.0.0.1:2020/product/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product detail:", error);
            });
    }, [id]);

    function handleAddClick(product: ProductListContract) {
        dispatch(addToCart(product));
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={`http://127.0.0.1:2020/get-images/${product.ProductId}`} alt={product.Title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2>{product.Title}</h2>
                    <p className="lead">Price: ${product.Price}</p>
                    <button className="btn btn-primary" onClick={() => handleAddClick(product)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
