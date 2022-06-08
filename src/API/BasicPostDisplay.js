import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { storage } from "../../firebase";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";

const BasicPostDisplay = ({ post, navigation }) => {
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState(false);

  const getImages = async () => {
    setImages([]);
    if (post.data.images.length !== 0) {
      post.data.images.forEach(async (element) => {
        const imgRef = ref(storage, element);
        await getDownloadURL(imgRef).then((img) => {
          setImages((prev) => [...prev, { url: img }]);
        });
      });
    }
  };

  useEffect(() => {
    getImages().catch(console.error);
    return;
  }, []);
  return (
    <View>
      <Modal
        visible={displayImages}
        onRequestClose={() => {
          setDisplayImages(!displayImages);
        }}
      >
        <ImageViewer imageUrls={images} />
      </Modal>
      <UserPicName
        uid={post.data.uid}
        navigation={navigation}
        posted={moment(new Date(post.data.creation.seconds * 1000)).fromNow()}
      />
      <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
      {images.length !== 0 && (
        <Pressable
          onPress={() => {
            images.length > 0 ? setDisplayImages(!displayImages) : null;
          }}
        >
          <Image
            style={[globalStyles.post_img, { marginBottom: "-2%" }]}
            source={{ uri: images[0].url }}
          />
        </Pressable>
      )}
    </View>
  );
};

export default BasicPostDisplay;
