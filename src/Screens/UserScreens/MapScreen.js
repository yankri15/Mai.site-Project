import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";
import { globalStyles } from "../../styles/global";
import * as Location from 'expo-location';


const MapScreen = () => {
  const [markers, setMarkers] = useState(null);

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
      >
        <Marker 
         coordinate = {{latitude: 31.7851951925,longitude: 35.2060641757}}
         pinColor = {"purple"} // any color
         title={"מרכז מאי"}
         description={"מיקום העמותה"}/>

         <Marker 
         coordinate = {{latitude: 31.78519516,longitude: 35.2064}}
         pinColor = {"red"} // any color
         title={"מרכז קשישים"}
         description={"המרכז בו כל הפעילויות בנושא קשישים מתרכזות"}/>

        <Marker 
         coordinate = {{latitude: 31.7851957,longitude: 35.202}}
         pinColor = {"red"} // any color
         title={"מרכז למידה"}
         description={"מרכז למידה לבני הנוער בו יוכלו להיפגש באופן שוטף"}/>

        <Marker 
         coordinate = {{latitude: 31.78519512,longitude: 35.209}}
         pinColor = {"red"} // any color
         title={"מרכז תנועות נוער"}
         description={"מרכז תנועות נוער"}/>
        </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;
