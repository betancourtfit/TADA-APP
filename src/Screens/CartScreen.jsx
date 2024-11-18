import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, cleanCart } from '../features/cart/cartSlice';
import { useCreateOrderMutation } from '../services/orderService';

const CartScreen = ({ navigation }) => {
    const cart = useSelector((state) => state.cart.value.cartItems);
    const total = useSelector((state) => state.cart.value.total);
    const user = useSelector((state) => state.cart.value.user);
    const dispatch = useDispatch();
    const [createOrder] = useCreateOrderMutation();

    const handleConfirmPurchase = () => {
        Alert.alert(
            "Confirmación de Compra",
            "¿Estás seguro de que deseas confirmar la compra?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: async () => {
                        try {
                            // Crear la orden con los productos del carrito
                            const order = {
                                items: cart,
                                total: total,
                                user: user,
                                date: new Date().toLocaleString(),
                                status: "Pendiente",
                            };

                            // Utilizar el hook para crear la orden en Firebase
                            const result = await createOrder(order).unwrap();

                            if (result) {
                                // Limpiar el carrito
                                dispatch(cleanCart());
                                Alert.alert("Compra realizada con éxito", "Tu orden ha sido creada correctamente.");
                                // esperar 2 segundos  y navegar a la screen de Orders
                                setTimeout(() => {
                                    navigation.navigate("Order");
                                }, 2000);


                            }
                        } catch (error) {
                            console.error("Error al confirmar la compra:", error);
                            Alert.alert("Error", "No se pudo procesar la compra.");
                        }
                    },
                },
            ]
        );
    };

    const renderItems = () => {
        return cart.map((item) => {
            return (
                <View key={item.id} style={styles.itemContainer}>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
                        <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => dispatch(removeFromCart({ id: item.id }))}
                    >
                        <Text style={styles.removeButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            );
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Carrito de Compras</Text>
            {cart.length > 0 ? (
                <>
                    {renderItems()}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleConfirmPurchase}
                    >
                        <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.emptyCartText}>El carrito está vacío</Text>
            )}
        </ScrollView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    itemContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        color: '#666',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#666',
    },
    removeButton: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    totalContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
    },
    confirmButton: {
        backgroundColor: '#F4C10F', // Mismo color del botón "Agregar al Carrito"
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#3B0153', // Mismo color del texto del botón "Agregar al Carrito"
        fontWeight: 'bold',
        fontSize: 18,
    },
});