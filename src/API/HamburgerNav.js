import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserNavbar from "./UserNavbar";
import ForumNavigator from "../Navigation/ForumNavigator";
import { useAuth } from "../AuthProvider/AuthProvider";
import { View } from "react-native-web";

const Drawer = createDrawerNavigator();

const HamburgerNav = () => {
  const { logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }

  function CustomDrawer(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={UserNavbar} />
      <Drawer.Screen name="Forum" component={ForumNavigator} />
    </Drawer.Navigator>
  );
};

export default HamburgerNav;
