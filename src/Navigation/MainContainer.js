import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import GuestNavigator from "../Navigation/GuestNavigator";
import RegistrationDetailsScreen from "../Screens/AuthScreens/RegistrationDetailsScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import BlockedScreen from "../Screens/UserScreens/BlockedScreen";
import HamburgerStack from "./HamburgerStack";
import AuthContainer from "./AuthContainer"

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
    } else if (userStatus == -1) {
      return <BlockedScreen />;
    } else {
      return <LoadingScreen />;
    }
  } else {
    return <AuthContainer />;
  }
};

export default MainContainer;
