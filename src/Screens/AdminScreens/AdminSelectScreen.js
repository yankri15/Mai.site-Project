import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'

const AdminSelectScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={globalStyles.global}>
            <Text>AdminSelectScreen</Text>
            <Pressable
                onPress={() => { navigation.navigate("Approv") }}
            >
                <Text>אשר משתמשים ממתינים</Text>
            </Pressable>
            <Pressable
                onPress={() => { navigation.navigate("Nominate") }}
            >
                <Text>הפוך משתמש למנהל</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default AdminSelectScreen