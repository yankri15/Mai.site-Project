import {  View,  Text,  TextInput,  Picker,  Pressable,  Image,  Alert,} from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import DatePicker from 'react-native-datepicker'

const RegistrationDetailsScreen = () => {
  const { addDataToDB } = useData();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const localImageUri = "/img/MKieJCEazGeqPCoLPLq6X9qNwhh1/pofile/Sun May 15 09:56:26 2022.jpg";

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
          localImageUri
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
        maxLength={16}
        onChangeText={(text) => setName(text)}
      />
      <View style={globalStyles.textInput}>
        <Text style={[{ color: "#999" }, { fontSize: 17 }]}>תאריך לידה:</Text>
        <View style={globalStyles.datePicker}>
        <DatePicker
        date= {birthDate}
        mode="date"
        placeholder="select date"
        format="DD/MM/YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setBirthdate(date)}
      />
        </View>
      </View>
      <TextInput
        style={globalStyles.textInput}
        placeholder="בית ספר"
        value={school}
        maxLength={25}
        onChangeText={(text) => setSchool(text)}
      />
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={classs}
          style={[
            isPlaceholder(classs) ? { color: "#999" } : { color: "black" },
            { width: "100%" },
            { height: 28 },
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
            isPlaceholder(neighborhood) ? { color: "#999" } : { color: "black" },
            { width: "100%" },
            { height: 28 },
          ]}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}
        >
          <Picker.Item label="בחר שכונה" value="choose" />
          <Picker.Item label="אבו תור" value="אבו תור" />
          <Picker.Item label="ארמון הנציב" value="ארמון הנציב" />
          <Picker.Item label="ארנונה" value="ארנונה" />
          <Picker.Item label="בית הכרם" value="בית הכרם" />
          <Picker.Item label="בית וגן" value="בית וגן" />
          <Picker.Item label="בית חנינא" value="בית חנינא"  />
          <Picker.Item label="בית צפאפא" value="בית צפאפא" />
          <Picker.Item label="בקעה" value="בקעה" />
          <Picker.Item label="ג'אבל מוכאבר" value="ג'אבל מוכאבר" />
          <Picker.Item label="גבעת מרדכי" value="גבעת מרדכי" />
          <Picker.Item label="גבעת משואה" value="גבעת משואה"  />
          <Picker.Item label="גילה" value="גילה"/>
          <Picker.Item label="גוננים" value="גוננים" />
          <Picker.Item label="הבוכרים" value="הבוכרים" />
          <Picker.Item label="הגבעה הצרפתית" value="הגבעה הצרפתית" />
          <Picker.Item label="המושבה האמריקאית" value="המושבה האמריקאית"  />
          <Picker.Item label="המושבה הגרמנית" value="המושבה הגרמנית" />
          <Picker.Item label="הר נוף" value="הר נוף" />
          <Picker.Item label="הרובע היהודי" value="הרובע היהודי" />
          <Picker.Item label="ואדי ג'וז" value="ואדי ג'וז" />
          <Picker.Item label="טלביה" value="טלביה"/>
          <Picker.Item label="מאה שערים" value="מאה שערים" />
          <Picker.Item label="מוסררה" value="מוסררה" />
          <Picker.Item label="מלחה" value="מלחה" />
          <Picker.Item label="מעלות דפנה" value="מעלות דפנה" />
          <Picker.Item label="נווה יעקב" value="נווה יעקב"  />
          <Picker.Item label="נחלאות" value="נחלאות" />
          <Picker.Item label="ניות" value="ניות" />
          <Picker.Item label="סילוואן" value="סילוואן" />
          <Picker.Item label="סנהדריה" value="סנהדריה"  />
          <Picker.Item label="עין כרם" value="עין כרם"  />
          <Picker.Item label="עיסוויאה" value="עיסוויאה"  />
          <Picker.Item label="עיר גנים" value="עיר גנים"  />
          <Picker.Item label="פסגת זאב" value="פסגת זאב"  />
          <Picker.Item label="פת" value="פת" />
          <Picker.Item label="קריית יובל" value="קריית יובל"  />
          <Picker.Item label="קריית מנחם" value="קריית מנחם"  />
          <Picker.Item label="קריית משה" value="קריית משה"  />
          <Picker.Item label="ראס אל עמוד" value="ראס אל עמוד" />
          <Picker.Item label="רוממה" value="רוממה"  />
          <Picker.Item label="רחביה" value="רחביה"  />
          <Picker.Item label="רמות" value="רמות"  />
          <Picker.Item label="רמת אשכול" value="רמת אשכול"  />
          <Picker.Item label="רמת שלמה" value="רמת שלמה"  />
          <Picker.Item label="רמת שרת" value="רמת שרת"  />
          <Picker.Item label="רמת דניה" value="רמת דניה"  />
          <Picker.Item label="שועפט" value="שועפט"  />
          <Picker.Item label="שייח ג'ראח" value="שייח ג'ראח"  />
          <Picker.Item label="שמואל הנביא" value="שמואל הנביא"  />
          <Picker.Item label="תלפיות" value="תלפיות"  />
        </Picker>
      </View>
      {/* <TextInput
        style={globalStyles.textInput}
        placeholder="שכונה"
        value={neighborhood}
        maxLength={13}
        onChangeText={(text) => setNeighborhood(text)}
      /> */}
      <TextInput
        style={globalStyles.textInput}
        placeholder="ארגון"
        value={organiztion}
        maxLength={25}
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
