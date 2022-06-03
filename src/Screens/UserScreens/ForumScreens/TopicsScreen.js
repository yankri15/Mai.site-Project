import { View, Text, Pressable, FlatList, Vibration } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase"
import { globalStyles } from '../../../styles/global';


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

    return (
        <View
            style={{ flex: 1 }}
        >
            <Text style={globalStyles.forum_title_text}>הנושאים שלנו</Text>
            <View
                style={{ flex: 12 }}
            >
                <FlatList
                    data={topics}
                    renderItem={({ item }) => (
                        <Pressable
                            style={globalStyles.forums_titles}
                            onPress={() => {
                                navigation.navigate("Subject", { item });
                                Vibration.vibrate(15)
                            }}>
                            <Text style={globalStyles.forums_titles_txt}>{item.topicName}</Text>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{ height: 15 }}
                            >
                            </View>
                        )
                    }}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <Text style={globalStyles.be_first}>נראה שאין מה להציג כרגע..</Text>
                            </View>
                        )
                    }}

                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default TopicsScreen