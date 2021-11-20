export const placeOrderReducer = (state={}, action) => {
    switch(action.type) {
        case 'PLACE_ORDER_REQUEST': return {
            loading: true
        }
        case 'PLACE_ORDER_SUCCESS': return {
            loading: false,
            success: true
        }
        case 'PLACE_ORDER_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}




export const getUserOrderReducers = (state=[], action) => {
    
    switch(action.type) {
        case 'GET_USER_ORDER_REQUEST':return{
            loading: true
        }
        case 'GET_USER_ORDER_SUCCESS': return{
            loading: false,
            order: action.payload,
            
        }
        case 'GET_USER_ORDER_FAILED':  return{
            loading: false,
            order:[],
            error: action.error
        }
        default : return state;
    }
}



export const getAllOrderReducers = (state=[], action) => {
    
    switch(action.type) {
        case 'GET_ALLORDER_REQUEST':return{
            loading: true
        }
        case 'GET_ALLORDER_SUCCESS': return{
            loading: false,
            order: action.payload,
            
        }
        case 'GET_ALLORDER_FAILED':  return{
            loading: false,
            error: action.error
        }
        default : return state;
    }
}

export const deliverOrdersReducer = (state=[], action) => {
    
    switch(action.type) {
        case 'ORDER_DELIVER_REQUEST':return{
            loading: true
        }
        case 'ORDER_DELIVER_SUCCESS': return{
            loading: false,
            order: action.payload,
            
        }
        case 'ORDER_DELIVER_FAILED':  return{
            loading: false,
            error: action.error
        }
        default : return state;
    }
}

