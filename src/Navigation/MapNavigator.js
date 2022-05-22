import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import FeedScreen from "../Screens/UserScreens/FeedScreen";
import MapScreen from "../Screens/UserScreens/MapScreen";
import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
import SearchResultScreen from "../Screens/UserScreens/SearchResultScreen";
import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
import WantedScreen from "../Screens/UserScreens/WantedScreen";
import ProfilePic from "../API/ProfilePic";

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
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Wanted" component={WantedScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
