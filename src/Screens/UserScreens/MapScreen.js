import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";

const MapScreen = () => {
  const { markers, getMarkers } = useData();
  const [markersArr, setMarkersArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [currentNeighborhood, setCurrentNeighborhood] = useState("");
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

  const getHeader = () => {
    return <Text style={globalStyles.forum_title_text}>{currentNeighborhood}</Text>;
  };
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
                setCurrentNeighborhood(marker.title);
              }}
              key={index}
            ></Marker>
          );
        })}
      </MapView>
      <Modal
        style={globalStyles.modal}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <FlatList
          data={currentProjects}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={[globalStyles.forums_titles, {marginBottom: '4%'}]}
                onPress={() => {
                  Alert.alert(
                    "תיאור הפרוייקט",
                    item.description,
                    [
                      {
                        text: "סגור",
                      },
                    ],
                    { cancelable: true }
                  );
                }}
              >
                <Text style={globalStyles.forums_titles_txt}>{item.name}</Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={getHeader}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default MapScreen;
