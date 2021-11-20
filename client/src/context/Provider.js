import { createContext, useEffect, useReducer } from 'react'
import cartItems from './intialstates/cartItem'
import initstate from './intialstates/IntialPizzaData'
import userInfo from './intialstates/userInfo'
import CartReducer from './reducers/CartReducer'
import loginReducer from './reducers/loginReducer'
import { getAllOrderReducers, getUserOrderReducers, placeOrderReducer } from './reducers/OrderReducer'
import { addPizzaReducers, getAllPizzaReducers, getPizzaByIdReducer, updatePizzaReducers } from './reducers/PizzaReducers'
import userReducer from './reducers/userReducer'

export const GlobalContext = createContext({})
export const GlobalProvider = ({children}) =>{
    const [allPizzaState, dispatch] = useReducer(getAllPizzaReducers,initstate)
    const [cartItemState, cartdispatch] = useReducer(CartReducer, cartItems)
    const [userState, userdispatch] = useReducer(userReducer, {})
    const [loginState, logindispatch] = useReducer(loginReducer,userInfo)
    const [placeOrderState, placeorderdispatch] = useReducer(placeOrderReducer, {})
    const [getOrderState, getorderdispatch] = useReducer(getUserOrderReducers, [])
    const [addPizzaState, addpizzadispatch] = useReducer(addPizzaReducers, {})
    const [getPizzaByIdState, getPizzaByIddispatch] = useReducer(getPizzaByIdReducer,{})
    const [updatePizzaState, updatePizzadispatch] = useReducer(updatePizzaReducers, {})
    const [getAllOrderState, getallorderdispatch] = useReducer(getAllOrderReducers, [])
    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItemState.cartItems))
    },[cartItemState])

    return(
        <GlobalContext.Provider 
        value={
            {allPizzaState,dispatch,
                cartItemState,cartdispatch,
                userState, userdispatch,
                loginState, logindispatch,
                placeOrderState, placeorderdispatch,
                getOrderState, getorderdispatch,
                addPizzaState, addpizzadispatch,getPizzaByIdState,
                 getPizzaByIddispatch,updatePizzaState,
                  updatePizzadispatch,
                  getAllOrderState, getallorderdispatch}
                  }>
        {children}
    </GlobalContext.Provider>
    )
}
