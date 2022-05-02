import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfilePic from "../../API/ProfilePic";


const MapScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>MapScreen</Text>
            <ProfilePic navigation={navigation} />
        </SafeAreaView>
    )
}

export default MapScreen