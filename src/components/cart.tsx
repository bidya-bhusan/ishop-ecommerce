import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

export function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [uniqueProducts, setUniqueProducts] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const getUniqueCartItems = () => {
            const uniqueProducts: any[] = [];
            const productIds = new Set<number>();

            cartItems.forEach((product: any) => {
                if (!productIds.has(product.ProductId)) {
                    uniqueProducts.push(product);
                    productIds.add(product.ProductId);
                }
            });

            return uniqueProducts;
        };

        const uniqueProducts = getUniqueCartItems();
        setUniqueProducts(uniqueProducts);

    }, [cartItems]);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        setQuantities({ ...quantities, [productId]: newQuantity });
    };


    const calculateTotal = () => {
        let total = 0;
        uniqueProducts.forEach((product) => {
            const quantity = quantities[product.ProductId] || 1;
            total += product.Price * quantity;
        });
        return total;
    };

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
                    {uniqueProducts.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.Title}</td>
                            <td>{item.Price}</td>
                            <td>
                                <input
                                    type="number"
                                    value={quantities[item.ProductId] || 1}
                                    onChange={(e) => handleQuantityChange(item.ProductId, parseInt(e.target.value))}
                                />
                            </td>
                            <td>{(quantities[item.ProductId] || 1) * item.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Total: {calculateTotal()}</div>
        </div>
    );
}
