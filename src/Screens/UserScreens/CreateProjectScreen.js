import { View, Text, Image, Alert, TextInput, Pressable, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect, Fragment } from 'react'
import { globalStyles } from '../../styles/global';
import { useData } from '../../AuthProvider/UserDataProvider';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ImagePicker from "expo-image-picker";
import { useAuth } from '../../AuthProvider/AuthProvider';

const CreateProjectScreen = ({ navigation }) => {
    const { currentUser } = useAuth();
    const { uploadProject, uploadImg, usersList, getUsersList } = useData();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [images, setImages] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        getUsersList()
            .then(() => {
                const users = usersList.map(user => {
                    return { id: user.id, name: user.data.name };
                });
                setUsersData(users);
            })
            .catch(console.error);
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImages(prev => [...prev, result.uri]);
        }
    };

    const handleUploadProject = () => {
        setLoading(true);
        if (!name || !organization || !description) {
            Alert.alert("חובה למלא את כל השדות");
            setLoading(false);
            return;
        }
        let imageURLs = [];
        images.forEach((image, index, arr) => {
            const path = "/img/" + currentUser.uid + "/projects/" + new Date().getTime() + ".jpg";
            imageURLs = [...imageURLs, path];
            uploadImg(path, image).then(() => {
                if ((index + 1) == arr.length) {
                    setImages(imageURLs);
                    uploadProject(name, organization, collaborators, imageURLs, tags, description);
                    navigation.navigate("Feed");
                }
            });
        });
    }

    const handleSelect = (userData) => {
        console.log('handler!\n');
        let found = false;
        collaborators.forEach(user => {
            if (user.id === userData.id) {
                found = true;
            }
        })
        if (!found) {
            setCollaborators(prev => [...prev, userData]);
        }
        setDisplay('none')
        console.log('done: ', collaborators);
    }

    return (
        <SafeAreaView style={globalStyles.global}>
            <TextInput
                placeholder="שם הפרוייקט"
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="ארגון"
                onChangeText={(text) => setOrganization(text)}

            />
            <TextInput
                placeholder='שותפים'
                onFocus={() => setDisplay('flex')}
                onBlur={() => setDisplay('none')}
            />
            {<View
                style={{ position: 'relative', display: display }}
            >
                <View
                    style={{ position: 'absolute', backgroundColor: 'gray', zIndex: 3, width: '100%' }}
                >
                    <FlatList
                        data={usersData}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => { handleSelect(item) }}
                                style={{ width: '100%', padding: 5 }}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                        )}
                        ListEmptyComponent={() => {
                            return (
                                <View>
                                    <Text>לא נמצאו משתמשים</Text>
                                </View>
                            );
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View
                                    style={{ height: 1, backgroundColor: 'black' }}
                                >
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>}
            <TextInput
                placeholder="ספרו לנו על הפרוייקט"
                onChangeText={(text) => setDescription(text)}
            // multiline={true}
            />
            <Pressable
                onPress={pickImage}
            >
                <Text>העלו תמונות</Text>
            </Pressable>
            <FlatList
                data={images}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                )}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <Text>התמונות שתעלו יוצגו כאן..</Text>
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{ width: 5, height: 100 }}
                        >

                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList >
            <Pressable
                title="post"
                onPress={handleUploadProject}
                disabled={loading}
                style={{ width: 80, height: 10, position: 'absolute', top: '50%', right: '70%' }}
            >
                <Text >פרסמו אותי!</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default CreateProjectScreen