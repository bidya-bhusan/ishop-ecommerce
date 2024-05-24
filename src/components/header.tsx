import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { BiSearch } from 'react-icons/bi';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function Header() {
    const [cookies, , removeCookie] = useCookies(['CustomerId']);
    const username = cookies.CustomerId;
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const handleLogout = () => {
        removeCookie('CustomerId');
        navigate('/home');
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#e6f6ff" }} className='p-3'>
            <Link to="/">
                <h3>ishop</h3>
            </Link>
            <div className="" style={{ width: "40%" }}>
                <form>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="submit">
                                <BiSearch />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {username ? (
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Sign out
                </Button>
            ) : (
                <Link to="/login">
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
            )}
            {username ? (
                <Link to="">
                    <span>{username}</span>
                    <AccountCircleIcon />
                </Link>
            ) : (
                <Link to="/">
                    <span>guest</span>
                    <AccountCircleIcon />
                </Link>
            )}

            <Link to="/admin-login">
                <span>admin</span>
                <AccountCircleIcon />
            </Link>

            <Link to="/cart">
                <span>Cart ({cartItems.length})</span>
                <ShoppingCartIcon />
            </Link>
        </div>
    )
}
