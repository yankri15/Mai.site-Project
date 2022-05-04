import React, { useState } from "react";
import { Text, TextInput, View, Pressable, Alert, Image } from "react-native";
import { globalStyles } from "../../styles/global";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";

const RegisterScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const { setUserToDB } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  //function deal with password, need to alert the user
  function confirm(password, ConfirmPassword) {
    if (password.length == 0 || ConfirmPassword.length == 0) {
      Alert.alert("הכנס סיסמא");
      return false;
    }

    else if (password !== ConfirmPassword) {
      Alert.alert("סיסמא לא תואמת");
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      if(confirm(password, ConfirmPassword) === false){

        throw new error;
      }
      const uid = await signup(email, password);
      setUserToDB(uid, email);
      navigation.navigate("FillDetails");
    } catch (err) {
      setError("Failed to create an account");
      console.log(error + ":\n " + err);
      switch (err.code) {
        case "auth/invalid-email":
          Alert.alert("Email pattern is wrong");
          break;
        case "auth/weak-password":
          Alert.alert("password too weak");
          break;
      }
    }
    setLoading(false);
  }
  return (
    <AuthProvider>
      <View style={globalStyles.container_enter_screens}>
        <View style={globalStyles.logo}>
          <Image
            source={require("../../../assets/app_icon.png")}
            style={globalStyles.logo_image_area}
            resizeMode="center"
          ></Image>
        </View>
        <TextInput
          style={globalStyles.textInput}
          placeholder="מייל"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={globalStyles.textInput}
          placeholder="סיסמה"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={globalStyles.textInput}
          placeholder="אימות סיסמה"
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <Pressable
          style={globalStyles.enter_button}
          title="Register"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={globalStyles.enter_btn_text}>תרשום אותי</Text>
        </Pressable>
        <Text style={globalStyles.already_have}>
          כבר יש משתמש?{" "}
          <Text
            style={globalStyles.blue_btn}
            onPress={() => {
              navigation.push("Login");
            }}
          >
            כניסה
          </Text>
        </Text>
      </View>
    </AuthProvider>
  );
};

export default RegisterScreen;
