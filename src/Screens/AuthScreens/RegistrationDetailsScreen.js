import {
  View,
  Text,
  TextInput,
  Picker,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import DatePicker from "react-native-datepicker";
import style from "react-native-datepicker/style";

const RegistrationDetailsScreen = () => {
  const { addDataToDB, getNeighborhoods } = useData();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNeighborhoods().then(res => setNeighborhoods(res));
  }
    , []);

  async function handleRegisteration() {
    try {
      if (
        name &&
        school &&
        neighborhood &&
        organiztion &&
        classs &&
        birthDate
      ) {
        setError("");
        setLoading(true);
        const uid = currentUser.uid;
        addDataToDB(
          uid,
          name,
          birthDate,
          school,
          classs,
          neighborhood,
          organiztion,
          ""
        );
      } else {
        throw "אופס! נראה שלא הכל הושלם..";
      }
    } catch (err) {
      setError("Failed to create an account");
      console.log(error + ":\n " + err);
      Alert.alert(err);
    }
    setLoading(false);
  }

  const isPlaceholder = (value) => {
    return value == "";
  };

  const renderNeighborhoods = () => {
    return neighborhoods.map(element => {
      return (
        <Picker.Item label={element} value={element} />
      )
    })
  }

  return (
    <View style={globalStyles.container_enter_screens}>
      <View style={globalStyles.logo}>
        <Image
          source={require("../../../assets/app_icon.png")}
          style={globalStyles.logo_image_area}
          resizeMode="center"
        ></Image>
      </View>
      <Text style={[globalStyles.fill_title_text, { paddingBottom: 20 }]}>
        בואו נעשה קסמים!
      </Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="שם + שם משפחה"
        value={name}
        maxLength={20}
        onChangeText={(text) => setName(text)}
      />
      <View style={globalStyles.textInput}>
        <View style={globalStyles.reg_bdate}>
          <Text style={[{ color: "#999" }, { fontSize: 17 }]}>תאריך לידה:</Text>
          <View style={globalStyles.datePicker}>
            <DatePicker
              date={birthDate}
              mode="date"
              placeholder="בחר תאריך"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => setBirthdate(date)}
            />
          </View>
        </View>
      </View>
      <TextInput
        style={globalStyles.textInput}
        placeholder="בית ספר"
        value={school}
        maxLength={30}
        onChangeText={(text) => setSchool(text)}
      />
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={classs}
          style={[
            isPlaceholder(classs) ? { color: "#999" } : { color: "black" },
            globalStyles.reg_choose,
          ]}
          onValueChange={(itemValue) => setClasss(itemValue)}
        >
          <Picker.Item label="בחר כיתה" value="choose" />
          <Picker.Item label="ט" value="ט" />
          <Picker.Item label="י" value="י" />
          <Picker.Item label="יא" value="יא" />
          <Picker.Item label="יב" value="יב" />
        </Picker>
      </View>
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={neighborhood}
          style={[
            isPlaceholder(neighborhood)
              ? { color: "#999" }
              : { color: "black" },
            globalStyles.reg_choose,
          ]}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}
        >
          <Picker.Item label="בחר שכונה" value="choose" />
          {renderNeighborhoods()}
        </Picker>
      </View>
      <TextInput
        style={globalStyles.textInput}
        placeholder="ארגון"
        value={organiztion}
        maxLength={30}
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

export default RegistrationDetailsScreen;
