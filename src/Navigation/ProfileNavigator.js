import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import editProfileScreen from "../Screens/UserScreens/editProfileScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="editProfile" component={editProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileNavigator;
