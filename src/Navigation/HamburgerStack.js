import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import UserNavbar from "../API/UserNavbar";
import ForumNavigator from "./ForumNavigator";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import CustomDrawer from "../API/CustomDrawer";

const Drawer = createDrawerNavigator();

const HamburgerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#552583",
        drawerActiveTintColor: "#fff",
        drawerInactiveColor: "#333",
      }}
    >
      <Drawer.Screen name="Home" component={UserNavbar} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Forum" component={ForumNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default HamburgerStack;
