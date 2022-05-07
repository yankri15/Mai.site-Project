import { View, Text, Pressable, TextInput, Image, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/global';
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { useAuth } from '../../AuthProvider/AuthProvider';
import { doc, setDoc } from 'firebase/firestore';


const CreatePost = () => {

    const { currentUser } = useAuth();
    const { global } = globalStyles;
    const [image, setImage] = useState(null);
    const [postText, setPostText] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadPost = async () => {
        if (!image || !postText) {
            Alert.alert('חובה למלא את כל השדות');
            return;
        }
        console.log("Uploading image............");
        const date = new Date().toLocaleString();
        const path = '/img/' + currentUser.uid + date + '.jpg';
        const docRef = ref(storage, path);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(docRef, bytes);

        await setDoc(doc(db, "posts", currentUser.uid), {
            downloadURL: path,
            postText: postText,
            creation: new Date(),
        });
    }

    return (
        <SafeAreaView style={global}>
            <Text>CreatePost</Text>
            <TextInput
                placeholder="דבר אלינו"
                onChangeText={(text) => setPostText(text)}
                style={{
                    height: 100,
                }}
            />
            {image ?
                (<Image
                    source={{ uri: image }}
                    style={{
                        height: 100,
                        width: 100,
                    }}
                />) : (<Pressable
                    title="edit"
                    onPress={pickImage}
                >
                    <Text>בחר תמונה</Text>
                </Pressable>)}
            <Pressable
                title="post"
                onPress={uploadPost}
            >
                <Text>פרסם</Text>
            </Pressable>
        </SafeAreaView >
    )
}

export default CreatePost