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
    const { uploadProject, uploadProjectPost, uploadImg, usersList, getUsersList, tagsList, getTags, getPosts } = useData();
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
    const [displayTags, setDisplayTags] = useState('none');

    useEffect(() => {
        getUsersList();
        getTags();
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

    const handleRemovePic = (image) => {
        const temp = images.filter(currImage => image !== currImage);
        setImages(temp);
    }

    const handleUploadProject = () => {
        setLoading(true);
        if (!name) {
            Alert.alert("אנא מלאו שם פרויקט");
            setLoading(false);
            return;
        }
        if (!organization) {
            Alert.alert("אנא מלאו שם ארגון");
            setLoading(false);
            return;
        }
        if (!description) {
            Alert.alert("אנא כתבו תיאור");
            setLoading(false);
            return;
        }
        if (tags.length === 0) {
            Alert.alert("אנא בחרו לפחות נושא אחד");
            setLoading(false);
            return;
        }
        const imageURLs = images.map((image, index) => {
            const path = "/img/" + currentUser.uid + "/projects/" + new Date().getTime() + index + ".jpg";
            uploadImg(path, image);
            return path;
        });
        setImages(imageURLs);
        uploadProject(name, organization, collaborators, imageURLs, tags, description).then(pid => {
            uploadProjectPost(pid, 'פרויקט חדש באוויר!', imageURLs, 'create').then(() => {
                getPosts();
                navigation.navigate("Feed");
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

    const handleSearchTag = (text) => {
        if (!text) {
            return setFilteredTags(tagsList);
        }
        const currTags = [];
        tagsList.forEach(tag => {
            if (tag.name.includes(text)) {
                currTags.push(tag);
            }
        });
        setFilteredTags(currTags);
        setDisplayTags('flex');
    }

    const handleSelectTag = (tag) => {
        let found = false;
        tags.forEach(currTag => {
            if (currTag.id === tag.id) {
                found = true;
            }
        })
        if (!found) {
            setTags(prev => [...prev, tag]);
        }
        setDisplayTags('none');
    }

    const handleUnselectTag = (tag) => {
        const currTags = tags.filter(currTag => currTag.id !== tag.id);
        setTags(currTags);
    }

    return (
        <ScrollView style={globalStyles.global}>
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={globalStyles.title_creat_post}
                >{"פרסמו את הפרויקט שלכם"}</Text>
                <TextInput
                    placeholder="שם הפרוייקט"
                    style={globalStyles.textInputProject}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    placeholder="ארגון"
                    onChangeText={(text) => setOrganization(text)}
                    style={globalStyles.textInputProject}
                />
                <TextInput
                    placeholder="ספרו לנו על הפרויקט"
                    onChangeText={(text) => setDescription(text)}
                    style={globalStyles.msg_text_project}
                    multiline={true}
                />
            </View>
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
            <DropdownSearch
                placeHolder={'נושא/י הפרויקט'}
                selectedItems={tags}
                filteredList={filteredTags}
                handleSearch={handleSearchTag}
                handleSelect={handleSelectTag}
                handleUnselect={handleUnselectTag}
                display={displayTags}
                setDisplay={setDisplayTags}
            />
            <Pressable
                onPress={pickImage}
                style={globalStyles.choose_img}
            >
                {/* <Text>העלו תמונות</Text> */}
                <Text style={globalStyles.choose_img_text}>
                    <Ionicons name="image-outline" size={25}></Ionicons>+
                </Text>
            </Pressable>
            <FlatList
                data={images}
                horizontal={true}
                renderItem={({ item }) => (
                    <View
                        style={{ position: 'relative', }}
                    >
                        <Ionicons
                            name="close-outline"
                            style={globalStyles.del_img}
                            size={20}
                            onPress={() => { handleRemovePic(item) }}
                        />
                        <Image
                            source={{ uri: item }}
                            style={globalStyles.img_horizontal}
                        />
                    </View>
                )}
                // ListEmptyComponent={() => {
                //     return (
                //         <View
                //             style={{ marginTop: 20 }}
                //         >
                //             <Text>התמונות שתעלו יוצגו כאן..</Text>
                //         </View>
                //     );
                // }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: 5, height: 100 }}></View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList >
            <Pressable style={globalStyles.to_post} title="post" onPress={handleUploadProject} disabled={loading}>
                <Text style={globalStyles.to_post_text}>פרסמו אותי!</Text>
            </Pressable>

            {/* <Pressable
                title="post"
                onPress={handleUploadProject}
                disabled={loading}
                style={{
                    position: 'absolute', justifyContent: 'center', width: 80, height: 50, bottom: 20, right: 10, borderColor: 'black',
                    borderStyle: 'solid',
                    backgroundColor: "#a77ce8",
                    textAlign: "center",
                }}
            >
                <Text
                    style={{
                        color: 'black', color: "#fdc123",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >{'פרסמו אותי!'}</Text>
            </Pressable> */}
        </ScrollView>
    )
}

export default CreateProjectScreen