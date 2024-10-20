import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, CategoriesScreen, ProductDetail } from "../Screens";

const Stack = createStackNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={({ route }) => ({ title: route.params.categoryName })} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={({route})=> ({ title: route.params.title })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;