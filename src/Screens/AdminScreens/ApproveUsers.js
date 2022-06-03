import React, { useEffect, useState } from "react";
import { where, query, collection, getDocs } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import { DataTable } from "react-native-paper";
import { Pressable, View, FlatList, Text } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { globalStyles } from "../../styles/global";

const ApproveUsers = ({ navigation }) => {
  const [snapshot, setSnapshot] = useState([]);
  const [render, setRender] = useState(1);
  const [approved, setApproved] = useState({});
  const [declined, setDeclined] = useState({});


  //Gets the lists of users whith status 1 - pending
  useEffect(() => {
    const getSnapshot = async () => {
      const q = query(collection(db, "users"), where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      setSnapshot(querySnapshot.docs);
    };
    getSnapshot().catch(console.error);
    return;
  }, []);

  //Set user status to 2 - Approved
  const approveUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), "status", 2).then(() => {
      setApproved(prev => {
        let temp = {};
        temp[uid] = 2;
        return { ...prev, ...temp }
      });
      setRender(prev => prev + 1);
    });
  };

  //Set user status to -1 - blocked
  const declineUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), "status", -1).then(() => {
      setDeclined(prev => {
        let temp = {};
        temp[uid] = -1;
        return { ...prev, ...temp }
      });
      setRender(prev => prev + 1);
    });
  };

  const getBottuns = (item) => {
    if (render && !approved[item.id] && !declined[item.id]) {
      return (
        <View
          style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-between' }}
        >
          <Pressable
            style={{ borderStyle: 'solid', borderWidth: 3, borderColor: 'green', borderRadius: 5 }}
            onPress={() => {
              approveUser(item.id);
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", padding: 3, color: 'green' }}
            >{"אשר"}</Text>
          </Pressable>
          <Pressable
            style={{ borderStyle: 'solid', borderWidth: 3, borderColor: 'red', borderRadius: 5 }}
            onPress={() => {
              declineUser(item.id);
            }}

          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", padding: 3, color: 'red' }}
            >{"דחה"}</Text>
          </Pressable>
        </View>
      )
    }
    else if (approved[item.id]) {
      return (
        <View
          style={{ borderRadius: 5, backgroundColor: '#EAE7E6' }}
        >
          <Text
            style={{ fontSize: 15, fontWeight: "bold", padding: 5, color: 'black' }}
          >{"אושר"}</Text>
        </View>
      )
    }
    else {
      return (

        <View
          style={{ borderRadius: 5, backgroundColor: '#EAE7E6' }}
        >
          <Text
            style={{ fontSize: 15, fontWeight: "bold", padding: 5, color: 'black' }}
          >{"נדחה"}</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', width: '100%', }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, marginTop: 5 }}>{"אשר משתמשים ממתינים"}</Text>
      <FlatList
        style={{ width: '100%', }}
        data={snapshot}
        renderItem={({ item }) => (
          <View
            style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', paddingBottom: 10, paddingTop: 10 }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Profile", {
                  uid: item.id,
                });
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
              >{item.data().name}</Text>
            </Pressable>
            {getBottuns(item)}
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={globalStyles.be_first}>אין משתמשים ממתינים</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: 'gray' }}></View>;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ height: 1, backgroundColor: 'gray' }}></View>
      {/* </DataTable> */}
    </SafeAreaView >
  );
};

export default ApproveUsers;
