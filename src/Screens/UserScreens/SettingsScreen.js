import {
  View,
  Text,
  Pressable,
  Modal,
  Button,
  TextInput,
  SafeAreaView,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { globalStyles } from "../../styles/global";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmNewPassword, setNewConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //The function check if the password and the confirm password is even
  function confirm(newPassword, ConfirmNewPassword) {
    if (newPassword.length == 0 || ConfirmNewPassword.length == 0) {
      alert("שגיאה", "הכנס סיסמה");
      return false;
    } else if (newPassword !== ConfirmNewPassword) {
      alert("שגיאה", "סיסמה לא תואמת");
      return false;
    }
    return true;
  }

  //The function handle change password button
  async function handleChangePassword() {
    try {
      setError("");
      setLoading(true);

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currPassword
      );

      reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          if (confirm(newPassword, ConfirmNewPassword) === false) {
            throw new error();
          }
          //Change the password of the user

          updatePassword(currentUser, newPassword)
            .then(() => {
              console.log("changed password");
            })
            .catch((error) => {
              console.log("cannot change passworod");
            });
        })
        .catch((error) => {
          console.log("reauthenticate failed");
        });
    } catch (err) {}
    alert("סיסמה שונתה בהצלחה", "סיסמה שונתה בהצלחה");
    setShowModal(!showModal);
    setLoading(false);
  }

  async function handleDelete() {
    try {
      setError("");
      setLoading(true);
    
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currPassword
    );
    const result = await reauthenticateWithCredential(
      currentUser,
      credential
    )
  
    await deleteUser(currentUser).then(() => {
      console.log("user deleted")
    }).catch((error) => {
      console.log(error)
    });
  } catch (err) {}
    
 
    setLoading(false);
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>הגדרות</Text>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {}}
      >
        <View>
          <TextInput
            placeholder="הכנס סיסמה"
            value={currPassword}
            onChangeText={(text) => setCurrPassword(text)}
            secureTextEntry
          />
          <TextInput
            placeholder="סיסמה חדשה"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry
          />
          <TextInput
            placeholder="אמת סיסמה חדשה"
            value={ConfirmNewPassword}
            onChangeText={(text) => setNewConfirmPassword(text)}
            secureTextEntry
          />
          <Button title="שנה סיסמה" onPress={handleChangePassword} />
          <Button
            title="בטל"
            onPress={() => {
              setShowModal(!showModal);
            }}
          />
        </View>
      </Modal>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
          borderRadius: 10,
        }}
        title="change password"
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        <Text>שנה סיסמה</Text>
      </Pressable>


      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal2}
        onRequestClose={() => {}}
      >
        <View>
        <Text>הכנס פרטים מחדש</Text>
        <TextInput
            placeholder="מייל"
          />
          <TextInput
            placeholder="סיסמה"
            value={currPassword}
            onChangeText={(text) => setCurrPassword(text)}
            secureTextEntry
          />
          
          <Button title="מחק אותי" onPress={handleDelete} />
          <Button
            title="בטל"
            onPress={() => {
              setShowModal2(!showModal2);
            }}
          />
        </View>
      </Modal>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
          borderRadius: 10,
        }}
        title="delete"
        onPress={() => {
          Alert.alert(
            "האם אתה בטוח?",
            "",
            [
              {
                text: "מחק אותי",
                onPress: () =>  setShowModal2(!showModal2),
                
              },
            ],
            {
              cancelable: true})
        }}
      >
        <Text>מחיקת משתמש</Text>
      </Pressable>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
          borderRadius: 10,
        }}
        title="edit"
        onPress={() => {
          navigation.navigate("ProfileEdit");
        }}
      >
        <Text>עריכת פרופיל</Text>
      </Pressable>

      <Pressable
        title="contact"
        onPress={() => {
          navigation.navigate("Contact");
        }}
      >
        <Text>צור קשר</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsScreen;
