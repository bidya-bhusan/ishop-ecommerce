import axios from "axios";
import { useFormik } from "formik";
import { useNavigate  , Link} from "react-router-dom";
import { useState } from "react";
import { ResisterContract } from "../contract/ResisterContarct";
import { Button, TextField } from "@mui/material"; // Import TextField and Button from MUI
import * as Yup from "yup";
import { useCookies } from "react-cookie";


export function UserRegister() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['CustomerId']);
    const [customers, setCustomers] = useState<ResisterContract[]>();


    const validationSchema = Yup.object().shape({
        CustomerId: Yup.string().required("CustomerId is required"),
        Name: Yup.string().required("Name is required"),
        Email: Yup.string().email("Invalid email").required("Email is required"),
        Password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
        Address: Yup.string().required("Address is required"),
        City: Yup.string().required("City is required"),
        State: Yup.string().required("State is required"),
        ZipCode: Yup.string().required("ZipCode is required"),
        Mobile: Yup.number().required("Mobile is required"),
    });

    const formik = useFormik<ResisterContract>({
        initialValues: {
            CustomerId: "",
            Name: "",
            Email: "",
            Password: "",
            Address: "",
            City: "",
            State: "",
            Contact: "",
            ZipCode: "",
            Mobile: ""
        },
        validationSchema: validationSchema,
        onSubmit: (customer) => {
            axios.post('http://127.0.0.1:2020/resister-customer', customer)
                .then(res => {
                    setCustomers(res.data)
                    console.log("user registered")
                    navigate('/home')
                    setCookie('CustomerId', customer.CustomerId);
                })
        }
    });

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }} className="mt-3">
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.Name}
                        error={formik.touched.Name && Boolean(formik.errors.Name)}
                        helperText={formik.touched.Name && formik.errors.Name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        id="email"
                        name="Email"
                        label="Email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.Email}
                        error={formik.touched.Email && Boolean(formik.errors.Email)}
                        helperText={formik.touched.Email && formik.errors.Email}
                        required
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="customerId"
                            name="CustomerId"
                            label="CustomerId"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.CustomerId}
                            required
                            error={formik.touched.CustomerId && Boolean(formik.errors.CustomerId)}
                            helperText={formik.touched.CustomerId && formik.errors.CustomerId}
                        />
                    </div>
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="password"
                            name="Password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.Password}
                            required
                            error={formik.touched.Password && Boolean(formik.errors.Password)}
                            helperText={formik.touched.Password && formik.errors.Password}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        id="address"
                        name="Address"
                        label="Address"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.Address}
                        error={formik.touched.Address && Boolean(formik.errors.Address)}
                        helperText={formik.touched.Address && formik.errors.Address}
                        required
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="city"
                            name="City"
                            label="City"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.City}
                            error={formik.touched.City && Boolean(formik.errors.City)}
                            helperText={formik.touched.City && formik.errors.City}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="state"
                            name="State"
                            label="State"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.State}
                            error={formik.touched.State && Boolean(formik.errors.State)}
                            helperText={formik.touched.State && formik.errors.State}
                            required
                        />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="zipCode"
                            name="ZipCode"
                            label="ZipCode"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.ZipCode}
                            error={formik.touched.ZipCode && Boolean(formik.errors.ZipCode)}
                            helperText={formik.touched.ZipCode && formik.errors.ZipCode}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "48%" }}>
                        <TextField
                            fullWidth
                            id="mobile"
                            name="Mobile"
                            label="Mobile Number"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.Mobile}
                            error={formik.touched.Mobile && Boolean(formik.errors.Mobile)}
                            helperText={formik.touched.Mobile && formik.errors.Mobile}
                            required
                        />
                    </div>
                </div>
                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-3">Register</Button>
                <Link className="btn btn-link w-100 mt-2" to='/login'>Already User? Log in </Link>

            </form>
        </div>
    )
}
