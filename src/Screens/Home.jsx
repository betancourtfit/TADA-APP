import React from "react";
import { useEffect } from "react";
import {
    StatusBar,
    ScrollView,
    View,
    Button,
    StyleSheet,
    Text,
} from "react-native";
import CustomCarousel from "../Components/Carousel";
import { color } from "../Global/color";
import Categories from "../Components/Categories";
//import products from "../Data/products.json";
import CardCarousel from "../Components/CardCarousel";
import Card from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/shop/shopSlice";
import { useGetProductsQuery } from "../services/shopService";




const Home = ({ navigation }) => {
    const categories = useSelector((state) => state.shop.value.categories);
    const { data: products, error, isLoading } = useGetProductsQuery();
    console.log(products);
    const dispatch = useDispatch();

    if (isLoading) {
        // Mostrar un indicador de carga si los datos aún están siendo cargados
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando productos...</Text>
            </View>
        );
    }

    if (error) {
        // Mostrar un mensaje de error si ocurre un error durante la carga
        return (
            <View style={styles.errorContainer}>
                <Text>Error al cargar los productos</Text>
            </View>
        );
    }
    return (
        <>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
            {/* Envolver el contenido con ScrollView */}
            <ScrollView style={{ flex: 1 }}>
                <CustomCarousel />
                <Categories categories={categories} navigation={navigation} />

                {/* Card Carousel */}
                <View style={{ flex: 1}}>
                    <CardCarousel navigation={navigation} >
                        {/* Mapear las tarjetas como children */}
                        {products.map((item) => (
                            <Card navigation={navigation} key={item.id} item={item} />
                        ))}

                        {/* Agregar el botón "Ver más" como último elemento */}
                        <View
                            style={{
                                width: 200,
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 10,
                            }}
                        >
                            <Button
                                title="Ver más"
                                onPress={() => console.log("Ver más clicado")}
                            />
                        </View>
                    </CardCarousel>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        padding: 15,
        backgroundColor: "#f2f2f2",
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
});

export default Home;
