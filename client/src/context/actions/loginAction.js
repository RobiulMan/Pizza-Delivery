const loginAction = (user) => async logindispatch => {
    logindispatch({type: 'Login_REQUEST'})
    
    try{
        let responce = await fetch('api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                 "Accept": "application/json",
    
            },
            mode: 'cors',
            body: JSON.stringify(user),
           
            })
            

        const data = await responce.json()

        logindispatch({type: 'LOGIN_REQUEST_SUCCESS', payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
        window.localtion.href='/'

    }catch(error){
        logindispatch({type: 'LOGIN_REQUEST_FAILED', payload: error})
    }

      
        
}

export default loginAction