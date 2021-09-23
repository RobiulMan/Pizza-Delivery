import { createContext, useEffect, useReducer } from 'react'
import cartItems from './intialstates/cartItem'
import initstate from './intialstates/IntialPizzaData'
import CartReducer from './reducers/CartReducer'
import getAllPizzaReducers from './reducers/PizzaReducers'

export const GlobalContext = createContext({})
export const GlobalProvider = ({children}) =>{
    const [allPizzaState, dispatch] = useReducer(getAllPizzaReducers,initstate)
    const [cartItemState, cartdispatch] = useReducer(CartReducer, cartItems)
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItemState.cartItems))
    },[cartItemState])

    return(
        <GlobalContext.Provider value={{allPizzaState,dispatch,cartItemState,cartdispatch}}>
        {children}
    </GlobalContext.Provider>
    )
}
