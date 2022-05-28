import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Navigators
import FeedNavigator from "../Navigation/FeedNavigator";
import WantedNavigator from "../Navigation/WantedNavigator";
import ForumNavigator from "../Navigation/ForumNavigator";

//Navigators names
const feedName = "פיד";
const forumName = "פורום";
const wantedName = "דרושים";

const Tab = createBottomTabNavigator();

const UserNavbar = () => {
  return (
    <Tab.Navigator
      initialRouteName={FeedNavigator}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === feedName) {
            iconName = focused ? "apps" : "apps-outline";
          } else if (rn === forumName) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (rn === wantedName) {
            iconName = focused ? "albums" : "albums-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f0d24d",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name={feedName} component={FeedNavigator} />
      <Tab.Screen name={forumName} component={ForumNavigator} />
      <Tab.Screen name={wantedName} component={WantedNavigator} />
    </Tab.Navigator>
  );
};

export default UserNavbar;
