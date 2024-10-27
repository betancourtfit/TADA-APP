import React from 'react';
import { Text } from 'react-native';
import CardDetail from '../Components/CardDetail';
import { Pressable } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useGetProductByIdQuery } from '../services/shopService';

const ProductDetail = ({navigation}) => {
    const productId = useSelector((state) => state.shop.value.productSelected);
    const { data: product, error: error, isLoading: isLoading } = useGetProductByIdQuery(productId);
    if (isLoading) {
        return (
            <Text>Cargando producto...</Text>
        );
    }
    if (error) {
        return (
            <Text>Error al cargar el producto</Text>
        );
    }
    console.log(product);
    return (
        <>
            {/* Flecha de volver atras */}
            <Pressable onPress={() => navigation.goBack()}>
                <Icons name="arrow-back" size={30} />
            </Pressable>
            <CardDetail  product={product} />
        </>
    );
};

export default ProductDetail;