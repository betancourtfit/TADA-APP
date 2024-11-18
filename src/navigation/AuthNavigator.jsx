import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/auth/LoginScreen";
import SignupScreen from "../Screens/auth/SignupScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />

        </Stack.Navigator>
    );
}

export default AuthNavigator;