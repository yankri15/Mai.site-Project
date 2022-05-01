import { StyleSheet, View, Text, TextInput, Picker } from "react-native";
import React, { useState } from "react";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";
import DatePicker from "react-native-datepicker";

const FillDetails = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [school, setSchool] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("בחר כיתה");
  const { currentUser } = useAuth();
  const [ date, setDate ] = useState(new Date());
  return (
    <View>
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
        onDateChange={(date) => {
          this.setState({ date: date });
        }}
      />
      <TextInput
        placeholder="בית ספר"
        value={school}
        onChangeText={(text) => setSchool(text)}
      />
      <Picker
        selectedValue={classs}
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
    </View>
  );
};

export default FillDetails;
