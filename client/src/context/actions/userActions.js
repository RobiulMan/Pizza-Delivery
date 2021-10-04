const userAction = (user) => async userdispatch => {
    userdispatch({type: 'USER_REGISTER_REQUEST'})
    
    try{
        const respoince = await fetch('api/user/registation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify(user),
           
            })
            const data = await respoince
            if(data.status === 400) {
                userdispatch({type: 'USER_REGISTER_FAILED', payload: true})
            }else{
                userdispatch({type: 'USER_REGISTER_SUCCESS', payload: true})
            }
            

    }catch(error){
        userdispatch({type: 'USER_REGISTER_FAILED', payload: error})
    }
}

export default userAction

