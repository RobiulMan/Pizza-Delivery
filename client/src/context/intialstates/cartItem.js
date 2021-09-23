const initcartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const cartItems = {
    cartItems: initcartItems
}

export default cartItems