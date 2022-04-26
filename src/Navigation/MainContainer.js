import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerStack from "./HamburgerStack";

const Stack = createStackNavigator();

const MainContainer = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <HamburgerStack />;
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }
};

export default MainContainer;
