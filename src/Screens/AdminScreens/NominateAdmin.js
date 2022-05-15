import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../styles/global'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useData } from '../../AuthProvider/UserDataProvider'


const NominateAdmin = () => {

    const [searchList, setSearchList] = useState([]);
    const { usersList, getUsersList } = useData();

    useEffect(() => {
        getUsersList();
    }, [])

    const getUsers = (nameToSearch) => {
        setSearchList([]);
        usersList.forEach(element => {
            if (element.data.name.includes(nameToSearch)) {
                setSearchList((prev) => [...prev, element])
            }
        })
    }

    // console.log(usersList);

    return (
        <SafeAreaView style={globalStyles.global}>
            <Text>NominateAdmin</Text>
            <TextInput
                placeholder="הקלד שם לחיפוש"
                keyboardType="default"
                onChangeText={(text) => {
                    getUsers(text);
                }}
            />
            <FlatList
                data={searchList}
                renderItem={({ item }) => (
                    // <Pressable
                    //     style={globalStyles.forums_titles}
                    //     onPress={() => navigation.navigate("Subject", { item })}>
                    //     <View style={globalStyles.line}></View>
                    //     <Text style={globalStyles.forums_titles_txt}>{item.topicName}</Text>

                    // </Pressable>
                    <Text>{item.data.name}</Text>
                )}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <Text>לא קיימים משתמשים</Text>
                        </View>
                    )
                }}

                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default NominateAdmin