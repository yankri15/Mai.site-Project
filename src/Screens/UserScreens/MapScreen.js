import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";
import { globalStyles } from "../../styles/global";
import * as Location from 'expo-location';


const MapScreen = () => {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // async function handleLocation() {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  // }

  // useEffect(() => {
  //   handleLocation()

  // }, []);
  // console.log(errorMsg)
  // console.log(location)

  const [mapRegion, setmapRegion] = useState({
    latitude: 31.7851951925,
    longitude: 35.2060641757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <SafeAreaView style={globalStyles.mapScreenContainer}>
      <MapView
        style={globalStyles.map}
        region={mapRegion}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
