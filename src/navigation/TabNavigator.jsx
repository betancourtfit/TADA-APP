import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrderNavigator from './OrderNavigator';
import Profile from '../Screens/Profile';
import MyPlacesNavigator from './MyPlacesNavigator';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
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
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={
                {
                    tabBarIcon: ({color, size}) => (
                        <Icons name="person" color={color} size={size} />
                    )
                }
            }
            />
            <Tab.Screen
            name="MyPlaces"
            component={MyPlacesNavigator}
            options={
                {
                    tabBarIcon: ({color, size}) => (
                        <Icons name="place" color={color} size={size} />
                    )
                }
            }
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;