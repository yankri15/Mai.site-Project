import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  View,
  Modal,
  TextInput,
} from "react-native";
import ProfilePic from "../../API/ProfilePic";
import Job from "../../API/Job";
import { globalStyles } from "../../styles/global";

import { useData } from "../../AuthProvider/UserDataProvider";
import { useAuth } from "../../AuthProvider/AuthProvider";

const WantedScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { jobs, getJobs, uploadJob } = useData();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [projectName, setDescription] = useState("");
  useEffect(() => {
    getJobs();

    return () => {};
  }, []);

  const handleSubmit = async () => {
    if(!jobTitle || !jobDescription || !projectName) return;
    uploadJob(jobTitle, jobDescription, projectName);
    setCreateModalVisible(!createModalVisible);
    getJobs();
  };
  return (
    <SafeAreaView>
      <Modal
        visible={createModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setCreateModalVisible(!createModalVisible);
        }}
      >
        <View style={globalStyles.wanted_add_container}>
          {/* <Text>מי אתה מחפש</Text>
          <TextInput
            placeholder="בכמה מילים"
            value={description}
            onChangeText={(text) => setDescription(text)}
          /> */}
          <Text style={globalStyles.wanted_new_title}>שם התפקיד</Text>
          <TextInput
            placeholder="הכנס שם תפקיד"
            style={globalStyles.wanted_text_input}
            value={jobTitle}
            onChangeText={(text) => setJobTitle(text)}
          />

          <Text style={globalStyles.wanted_new_title}>תאור תפקיד</Text>
          <TextInput
            placeholder="הכנס פירוט על התפקיד"
            style={globalStyles.wanted_text_input}
            value={jobDescription}
            onChangeText={(text) => setJobDescription(text)}
          />

          <Text style={globalStyles.wanted_new_title}>פרטי עמותה</Text>
          <TextInput
            placeholder="הכנס שם עמותה והרחב מעט על פועלה"
            style={globalStyles.wanted_text_input}
            value={projectName}
            onChangeText={(text) => setDescription(text)}
          />
          <Pressable style={globalStyles.settingsBtn} onPress={handleSubmit}>
            <Text style={globalStyles.wanted_btn}>פרסם</Text>
          </Pressable>
        </View>
        
      </Modal>
      <Text style = {globalStyles.wanted_header}>שת"פים</Text>
      <View style = {globalStyles.wanted_container}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={jobs}
          numColumns={2}
          renderItem={({ item }) => <Job job={item} />}
          //columnWrapperStyle={{borderWidth: 2, borderColor: 'red'}}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
      />
      </View>
      
      <Pressable
        onPress={() => {
          setCreateModalVisible(!createModalVisible);
        }}
        style={globalStyles.plus_btn}
      >
        <Text style={globalStyles.plus_btn_text}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default WantedScreen;
