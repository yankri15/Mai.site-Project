import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerNav from "../API/HamburgerNav";
//
const Stack = createNativeStackNavigator();

const MainContainer = () => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return (
            <HamburgerNav />
        );
    } else {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        );
    }
};

export default MainContainer;
