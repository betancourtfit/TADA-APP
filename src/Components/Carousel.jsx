import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const carouselData = [
    {
        id: "1",
        image: "https://media.tada.com.ar/discount/000QUIF1_b09966b7-98e9-4e80-a2d8-22cb65eb3839.jpg?w=1100&h=auto",
    },
    {
        id: "2",
        image: "https://media.tada.com.ar/discount/EVEEXPOCT00_48427673-e693-45e4-857b-dcbdab7bccb4.jpg?w=1100&h=auto",
    },
    {
        id: "3",
        image: "https://media.tada.com.ar/discount/EVEEXPOCT00_48427673-e693-45e4-857b-dcbdab7bccb4.jpg?w=1100&h=auto",
    },
];

const CustomCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null); // Añadir referencia al carrusel

    useEffect(() => {
        const interval = setInterval(() => {
            // Incrementar el índice de manera circular
            setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Usar la referencia para actualizar el índice del carrusel manualmente
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index: activeIndex, animated: true });
        }
    }, [activeIndex]);

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef} // Añadir la referencia aquí
                width={screenWidth}
                height={200}
                data={carouselData}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                    </View>
                )}
                loop={true}
                autoPlay={false}
                index={activeIndex}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <View style={styles.paginationContainer}>
                {carouselData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex
                                ? styles.activeDot
                                : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        position: "relative",
    },
    slide: {
        alignItems: "center",
    },
    image: {
        width: screenWidth,
        height: 150,
        resizeMode: "cover",
    },
    paginationContainer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "#FFC107",
    },
    inactiveDot: {
        backgroundColor: "#E0E0E0",
    },
});

export default CustomCarousel;
