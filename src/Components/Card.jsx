import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { setProduct } from "../features/shop/shopSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

// Componente para la tarjeta individual
const Card = ({ item, navigation }) => {
    if (!item) {
        return null; // Si item es undefined, no renderizamos nada
    }
    const dispatch = useDispatch();
    return (
        <View style={styles.cardContainer}>
            {/* Encabezado */}
            <TouchableOpacity 
                key={item.id} 
                onPress={()=> {
                    dispatch(setProduct(item.id));
                    navigation.navigate("ProductDetail")
                }} 
                >
                    <Text style={styles.headerText}>Ver más</Text>
                <View style={styles.header}>
                    <Text style={styles.headerText}>¡Llega en unos minutos!</Text>
                </View>

                {/* Imagen */}
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                {/* Detalles */}
                <View style={styles.cardDetails}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.cardPrice}>${item.price}</Text>
                </View>
            </TouchableOpacity>

            {/* Botón */}
            <TouchableOpacity 
                onPress={() => {
                    dispatch(addToCart({...item, quantity:1}))
                    }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>AGREGAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 200,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: "hidden",
        elevation: 3, // Para sombra en Android
        shadowColor: "#000", // Para sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        backgroundColor: "#4267B2", // Color del encabezado
        paddingVertical: 5,
    },
    headerText: {
        color: "#FFF",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
    },
    cardImage: {
        width: "100%",
        height: 120,
        resizeMode: "contain",
        marginVertical: 10,
    },
    cardDetails: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#666",
        marginVertical: 5,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
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

export default Card;
