import { View, Text, SafeAreaView, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/global'
import { useData } from '../../AuthProvider/UserDataProvider'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import UserPicName from '../../API/UserPicName'

const BlockedUser = ({ navigation }) => {

    const { getBlockedUsers } = useData();
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [approved, setApproved] = useState([]);
    const [render, setRender] = useState(1);

    useEffect(() => {
        getBlockedUsers().then(users => {
            const temp = users.map((user) => {
                return { key: user.id + new Date().getTime(), data: user }
            })
            setBlockedUsers(temp);
        })
    }, []);

    const approveUser = async (uid) => {
        await updateDoc(doc(db, "users", uid), "status", 2).then(() => {
            setApproved((prev) => {
                let temp = {};
                temp[uid] = 2;
                return { ...prev, ...temp };
            });
            setRender((prev) => prev + 1);
        });
    };

    const getBottuns = (item) => {
        if (!approved[item.data.id] && render) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        width: "30%",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable
                        style={{
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "green",
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            approveUser(item.data.id);
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                padding: 3,
                                color: "green",
                            }}
                        >
                            {"הסר חסימה"}
                        </Text>
                    </Pressable>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>חסימה הוסרה</Text>
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={{ ...globalStyles.global, flex: 1, alignItems: "center", width: "100%" }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 5,
                    marginTop: 5,
                }}
            >
                {"משתמשים חסומים"}
            </Text>
            <FlatList
                style={{ width: "100%" }}
                data={blockedUsers}
                renderItem={({ item }) => (
                    <View
                        style={{
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "85%",
                            paddingBottom: 10,
                            paddingTop: 10,
                        }}
                    >
                        <UserPicName
                            uid={item.data.id}
                            navigation={navigation}
                        />
                        {getBottuns(item)}
                    </View>
                )}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <Text style={globalStyles.be_first}>לא נמצאו משתמשים</Text>
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 1, backgroundColor: "gray" }}></View>;
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 1, backgroundColor: "gray" }}></View>

        </SafeAreaView>
    )
}

export default BlockedUser