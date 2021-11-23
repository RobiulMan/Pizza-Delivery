import initstate from "../intialstates/IntialPizzaData";


export const getAllPizzaReducers = (state=initstate, action) => {
    
    switch(action.type) {
        case 'GET_PIZZAS_SUCCESS': return{
            loading: false,
            data: action.data,
            error: ''
        }
        case 'GET_PIZZAS_FAILED':  return{
            loading: false,
            data:[],
            error: action.error
        }
        default : return state;
    }
}

export const addPizzaReducers = (state={}, action) => {
    
    switch(action.type) {
        case 'ADD_PIZZAS_REQUEST': return{
            loading: true,

        }
        case 'ADD_PIZZAS_SUCCESS': return{
            loading: false,
            success: true
        }
        case 'ADD_PIZZAS_FAILED':  return{
            loading: false,
            error: action.payload
        }
        default : return state;
    }
}

export const getPizzaByIdReducer = (state={}, action) => {
    
    switch(action.type) {
        case 'GET_PIZZABYID_REQUEST': return{
            loading: true,
            
        }
        case 'GET_PIZZABYID_SUCCESS': return{
            loading: false,
            data: action.data,

        }
        case 'GET_PIZZABYID_FAILED':  return{
            loading: false,
            error: action.error
        }
        default : return state;
    }
}



export const updatePizzaReducers = (state={}, action) => {
    
    switch(action.type) {
        case 'UPDATE_PIZZAS_REQUEST': return{
            loading: true,

        }
        case 'UPDATE_PIZZAS_SUCCESS': return{
            loading: false,
            success: true
        }
        case 'UPDATE_PIZZAS_FAILED':  return{
            loading: false,
            error: action.payload
        }
        default : return state;
    }
}
