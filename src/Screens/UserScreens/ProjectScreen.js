import { View, Text, Pressable, Vibration } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useData } from "../../AuthProvider/UserDataProvider";
import { useAuth } from "../../AuthProvider/AuthProvider";
import BasicPostDisplay from "../../API/BasicPostDisplay";

const ProjectScreen = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { projectPosts, getProjectPosts } = useData();
  const project = route.params.project;
  const pid = route.params.pid;
  const [name, setName] = useState("");

  const getName = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setName(docSnap.data().name);
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
    return;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={globalStyles.global}>
        <Text style={globalStyles.forum_title_text}>{project.name}</Text>
        <View style={globalStyles.project_screen_details}>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>יוצר המיזם: </Text>
            <Text style={globalStyles.project_details}>{name}</Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>שותפים: </Text>
            <Text style={globalStyles.project_details}>
              {/* {project.collaborators} */}
            </Text>
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
            <Text style={globalStyles.project_details}>
              {/* {project.tags} */}
            </Text>
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
            <BasicPostDisplay
              post={post}
              navigation={navigation}
              key={index}
            ></BasicPostDisplay>
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
