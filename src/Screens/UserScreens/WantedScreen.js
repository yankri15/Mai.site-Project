import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfilePic from "../../API/ProfilePic";


const WantedScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>WantedScreen</Text>
            <ProfilePic navigation={navigation} />
        </SafeAreaView>
    )
}

export default WantedScreen