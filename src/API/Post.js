import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import {
    collection,
    doc,
    getDoc,
    query,
    getDocs
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { async } from "@firebase/util";
import { getDownloadURL } from "firebase/storage";

const Post = ({ postID }) => {
    const [postData, setPostData] = useState("");
    const [comments, setCommnets] = useState("");
    const [url, setUrl] = useState();

    useEffect(() => {
        const getpostData = async () => {
            const q = doc(db, "posts", postID);
            const docSnap = await getDoc(q);
            setPostData(docSnap.data());
            console.log(docSnap.data().downloadURL);


            const docRef = ref(storage, '/img/qvnWTHyygCXTOlH97zUgj8tnvq33.jpg');
            await getDownloadURL(docRef).then((uri) => {
                console.log(uri);
                setUrl(uri);
            })
        };

        const getComments = async () => {
            const subCOl = collection(db, "posts", postID, "comments");
            const qSnap = await getDocs(subCOl);
            setCommnets(qSnap.docs);
        };

        getpostData().catch(console.error);
        //getComments().catch(console.error);
        return;
    }, []);

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        //     <View>
        //         <Text>{postData.postText}</Text>
        //     </View>
        //     <View>
        //         {console.log(postData.downloadURL)}
        //         {/* {console.log(comments)} */}
        //         {comments
        //             ? comments.map((item, index) => {
        //                 console.log(item.data().commentText);
        //             })
        //             : console.log("shit")}
        //     </View>
        // </SafeAreaView>
        <View>
            <Text>{postData && postData.postText}</Text>
            {url && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default Post;