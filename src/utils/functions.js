export const calculate_total_price = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}