import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import ProfileEditScreen from "../Screens/UserScreens/ProfileEditScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="פרופיל" component={ProfileScreen} />
      <Stack.Screen name="עריכת פרופיל" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
