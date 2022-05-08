import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const PostContext = React.createContext();

export function usePost() {
  return useContext(PostContext);
}
const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState("");
  const [comments, setCommnets] = useState("");
  const [url, setUrl] = useState();
  const [posts, setPosts] = useState([]);

  const getPostData = async () => {
    setPosts(() => {
      return [];
    });
    const q = collection(db, "posts");
    const docSnap = await getDocs(q);
    docSnap.docs.map(async (item) => {
      const tmp = collection(db, "posts", item.id, "userPosts");
      const tmpSnap = await getDocs(tmp);
      tmpSnap.docs.map(async (element) => {
        setPosts((prev) => {
          const data = element.data();
          prev.push(data);
          return prev;
        });
      });
    });
  };

  const getComments = async () => {
    const subCOl = collection(db, "posts", postID, "comments");
    const qSnap = await getDocs(subCOl);
    setCommnets(qSnap.docs);
  };

  const value = {
    getPostData,
    posts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostProvider;
