import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'

const AdminSelectScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ ...globalStyles.container_enter_screens, ...globalStyles.global }}>
                <Text style={globalStyles.admin_title}>{'ניהול משתמשים'}</Text>
                <Pressable
                    onPress={() => { navigation.navigate("Approv") }}
                    style={globalStyles.admin_btn}
                >
                    <Text style={globalStyles.admin_btn_txt}>אשר משתמשים ממתינים</Text>
                </Pressable>
                <Pressable
                    onPress={() => { navigation.navigate("Nominate") }}
                    style={globalStyles.admin_btn}
                >
                    <Text style={globalStyles.admin_btn_txt}>הפוך משתמש למנהל</Text>
                </Pressable>
        </SafeAreaView>
    )
}

export default AdminSelectScreen
