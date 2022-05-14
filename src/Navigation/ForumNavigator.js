import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopicsScreen from "../Screens/UserScreens/ForumScreens/TopicsScreen";
import SubjectScreen from "../Screens/UserScreens/ForumScreens/SubjectScreen";
import ThreadScreen from "../Screens/UserScreens/ForumScreens/ThreadScreen";
import CreateThread from "../Screens/UserScreens/ForumScreens/CreateThread";

const Stack = createStackNavigator();

const ForumNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Forum" component={TopicsScreen} />
      <Stack.Screen name="Subject" component={SubjectScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="CreateThread" component={CreateThread} />
    </Stack.Navigator>
  );
};

export default ForumNavigator;
