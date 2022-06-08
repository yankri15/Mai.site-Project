import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import UserNavbar from "../API/UserNavbar";
import MapNavigator from "./MapNavigator";
import SettingsNavigator from "./SettingsNavigator";
import CustomDrawer from "../API/CustomDrawer";
import ProfileNavigator from "./ProfileNavigator";
import { useData } from "../AuthProvider/UserDataProvider";
import AdminNavigator from "./AdminNavigator";

const Drawer = createDrawerNavigator();

const HamburgerStack = () => {
  const { admin } = useData();

  return (
    <Drawer.Navigator
      initialRouteName="בית"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#552583",
        drawerActiveTintColor: "#fff",
        drawerInactiveColor: "#333",
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="בית" component={UserNavbar} />
      <Drawer.Screen name="פרופיל" component={ProfileNavigator} />
      <Drawer.Screen name="מפה" component={MapNavigator} />
      <Drawer.Screen name="הגדרות" component={SettingsNavigator} />

      {admin == 1 ? <Drawer.Screen name="ניהול" component={AdminNavigator} /> : null}
    </Drawer.Navigator>
  );
};

export default HamburgerStack;
