import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfilePic from "../API/ProfilePic";
import CreatePost from "../Screens/UserScreens/CreatePost";
import CreateProjectScreen from "../Screens/UserScreens/CreateProjectScreen";
//Screens
import FeedScreen from "../Screens/UserScreens/FeedScreen";
import MapScreen from "../Screens/UserScreens/MapScreen";
import ProfileEditScreen from "../Screens/UserScreens/ProfileEditScreen";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import ProjectScreen from "../Screens/UserScreens/ProjectScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import WantedScreen from "../Screens/UserScreens/WantedScreen";


const UserStack = createStackNavigator();

const FeedNavigator = ({ navigation }) => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerTitle: () => <ProfilePic navigation={navigation} />,
        }}
      />
      <UserStack.Screen name="Map" component={MapScreen} />
      <UserStack.Screen name="פרופיל" component={ProfileScreen} />
      <UserStack.Screen name="עריכת פרופיל" component={ProfileEditScreen} />
      <UserStack.Screen name="Settings" component={SettingsScreen} />
      <UserStack.Screen name="Wanted" component={WantedScreen} />
      <UserStack.Screen name="CreatePost" component={CreatePost} />
      <UserStack.Screen name="Project" component={ProjectScreen} />
      <UserStack.Screen name="CreateProject" component={CreateProjectScreen} />
    </UserStack.Navigator>
  );
};

export default FeedNavigator;
