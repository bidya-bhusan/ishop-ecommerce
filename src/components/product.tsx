import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductListContract } from "../contract/ProductListContract";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Product() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<ProductListContract[]>([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:2020/product/category/${categoryId}`)
            .then(response => {
                setProducts(response.data);
                // console.log(response.data);
                // console.log(categoryId)
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, [categoryId]);

    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", backgroundColor: "#e6f6ff", height: "60vh", marginTop: "5px" }} className="mt-1">
            {products.length === 0 ? (
                <p>No products found for the specified category.</p>
            ) : (
                <div className="container p-3">
                    {products.map(product => (
                        <div className="mb-4" key={product.ProductId}>
                            <Link to={`productdetails/${product.ProductId}`}>
                                <div className="card" style={{ width: "200px" }}>
                                    <img src={`http://127.0.0.1:2020/get-images/${product.ProductId}`} height={200} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.Title}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <span><h6>{product.Price}</h6></span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <Outlet />
            </div>
        </div>
    );

}

