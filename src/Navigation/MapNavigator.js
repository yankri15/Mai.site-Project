import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfilePic from "../API/ProfilePic";
//Screens
import FeedScreen from "../Screens/UserScreens/FeedScreen";
import MapScreen from "../Screens/UserScreens/MapScreen";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import ProjectScreen from "../Screens/UserScreens/ProjectScreen";
import SearchResultScreen from "../Screens/UserScreens/SearchResultScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import WantedScreen from "../Screens/UserScreens/WantedScreen";


const Stack = createStackNavigator();

const MapNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: () => <ProfilePic navigation={navigation} />,

        }}
      />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="פרופיל" component={ProfileScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Wanted" component={WantedScreen} />
      <Stack.Screen name="Project" component={ProjectScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
