import { createContext, useReducer } from 'react'
import initstate from './intialstates/IntialPizzaData'
import getAllPizzaReducers from './reducers/PizzaReducers'

export const GlobalContext = createContext({})
export const GlobalProvider = ({children}) =>{
    const [allPizzaState, dispatch] = useReducer(getAllPizzaReducers,initstate)

    return(
        <GlobalContext.Provider value={{allPizzaState,dispatch}}>
        {children}
    </GlobalContext.Provider>
    )
}
