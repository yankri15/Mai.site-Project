import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import FeedScreen from '../Screens/UserScreens/FeedScreen'
// import MapScreen from "../Screens/UserScreens/MapScreen";
// import ProfileScreen from "../Screens/UserScreens/ProfileScreen";
// import SearchResultScreen from "../Screens/UserScreens/SearchResultScreen";
// import SettingsScreen from "../Screens/UserScreens/SettingsScreen";
// import WantedScreen from "../Screens/UserScreens/WantedScreen";

const UserStack = createStackNavigator();

const FeedNavigator = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="Feed" component={FeedScreen} />
            {/* <UserStack.Screen name="Map" component={MapScreen} />
            <UserStack.Screen name="Profile" component={ProfileScreen} />
            <UserStack.Screen name="SearchResult" component={SearchResultScreen} />
            <UserStack.Screen name="Settings" component={SettingsScreen} />
            <UserStack.Screen name="Wanted" component={WantedScreen} /> */}
        </UserStack.Navigator>
    );
};

export default FeedNavigator;
