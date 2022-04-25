import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerNav from "../API/HamburgerNav";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
// import UserNavbar from "../API/UserNavbar";

const Stack = createStackNavigator();

const MainContainer = () => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return (
            <HamburgerNav />
            // <UserNavbar />
        );
    } else {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </Stack.Navigator>
        );
    }
};

export default MainContainer;
