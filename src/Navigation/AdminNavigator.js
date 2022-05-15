import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminSelectScreen from "../Screens/AdminScreens/AdminSelectScreen";
import ApproveUsers from "../Screens/AdminScreens/ApproveUsers";
import NominateAdmin from "../Screens/AdminScreens/NominateAdmin";
const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Select" component={AdminSelectScreen} />
            <Stack.Screen name="Approv" component={ApproveUsers} />
            <Stack.Screen name="Nominate" component={NominateAdmin} />
        </Stack.Navigator>
    );
};

export default AdminNavigator;
