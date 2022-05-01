import React, { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import LandingScreen from "../Screens/AuthScreens/LandingScreen";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerStack from "./HamburgerStack";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import ApprovalWatingScreen from "../Screens/UserScreens/ApprovalWatingScreen";
import BlockedScreen from "../Screens/UserScreens/BlockedScreen";
import fillDetailsScreen from "../Screens/AuthScreens/fillDetailsScreen";

const Stack = createStackNavigator();

const MainContainer = () => {
  const [userStatus, setUserStatus] = useState(0);
  const { currentUser } = useAuth();

  const getStatus = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log('User status: ' + docSnap.data().status);
    setUserStatus(docSnap.data().status);
  };


  // if (currentUser) {
  //   getStatus();
  //   if (userStatus == 1) {
      // return <HamburgerStack />;
    // } else if (userStatus == 0) {
    //   return <ApprovalWatingScreen />;
    // } else {
    //   return <BlockedScreen />;
    // }
  // } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="FillDetails" component={fillDetailsScreen} />
      </Stack.Navigator>
    );
  // }
};

export default MainContainer;
