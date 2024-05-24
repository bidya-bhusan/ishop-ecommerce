import { useState } from "react";
import { FormData } from "../contract/AdminResisterContarct";
import { Link } from "react-router-dom";
import axios from "axios";

export function AdminResister() {

    const [formData, setFormData] = useState<FormData>({
        UserId: '',
        FirstName: '',
        LastName: '',
        Password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:2020/resister-admin' , formData)
        .then(res => {
            setFormData(res.data)
        })
        console.log(formData)
    }

    return (
        <div>
            <h2>admin resister page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="UserId"
                        name="UserId"
                        value={formData.UserId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Resister</button>
            </form>
            <Link to="/admin-login">alrready resister
            </Link>
        </div>
    )
}