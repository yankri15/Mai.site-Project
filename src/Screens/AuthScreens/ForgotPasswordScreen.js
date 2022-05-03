import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable, Alert, Image } from "react-native";
import { globalStyles } from '../../styles/global';
import { useAuth } from "../../AuthProvider/AuthProvider";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleForgot() {
    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      Alert.alert('Check your account ' + email + ' inbox')
      navigation.navigate('Login');
    } catch (err) {
      setError("Failed to reaet password");
      console.log(error + ":\n " + err);
      console.log(err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert('Email pattern is wrong')
          break;
        case 'auth/user-not-found':
          Alert.alert('User not exist')
          break;
      }
    }
    setLoading(false);
  }
  return (
    <View style={globalStyles.container_enter_screens}>
      <View style={globalStyles.logo}>
        <Image source={require('../../../assets/app_icon.png')} style={globalStyles.logo_image_area} resizeMode="center"></Image>
      </View>
      <Text style={globalStyles.forgot_title}>שכחת סיסמה?</Text>
      <TextInput style={globalStyles.textInput}
        placeholder="מייל"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Pressable style={globalStyles.enter_button} title="Reset Password" onPress={handleForgot}>
        <Text style={globalStyles.enter_btn_text}>אפס סיסמה</Text>
      </Pressable>
      <Text style={globalStyles.blue_btn} onPress={() => { navigation.push("Login"); }}>אהה נזכרתי!</Text>
    </View>
  );
};

export default ForgotPasswordScreen;