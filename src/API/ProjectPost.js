import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { db } from "../../firebase";
import { globalStyles } from "../styles/global";

const ProjectPost = ({ pid, navigation }) => {
  const [project, setProject] = useState([]);

  const getProject = async (pid) => {
    const docRef = doc(db, "projects", pid);
    const docSnap = await getDoc(docRef);
    setProject(docSnap.data());
  };

  useEffect(() => {
    getProject(pid);
  }, []);

  return (
    <View style={globalStyles.project_details_container}>
      <Pressable
        style={globalStyles.project_details}
        onPress={() =>
          navigation.navigate("Project", { project: project, pid: pid })
        }
      >
        <View style={globalStyles.side_details_comp}>
          <Text style={globalStyles.side_details_text}>{"שם הפרויקט: "}</Text>
          <Text>{project.name}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <Text style={globalStyles.side_details_text}>{"ארגון: "}</Text>
          <Text>{project.organization}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <Text style={globalStyles.side_details_text}>{"תיאור: "}</Text>
          <Text>{project.description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProjectPost;
