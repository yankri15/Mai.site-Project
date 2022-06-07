import { View, Text, TextInput, FlatList, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useData } from '../../AuthProvider/UserDataProvider'
import Ionicons from "react-native-vector-icons/Ionicons";
import UserPicName from '../../API/UserPicName'


const NominateAdmin = ({ navigation }) => {

    const [searchList, setSearchList] = useState([]);
    const [render, setRender] = useState(1);
    const { usersList, getUsersList, updateAdmin } = useData();
    const defaultImage = require("../../../assets/default_profile_pic.jpg");

    useEffect(() => {
        getUsersList().then(() => {
            setSearchList(usersList);
        });
    }, [])

    const getUsers = (nameToSearch) => {
        setSearchList([]);
        usersList.forEach(element => {
            if (element.data.name.includes(nameToSearch)) {
                setSearchList((prev) => [...prev, element])
            }
        })
    }

    const handleNominate = (uid, index) => {
        if (searchList[index].data.admin && searchList[index].data.admin == 1) {
            updateAdmin(uid, 0).then(() => {
                searchList[index].data['admin'] = 0;
                setRender(prev => prev + 1)
            });
        }
        else {
            updateAdmin(uid, 1).then(() => {
                searchList[index].data['admin'] = 1;
                setRender(prev => prev + 1)
            });
        }
    }

    return (
        <SafeAreaView style={{ ...globalStyles.global, alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>{"הפוך משתמש למנהל"}</Text>
            <TextInput
                style={globalStyles.textInput}
                placeholder="הקלד שם לחיפוש"
                keyboardType="default"
                onChangeText={(text) => {
                    getUsers(text);
                }}
            />
            <View
                style={{
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'gray',
                }}
            >
                <FlatList
                    data={searchList}
                    renderItem={({ item, index }) => (
                        <View
                            style={{ flexDirection: 'row', width: '90%', paddingLeft: '5%', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Pressable
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    navigation.navigate("פרופיל", {
                                        uid: item.id,
                                    });
                                }}
                            >
                                <View
                                    style={globalStyles.user_pic}
                                >
                                    <Image
                                        source={item.data.profilePic ? { uri: item.data.profilePic } : { defaultImage }}
                                        style={globalStyles.logo_image_area}
                                    />
                                </View>
                                <Text
                                    style={{ fontSize: 15, fontWeight: "bold", }}
                                >{item.data.name}</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { handleNominate(item.id, index) }}>
                                {item.data.admin && item.data.admin == 1 && render ? (
                                    <Ionicons
                                        name="close-circle-outline"
                                        style={{ color: 'red' }}
                                        size={30}
                                    />
                                ) :
                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        style={{ color: 'green' }}
                                        size={30}
                                    />}
                            </Pressable>
                        </View>
                    )}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <Text>לא קיימים משתמשים</Text>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 1, backgroundColor: 'gray' }}></View>;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default NominateAdmin