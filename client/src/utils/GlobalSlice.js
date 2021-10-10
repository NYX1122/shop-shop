import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        UPDATE_PRODUCTS: (state, { payload }) => {
            state.products = payload.products;
        },
        UPDATE_CATEGORIES: (state, { payload }) => {
            state.categories = payload.categories;
        },
        UPDATE_CURRENT_CATEGORY: (state, { payload }) => {
            state.currentCategory = payload.currentCategory;
        },
        ADD_TO_CART: (state, { payload }) => {
            state.cart = [ ...state.cart, payload.product ];
            state.cartOpen = true;
        },
        ADD_MULTIPLE_TO_CART: (state, { payload }) => {
            state.cart = [ ...state.cart, ...payload.products ];
        },
        REMOVE_FROM_CART: (state, { payload }) => {
            let newState = state.cart.filter(product => {
                return product._id !== payload._id;
            });

            state.cart = newState;
            state.cartOpen = newState.length > 0;
        },
        UPDATE_CART_QUANTITY: (state, { payload }) => {
            state.cart = state.cart.map(product => {
                if (payload._id === product._id) {
                    product.purchaseQuantity = payload.purchaseQuantity;
                }
                return product;
            });
            state.cartOpen = true;
        },
        CLEAR_CART: (state) => {
            state.cart = [];
            state.cartOpen = false;
        },
        TOGGLE_CART: (state) => {
            state.cartOpen = !state.cartOpen;
        }
    }
});

const { actions, reducer } = globalSlice

export const { 
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART } = actions;

export default reducer;