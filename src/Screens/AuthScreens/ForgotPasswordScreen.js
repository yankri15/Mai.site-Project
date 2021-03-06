import React, { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { globalStyles } from '../../styles/global';

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
      Alert.alert("איפוס סיסמה נשלח אליך ברגעים אלה", "בדוק את המייל: "+ email)
      navigation.navigate('Login');
    } catch (err) {
      setError("Failed to reaet password");
      console.log(error + ":\n " + err);
      console.log(err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert("אופסי..", "המייל שהוכנס לא תקין")
          break;
        case 'auth/user-not-found':
          Alert.alert("אופסי..", "משתמש זה לא קיים")
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