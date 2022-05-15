import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import EditProfileScreen from "../Screens/UserScreens/EditProfileScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
