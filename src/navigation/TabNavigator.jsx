import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrderNavigator from './OrderNavigator';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName="Shop" 
            screenOptions={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        backgroundColor: 'black'
                    }
                }
            }
            >
                <Tab.Screen 
                name="Shop" 
                component={ShopNavigator} 
                options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <Icons name="store" color={color} size={size} />
                        )
                    }
                }
                />

                <Tab.Screen 
                name="Carrito" 
                component={CartNavigator} 
                options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <Icons name="shopping-cart" color={color} size={size} />
                        )
                    }
                }
                />

                <Tab.Screen 
                name="Order" 
                component={OrderNavigator} 
                options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <Icons name="receipt-long" color={color} size={size} />
                        )
                    }
                }
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;