import React, { useState } from "react";
import { Text, Pressable, Modal, SafeAreaView, View, TextInput, Alert, Vibration } from "react-native";
import { globalStyles } from "../styles/global";
import email from "react-native-email";
import { useAuth } from "../AuthProvider/AuthProvider";

const Job = ({ job, navigation }) => {
  const { currentUser } = useAuth();
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [jobModalVisible, setJobModalVisible] = useState(false);

  const [msgBody, setMsgBody] = useState("");
  const [jobTitle, setJobTitle] = useState(job.data.jobTitle);
  const [jobDescription] = useState(job.data.jobDescription);
  const [projectName] = useState(job.data.projectName);

  async function handleMsg() {
    try {
      const to = currentUser.email;
      email(to, {
        subject: jobTitle,
        body: msgBody,
      }).catch(console.error);
    } catch (err) {
      console.error;
    }
    setContactModalVisible(!contactModalVisible);
  }

  // const CustomAlert = (props) => {
  //   return (
  //     <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={props.jobModalVisible}
  //         onRequestClose={() => {
  //           props.setJobModalVisible(false);
  //         }}
  //       >
  //         <Pressable onPress={() => props.setJobModalVisible(false)} />
  //         <View>

  //         </View>
  //       </Modal>
  //   )
  // }


  const showAlert = () =>
    Alert.alert(
      "פרטי התפקיד",
      "שם הפרויקט: " + projectName + "\n" + "שם התפקיד: " + jobTitle + "\n" + "תאור התפקיד: " + jobDescription + "\n",
      [
        {
          text: "Ok",
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View>
      <Modal
        visible={contactModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setContactModalVisible(!contactModalVisible);
        }}
      >
        <View style={globalStyles.settingsContainer}>
          <Text style={globalStyles.wanted_header}>צור קשר</Text>
          <TextInput
            style={globalStyles.textInput}
            placeholder="נושא"
            value={jobTitle}
            onChangeText={(text) => setJobTitle(text)}
          />
          <TextInput
            style={globalStyles.msg_text}
            placeholder="ספר/י על עצמך מעט ואל תשכח/י להוסיף אימייל שנוכל לחזור אליך במידת הצורך"
            value={msgBody}
            onChangeText={(text) => setMsgBody(text)}
          />
          <Pressable
            style={globalStyles.settingsBtn}
            title="send"
            onPress={() => {
              handleMsg();
              Vibration.vibrate(15)
            }}
          >
            <Text style={globalStyles.settingsBtnText}>שלח!</Text>
          </Pressable>
        </View>
      </Modal>

      {/* <Pressable onPress={() => setJobModalVisible(!jobModalVisible)}>
        <View>
          <Text>דרוש/ה</Text>
          <Text>{job.data.jobTitle}</Text>
        </View>
      </Pressable> */}
      <View style={globalStyles.wanted_list_item}>
        <Text style={globalStyles.wanted_text}>דרוש/ה</Text>
        <Text style={globalStyles.wanted_text}>{job.data.jobTitle}</Text>
        <View style={globalStyles.wanted_btns}>
          <Pressable
            style={globalStyles.wanted_text_title}
            onPress={() => {
              showAlert();
              Vibration.vibrate(15)
            }}>
            <Text style={globalStyles.wanted_details_text_info}>לפרטים נוספים</Text>
          </Pressable>
          <Pressable
            style={globalStyles.wanted_text_title}
            onPress={() => {
              setContactModalVisible(!contactModalVisible);
              Vibration.vibrate(15)
            }}>
            <Text style={globalStyles.wanted_details_text}>השאירו פרטים</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Job;
