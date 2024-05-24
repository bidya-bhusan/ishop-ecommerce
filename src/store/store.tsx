import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slicers/cart-slicer";
import { ProductListContract } from "../contract/ProductListContract";

export default configureStore({
    reducer: {
        cart: cartReducer
    }
});

export interface RootState {
    cart: {
        cartItems: ProductListContract;
        cartCount: number;
    };
}

