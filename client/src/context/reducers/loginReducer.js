import userInfo from "../intialstates/userInfo"


const loginReducer = (state={userInfo}, action) => {
    
    switch(action.type) {
        case 'Login_REQUEST': return {
            loading: true
        }
        case 'LOGIN_REQUEST_SUCCESS': return {
            loading: false,
            userInfo:action.payload
        }
        case 'LOGIN_REQUEST_FAILED': return {
            loading: false,
            error: action.payload
        }
        case 'LOGOUT': return {}
        default: return state
    }
}

export default loginReducer