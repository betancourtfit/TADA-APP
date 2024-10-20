import React from 'react';
import { Text } from 'react-native';
import CardDetail from '../Components/CardDetail';
import { Pressable } from 'react-native';

const ProductDetail = ({route, navigation}) => {
    const { productId, products } = route.params;
    console.log(products);
    return (
        <>
            {/* Flecha de volver atras */}
            <Pressable onPress={() => navigation.goBack()}>
                <Text>atras</Text>
            </Pressable>
            <CardDetail productId={productId} product={products} />
        </>
    );
};

export default ProductDetail;