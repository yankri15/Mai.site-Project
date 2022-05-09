import { View, Text, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from "react";
import { globalStyles } from '../styles/global'
import { db } from '../../firebase';
import { getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthProvider/AuthProvider';

const UserPicName = ({ navigation }) => {

    const { currentUser } = useAuth();
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            setName(userData.name);
            // console.log('Getting data/////////////');
            // console.log(userData.name)
        };
        getUserData();
    }, []);

    return (
        <View style={globalStyles.user_pic_name}>
            <View style={globalStyles.user_pic}>
                <Image source={require('../../assets/default_profile_pic.jpg')} style={globalStyles.logo_image_area}></Image>
            </View>
            <Pressable
                title="to_profile"
                onPress={() => { navigation.navigate("Profile") }}
            >
                <Text style={globalStyles.user_name}>{name}</Text>
            </Pressable>
        </View>
    )
}

export default UserPicName