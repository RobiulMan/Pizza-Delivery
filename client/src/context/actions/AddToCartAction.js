export const addToCartAction = (pizza, quentitys, varients) => dispatch => {
    let cartItem = {
        _id: pizza._id,
        name: pizza.name,
        image: pizza.image,
        varient: varients,
        quentity: Number(quentitys),
        prices: pizza.prices,
        price: pizza.prices[0][varients]*quentitys
        
    }
    if(cartItem.quentity > 10) {
        alert('you cannot add quentiey more then 10...')
        
    }else{
        if(cartItem.quentity < 1){
            dispatch({type: 'DELETE_FROM_CART', cartItem: pizza})
            return null
        }
        dispatch({type: 'ADD_TO_CART', cartItem}) 
    }
    
}

export const deleteFromCart = (pizza) => dispatch => {
    dispatch({type: 'DELETE_FROM_CART', cartItem: pizza})
}

