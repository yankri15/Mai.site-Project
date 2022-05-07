import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { db } from "../../firebase";
import { collection, doc, getDoc, query, getDocs, ref } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

const Post = ({ postID }) => {
    const [postData, setPostData] = useState("");
    const [comments, setCommnets] = useState("");

    useEffect(() => {
        const getpostData = async () => {
            const q = doc(db, "posts", postID);
            const docSnap = await getDoc(q);
            setPostData(docSnap.data());
        };

        const getComments = async () => {
            const subCOl = collection(db, "posts", postID, "comments");
            const qSnap = await getDocs(subCOl);
            setCommnets(qSnap.docs);
        };
        getpostData().catch(console.error);
        getComments().catch(console.error);
        return;
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>{postData.postText}</Text>
            </View>
            <View>
                {console.log(postData.downloadURL)}
                {/* {console.log(comments)} */}
                {comments
                    ? comments.map((item, index) => {
                        console.log(item.data().commentText);
                    })
                    : console.log("shit")}
            </View>
        </SafeAreaView>
    );
};

export default Post;