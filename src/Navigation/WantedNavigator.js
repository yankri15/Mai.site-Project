import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import WantedScreen from "../Screens/UserScreens/WantedScreen";
import ProfilePic from "../API/ProfilePic";

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
