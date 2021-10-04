const logoutAction = () => () => {
    localStorage.removeItem('userInfo')
    window.location.href='/login'
}

export default logoutAction