import React from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";

// Obtener el ancho de la pantalla para ajustar el tamaño del carrusel
const { width: screenWidth } = Dimensions.get("window");

const CardCarousel = ({ children }) => {
    return (
        <View style={styles.carouselContainer}>
            <Text style={styles.categoryTitle}>Cervezas</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
            >
                {children}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingVertical: 15,
    },
    carouselContent: {
        paddingLeft: 15,
        paddingRight: 15, // Asegura que haya espacio al final
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        marginLeft: 28,
    },
});

export default CardCarousel;
