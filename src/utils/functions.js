export const calculate_total_price = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Valida si el email tiene un formato válido.
 * @param {string} email - Email a validar.
 * @returns {boolean} - Retorna true si el email es válido, de lo contrario false.
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    return emailRegex.test(email);
  };