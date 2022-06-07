import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopicsScreen from "../Screens/UserScreens/ForumScreens/TopicsScreen";
import SubjectScreen from "../Screens/UserScreens/ForumScreens/SubjectScreen";
import ThreadScreen from "../Screens/UserScreens/ForumScreens/ThreadScreen";
import CreateThread from "../Screens/UserScreens/ForumScreens/CreateThread";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import ProjectScreen from "../Screens/UserScreens/ProjectScreen";
import ProfilePic from "../API/ProfilePic";
const Stack = createStackNavigator();

const ForumNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Forum"
        component={TopicsScreen}
        options={{
          headerTitle: () => <ProfilePic navigation={navigation} />,
        }} />
      <Stack.Screen name="פורום" component={SubjectScreen} />
      <Stack.Screen name="אשכול" component={ThreadScreen} />
      <Stack.Screen name="יצירת נושא חדש" component={CreateThread} />
      <Stack.Screen name="פרופיל" component={ProfileScreen} />
      <Stack.Screen name="Project" component={ProjectScreen} />
    </Stack.Navigator>
  );
};

export default ForumNavigator;
