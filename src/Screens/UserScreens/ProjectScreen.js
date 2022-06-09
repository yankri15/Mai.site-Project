import { Entypo } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, View, Modal, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { EvilIcons } from "@expo/vector-icons";
import { db } from "../../../firebase";
import BasicPostDisplay from "../../API/BasicPostDisplay";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";
import DropdownSearch from "../../API/DropdownSearch";

const ProjectScreen = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { projectPosts, getProjectPosts, deleteProject, admin, usersList, getUsersList, addCollabs } = useData();
  const { Popover } = renderers;

  const project = route.params.project;
  const pid = route.params.pid;
  const [collabNames, setCollabNames] = useState([]);
  const [name, setName] = useState("");
  const [showModalE, setShowModalE] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [displayUsers, setDisplayUsers] = useState("none");

  const getName = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) setName(docSnap.data().name);
    else setName("משתמש מחוק");
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

  const handleSearchUser = (text) => {
    if (!text) {
      return setUsersData([]);
    }
    const users = [];
    usersList.forEach((user) => {
      if (user.data.name.includes(text)) {
        users.push({ key: user.id + new Date().getTime(), id: user.id, name: user.data.name, profilePic: user.data.profilePic });
      }
    });
    setUsersData(users);
    setDisplayUsers("flex");
  };

  const handleSelectUser = (userData) => {
    let found = false;
    collaborators.forEach((user) => {
      if (user.id === userData.id) {
        found = true;
      }
    });
    if (!found) {
      setCollaborators((prev) => [...prev, userData]);
    }
    setDisplayUsers("none");
  };

  const handleUnselectUser = (userData) => {
    const users = collaborators.filter((user) => user.id !== userData.id);
    setCollaborators(users);
  };

  const resetCollabs = () => {
    const temp = project.collaborators.map((collab) => {
      return { key: collab.id + new Date().getTime(), id: collab.id, name: collab.name, profilePic: collab.profilePic }
    })
    setCollaborators(temp);
  }

  const handleNewCollabs = () => {
    const newCollabs = collaborators.map(collab => {
      return { id: collab.id, name: collab.name };
    })
    addCollabs(pid, newCollabs);
    setShowModalE(!showModalE);
  }

  useEffect(() => {
    getName(project.uid);
    getProjectPosts(pid);
    getColabNames();
    getUsersList().then(resetCollabs);
    return () => {
      setCollabNames([]);
    };
  }, []);

  return (
    <View>
      <Modal
        style={globalStyles.modal}
        animationType={"slide"}
        transparent={false}
        visible={showModalE}
        onRequestClose={() => {
          resetCollabs();
          setShowModalE(!showModalE);
        }}
      >
        <DropdownSearch
          placeHolder={"שותפים"}
          selectedItems={collaborators}
          filteredList={usersData}
          handleSearch={handleSearchUser}
          handleSelect={handleSelectUser}
          handleUnselect={handleUnselectUser}
          display={displayUsers}
          setDisplay={setDisplayUsers}
        />
        <Pressable
          style={{ alignSelf: 'center', }}
          onPress={handleNewCollabs}
        >
          <Text
            style={{ fontSize: 30 }}
          >אישור</Text>
        </Pressable>
      </Modal>
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
            {currentUser.uid === project.uid || admin == 1 ? (
              <Entypo name="dots-three-horizontal" size={23}></Entypo>
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
        <Text style={[globalStyles.forum_title_text, { marginTop: '10%', marginBottom: '0%' }]}>{project.name}</Text>
        <View style={globalStyles.project_screen_details}>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>יוצר המיזם: </Text>
            <Text style={globalStyles.project_details}>{name}</Text>
          </View>
          <View style={globalStyles.project_details_view}>
            <Text style={globalStyles.project_title_details}>שותפים: </Text>
            {collabNames.map((item, index) => {
              return (index === collabNames.length - 1 ? <Text key={index}>{item}</Text> : <Text key={index}>{item}, </Text>)
            })}
            {project.uid === currentUser.uid && <Pressable
              style={{ paddingLeft: '2%' }}
              title="edit"
              onPress={() => {
                setShowModalE(!showModalE);
              }}
            >
              <EvilIcons
                name="pencil"
                size={30}
                style={{ color: "#C4A5F3" }}
              ></EvilIcons>
            </Pressable>}
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
            navigation.navigate("יצירת פוסט", { project: project, pid: pid });
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
