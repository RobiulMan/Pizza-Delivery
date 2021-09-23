
const getAllPizzaAction = () => async (dispatch) => {
    try{
        const res = await fetch('api/pizza')
        const data = await res.json();
        
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: data, error: ""});

    }catch(err) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: err});
    }
}

export default getAllPizzaAction