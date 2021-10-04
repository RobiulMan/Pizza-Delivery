import cartItems from "../intialstates/cartItem"

const CartReducer = (state={cartItems}, action) => {
    switch(action.type) {
        case "ADD_TO_CART": 
        const alreadyExists = state.cartItems.find((item) => item._id === action.cartItem._id) 
        if(alreadyExists) {
            return {
                ...state,
                cartItems: state.cartItems.map(item => item._id === action.cartItem._id? action.cartItem : item)
            }
        }
        return {
            ...state,
            cartItems: [ ...state.cartItems, action.cartItem]
        }
        case "DELETE_FROM_CART": return{
            ...state,
            cartItems: state.cartItems.filter(item => item._id !== action.cartItem._id)
        }
        default: return state
    }
}

export default CartReducer

