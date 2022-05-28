import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../styles/global";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useData } from "../../AuthProvider/UserDataProvider";
import { useAuth } from "../../AuthProvider/AuthProvider";

const ApprovalWatingScreen = () => {
  const { approveUser } = useData();
  const { currentUser } = useAuth();

  // function handleApprove() {
  //     console.log("currentUser: " + currentUser.uid);
  //     approveUser(currentUser.uid);
  // }

  return (
    <SafeAreaView style={globalStyles.container_enter_screens}>
      <View style={globalStyles.logo}>
        <Image
          source={require("../../../assets/app_icon.png")}
          style={globalStyles.logo_image_area}
          resizeMode="center"
        ></Image>
      </View>
      <Text style={globalStyles.landing_title_text}>ממתין לאישור</Text>
      {/* <Pressable
                style={styles.button}
                title="Approve"
                onPress={handleApprove}
            >
                <Text style={{ color: "#ffffff", fontSize: 20 }} >Approve</Text>
            </Pressable> */}
    </SafeAreaView>
  );
};

export default ApprovalWatingScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#6495ED",
  },
});
