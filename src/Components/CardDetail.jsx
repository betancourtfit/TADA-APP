import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
});

export default CardDetail;
