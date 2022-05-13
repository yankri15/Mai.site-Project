import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase"


const TopicsScreen = ({ navigation }) => {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        setTopics([]);
        const getTopics = async () => {
            const docRef = collection(db, "forum");
            const docSnap = await getDocs(docRef);
            // console.log(docSnap.docs[0].data().name);
            // console.log(docSnap.docs[0].id);

            docSnap.forEach((element) => {
                setTopics((prev) => [...prev, { "topicId": element.id, "topicName": element.data().name }]);
            })
        }
        if (!topics || topics.length == 0)
            getTopics().catch(console.error);
        return;
    }
        , []);


    // console.log(topics[0]);


    return (
        <SafeAreaView>
            {topics && topics.length > 0 ?
                (
                    <FlatList
                        data={topics}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => navigation.navigate("Subject", { item })}>
                                <Text>{item.topicName}</Text>
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>מיד נציג אתכם</Text>
                )}
        </SafeAreaView>
    )
}

export default TopicsScreen