import { View, Text, Alert, TextInput, Pressable, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../styles/global';
import { useData } from '../../AuthProvider/UserDataProvider';
import SearchableDropdown from 'react-native-searchable-dropdown';

const CreateProjectScreen = ({ navigation }) => {
    const { uploadProject, usersList, getUsersList } = useData();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [images, setImages] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const arr = [
        {
            id: 1,
            name: 'JavaScript',
        },
        {
            id: 2,
            name: 'Java',
        },
        {
            id: 3,
            name: 'Ruby',
        },
        {
            id: 4,
            name: 'React Native',
        },
        {
            id: 5,
            name: 'PHP',
        },
        {
            id: 6,
            name: 'Python',
        },
        {
            id: 7,
            name: 'Go',
        },
        {
            id: 8,
            name: 'Swift',
        },
    ];

    useEffect(() => {
        getUsersList().catch(console.error);

    }, [])


    const handleUploadProject = () => {
        setLoading(true);
        if (!name || !organization || !description) {
            Alert.alert("חובה למלא את כל השדות");
            setLoading(false);
            return;
        }
        uploadProject(name, organization, collaborators, images, tags, description);
        navigation.navigate("Feed");
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
            <SearchableDropdown
                selectedItems={selectedUsers}
                onItemSelect={(item) => {
                    setSelectedUsers(item);
                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(item, index) => {
                    // const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    // this.setState({ selectedItems: items });
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={arr}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                    {
                        placeholder: "placeholder",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        },
                    }
                }
                listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                }
            />
            <TextInput
                placeholder="ספרו לנו על הפרוייקט"
                onChangeText={(text) => setDescription(text)}
            // multiline={true}
            />
            <Pressable title="post" onPress={handleUploadProject} disabled={loading}>
                <Text >פרסמו אותי!</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default CreateProjectScreen