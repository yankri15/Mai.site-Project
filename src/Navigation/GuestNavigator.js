import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ContactScreen from "../Screens/AuthScreens/ContactScreen";
import GuestHomeScreen from "../Screens/GuestScreens/GuestHomeScreen";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import StatisticsScreen from "../Screens/GuestScreens/StatisticsScreen";
import MapScreen from "../Screens/UserScreens/MapScreen";


const Stack = createStackNavigator();

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuestHome" component={GuestHomeScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      
    </Stack.Navigator>
  );
};

export default GuestNavigator;
