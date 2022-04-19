import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import FeedScreen from "../Screens/UserScreens/FeedScreen";
import MapScreen from "../Screens/UserScreens/MapScreen";
import WantedScreen from "../Screens/UserScreens/WantedScreen";

//Screen names
const feedName = "Feed";
const mapName = "Map";
const wantedName = "Wanted";

const Tab = createBottomTabNavigator();

const UserNavbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={feedName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === feedName) {
              iconName = focused ? "apps" : "apps-outline";
            } else if (rn === mapName) {
              iconName = focused ? "map" : "map-outline";
            } else if (rn === wantedName) {
              iconName = focused ? "albums" : "albums-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#f0d24d",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen name={feedName} component={FeedScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={wantedName} component={WantedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserNavbar;
