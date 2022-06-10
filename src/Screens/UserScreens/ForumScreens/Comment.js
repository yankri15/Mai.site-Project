import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, Text, View, Modal, TouchableOpacity, Dimensions, Alert } from "react-native";
import UserPicName from "../../../API/UserPicName";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useData } from "../../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../../styles/global";

const Comment = ({
  navigation,
  commentId,
  commentLocation,
  commentData,
  first,
}) => {
  const { deleteComment, admin, refreshComments } = useData();
  const { currentUser } = useAuth();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const commentStyle = first
    ? globalStyles.first_comment
    : globalStyles.comment;

  return (
    <View>
      <View style={commentStyle}>
        <UserPicName
          uid={commentData.uid}
          navigation={navigation}
          posted={moment(
            new Date(commentData.creation.seconds * 1000)
          ).fromNow()}
        />

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
            style={{
              height: Dimensions.get("window").height * 0.3,
              marginTop: "auto",
              backgroundColor: "white",
            }}
          >
            <Pressable
              onPress={() => {
                Alert.alert(
                  "האם אתה בטוח?",
                  "",
                  [
                    {
                      text: "מחק אותי",
                      onPress: () => {
                        deleteComment(commentLocation, commentId).then(() => { refreshComments(); setDeleteModalVisible(!deleteModalVisible) })
                      }
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={globalStyles.delete_dots_text}>מחק</Text>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          style={globalStyles.dots}
          onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
          {(commentData.uid == currentUser.uid || admin == 1) && !first ? (
            <Entypo name="dots-three-horizontal" size={20}></Entypo>
          ) : null}
        </Pressable>
        <Text style={globalStyles.comment_data}>{commentData.comment}</Text>
      </View>
    </View>
  );
};

export default Comment;
