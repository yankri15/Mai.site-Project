import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import WantedScreen from "../Screens/UserScreens/WantedScreen";

const Stack = createStackNavigator();

const WantedNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Wanted" component={WantedScreen} />
        </Stack.Navigator>
    );
};

export default WantedNavigator;
