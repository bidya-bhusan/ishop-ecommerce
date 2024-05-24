import { useFormik } from "formik";
import { ProductContract } from "../contract/ProductContaract";
import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryContract } from "../contract/CategoryContract"
import { VendorContract } from "../contract/VendorContaract";

export function AdminAddProduct() {
    const [categories, setCategories] = useState<CategoryContract[]>();
    const [vendors, setVendors] = useState<VendorContract[]>();
    const [file, setFile] = useState<File | null>(null);

    const formik = useFormik<ProductContract>({
        initialValues: {
            ProductId: 0,
            Title: '',
            Price: 0,
            CategoryId: 0,
            VendorId: 0,
            Image: "",
            Qty:0
        },
        onSubmit: (product) => {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('ProductId', product.ProductId.toString());
                formData.append('Title', product.Title);
                formData.append('Price', product.Price.toString());
                formData.append('CategoryId', product.CategoryId.toString());
                formData.append('VendorId', product.VendorId.toString());

                axios.post('http://127.0.0.1:2020/add-product', formData);
                alert('Product Added Successfully..');
            } else {
                alert("no file selected")
            }

        }
    });

    function LoadCategories(): void {
        axios.get('http://127.0.0.1:2020/get-categories')
            .then(response => {
                response.data.unshift({ CategoryId: -1, CategoryName: 'Select a Category' });
                setCategories(response.data);
            });
    };

    function LoadVendors(url: any): void {
        axios.get(url)
            .then(response => {
                response.data.unshift({ VendorId: -1, VendorName: 'Select a Vendor' });
                setVendors(response.data);
            });
    };
    function handleCategoryChange(e: any) {
        if (e.target.value === "-1") {
            LoadVendors('http://127.0.0.1:2020/get-vendors');
        } else {
            LoadVendors(`http://127.0.0.1:2020/get-vendor/${e.target.value}`);
        }
        formik.handleChange(e);
    };

    useEffect(() => {
        LoadCategories();
        LoadVendors('http://127.0.0.1:2020/get-vendors');
    }, []);

    return (
        <div className="wow fadeInUp w-30" data-wow-delay="0.2s">
            <h2 className="mt-4 text-center">Admin - Add Product</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="row g-3" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div className="col-6">
                        <div className="form-floating">
                            <input type="number" className="form-control" name="ProductId" onChange={formik.handleChange} placeholder="ProductId" />
                            <label htmlFor="ProductId">ProductId</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-floating" >
                            <input type="text" className="form-control" name="Title" onChange={formik.handleChange} placeholder="Title" />
                            <label htmlFor="text">Title</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-floating">
                            <input type="number" className="form-control" name="Price" onChange={formik.handleChange} placeholder="Price" />
                            <label htmlFor="subject">Price</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating">
                            <select className="form-control" onChange={handleCategoryChange} name="CategoryId">
                                {
                                    categories?.map(category =>
                                        <option key={category.CategoryId} value={category.CategoryId}> {category.CategoryName} </option>
                                    )
                                }
                            </select>
                            <label htmlFor="CategoryId">Category</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating">
                            <select className="form-control" onChange={handleCategoryChange} name="VendorId">
                                {
                                    vendors?.map(vendor =>
                                        <option key={vendor.VendorId} value={vendor.VendorId}> {vendor.VendorName} </option>
                                    )
                                }
                            </select>
                            <label htmlFor="VendorId">Vemdor</label>
                        </div>
                    </div>
                    
                    <div className="col-6">
                        <div className="form-floating">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <button className="btn btn-primary w-100 py-3" type="submit">add product</button>
                    </div>
                </div>
            </form>
        </div>


    )
}
