import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
    interface VerifyUser {
        UserId: string;
        Password: string;
    }

    const [cookies, setCookie] = useCookies(['UserId']);
    const navigate = useNavigate();

    const [user, setUser] = useState<VerifyUser>({
        UserId: '',
        Password: ''
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:2020/get-admin')
            .then(res => {
                var userData = res.data.find((userData: any) => userData.UserId === user.UserId);
                if (userData && userData.Password === user.Password) {
                    setCookie('UserId', user.UserId);
                    alert("loginSucessful")
                    navigate('/admin-add-product');
                } else {
                    setErrorMessage('Invalid user ID or password');
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                setErrorMessage('An error occurred while logging in');
            });
    };

    return (
        <div>
            <h2>Admin Log inpage</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        name="UserId"
                        value={user.UserId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        value={user.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
