import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CardDetail = ({ productId, product }) => {
    //const product = products.find((p) => p.id === productId);

    if (!product) {
        return (
            <View style={styles.notFound}>
                <Text>Product not found</Text>
            </View>
        );
    }
    return (
        <View style={styles.cardDetail}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.subtitle}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.category}>Category: {product.categoryId}</Text>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
            />
            {/* Botón */}
            <TouchableOpacity style={styles.addButton}>
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
