// add connection to edit profile
//connect to user
import { View, Text } from 'react-native'
import { StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                </View>
                
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require('../../../assets/profile-pic.png')} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.edit}>
                        <MaterialIcons name="Edit" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>name - Take from user</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>about - Take from user</Text>
                </View>
                   
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
                        <Text style={[styles.text, styles.subText]}>Projects</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>5</Text>
                        <Text style={[styles.text, styles.subText]}>intrest</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>????</Text>
                    </View>
                </View>
                   
                    
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
     profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    edit: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        
        alignItems: "center",
        flex: 1
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    }})