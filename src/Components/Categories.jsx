import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
//import categories from "../Data/categories.json";

// Obtener el ancho de la pantalla para ajustar el tamaño de los botones
const { width: screenWidth } = Dimensions.get("window");

const Categories = ({categories, navigation}) => {
    return (
        <View style={styles.categoriesContainer}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={styles.categoryButton}
                    onPress={() => navigation.navigate("CategoriesScreen", { 
                        categoryId: category.id,
                        categoryName: category.title,
                        })}
                >
                    {/* Mostrar la imagen desde icon_link */}
                    <Image
                        source={{ uri: category.icon_link }}
                        style={styles.categoryIcon}
                    />
                    <Text style={styles.categoryText}>{category.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: "#F5F5F5", // Color de fondo
    },
    categoryButton: {
        width: (screenWidth - 50) / 2, // Dos botones por fila con margen
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 5,
        flexDirection: "row", // Alineación horizontal de icono y texto
        alignItems: "center",
        marginVertical: 5,
        elevation: 3, // Para sombra (Android)
        shadowColor: "#000", // Para sombra (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoryIcon: {
        width: 40, // Tamaño ajustado del icono
        height: 40,
        marginRight: 10, // Espacio a la derecha del icono
    },
    categoryText: {
        fontSize: 16, // Tamaño de texto más grande
        fontWeight: "bold",
        color: "#333",
        textAlign: "left", // Alineación del texto a la izquierda
    },
});

export default Categories;
