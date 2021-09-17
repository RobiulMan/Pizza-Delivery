import initstate from "../intialstates/IntialPizzaData";


const getAllPizzaReducers = (state=initstate, action) => {
    
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

export default  getAllPizzaReducers