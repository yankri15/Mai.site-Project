import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const LandingScreen = ({ navigation }) => {
    return (
        <View style={globalStyles.container_enter_screens}>
            <View>
                <View>
                    <Text style={globalStyles.landing_title_text}>מנהיגות</Text>
                </View>
                <View>
                    <Text style={[globalStyles.landing_title_text, { paddingRight: '11%' }]}>אקטיביזם</Text>
                </View>
                <View>
                    <Text style={[globalStyles.landing_title_text, { paddingRight: '37%' }]}>יזמות</Text>
                </View>
            </View>
            <View style={globalStyles.landing_imageArea}>
                <Ionicons name='megaphone-outline' size={150} ></Ionicons>
            </View>
            <Pressable style={globalStyles.landing_log_button} title="Login" onPress={() => { navigation.navigate("Login"); }}>
                <Text style={globalStyles.landing_log_btn_text}>יאללה לעבודה</Text>
            </Pressable>
            <Pressable style={globalStyles.landing_reg_button} title="Register" onPress={() => { navigation.navigate("Register"); }}>
                <Text style={globalStyles.landing_reg_btn_text}>אופסי.. עוד לא נרשמתי</Text>
            </Pressable>
            <Pressable  title="Guest" onPress={() => { navigation.navigate("GuestHome"); }}>
                <Text style={globalStyles.blue_btn}>המשך כאורח</Text>
            </Pressable>
        </View>
    )
}

export default LandingScreen