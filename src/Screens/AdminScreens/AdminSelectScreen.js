import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'

const AdminSelectScreen = ({ navigation }) => {

    const style = StyleSheet.create({
        pressable: {
            padding: 10,
            borderBottomWidth: 1,
            borderColor: 'gray',
        },
        text: {
            color: "#000000",
            fontSize: 20,
        },
    })

    return (
        <ScrollView
            style={{
                ...globalStyles.global,
                flex: 1,
                backgroundColor: "#ffffff",
            }}>
            <View
                style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: "#000000",
                        fontSize: 40,
                        fontWeight: "bold",
                    }}
                >{'ניהול'}</Text>
            </View>
            <Pressable
                onPress={() => { navigation.navigate("Approv") }}
                style={style.pressable}
            >
                <Text
                    style={style.text}
                >אשר משתמשים ממתינים</Text>
            </Pressable>
            <Pressable
                onPress={() => { navigation.navigate("Nominate") }}
                style={style.pressable}
            >
                <Text
                    style={style.text}
                >הפוך משתמש למנהל</Text>
            </Pressable>
        </ScrollView>
    )
}

export default AdminSelectScreen