import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from 'react/cjs/react.production.min';
import AuthProvider, { useAuth } from "../AuthProvider/AuthProvider";
import FeedScreen from "../Screens/UserScreens/FeedScreen"
import ProfileScreen from "../Screens/UserScreens/ProfileScreen"
import RegisterScreen from '../Screens/AuthScreens/RegisterScreen';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';

//
const Stack = createNativeStackNavigator();

const MainContainer = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);

    if (currentUser) {
        return (
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="FeedScreen" component={FeedScreen} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        )
    }
    else {
        return (
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        )
    }

}

export default MainContainer