
export const getAllPizzaAction = () => async (dispatch) => {
    try{
        const res = await fetch('api/pizza')
        const data = await res.json();
        
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: data, error: ""});

    }catch(error) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: error.message});
    }
}

export const searchPizzaAction = (keyword, catagory) => async (dispatch) => {
    let key = keyword.toLowerCase();
    let catagorys = catagory.toLowerCase()
    let searchPizza;

    try{
        const res = await fetch('api/pizza')
        const data = await res.json();
        
        searchPizza = data.filter(pizza => pizza.name.toLowerCase().includes(key))
        
        if(catagorys !== 'all') {
            searchPizza = data.filter(pizza => pizza.catagory.toLowerCase() === catagorys)
            
        }
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: searchPizza, error: ""});

    }catch(error) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: error.message});
    }
}
// export default getAllPizzaAction