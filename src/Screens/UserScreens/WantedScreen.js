import React, { useState, useEffect } from "react";
import { Text, Pressable, FlatList, SafeAreaView, View, Modal, TextInput, ScrollView } from "react-native";
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

    return () => { };
  }, []);

  const handleSubmit = async () => {
    if (!jobTitle || !jobDescription || !projectName) return;
    uploadJob(jobTitle, jobDescription, projectName);
    setCreateModalVisible(!createModalVisible);
    getJobs();
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={globalStyles.global}>
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
            <Text style={globalStyles.wanted_new_title}>דרושים חדשים</Text>
            <TextInput
              placeholder="שם התפקיד אותו אתם מחפשים"
              style={globalStyles.wanted_text_input}
              value={jobTitle}
              onChangeText={(text) => setJobTitle(text)}
            />
            <TextInput
              placeholder="פרטו קצת על התפקיד"
              style={globalStyles.wanted_text_input}
              value={jobDescription}
              onChangeText={(text) => setJobDescription(text)}
            />
            <TextInput
              placeholder="הכניסו שם פרוייקט והרחיבו עליו מעט"
              style={globalStyles.wanted_text_input}
              value={projectName}
              onChangeText={(text) => setDescription(text)}
            />
            <Pressable style={globalStyles.settingsBtn} onPress={handleSubmit}>
              <Text style={globalStyles.wanted_btn}>פרסמו</Text>
            </Pressable>
          </View>
        </Modal>

        <Text style={globalStyles.wanted_header}>לוח דרושים</Text>
        <View style={globalStyles.wanted_container}>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={jobs}
            numColumns={2}
            renderItem={({ item }) => <Job job={item} />}
            //columnWrapperStyle={{borderWidth: 2, borderColor: 'red'}}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text>נראה שאין דרושים כרגע..</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          setCreateModalVisible(!createModalVisible),
            setJobTitle(""),
            setJobDescription(""),
            setDescription("");
        }}
        style={globalStyles.plus_btn}
      >
        <Text style={globalStyles.plus_btn_text}>+</Text>
      </Pressable>
    </View>
  );
};

export default WantedScreen;
