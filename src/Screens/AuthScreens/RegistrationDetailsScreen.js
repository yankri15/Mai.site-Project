import { View, Text, TextInput, Picker, Pressable, Image } from "react-native";
import { globalStyles } from '../../styles/global';
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const RegistrationDetailsScreen = () => {
    const { addDataToDB } = useData();
    const { currentUser } = useAuth();
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [organiztion, setOrganiztion] = useState("");
    const [classs, setClasss] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegisteration() {
        try {
            setError("");
            setLoading(true);
            const uid = currentUser.uid;
            addDataToDB(uid, name, day, month, year, school, classs, neighborhood, organiztion);
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
            <View style={globalStyles.textInput}>
                <Text style={[{ color: "gray" }, { fontSize: 15 }]}>תאריך לידה:</Text>
                <View style={globalStyles.datePicker}>
                    <Picker
                        selectedValue={day}
                        style={[isPlaceholder(classs) ? { color: "gray" } : { color: "black" }, { textAlign: "right" }, globalStyles.picker]}
                        onValueChange={(itemValue) => setDay(itemValue)}>
                        <Picker.Item label="יום" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="13" value="13" />
                        <Picker.Item label="14" value="14" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="16" value="16" />
                        <Picker.Item label="17" value="17" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="19" value="19" />
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                        <Picker.Item label="24" value="24" />
                        <Picker.Item label="25" value="25" />
                        <Picker.Item label="26" value="26" />
                        <Picker.Item label="27" value="27" />
                        <Picker.Item label="28" value="28" />
                        <Picker.Item label="29" value="29" />
                        <Picker.Item label="30" value="30" />
                        <Picker.Item label="31" value="31" />
                    </Picker>
                    <Picker
                        selectedValue={month}
                        style={[isPlaceholder(classs) ? { color: "gray" } : { color: "black" }, { textAlign: "right" }, globalStyles.picker]}
                        onValueChange={(itemValue) => setMonth(itemValue)}>
                        <Picker.Item label="חודש" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                    </Picker>
                    <Picker
                        selectedValue={year}
                        style={[isPlaceholder(classs) ? { color: "gray" } : { color: "black" }, { textAlign: "right" }, globalStyles.picker]}
                        onValueChange={(itemValue) => setYear(itemValue)}>
                        <Picker.Item label="שנה" value="0" />
                        <Picker.Item label="1980" value="1980" />
                        <Picker.Item label="1981" value="1981" />
                        <Picker.Item label="1982" value="1982" />
                        <Picker.Item label="1983" value="1983" />
                        <Picker.Item label="1984" value="1984" />
                        <Picker.Item label="1986" value="1986" />
                        <Picker.Item label="1987" value="1987" />
                        <Picker.Item label="1988" value="1988" />
                        <Picker.Item label="1989" value="1989" />
                        <Picker.Item label="1990" value="1990" />
                        <Picker.Item label="1991" value="1991" />
                        <Picker.Item label="1992" value="1992" />
                        <Picker.Item label="1993" value="1993" />
                        <Picker.Item label="1994" value="1994" />
                        <Picker.Item label="1995" value="1995" />
                        <Picker.Item label="1996" value="1996" />
                        <Picker.Item label="1997" value="1997" />
                        <Picker.Item label="1998" value="1998" />
                        <Picker.Item label="1999" value="1999" />
                        <Picker.Item label="2000" value="2000" />
                        <Picker.Item label="2001" value="2001" />
                        <Picker.Item label="2002" value="2002" />
                        <Picker.Item label="2003" value="2003" />
                        <Picker.Item label="2004" value="2004" />
                        <Picker.Item label="2005" value="2005" />
                        <Picker.Item label="2006" value="2006" />
                        <Picker.Item label="2007" value="2007" />
                        <Picker.Item label="2008" value="2008" />
                        <Picker.Item label="2009" value="2009" />
                        <Picker.Item label="2010" value="2010" />
                        <Picker.Item label="2011" value="2011" />
                        <Picker.Item label="2012" value="2012" />
                        <Picker.Item label="2013" value="2013" />
                        <Picker.Item label="2014" value="2014" />
                        <Picker.Item label="2015" value="2015" />
                    </Picker>
                </View>
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
                    style={[isPlaceholder(classs) ? { color: "gray" } : { color: "black" }, { textAlign: "right" }]}
                    onValueChange={(itemValue) => setClasss(itemValue)}>
                    <Picker.Item label="בחר כיתה" value="choose" />
                    <Picker.Item label="ט" value="ט" />
                    <Picker.Item label="י" value="י" />
                    <Picker.Item label="יא" value="יא" />
                    <Picker.Item label="יב" value="יב" />
                </Picker>
            </View>
            <TextInput
                style={globalStyles.textInput}
                placeholder="שכונה"
                value={neighborhood}
                onChangeText={(text) => setNeighborhood(text)}
            />
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

export default RegistrationDetailsScreen;