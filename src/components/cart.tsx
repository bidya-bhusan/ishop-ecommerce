import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    // const Cart = ({ cartItems }: { cartItems: any[] }) => {
    //     const calculateTotal = () => {
    //         return cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
    //     };
    // }
    return (
        <div>
            <h3>Products in Cart:</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.Title}</td>
                            <td>{item.Price}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Price * item.Quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {/* <h4>Total: {` ${calculateTotal()}`}</h4> */}
            </div>
        </div>
    );
}
