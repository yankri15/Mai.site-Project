import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useData } from "../../AuthProvider/UserDataProvider";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import BasicPostDisplay from "../../API/BasicPostDisplay";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

const ProjectScreen = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { projectPosts, getProjectPosts, deleteProject } = useData();
  const { Popover } = renderers;

  const project = route.params.project;
  const pid = route.params.pid;
  const [collabNames, setCollabNames] = useState([]);
  const [name, setName] = useState("");

  const getName = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setName(docSnap.data().name);
  };

  const getColabNames = () => {
    let collabs = [];
    for (let i = 0; i < project.collaborators.length; i++) {
      collabs.push(project.collaborators[i].name);
    }
    setCollabNames(collabs);
  };

  function isCollab() {
    for (let i = 0; i < project.collaborators.length; i++) {
      if (project.collaborators[i].id == currentUser.uid) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    getName(project.uid);
    getProjectPosts(pid);
    getColabNames();
    return () => {
      setCollabNames([]);
    };
  }, []);

  return (
    <View>
      <ScrollView>
        <Menu
          renderer={Popover}
          rendererProps={{ preferredPlacement: "right" }}
          style={{
            position: "absolute",
            right: "2%",
            top: "1%",
          }}
        >
          <MenuTrigger>
            {currentUser.uid === project.uid ? (
              <Entypo name="dots-three-horizontal" size={20}></Entypo>
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
                      onPress: () => {
                        deleteProject(pid);
                      },
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
        <Text style={globalStyles.forum_title_text}>{project.name}</Text>
        <View style={globalStyles.project_screen_details}>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>יוצר המיזם: </Text>
            <Text style={globalStyles.project_details}>{name}</Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>שותפים: </Text>
            <Text>{collabNames}</Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>ארגון: </Text>
            <Text style={globalStyles.project_details}>
              {project.organization}
            </Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>
              נושאי המיזם:{" "}
            </Text>
            <Text style={globalStyles.project_details}>{project.tags}</Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>
              תיאור המיזם:{" "}
            </Text>
            <Text style={globalStyles.project_details}>
              {project.description}
            </Text>
          </View>
        </View>
        <View style={globalStyles.profile_line}></View>
        {projectPosts.map((post, index) => {
          return (
            <View key={index}>
              <BasicPostDisplay
                post={post}
                navigation={navigation}
                key={index}
              ></BasicPostDisplay>
              <View
                style={[globalStyles.profile_line, { borderWidth: 5 }]}
              ></View>
            </View>
          );
        })}
      </ScrollView>
      {currentUser.uid === project.uid || isCollab() ? (
        <Pressable
          title="edit"
          onPress={() => {
            navigation.navigate("CreatePost", { project: project, pid: pid });
          }}
          style={globalStyles.plus_btn}
        >
          <Text style={globalStyles.plus_btn_text}>+</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ProjectScreen;
