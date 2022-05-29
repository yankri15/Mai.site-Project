import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'

const AdminSelectScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ ...globalStyles.global, ...globalStyles.settingsContainer }}>
            <Pressable
                onPress={() => { navigation.navigate("Approv") }}
                style={globalStyles.settingsBtn}
            >
                <Text
                    style={globalStyles.settingsBtnText}
                >אשר משתמשים ממתינים</Text>
            </Pressable>
            {/* <Pressable
                onPress={() => { navigation.navigate("Nominate") }}
            >
                <Text>הפוך משתמש למנהל</Text>
            </Pressable> */}
        </SafeAreaView>
    )
}

export default AdminSelectScreen