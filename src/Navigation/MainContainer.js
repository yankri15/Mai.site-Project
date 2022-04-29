import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../AuthProvider/AuthProvider";
import RegisterScreen from "../Screens/AuthScreens/RegisterScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import HamburgerStack from "./HamburgerStack";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Stack = createStackNavigator();

const MainContainer = () => {
  const { currentUser } = useAuth();

  const getStatus = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    setStatus(docSnap.data().status);
  };

  const [status, setStatus] = getStatus();

  if (currentUser) {
    console.log(status);
    if (getStatus() == 1) {
      console.log("yay");
      return <HamburgerStack />;
    } else if (getStatus() == 0) {
      return <LoginScreen />;
    } else {
      return <LoginScreen />;
    }
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    );
  }
};

export default MainContainer;
