import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import UserNavbar from "../API/UserNavbar";
import ForumNavigator from "./ForumNavigator";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import CustomDrawer from "../API/CustomDrawer";
import ProfileNavigator from "./ProfileNavigator";

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
        gestureEnabled: false,
      }}
    >
      <Drawer.Screen name="בית" component={UserNavbar} />
      <Drawer.Screen name="פרופיל" component={ProfileNavigator} />
      <Drawer.Screen name="פורום" component={ForumNavigator} />
      <Drawer.Screen name="הגדרות" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default HamburgerStack;
