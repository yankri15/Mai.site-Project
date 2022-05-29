import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  SafeAreaView,
  Alert,
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
  const [showModalCP, setShowModalCP] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
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
    setShowModalCP(!showModalCP);
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
      );

      // delete user from firebase
      

      //delete user from firebase authentication
      await deleteUser(currentUser)
        .then(() => {
          console.log("user deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}

    setLoading(false);
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={globalStyles.settingsContainer}>
      {/* MOdal for change password */}
      <Modal
        style={globalStyles.modal}
        animationType={"slide"}
        transparent={false}
        visible={showModalCP}
        onRequestClose={() => {
          setShowModalCP(!showModalCP);
        }}
      >
        <View style={globalStyles.modalView}>
          <TextInput
            style={globalStyles.textInput}
            placeholder="הכנס סיסמה"
            value={currPassword}
            onChangeText={(text) => setCurrPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="סיסמה חדשה"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={globalStyles.textInput}
            placeholder="אמת סיסמה חדשה"
            value={ConfirmNewPassword}
            onChangeText={(text) => setNewConfirmPassword(text)}
            secureTextEntry
          />
          <Pressable
            style={globalStyles.modal_btn}
            title="שנה סיסמה"
            onPress={handleChangePassword}
          >
            <Text style={globalStyles.settingsBtnText}>שנה סיסמה</Text>
          </Pressable>
          <Pressable
            style={globalStyles.modal_btn}
            title="בטל"
            onPress={() => {
              setShowModalCP(!showModalCP);
            }}
          >
            <Text style={globalStyles.settingsBtnText}>בטל</Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable
        style={globalStyles.settingsBtn}
        title="change password"
        onPress={() => {
          setShowModalCP(!showModalCP);
        }}
      >
        <Text style={globalStyles.settingsBtnText}>שנה סיסמה</Text>
      </Pressable>

      {/* Modal for delete user */}
      <Modal
        style={globalStyles.modal}
        animationType={"slide"}
        transparent={false}
        visible={showModalDel}
        onRequestClose={() => {
          setShowModalDel(!showModalDel);
        }}
      >
        <View style={globalStyles.modalView}>
          <Text style={globalStyles.delete_text}>הכנס פרטים מחדש</Text>
          <TextInput style={globalStyles.textInput} placeholder="מייל" />
          <TextInput
            style={globalStyles.textInput}
            placeholder="סיסמה"
            value={currPassword}
            onChangeText={(text) => setCurrPassword(text)}
            secureTextEntry
          />
          <Pressable
            style={globalStyles.settingsBtn}
            title="delete me"
            onPress={handleDelete}
          >
            <Text style={globalStyles.settingsBtnText}>מחק אותי</Text>
          </Pressable>
          <Pressable
            style={globalStyles.settingsBtn}
            title="abort"
            onPress={() => {
              setShowModalDel(!showModalDel);
            }}
          >
            <Text style={globalStyles.settingsBtnText}>לא, זאת טעות</Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable
        style={globalStyles.settingsBtn}
        title="delete"
        onPress={() => {
          Alert.alert(
            "האם אתה בטוח?",
            "",
            [
              {
                text: "מחק אותי",
                onPress: () => setShowModalDel(!showModalDel),
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={globalStyles.settingsBtnText}>מחיקת משתמש</Text>
      </Pressable>

      <Pressable
        style={globalStyles.settingsBtn}
        title="edit"
        onPress={() => {
          navigation.navigate("ProfileEdit");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>עריכת פרופיל</Text>
      </Pressable>

      <Pressable
        style={globalStyles.settingsBtn}
        title="contact"
        onPress={() => {
          navigation.navigate("Contact");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>צור קשר</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsScreen;
