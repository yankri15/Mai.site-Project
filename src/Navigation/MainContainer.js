import React, { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import LandingScreen from "../Screens/AuthScreens/LandingScreen";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerStack from "./HamburgerStack";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import ApprovalWatingScreen from "../Screens/UserScreens/ApprovalWatingScreen";
import BlockedScreen from "../Screens/UserScreens/BlockedScreen";
import FillDetailsScreen from "../Screens/AuthScreens/FillDetailsScreen";
import { useData } from "../AuthProvider/UserDataProvider";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";

const Stack = createStackNavigator();

const MainContainer = () => {
  const { userStatus } = useData();
  const { currentUser } = useAuth();

  if (currentUser) {
    console.log(userStatus);
    if (userStatus == 2) {
      return <HamburgerStack />;
    } else if (userStatus == 1) {
      return <ApprovalWatingScreen />;
    } else if (userStatus == 0) {
      return <FillDetailsScreen />;
    } else if (userStatus == -1) {
      return <BlockedScreen />;
    } else {
      return <LoadingScreen />;
    }
    // return <ProfileScreen />
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="FillDetails" component={FillDetailsScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    );
  }
};

export default MainContainer;
