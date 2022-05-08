import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { async } from "@firebase/util";
import { getDownloadURL } from "firebase/storage";

const Post = ({ postID }) => {
  const [postData, setPostData] = useState("");
  const [comments, setCommnets] = useState("");
  const [url, setUrl] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getpostData = async () => {
      const q = collection(db, "posts");
      const docSnap = await getDocs(q);

      docSnap.docs.map(async (item, index) => {
        const tmp = collection(db, "posts", item.id, "userPosts");
        const tmpSnap = await getDocs(tmp);
        tmpSnap.docs.map(async (element) => {
          setPosts((prev) => {
            prev.push(element.data());
          });
        });
      });
    };

    const getComments = async () => {
      const subCOl = collection(db, "posts", postID, "comments");
      const qSnap = await getDocs(subCOl);
      setCommnets(qSnap.docs);
    };

    getpostData()
      .catch(console.error)
      .then(() => {
        console.log(posts);
      });
  }, []);
  return (
    <View>
      <Text>{postData && postData.postText}</Text>
      {url && (
        <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default Post;
