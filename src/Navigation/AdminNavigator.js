import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminSelectScreen from "../Screens/AdminScreens/AdminSelectScreen";
import ApproveUsers from "../Screens/AdminScreens/ApproveUsers";
import NominateAdmin from "../Screens/AdminScreens/NominateAdmin";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import ProjectScreen from "../Screens/UserScreens/ProjectScreen";
import BlockedUser from "../Screens/AdminScreens/BlockedUser";
const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Select" component={AdminSelectScreen} />
            <Stack.Screen name="Approv" component={ApproveUsers} />
            <Stack.Screen name="Nominate" component={NominateAdmin} />
            <Stack.Screen name="Blocked" component={BlockedUser} />
            <Stack.Screen name="פרופיל" component={ProfileScreen} />
            <Stack.Screen name="פרויקט" component={ProjectScreen} />
        </Stack.Navigator>
    );
};

export default AdminNavigator;
