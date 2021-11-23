export const userAction = (user) => async userdispatch => {
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



export const getAllUserAction = () => async (dispatch) => {
    dispatch({type: "GET_ALLUSER_REQUEST", loading: false});
    try{
        const res = await fetch('/api/user/alluser')
        const data = await res.json();
        
        dispatch({type: "GET_ALLUSER_SUCCESS", loading: false, data: data});

    }catch(error) {
        dispatch({type: "GET_ALLUSER_FAILED",loading: false,error: error.message});
    }
}



export const deleteUserAction = (userId) => async ()  =>{

    try{
        fetch('/api/user/deleteuser',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify({userId})
        })
        alert('User deleted successfully')
        window.location.reload()
       
    }catch(err) {
            alert('something want wrong')
            
    }
}
