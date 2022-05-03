import { StyleSheet, style, View, Text, TextInput, Picker, Pressable } from "react-native";
import React, { useState } from "react";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import DatePicker from "react-native-datepicker";

const FillDetails = () => {
  const { addDataToDB } = useData();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const { currentUser } = useAuth();
  const [ date, setDate ] = useState(new Date());
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
  
  
  return (
    <View style={styles.container}>
      <Text>בואו נעשה קסמים!</Text>
      <TextInput
        placeholder="שם + שם משפחה"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <DatePicker
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="תאריך לידה"
        format="YYYY-MM-DD"
        confirmBtnText="אשר"
        cancelBtnText="בטל"
        onDateChange={(ddtate) => setDate(ddtate)}
      />
      <TextInput
        placeholder="בית ספר"
        value={school}
        onChangeText={(text) => setSchool(text)}
      />
      <Picker
        selectedValue={classs}
        placeholder = "כיתה"
        onValueChange={(itemValue, itemIndex) => setClasss(itemValue)}
      >
        <Picker.Item label="ט" value="ט" />
        <Picker.Item label="י" value="י" />
        <Picker.Item label="יא" value="יא" />
        <Picker.Item label="יב" value="יב" />
      </Picker>
      <TextInput
        placeholder="ארגון"
        value={organiztion}
        onChangeText={(text) => setOrganiztion(text)}
      />
      <Pressable
          
          title="Register"
          onPress={handleRegisteration}
          disabled={loading}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }}>אני בפנים!</Text>
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
  }});