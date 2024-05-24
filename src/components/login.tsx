import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import * as Yup from 'yup'; // Import Yup
import { Button, TextField } from "@mui/material";


export function UserLogin() {
    const [cookies, setCookie] = useCookies(['CustomerId']);
    
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({ 
        CustomerId: Yup.string().required('Customer ID is required'),
        Password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            CustomerId: "",
            Password: ""
        },
        validationSchema: validationSchema, // Apply validation schema
        onSubmit: (formData, { setFieldError }) => {
            axios.get('http://127.0.0.1:2020/get-customers')
                .then((response) => {
                    var user = response.data.find((user: any) => user.CustomerId === formData.CustomerId);
                    if (user) {
                        if (user.Password === formData.Password) {
                            setCookie('CustomerId', formData.CustomerId);
                            navigate('/home');
                        } else {
                            setFieldError('Password', 'Incorrect password'); // Set error message for incorrect password
                        }
                    } else {
                        setFieldError('CustomerId', 'Customer ID not found'); // Set error message for invalid customer ID
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-3">
                        <TextField
                            fullWidth
                            id="CustomerId"
                            name="CustomerId"
                            label="UserName"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.CustomerId}
                            error={formik.touched.CustomerId && Boolean(formik.errors.CustomerId)}
                            helperText={formik.touched.CustomerId && formik.errors.CustomerId}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            fullWidth
                            id="Password"
                            name="Password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Password}
                            error={formik.touched.Password && Boolean(formik.errors.Password)}
                            helperText={formik.touched.Password && formik.errors.Password}
                            required
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth className="mt-3">Login</Button>
                    <Link className="btn btn-link w-100 mt-2" to='/register'>New User? Register</Link>
                </form>
            </div>
        </div>
    );
}
