import { View, Text, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useData } from '../../AuthProvider/UserDataProvider'
import Ionicons from "react-native-vector-icons/Ionicons";
import UserPicName from '../../API/UserPicName'


const NominateAdmin = ({ navigation }) => {

    const [searchList, setSearchList] = useState([]);
    const { usersList, getUsersList, updateAdmin } = useData();

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
            searchList[index].data['admin'] = 0;
            updateAdmin(uid, 0);
        }
        else {
            searchList[index].data['admin'] = 1;
            updateAdmin(uid, 1);
        }
    }

    return (
        <SafeAreaView style={globalStyles.global}>
            <Text>{"הפוך משתמש למנהל"}</Text>
            <TextInput
                style={globalStyles.textInput}
                placeholder="הקלד שם לחיפוש"
                keyboardType="default"
                onChangeText={(text) => {
                    getUsers(text);
                }}
                // style={{
                //     padding: 5,
                //     borderWidth: 2,
                //     borderStyle: 'solid',
                //     borderColor: 'black',
                //     borderRadius: 10,
                //     fontSize: 15,
                // }}
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
                        // <Text>{item.data.name}</Text>
                        <View
                            style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <UserPicName
                                uid={item.id}
                                navigation={navigation}
                            />
                            <Pressable
                                onPress={() => { handleNominate(item.id, index) }}>
                                {item.data.admin && item.data.admin == 1 ? (
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