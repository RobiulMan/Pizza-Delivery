
const getAllPizzaAction = () => async (dispatch) => {
    try{
        const res = await fetch('api/pizza')
        const data = await res.json();
        
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: data, error: ""});

    }catch(error) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: error.message});
    }
}

export default getAllPizzaAction