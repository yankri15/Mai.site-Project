//put button on profile and then check this screen
//need to store the image on the database

import {
  View,
  style,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/global";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import ImagePicker from "react-native-image-picker";

const editProfileScreen = () => {
  const [image, setImage] = useState("");

  const takePhotoFromCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };

  const chooseFromLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };

  const renderInner = () => (
    <View>
      <TouchableOpacity onPress={takePhotoFromCamera}>
        <Text>camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={chooseFromLibrary}>
        <Text>gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.bs.current.snapTo(1)}>
        <Text>cancel</Text>
      </TouchableOpacity>
    </View>
  );

  let bs = React.createRef(); //create reference
  let fall = new Animated.Value(1); //for animation

  return (
    <View style={globalStyles.container_enter_screens}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        //what to dysplay in sheet. we also can have renderHeader
        renderContent={renderInner}
      />
      <TouchableOpacity
        style={{ backgroundColor: "blue" }}
        onPress={() => bs.current.snapTo(0)}
      >
        <View>
          <Image
            source={require("../../../assets/default_profile_pic.jpg")}
            style={globalStyles.logo_image_area}
            resizeMode="center"
          ></Image>
        </View>
      </TouchableOpacity>

      <Text>name to put under image</Text>
      <TextInput
        placeholder="name"
        onChangeText={(text) => console.log(text)}
      />

      <TextInput
        placeholder="name"
        onChangeText={(text) => console.log(text)}
      />

      <TextInput
        placeholder="name"
        onChangeText={(text) => console.log(text)}
      />
    </View>
  );
};

export default editProfileScreen;
