import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from 'react/cjs/react.production.min';

const [userToken, setUserToken] = useState(null);
const Stack = createNativeStackNavigator();

const MainContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Contact" component={Contact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer