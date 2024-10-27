import React from 'react';
import { Text } from 'react-native';
import CardDetail from '../Components/CardDetail';
import { Pressable } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const ProductDetail = ({route, navigation}) => {
    const { productId, products } = route.params;
    console.log(products);
    return (
        <>
            {/* Flecha de volver atras */}
            <Pressable onPress={() => navigation.goBack()}>
                <Icons name="arrow-back" size={30} />
            </Pressable>
            <CardDetail productId={productId} product={products} />
        </>
    );
};

export default ProductDetail;