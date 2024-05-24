import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ProductContract } from "../contract/ProductContaract";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CategoryContract } from "../contract/CategoryContract";

export function HomePage() {
    const [cookies, setCookie] = useCookies(['CustomerId']);
    const username = cookies.CustomerId;

    const [products, setProducts] = useState<ProductContract[]>([]);
    const [categories, setCategories] = useState<CategoryContract[]>([]);

    function LoadCategories() {
        axios.get('http://127.0.0.1:2020/get-categories')
            .then(response => {
                response.data.unshift({ CategoryId: -1, CategoryName: "Select a category" })
                setCategories(response.data)
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    function LoadProducts(categoryId: string) {
        if (categoryId === "-1") {
            axios.get('http://127.0.0.1:2020/filter-product')
                .then(response => {
                    console.log(response.data)
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        } else {
            axios.get(`http://127.0.0.1:2020/product/category/${categoryId}`)
                .then(response => {
                    console.log(response.data);
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        }
    }

    useEffect(() => {
        LoadCategories();
        LoadProducts("-1");
    }, []);

    return (
        <div className="container">
            {username ? (
                <h3 className="text-center mb-3 mt-3">Welcome, {username}</h3>

            ) : (
                <h3 className="text-center mb-3 mt-3">Welcome, Guest</h3>
            )}
            <div className="row">
                <aside className="col-md-2">
                    <select className="form-select mb-3" name="CategoryId" onChange={(event) => LoadProducts(event.target.value)}>
                        {categories.map(category =>
                            <option key={category.CategoryId} value={category.CategoryId}> {category.CategoryName} </option>
                        )}
                    </select>
                </aside>
                <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill , minmax(250px  , 1fr))", gridGap: "10px" }}>
                    {products.map(product => (
                        <div className="product-item" key={product.ProductId}>
                            <div className="card">
                                <img src={`http://127.0.0.1:2020/get-images/${product.ProductId}`} height={250} width={250} className="card-img-top" alt={product.Title} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.Title}</h5>
                                    {username ? (
                                        <Link to={`/product/category/${product.CategoryId}`} className="btn btn-primary">Buy Now</Link>
                                    ) : (
                                        <Link to={`/login`} className="btn btn-primary">Buy Now</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
