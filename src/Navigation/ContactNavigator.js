import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ContactScreen from "../Screens/AuthScreens/ContactScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
