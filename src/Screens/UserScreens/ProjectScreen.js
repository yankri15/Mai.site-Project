import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from "../../styles/global";
import { ScrollView } from 'react-native-gesture-handler';

const ProjectScreen = ({ route, navigation }) => {
    const project = route.params.project;
    console.log(project);
    return (
        <SafeAreaView style={globalStyles.global}>
            <ScrollView>
                <Text style={globalStyles.forum_title_text}>{project.name}</Text>
                <View style={globalStyles.project_details_view}>
                    <Text style={globalStyles.project_title_details}>יוצר המיזם: </Text>
                    <Text style={globalStyles.project_details}>
                        {project.uid}
                    </Text>
                </View>
                <View style={globalStyles.project_details_view}>
                    <Text style={globalStyles.project_title_details}>שותפים: </Text>
                    <Text style={globalStyles.project_details}>
                        {/*!!! להציג את השותפים עם פסיק בינהם !!!*/}
                        {project.collaborators}
                    </Text>
                </View>
                <View style={globalStyles.project_details_view}>
                    <Text style={globalStyles.project_title_details}>ארגון: </Text>
                    <Text style={globalStyles.project_details}>{project.organization}</Text>
                </View>
                <View style={globalStyles.project_details_view}>
                    <Text style={globalStyles.project_title_details}>נושאי המיזם: </Text>
                    <Text style={globalStyles.project_details}>
                        {/*!!! להציג את התגיות עם פסיק בינהן !!!*/}
                        {project.tags}
                    </Text>
                </View>
                <View style={globalStyles.project_details_view}>
                    <Text style={globalStyles.project_title_details}>תיאור המיזם: </Text>
                    <Text style={globalStyles.project_details}>{project.description}</Text>
                </View>
                <View style={globalStyles.profile_line}></View>
                {/*!!! Posts here !!!*/}
            </ScrollView>
            <Pressable
                title="edit"
                onPress={() => {
                    navigation.navigate("CreatePost", { navigation });
                }}
                style={globalStyles.plus_btn}
            >
                <Text style={globalStyles.plus_btn_text}>+</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ProjectScreen
