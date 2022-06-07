import React, { useState } from "react";
import { Text, Pressable, Modal, View, TextInput, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import email from "react-native-email";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import { Entypo } from "@expo/vector-icons";

const Job = ({ job, profileScreen }) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [msgBody, setMsgBody] = useState("");
  const [jobTitle, setJobTitle] = useState(job.data.jobTitle);
  const [uidEmail, setUidEmail] = useState("");
  const { Popover } = renderers;
  const { currentUser } = useAuth();
  const { deleteJob, getJobs, getMyJobs } = useData();

  const getUidEmail = async (uid) => {
    const docRef = doc(db, "users", uid);
    await getDoc(docRef).then((docSnap) => {
      setUidEmail(docSnap.data().email);
    });
  };

  async function handleMsg() {
    try {
      email(uidEmail, {
        subject: jobTitle,
        body: msgBody,
      }).catch(console.error);
    } catch (err) {
      console.log(err);
    }
    setContactModalVisible(!contactModalVisible);
  }

  const showAlert = () =>
    Alert.alert(
      "פרטי התפקיד",
      "שם הפרויקט: " +
        job.data.projectName +
        "\n" +
        "שם התפקיד: " +
        jobTitle +
        "\n" +
        "תאור התפקיד: " +
        job.data.jobDescription +
        "\n",
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
            placeholder="ספר/י על עצמך מעט"
            value={msgBody}
            onChangeText={(text) => setMsgBody(text)}
          />
          <Pressable
            style={globalStyles.settingsBtn}
            title="send"
            onPress={() => {
              handleMsg();
            }}
          >
            <Text style={globalStyles.settingsBtnText}>שלח!</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={globalStyles.wanted_list_item}>
        <Menu
          renderer={Popover}
          rendererProps={{ preferredPlacement: "right" }}
          style={globalStyles.dots}
        >
          <MenuTrigger>
            {job.data.uid == currentUser.uid ? (
              <Entypo name="dots-three-horizontal" size={22}></Entypo>
            ) : null}
          </MenuTrigger>
          <MenuOptions style={globalStyles.delete_dots_btn}>
            <Pressable
              onPress={() => {
                Alert.alert(
                  "האם אתה בטוח?",
                  "",
                  [
                    {
                      text: "מחק אותי",
                      onPress: () =>
                        deleteJob(job.id).then(() => {
                          profileScreen ? getMyJobs(job.data.uid) : getJobs();
                        }),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={globalStyles.delete_dots_text}>מחק</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
        <Text style={globalStyles.wanted_text}>דרוש/ה</Text>
        <Text style={globalStyles.wanted_text}>{job.data.jobTitle}</Text>
        <View style={globalStyles.wanted_btns}>
          <Pressable
            style={globalStyles.wanted_text_title}
            onPress={() => {
              showAlert();
            }}
          >
            <Text style={globalStyles.wanted_details_text_info}>
              לפרטים נוספים
            </Text>
          </Pressable>
          <Pressable
            style={globalStyles.wanted_text_title}
            onPress={() => {
              setContactModalVisible(!contactModalVisible);
              getUidEmail(job.data.uid);
            }}
          >
            <Text style={globalStyles.wanted_details_text}>השאירו פרטים</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Job;
