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
  const [description, setDescription] = useState("");
  useEffect(() => {
    getJobs();

    return () => {};
  }, []);

  const handleSubmit = async () => {
    uploadJob(description);
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
        <View>
          <Text>מי אתה מחפש</Text>
          <TextInput
            placeholder="בכמה מילים"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <Pressable style={globalStyles.settingsBtn} onPress={handleSubmit}>
          <Text style={globalStyles.settingsBtnText}>פרסם</Text>
        </Pressable>
      </Modal>
      <Text>שת"פים</Text>
      <FlatList
        data={jobs}
        numColumns={2}
        renderItem={({ item }) => <Job job={item} />}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>נראה שאין מה להציג כרגע..</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
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
