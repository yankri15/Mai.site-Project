import { Entypo } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View, Modal, TouchableOpacity, Dimensions, Alert } from "react-native";
import { db } from "../../../../firebase";
import UserPicName from "../../../API/UserPicName";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useData } from "../../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../../styles/global";
const SubjectScreen = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { deleteThread, admin } = useData();
  const [thread, setThread] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [threadLocation, setThreadLocation] = useState("");

  const handleRefresh = () => {
    getThread()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const topicData = route.params.item;
  const getThread = async () => {
    setThread([]);
    const docRef = collection(
      db,
      "forum",
      topicData.topicId,
      topicData.topicName
    );
    setThreadLocation(docRef);
    const docSnap = await getDocs(docRef);

    docSnap.docs.forEach((element) => {
      setThread((prev) => [
        ...prev,
        {
          ...topicData,
          threadId: element.id,
          threadTitle: element.data().title,
          uid: element.data().uid,
        },
      ]);
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getThread()
        .then(() => {
          setRefreshing(false);
        })
        .catch(console.error);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {
        <FlatList
          style={globalStyles.subjects}
          data={thread}
          renderItem={({ item }) => (
            <View>
              <Pressable
                onPress={() => navigation.navigate("אשכול", { item })}
              >
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
                    style={[globalStyles.delete_modal_view, {
                      height: Dimensions.get("window").height * 0.3,
                    }]}
                  >
                    <Pressable
                      style={globalStyles.delete_modal_btn}
                      onPress={() => {
                        Alert.alert(
                          "האם אתה בטוח?",
                          "",
                          [
                            {
                              text: "מחק אותי",
                              onPress: () => {
                                deleteThread(threadLocation, item.threadId).then(
                                  () => {
                                    setDeleteModalVisible(!deleteModalVisible)
                                    handleRefresh();
                                  }
                                );
                              }
                            },
                          ],
                          { cancelable: true }
                        );
                      }}
                    >
                      <Text style={[globalStyles.delete_dots_text, globalStyles.delete_modal_btn_txt]}>מחק</Text>
                    </Pressable>
                  </View>
                </Modal>
                <Pressable
                  style={globalStyles.dots}
                  onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
                  {item.uid == currentUser.uid || admin == 1 ? (
                    <Entypo name="dots-three-horizontal" size={20}></Entypo>
                  ) : null}
                </Pressable>
                <UserPicName uid={item.uid} navigation={navigation} />
                <Text style={globalStyles.subjects_txt}>
                  {item.threadTitle}
                </Text>
                <View style={globalStyles.line}></View>
              </Pressable>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>
                  נראה שאין מה להציג כרגע..
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      <Pressable
        title="Create thread"
        style={globalStyles.open_sub_btn}
        onPress={() => {
          navigation.navigate("יצירת נושא חדש", {
            topicId: topicData.topicId,
            topicName: topicData.topicName,
          });
        }}
      >
        <Text style={globalStyles.open_sub_btn_text}>נושא חדש</Text>
      </Pressable>
    </View>
  );
};

export default SubjectScreen;
