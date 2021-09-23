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

// const alreadyExists = state.cartItems.find((item) => item._id === action.cartItem._id) 
// if(alreadyExists) {
//     return {
//         ...state,
//         cartItems: state.cartItems.map(item => item._id === action.cartItem._id? action.cartItem : item)
//     }
// }
// return {
//     ...state,
//     cartItems: [ ...state.cartItems, action.cartItem]
// }

export default CartReducer

// state.find((item) => item.name === action.item.name)
//         ? state.map((item) =>
//             item.name === action.item.name
//               ? {
//                   ...item,
//                   quantity: item.quantity + 1
//                 }
//               : item
//           )
//         : [...state, { ...action.item, quantity: 1 }];