import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import MapScreen from "../Screens/UserScreens/MapScreen";

const Stack = createStackNavigator();

const MapNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    );
};

export default MapNavigator;
