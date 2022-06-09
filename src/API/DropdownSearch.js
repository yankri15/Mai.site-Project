import React from "react";
import { FlatList, Image, Pressable, Text, TextInput, View, } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

const DropdownSearch = ({
  placeHolder,
  selectedItems,
  filteredList,
  handleSearch,
  handleSelect,
  handleUnselect,
  display,
  setDisplay,
}) => {
  const defaultImage = require("../../assets/default_profile_pic.jpg");
  return (
    <View>
      <View style={{ width: "90%", paddingBottom: '1%', marginLeft: "5%" }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: '1%',
          }}
        >
          {selectedItems &&
            selectedItems.length > 0 &&
            selectedItems.map((item) => {
              return (
                <View
                  key={item.key}
                  style={{
                    width: item.name.length * 8 + 60,
                    justifyContent: "center",
                    flex: 0,
                    backgroundColor: "#eee",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                    padding: 8,
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: "#555" }}>{item.name}</Text>
                  <Pressable
                    onPress={() => {
                      handleUnselect(item);
                    }}
                    style={{
                      backgroundColor: "#f16d6b",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      marginLeft: '10%',
                    }}
                  >
                    <Text>{"X"}</Text>
                  </Pressable>
                </View>
              );
            })}
        </View>
      </View>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder={placeHolder}
          onFocus={() => setDisplay("flex")}
          onChangeText={(text) => handleSearch(text)}
          style={globalStyles.textInputProject}
        />
        {display === "flex" && filteredList && (
          <Octicons
            name="x"
            style={{
              position: "absolute",
              alignSelf: "center",
              color: 'red',
              top: '18%',
              right: '8%',
              zIndex: 3,
            }}
            size={25}
            onPress={() => setDisplay("none")}
          />
        )}
      </View>
      <View style={{ position: "relative", display: display }}>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FFFFFA",
            zIndex: 3,
            width: "90%",
            marginLeft: "5%",
            maxHeight: 120,
          }}
        >
          <FlatList
            data={filteredList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  handleSelect(item);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  padding: 5,
                }}
              >
                <View style={globalStyles.user_pic}>
                  <Image
                    source={
                      item.profilePic
                        ? { uri: item.profilePic }
                        : defaultImage
                    }
                    style={globalStyles.logo_image_area}
                  />
                </View>
                <Text>{item.name}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 1, backgroundColor: "black" }}></View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
};

export default DropdownSearch;
