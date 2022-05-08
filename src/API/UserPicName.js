import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global'

const UserPicName = ({ navigation }) => {
    return (
        <View style={globalStyles.user_pic_name}>
            <View style={globalStyles.user_pic}>
                <Image source={require('../../assets/default_profile_pic.jpg')} style={globalStyles.logo_image_area}></Image>
            </View>
            <Pressable
                title="to_profile"
                onPress={() => { navigation.navigate("Profile") }}
            >
                <Text style={globalStyles.user_name}>שם משתמש</Text>
            </Pressable> 
        </View>
    )
}

export default UserPicName