import { createStackNavigator } from '@react-navigation/stack';
import MyPlacesScreen from "../Screens/MyPlacesScreen";
import Header from "../Components/Header";

const Stack = createStackNavigator()

const MyPlacesNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Mis direcciones" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Mis direcciones" component={MyPlacesScreen} />
    </Stack.Navigator>
)

export default MyPlacesNavigator