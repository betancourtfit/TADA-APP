import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CartScreen from '../Screens/CartScreen'
import Header from '../Components/Header'

const Stack = createStackNavigator()

const CartNavigator = () => {
    return (
        <Stack.Navigator 
        initialRouteName="Cart"
        screenOptions={{
            header: ({route}) => <Header subtitle={route.name} />
        }}
        >
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default CartNavigator 