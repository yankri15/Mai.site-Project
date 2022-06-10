import { Entypo } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import email from "react-native-email";
import { db } from "../../firebase";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import { globalStyles } from "../styles/global";

const Job = ({ job, profileScreen }) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [msgBody, setMsgBody] = useState("");
  const [jobTitle, setJobTitle] = useState(job.data.jobTitle);
  const [uidEmail, setUidEmail] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { currentUser } = useAuth();
  const { deleteJob, getJobs, getMyJobs, admin } = useData();

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
          text: "סגור",
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
        <Modal
          visible={deleteModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setDeleteModalVisible(!deleteModalVisible)}
        >
          <TouchableOpacity
            style={{ height: Dimensions.get("window").height * 0.7, backgroundColor: "gray", opacity: 0.3 }}
            onPress={() => setDeleteModalVisible(!deleteModalVisible)}
          ></TouchableOpacity>
          <View
            style={[globalStyles.delete_modal_view,{
              height: Dimensions.get("window").height * 0.3,
            }]}
          >
            <Pressable
            style = {globalStyles.delete_modal_btn}
              onPress={() => {
                Alert.alert(
                  "האם אתה בטוח?",
                  "",
                  [
                    {
                      text: "מחק אותי",
                      onPress: () => {
                        deleteJob(job.id).then(() => {
                          profileScreen ? getMyJobs(job.data.uid) : getJobs();
                          setDeleteModalVisible(!deleteModalVisible)
                        })
                      }
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={[globalStyles.delete_dots_text,globalStyles.delete_modal_btn_txt]}>מחק</Text>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          style={globalStyles.dots}
          onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
          {job.data.uid == currentUser.uid || admin == 1 ? (
            <Entypo name="dots-three-horizontal" size={22}></Entypo>
          ) : null}
        </Pressable>
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
