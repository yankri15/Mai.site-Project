import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import UserNavbar from "../API/UserNavbar";
import ForumNavigator from "./ForumNavigator";
import SettingsNavigator from "./SettingsNavigator";
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
      <Drawer.Screen name="בית" component={UserNavbar} />
      <Drawer.Screen name="פרופיל" component={ProfileNavigator} />
      <Drawer.Screen name="פורום" component={ForumNavigator} />
      <Drawer.Screen name="הגדרות" component={SettingsNavigator} />

      {admin ? (
        <Drawer.Screen name="Admin" component={AdminNavigator} />
      ) : (null)}
    </Drawer.Navigator>
  );
};

export default HamburgerStack;
