import React, { useState, useEffect } from "react";
import { Modal, View, FlatList, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import { useData } from "../../AuthProvider/UserDataProvider";
import { db } from "../../../firebase";
import { collection, where, getDocs, query } from "firebase/firestore";

const MapScreen = () => {
  const { markers, getMarkers } = useData();
  const [markersArr, setMarkersArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const mapRegion = {
    latitude: 31.7851951925,
    longitude: 35.2060641757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMarkerPressed = async (title) => {
    setCurrentProjects([]);
    const q = query(
      collection(db, "projects"),
      where("neighborhood", "==", title)
    );
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) => {
      setCurrentProjects((prev) => [...prev, item.data()]);
    });
    setModalVisible(true);
  };
  

  useEffect(() => {
    getMarkers().then(() => {
      setMarkersArr([]);
      for (const marker in markers) {
        if (markers.hasOwnProperty.call(markers, marker)) {
          setMarkersArr((prev) => [
            ...prev,
            {
              title: marker,
              latitude: markers[marker].latitude,
              longitude: markers[marker].longitude,
            },
          ]);
        }
      }
      setMarkersLoaded(true);
    });

    return;
  }, [markersLoaded]);
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  
  return (
    <SafeAreaView style={globalStyles.mapScreenContainer}>
      <MapView style={globalStyles.map} region={mapRegion} provider={null}>
        <Marker
          coordinate={{ latitude: 31.7851951925, longitude: 35.2060641757 }}
          pinColor={"purple"}
          title={"מרכז מאי"}
          description={"מיקום העמותה"}
        />
        {markersArr.map((marker, index) => {
          return (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              pinColor={"mediumpurple"}
              title={marker.title}
              description={"לחץ על מנת לצפות בפרוייקטים"}
              onCalloutPress={() => {
                handleMarkerPressed(marker.title);
              }}
              key={index}
            ></Marker>
          );
        })}
      </MapView>
      <Modal style={globalStyles.modal}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <FlatList contentContainerStyle = {{alignItems: 'center', marginTop:"4%"}}
          data={currentProjects}
          
          renderItem={({ item }) => {
            
            return <View ><Text style = {{fontSize:20, marginBottom:"8%", fontWeight: "bold"}}>{item.name}</Text></View>;
          }}
          ListEmptyComponent={() => {
            return (
              <View >
                <Text>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default MapScreen;
