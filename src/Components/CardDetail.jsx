import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CardDetail = ({ product }) => {
    const dispatch = useDispatch();
    // Acceder al producto dentro de la clave "0" si existe
    const actualProduct = Object.values(product)[0];
    if (!actualProduct) {
        return (
            <View style={styles.notFound}>
                <Text>Product not found</Text>
            </View>
        );
    }
    return (
        <View style={styles.cardDetail}>
            <Text style={styles.title}>{actualProduct.title}</Text>
            <Text style={styles.description}>{actualProduct.subtitle}</Text>
            <Text style={styles.price}>Price: ${actualProduct.price}</Text>
            <Text style={styles.category}>Category: {actualProduct.categoryId}</Text>
            <Image
                source={{ uri: actualProduct.image }}
                style={styles.image}
            />
            {/* Botón */}
            <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {     
                dispatch(addToCart({...actualProduct, quantity:1}))
                }}
            >
                <Text style={styles.addButtonText}>AGREGAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardDetail: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    notFound: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
    },
    addButton: {
        backgroundColor: "#F4C10F", // Color del botón
        paddingVertical: 10,
        alignItems: "center",
        borderBottomLeftRadius: 10,
    },
    addButtonText: {
        color: "#3B0153", // Color del texto del botón
        fontWeight: "bold",
    },
});

export default CardDetail;
