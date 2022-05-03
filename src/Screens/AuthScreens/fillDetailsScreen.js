import { StyleSheet, style, View, Text, TextInput, Picker, Pressable, Image } from "react-native";
import { globalStyles } from '../../styles/global';
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import DatePicker from "react-native-datepicker";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const FillDetails = () => {
  const { addDataToDB } = useData();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const { currentUser } = useAuth();
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegisteration() {
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      addDataToDB(uid, name, date, school, classs, organiztion);
    } catch (err) {
      setError("Failed to create an account");
      console.log(error + ":\n " + err);

    }
    setLoading(false);
  }

  const isPlaceholder = (value) => {
    return value == "";
  }

  return (
    <View style={globalStyles.container_enter_screens}>
      <View style={globalStyles.logo}>
        <Image source={require('../../../assets/app_icon.png')} style={globalStyles.logo_image_area} resizeMode="center"></Image>
      </View>
      <Text style={[globalStyles.fill_title_text, { paddingBottom: 20 }]}>בואו נעשה קסמים!</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="שם + שם משפחה"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={globalStyles.textInput} >
        <Text style={{ color: "gray" }}>תאריך לידה</Text>
        <DatePicker
          date={date}
          mode="date"
          format="DD-MM-YYYY"
          confirmBtnText="אשר"
          cancelBtnText="בטל"
          onDateChange={(ddtate) => setDate(ddtate)}
        />
      </View>
      <TextInput
        style={globalStyles.textInput}
        placeholder="בית ספר"
        value={school}
        onChangeText={(text) => setSchool(text)}
      />
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={classs}
          style={[isPlaceholder(classs) ? { color: "gray" } : { color: "black" }]}
          onValueChange={(itemValue, itemIndex) => setClasss(itemValue)}
        >
          <Picker.Item label="בחר כיתה" value="choose" />
          <Picker.Item label="ט'" value="class_9" />
          <Picker.Item label="י'" value="class_10" />
          <Picker.Item label="יא'" value="class_11" />
          <Picker.Item label="יב'" value="class_12" />
        </Picker>
      </View>
      <TextInput
        style={globalStyles.textInput}
        placeholder="ארגון"
        value={organiztion}
        onChangeText={(text) => setOrganiztion(text)}
      />
      <Pressable
        style={globalStyles.enter_button}
        title="Register"
        onPress={handleRegisteration}
        disabled={loading}
      >
        <Text style={globalStyles.enter_btn_text}>אני בפנים!</Text>
      </Pressable>
    </View>
  );
};

export default FillDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a77ce8",
  }
});