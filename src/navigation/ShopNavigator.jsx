import { createStackNavigator } from "@react-navigation/stack";
import { Home, CategoriesScreen, ProductDetail } from "../Screens";
import Header from "../Components/Header";

const Stack = createStackNavigator()

const ShopNavigator = () => {
    return (
        <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
            header: ({route}) => <Header subtitle={route.name} />
        }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={({ route }) => ({ title: route.params.categoryName })} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={({route})=> ({ title: route.params.title })} />
        </Stack.Navigator>
    );
}

export default ShopNavigator;