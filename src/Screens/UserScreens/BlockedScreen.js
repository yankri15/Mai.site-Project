import { View, Text, Pressable } from 'react-native'
import React ,{ useState }from 'react'
import { globalStyles } from '../../styles/global';
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../AuthProvider/AuthProvider";

const BlockedScreen = () => {
    const { logout } = useAuth();
    const [error, setError] = useState("");
    async function handleLogout() {
        try {
          setError("");
          await logout();
        } catch (err) {
          setError("Failed to logout");
          console.log(error + ":\n " + err);
        }
      }
    return (
        <View style={globalStyles.container_enter_screens}>
            <Pressable
        style={{ position: 'absolute', top: 10, left: 10, flexDirection: 'row', ...globalStyles.settingsBtn }}
        onPress={handleLogout}
      >
        <Text>{'התנתקות'}</Text>
        <Ionicons name="log-out-outline" size={20}></Ionicons>
      </Pressable>
            <Text style={globalStyles.landing_log_btn_text}>משתמש זה חסום</Text>
        </View>
    )
}

export default BlockedScreen