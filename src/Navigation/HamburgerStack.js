import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";

import UserNavbar from "../API/UserNavbar";
import ForumNavigator from "./ForumNavigator";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import CustomDrawer from "../API/CustomDrawer";
import ProfileNavigator from "./ProfileNavigator";
import { useData } from "../AuthProvider/UserDataProvider";
import AdminNavigator from "./AdminNavigator";

const Drawer = createDrawerNavigator();

const HamburgerStack = () => {
  const { admin, checkAdmin } = useData();

  useEffect(() => {
    checkAdmin();
  }, [])

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#552583",
        drawerActiveTintColor: "#fff",
        drawerInactiveColor: "#333",
        gestureEnabled: false,
      }}
    >
      <Drawer.Screen name="Home" component={UserNavbar} />
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
      <Drawer.Screen name="Forum" component={ForumNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {admin ? (
        <Drawer.Screen name="Admin" component={AdminNavigator} />
      ) : (null)}
    </Drawer.Navigator>
  );
};

export default HamburgerStack;
