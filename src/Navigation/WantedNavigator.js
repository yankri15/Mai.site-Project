import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfilePic from "../API/ProfilePic";
//Screens
import WantedScreen from "../Screens/UserScreens/WantedScreen";


const Stack = createStackNavigator();

const WantedNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wanted"
        component={WantedScreen}
        options={{
          headerTitle: () => <ProfilePic navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default WantedNavigator;
