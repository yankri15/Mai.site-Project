import React, { useState } from "react";
import { StyleSheet, Text,TextInput, Button, SafeAreaView} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";



const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState(""); 
  return (      
<SafeAreaView style={styles.container}>
            <Text style={styles.text}>forgot password?</Text>
            <Ionicons name="ios-mail" size={24} color="#52575D"></Ionicons>
            <TextInput
              keyboradType = 'email-address'
              placeholder="Email"
              textContentType = 'emailAdrdess'
              value={email}
              onChangeText={(text) => setEmail(text)}

      />
      <Button
        title="Send Email"
        //onClick = {forgotPassword(text)}
      />
      </SafeAreaView>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
    },
    
  });