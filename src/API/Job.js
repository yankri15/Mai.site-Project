import React, { useState } from "react";
import {
  Text,
  Pressable,
  Modal,
  SafeAreaView,
  View,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/global";
import email from "react-native-email";
import { useAuth } from "../AuthProvider/AuthProvider";

const Job = ({ job, navigation }) => {
  const { currentUser } = useAuth();
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const [msgBody, setMsgBody] = useState("");
  const [msgTitle, setMsgTitle] = useState(job.data.description);

  async function handleMsg() {
    try {
      const to = currentUser.email;
      email(to, {
        subject: msgTitle,
        body: msgBody,
      }).catch(console.error);
    } catch (err) {
      console.error;
    }
    setContactModalVisible(!contactModalVisible);
  }

  return (
    <SafeAreaView>
      <Modal
        visible={contactModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setContactModalVisible(!contactModalVisible);
        }}
      >
        <View style={globalStyles.settingsContainer}>
          <Text style={globalStyles.delete_text}>צור קשר</Text>
          <TextInput
            style={globalStyles.textInput}
            placeholder="נושא"
            value={msgTitle}
            onChangeText={(text) => setMsgTitle(text)}
          />

          <TextInput
            style={globalStyles.msg_text}
            placeholder="ספר/י על עצמך מעט ואל תשכח/י להוסיף אימייל"
            value={msgBody}
            onChangeText={(text) => setMsgBody(text)}
          />
          <Pressable
            style={globalStyles.settingsBtn}
            title="send"
            onPress={handleMsg}
          >
            <Text style={globalStyles.settingsBtnText}>שלח!</Text>
          </Pressable>
        </View>
      </Modal>

      <View>
        <Text>דרושה/ה</Text>
        <Text>{job.data.description}</Text>
      </View>
      <Pressable onPress={() => setContactModalVisible(!contactModalVisible)}>
        <Text>השאר פרטים</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Job;
