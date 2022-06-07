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
import {useData} from "../../AuthProvider/UserDataProvider"
import { globalStyles } from "../../styles/global";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const {deleteSelf}  = useData();
  const [showModalCP, setShowModalCP] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmNewPassword, setNewConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //The function check if the password and the confirm password is even
  function confirm() {
    if (newPassword.length == 0 || ConfirmNewPassword.length == 0 || currPassword.length == 0) {
      Alert.alert("שגיאה", "חובה למלא את כל השדות");
      return;
    } else if (newPassword !== ConfirmNewPassword) {
      Alert.alert("שגיאה", "סיסמה לא תואמת");
      return;
    }
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if(!strongPassword.test(newPassword)) {
      Alert.alert("אופסי..", "סיסמה חלשה מידי. נא להשתמש בסיסמה בעלת 8 תווים לפחות בשימוש של אותיות קטנות, אותיות גדולות, מספרים וסימן מיוחד")
      return;
    }
    handleChangePassword();
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
          updatePassword(currentUser, newPassword)
            .then(() => {
              console.log("changed password");
              Alert.alert("סיסמתך שונתה בהצלחה!");
              setCurrPassword("");
              setNewPassword("");
              setNewConfirmPassword("");
              setShowModalCP(!showModalCP);
              setLoading(false);
            })
            .catch((error) => {
              console.log("cannot change passworod");
            });
        })
        .catch((error) => {
          console.log("reauthenticate failed");
          console.log(error);
        });
    } catch (err) {
      setError("Failed to create an account");
    }
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

      deleteSelf();


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
            placeholder="סיסמה נוכחית"
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
            onPress={confirm}
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
        <Text style={globalStyles.settingsBtnText}>שינוי סיסמה</Text>
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
          navigation.navigate("עריכת פרופיל");
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
