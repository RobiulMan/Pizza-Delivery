const placeOrderAction = (token, subtotal,cartItemState, loginState) => async placeorderdispatch => {
    placeorderdispatch({type:'PLACE_ORDER_REQUEST'})

    try{
        
        let responce = await fetch('api/order/placeorder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify({token, subtotal,cartItemState, loginState}),
           
            })
            const data = responce.json()
            console.log(data)
            placeorderdispatch({type:'PLACE_ORDER_SUCCESS'})

    }catch(error) {
        placeorderdispatch({type:'PLACE_ORDER_FAILED', payload: error})

    }
}

export default placeOrderAction