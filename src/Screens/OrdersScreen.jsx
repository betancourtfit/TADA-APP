import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { useGetOrdersQuery } from '../services/orderService';
import FlatCard from '../Components/FlatCard';

const OrdersScreen = () => {
    const { data: orders, error, isLoading } = useGetOrdersQuery();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const formatDate = (dateString) => {
        const [datePart] = dateString.split(',');
        const [month, day, year] = datePart.split('/');
        return `${day}-${month}-${year}`;
    };

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <FlatCard>
                    <Text>Orden nro: {item.id}</Text>
                    <Text>Fecha: {formatDate(item.date)}</Text>
                    <Text>Estado: {item.status}</Text>
                    <Text>Total: ${item.total}</Text>
                    {/* Renderiza otros campos de la orden según sea necesario */}
                </FlatCard>
            )}
        />
    );
}

export default OrdersScreen;