import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ContactScreen from "../Screens/AuthScreens/ContactScreen";
import ProfileEditScreen from "../Screens/UserScreens/ProfileEditScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
