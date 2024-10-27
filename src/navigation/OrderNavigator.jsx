import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import OrdersScreen from '../Screens/OrdersScreen'
import Header from '../Components/Header'

const Stack = createStackNavigator()

const OrderNavigator = () => {
    return (
        <Stack.Navigator 
        initialRouteName="Cart"
        screenOptions={{
            header: ({route}) => <Header subtitle={route.name} />
        }}
        >
            <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
    )
}

export default OrderNavigator 