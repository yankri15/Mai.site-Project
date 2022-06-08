import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import GuestNavigator from "../Navigation/GuestNavigator";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import LandingScreen from "../Screens/AuthScreens/LandingScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import RegistrationDetailsScreen from "../Screens/AuthScreens/RegistrationDetailsScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import HamburgerStack from "./HamburgerStack";

const Stack = createStackNavigator();

const MainContainer = () => {
  const { userStatus } = useData();
  const { currentUser } = useAuth();

  if (currentUser) {
    if (userStatus == 2) {
      return <HamburgerStack />;
    } else if (userStatus == 1) {
      return <GuestNavigator />;
    } else if (userStatus == 0) {
      return <RegistrationDetailsScreen />;
    } else {
      return <LoadingScreen />;
    }
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen
          name="RegistrationDetails"
          component={RegistrationDetailsScreen}
        />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="GuestHome" component={GuestNavigator} />
      </Stack.Navigator>
    );
  }
};

export default MainContainer;
