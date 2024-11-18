
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetProfilePictureQuery } from "../services/userService";
import { setImage } from "../features/auth/authSlice";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";


const MainNavigator = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const email = useSelector((state) => state.auth.user);
    const localId = useSelector((state) => state.auth.localId);

    const dispatch = useDispatch();

    const { data: dataProfile, isLoading, error } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        dispatch(setImage(dataProfile?.image));
        });

    return (
        <NavigationContainer>
        {
            isAuth ? 
                <TabNavigator /> : <AuthNavigator />
        }
        </NavigationContainer>
    );
}

export default MainNavigator;