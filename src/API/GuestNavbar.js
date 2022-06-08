import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
//Screens
import GuestHomeScreen from "../Screens/GuestScreens/GuestHomeScreen";
import StaticsScreen from "../Screens/GuestScreens/StatisticsScreen";
//Screen names
const homeName = "Home";
const statisticsName = "Statistics";

const Tab = createBottomTabNavigator();

const GuestNavbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === statisticsName) {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#f0d24d",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen name={homeName} component={GuestHomeScreen} />
        <Tab.Screen name={statisticsName} component={StaticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default GuestNavbar;
