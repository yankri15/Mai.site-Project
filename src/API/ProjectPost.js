import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useData } from '../AuthProvider/UserDataProvider'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ProjectPost = ({ pid, navigation }) => {

    const [project, setProject] = useState([]);

    const getProject = async (pid) => {
        const docRef = doc(db, 'projects', pid);
        const docSnap = await getDoc(docRef);
        setProject(docSnap.data());
    }


    useEffect(() => {
        getProject(pid).then(() => {
            console.log(project);
        });
    }, [])

    return (
        <View>
            <Pressable
                style={{ alignItems: 'center' }}
                onPress={() => navigation.navigate("Project", { project: project })}
            >
                <Text>{"שם הפרויקט: " + project.name}</Text>
                <Text>{"ארגון: " + project.organization}</Text>
                <Text>{"תיאור: " + project.description}</Text>
            </Pressable>
        </View>
    )
}

export default ProjectPost