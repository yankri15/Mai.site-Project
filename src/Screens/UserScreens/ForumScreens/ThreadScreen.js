import { View, Text, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

const ThreadScreen = ({ route, navigation }) => {

    const [comments, setComments] = useState([]);
    const subjectData = route.params.item;

    useEffect(() => {
        setComments([]);
        const getComments = async () => {
            const docRef = collection(db, "forum", subjectData.topicId, subjectData.topicName, subjectData.threadId, "comments");
            const docSnap = await getDocs(docRef);
            console.log(docSnap.docs[0].data());

            docSnap.docs.forEach((element) => {
                setComments((prev) => [...prev, { ...subjectData, "commentId": element.id, "commentData": element.data() }]);
            })
        }
        if (!comments || comments.length == 0)
            getComments().catch(console.error);
        return;
    }
        , []);

    return (
        <SafeAreaView>
            {comments && comments.length > 0 ?
                (
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.commentData.comment}</Text>
                                <Text>{item.commentData.uid}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>מיד נציג אתכם</Text>
                )}
        </SafeAreaView>
    )
}

export default ThreadScreen