import { View, Text } from 'react-native'
import React from 'react'

const ProjectScreen = ({ route, navigation }) => {
    const project = route.params.project;
    console.log(project);
    return (
        <View>
            <Text>ProjectScreen</Text>
        </View>
    )
}

export default ProjectScreen