import React, { useEffect, useState } from "react";
import { where, query, collection, getDocs } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import { DataTable } from "react-native-paper";
import { Button, View, FlatList, Text } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { globalStyles } from "../../styles/global";

const ApproveUsers = () => {
  const [snapshot, setSnapshot] = useState([]);

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
    await updateDoc(doc(db, "users", uid), "status", 2);
  };

  //Set user status to -1 - blocked
  const declineUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), "status", -1);
  };

  return (
    <SafeAreaView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>שם מלא</DataTable.Title>
          <DataTable.Title>אישור/דחייה</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={snapshot}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: 'row' }}
            >
              <Text>{item.data().name}</Text>
              <Button
                title="V"
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  approveUser(item.id);
                }}
              />
              <Button
                title="X"
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  declineUser(item.id);
                }}
              />
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
            return <View style={{ height: 3 }}></View>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* {snapshot && snapshot.length > 0 ? (
          snapshot.map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.data().name}</DataTable.Cell>
                <DataTable.Cell>
                  <View style={{ flexDirection: "row", }}>
                    <Button
                      title="V"
                      style={{ backgroundColor: 'red' }}
                      onPress={() => {
                        approveUser(item.id);
                      }}
                    />
                    <Button
                      title="X"
                      onPress={() => {
                        declineUser(item.id);
                      }}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })
        ) : (
          <DataTable.Row>
            <DataTable.Cell>No pending users</DataTable.Cell>
          </DataTable.Row>
        )} */}
      </DataTable>
    </SafeAreaView>
  );
};

export default ApproveUsers;
