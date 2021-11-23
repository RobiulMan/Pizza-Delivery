
export const getAllPizzaAction = () => async (dispatch) => {
    try{
        const res = await fetch('/api/pizza')
        const data = await res.json();
        
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: data, error: ""});

    }catch(error) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: error.message});
    }
}

export const searchPizzaAction = (keyword, category) => async (dispatch) => {
    let key = keyword.toLowerCase();
    let categorys = category.toLowerCase()
    let searchPizza;

    try{
        const res = await fetch('/api/pizza')
        const data = await res.json();
        
        searchPizza = data.filter(pizza => pizza.name.toLowerCase().includes(key))
        
        if(categorys !== 'all') {
            searchPizza = data.filter(pizza => pizza.category.toLowerCase() === categorys)
            
        }
        dispatch({type: "GET_PIZZAS_SUCCESS", loading: false, data: searchPizza, error: ""});

    }catch(error) {
        dispatch({type: "GET_PIZZAS_FAILED",loading: false,data: [],error: error.message});
    }
}


export const addPizzaAction = (pizza) => async dispatch => {
    dispatch({type: 'ADD_PIZZAS_REQUEST'})

    try{
         await fetch('/api/addpizza', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify(pizza)
           
        })
       
        dispatch({type: 'ADD_PIZZAS_SUCCESS'})

    }catch(error) {
        dispatch({type: 'ADD_PIZZAS_FAILED', payload: error})

    }
}

export const getPizzaByIdAction = (pizzaId) => async dispatch => {
    dispatch({type: 'GET_PIZZABYID_REQUEST', loading: true})

    try{
        const res = await fetch('/api/pizzaid', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify({pizzaId})
        })
        
        const data = await res.json()

        dispatch({type: 'GET_PIZZABYID_SUCCESS', loading: false, data: data})

    }catch(err) {
        dispatch({type: 'GET_PIZZABYID_FAILED', loading: false, error: err})

    }
}



export const updatePizzaAction = (updatedPizza) => async dispatch => {
    dispatch({type: 'UPDATE_PIZZAS_REQUEST'})

    try{
          await fetch('/api/edit-pizza', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify(updatedPizza)
           
        })
      
        dispatch({type: 'UPDATE_PIZZAS_SUCCESS'})

    }catch(error) {
        dispatch({type: 'UPDATE_PIZZAS_FAILED', payload: error})

    }
}

export const deletePizzaAction = (pizzaid) => async dispatch  =>{

    try{
        const res = fetch('/api/deletepizza',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify({pizzaid})
        })
        alert('pizza deleted successfully')
        window.location.reload()
        console.log(res);
    }catch(err) {
            alert('something want wrong')
            console.log(err)
    }
}