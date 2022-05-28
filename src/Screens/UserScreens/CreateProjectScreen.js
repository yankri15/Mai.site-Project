import { View, Text, Image, Alert, TextInput, Pressable, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect, Fragment } from 'react'
import { globalStyles } from '../../styles/global';
import { useData } from '../../AuthProvider/UserDataProvider';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ImagePicker from "expo-image-picker";
import { useAuth } from '../../AuthProvider/AuthProvider';
import Ionicons from "react-native-vector-icons/Ionicons";
import DropdownSearch from '../../API/DropdownSearch';

const CreateProjectScreen = ({ navigation }) => {
    const { currentUser } = useAuth();
    const { uploadProject, uploadImg, usersList, getUsersList } = useData();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [images, setImages] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayUsers, setDisplayUsers] = useState('none');

    useEffect(() => {
        getUsersList();
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

    const handleSearchUser = (text) => {
        if (!text) {
            return setUsersData([]);
        }
        const users = [];
        usersList.forEach(user => {
            if (user.data.name.includes(text)) {
                users.push({ id: user.id, name: user.data.name });
            }
        });
        setUsersData(users);
        setDisplayUsers('flex');
    }

    const handleSelectUser = (userData) => {
        //console.log('handler!\n');
        let found = false;
        collaborators.forEach(user => {
            if (user.id === userData.id) {
                found = true;
            }
        })
        if (!found) {
            setCollaborators(prev => [...prev, userData]);
        }
        setDisplayUsers('none');
        //console.log('done: ', collaborators);
    }

    const handleUnselectUser = (userData) => {
        const users = collaborators.filter(user => user.id !== userData.id);
        setCollaborators(users);
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="שם הפרוייקט"
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="ארגון"
                onChangeText={(text) => setOrganization(text)}

            />
            <TextInput
                placeholder="ספרו לנו על הפרויקט"
                onChangeText={(text) => setDescription(text)}
            />
            <DropdownSearch
                placeHolder={'שותפים'}
                selectedItems={collaborators}
                filteredList={usersData}
                handleSearch={handleSearchUser}
                handleSelect={handleSelectUser}
                handleUnselect={handleUnselectUser}
                display={displayUsers}
                setDisplay={setDisplayUsers}
            />
            {/* <DropdownSearch
                placeHolder={'נושא/י הפרויקט'}
                selectedItems={tags}
                filteredList={filteredTags}
                handleSearch={handleSearch}
                handleSelect={handleSelect}
                handleUnselect={handleUnselect}
                display={display}
                setDisplay={setDisplay}
            /> */}
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
                style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: 80, height: 30, bottom: 20, left: 10, backgroundColor: 'gray' }}
            >
                <Text >פרסמו אותי!</Text>
            </Pressable>
        </View>
    )
}

export default CreateProjectScreen