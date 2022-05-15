import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase"


const TopicsScreen = ({ navigation }) => {

    const [topics, setTopics] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    const handleRefresh = () => {
        getTopics().then(() => {
            setRefreshing(false);
        }).catch(console.error);
    }

    const getTopics = async () => {
        setTopics([]);
        const docRef = collection(db, "forum");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((element) => {
            setTopics((prev) => [...prev, { "topicId": element.id, "topicName": element.data().name }]);
        })
    }
    useEffect(() => {
        getTopics()
            .then(() => {
                setRefreshing(false);
            })
            .catch(console.error);
        return;
    }
        , []);


    // console.log(topics[0]);


    return (
        <SafeAreaView>
            {(
                <FlatList
                    data={topics}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate("Subject", { item })}>
                            <Text>{item.topicName}</Text>
                        </Pressable>
                    )}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <Text>נראה שאין מה להציג כרגע..</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    )
}

export default TopicsScreen