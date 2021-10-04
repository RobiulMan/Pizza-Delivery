const loginUserInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const userInfo = {
    loginUserInfo: loginUserInfo
}

export default userInfo