import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { firestore } from "./src/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import RegisterScreen from "./src/Screens/AuthScreens/RegisterScreen";
import AppLoading from "expo-app-loading";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AuthProvider from "./src/AuthProvider/AuthProvider";
import LoginScreen from "./src/Screens/AuthScreens/LoginScreen"
import MainContainer from "./src/Navigation/MainContainer";


export default function App() {
  return (
    <AuthProvider>
      <RegisterScreen />
    </AuthProvider>
    // <AuthProvider>
    //   <MainContainer />
    // </AuthProvider>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
