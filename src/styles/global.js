import { StyleSheet, StatusBar, Dimensions  } from "react-native";
import { borderColor, shadowOffset } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export const globalStyles = StyleSheet.create({
    global: {
        marginTop: StatusBar.currentHeight,
        height: '100%',
    },
    container_enter_screens: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a77ce8",
    },
    textInput: {
        borderColor: "black",
        color: "#000000",
        width: '90%',
        padding: 5,
        paddingRight: 10,
        fontSize: 17,
        borderWidth: 2,
        marginBottom: 4,
        textAlign: "right",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: "#fffffa",
    },
    loading: {
        flex: 1,
    },
    mapScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    ////////////////////////////////////////////////
    landing_imageArea: {
        margin: 25,
    },
    landing_title_text: {
        color: "#fdc123",
        fontSize: 50,
        fontWeight: "bold",
        margin: -5,
    },
    landing_reg_button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        marginTop: 2,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#000000",
    },
    landing_reg_btn_text: {
        color: "#fdc123",
        fontSize: 15,
        fontWeight: "bold",
    },
    landing_log_button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#fdc123",
    },
    landing_log_btn_text: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
    },
    ////////////////////////////////////////////////
    enter_button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#fdc123",
    },
    enter_btn_text: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
    },
    logo: {
        width: 100,
        height: 100,
        bottom: 20,
        borderRadius: 100,
        overflow: "hidden",
    },
    logo_image_area: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    already_have: {
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "black",
        fontWeight: "bold",
        paddingTop: 20,
    },
    blue_btn: {
        paddingTop: 20,
        marginBottom: 4,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "blue",
        fontWeight: "bold",
        textDecorationLine: 'underline'
    },
    forgot_title: {
        top: 1,
        marginBottom: 30,
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "sans-serif",
    },
    ////////////////////////////////////////////////
    fill_title_text: {
        color: "#fdc123",
        fontSize: 30,
        fontWeight: "bold",
    },
    datePicker: {
        flexDirection: "row",
        alignContent: "center",
        width: 315,
    },
    picker: {
        flex: 1,
        margin: 2,
        fontSize: 10,
    },
    ////////////////////////////////////////////////
    draw_pic_name: {
        alignItems: "center",
        margin: '3%',
    },
    drawer_pic: {
        height: 85,
        width: 85,
        borderRadius: 100,
    },
    drawer_name: {
        color: "#fff",
        fontSize: 20,
    },
    drawer_props: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: '2%',
    },
    sign_out_area: {
        padding: '5%',
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    sign_out: {
        flexDirection: "row",
        alignItems: "center",
    },
    sign_out_text: {
        fontSize: 15,
        marginRight: '3%',
    },
    stage1: {
        flexDirection: "column",
        alignContent: "space-between",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '10%',
        marginBottom: '2%',
    },
    stage2: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '5%',
    },
    stage3: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '5%',
    },
    touchable_profile_pic: {
        height: 35,
        width: 35,
        position: 'absolute',
        right: '2%',
        top: '3%',
        borderRadius: 100,
    },
    hamburger_profile_pic: {
        flexDirection: "row",
    },
    profile_edit_btn: {
        position: 'absolute',
        left: '3%',
        top: '2%',
    },
    profile_edit_btn_text: {
        color: "#c8c8c8",
    },
    profile_pic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        justifyContent: "center",
        marginBottom: '3%',
    },
    profile_title: {
        fontWeight: "bold",
        fontSize: 25,
    },
    edit_profile_pic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        //alignItems: "center",
        justifyContent: "center",
        marginBottom: '3%',
    },
    profile_details: {
        fontWeight: "bold",
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '1%',
    },
    profile_line: {
        width: '100%',
        borderWidth: 3,
        borderColor: '#fee6a7',
        marginTop: '2%',
        marginBottom: '5%',
    },
    picAndDetails: {
        alignItems: "center",
        justifyContent: "center",
    },
    side_details: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: '3%',
    },
    side_details_comp: {
        flexDirection: "row",
        marginLeft: '2%',
        marginBottom: '2%',
    },
    // circle_details: {
    //     width: '78%',
    //     height: 82,
    //     backgroundColor: "#fdc123",
    //     borderColor: "black",
    //     borderWidth: 1,
    //     borderRadius: 100,
    //     justifyContent: "center",
    //     margin: 5,
    // },
    side_details_text: {
        fontWeight: "bold",
        textAlign: "left",
        justifyContent: "center",
        fontSize: 13,
        marginLeft: '2%',
        flexWrap: "wrap",
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: '5%',
    },
    ////////////////////////////////////////////////
    plus_btn: {
        position: 'absolute',
        bottom: '7%',
        left: '5%',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: "#a77ce8",
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderWidth: 2,
        borderRadius: 100,
        // padding: '1%',
    },
    plus_btn_text: {
        textAlign: 'center',
        color: "#fdc123",
        fontSize: 18,
        fontWeight: "bold",
        padding: '2%',
    },
    title_creat_post: {
        textAlign: "center",
        fontSize: 25,
        color: "#fdc123",
        fontWeight: "bold",
        top: '1.5%',
        marginBottom: '5%',
    },
    create_post_text: {
        marginLeft: '3%',
        color: "#000000",
        width: '94%',
        height: '60%',
        textAlignVertical: 'top',
        marginBottom: '3%',
        padding: 10,
        fontSize: 20,
        textAlign: "right",
        borderRadius: 10,
    },
    choose_img: {
        width: '15%',
        position: 'absolute',
        bottom: '8.5%',
        right: '5%',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: "#fdc123",
        textAlign: "center",
        borderWidth: 2,
        borderRadius: 8,
    },
    choose_img_text: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    create_post_img: {
        height: '75%',
        marginTop: '2%',
        //width: '92%',
        //marginLeft: '4%',
        resizeMode: 'stretch',
        resizeMode: 'contain',
    },
    to_post: {
        position: 'absolute',
        bottom: '8%',
        left: '5%',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: "#a77ce8",
        textAlign: "center",
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
    },
    to_post_text: {
        color: "#fdc123",
        fontWeight: "bold",
        fontSize: 20,
    },
    ////////////////////////////////////////////////
    feed: {
        marginTop: '-7.5%',
        bottom: '4.5%',
        backgroundColor: "#fee6a7",
    },
    empty_feed: {
        color: "#fdc123",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "center",
    },
    list_of_posts: {
        width: '100%',
        marginBottom: '1%',
        backgroundColor: "#ffffff"
    },
    topic_post: {
        // flexDirection: "row",
    },
    post: {
        width: '100%',
        paddingBottom: '1%',
        marginTop: '-1%',
        backgroundColor: "#ffffff"
    },
    post_text: {
        textAlign: "left",
        margin: '3%',
        fontSize: 17,
    },
    post_img: {
        width: '100%',
        height: 375,
        paddingBottom: '2%',
        resizeMode: 'stretch',
        resizeMode: 'contain',
    },
    edit_post: {
        color: "#C8C8C8",
        alignSelf: 'flex-end',
        position: 'absolute',
        top: '1.5%',
        right: '2.5%',
    },
    user_pic: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: "hidden",
        margin: '2%',
    },
    user_name: {
        fontWeight: "bold",
    },
    user_pic_name: {
        flexDirection: "row",
        alignItems: "center",

    },
    take_a_pic: {
        flexDirection: "row",
        marginBottom: '7%',
    },
    take_a_pic_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#000000",
    },
    take_a_pic_btn_text: {
        fontSize: 15,
        color: "#fdc123",
        fontWeight: "bold",
    },
    like_comment: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: '8%',
        marginRight: '8%',
        paddingBottom: '2%',
        marginTop: '2%',
    },
    details_like_comment: {
        flexDirection: "row",
        justifyContent: "space-between",
        //marginLeft: '8%',
        //marginRight: '8%',
       // paddingBottom: '2%',
       // marginTop: '2%',
    },
    like_comment_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    like_comment_btn_txt: {
        color: "#c6c6b5",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: '5%',
    },
    info_like_comment_txt: {
        color: "#c6c6b5",
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: '2%',
    },
    like_comment_line: {
        width: '94%',
        marginLeft: '3%',
        borderWidth: 0.5,
        borderColor: '#c6c6b5',
        marginTop: '2%',
        marginBottom: '0.5%',
    },
    /////////////////Forum_Topic/////////////////
    forum_title_text: {
        color: "#fdc123",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: '2%',
    },
    forums_titles: {
        margin: '2%',
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowOffset: { width: 1, height: 13 },
        shadowRadius: 20,
    },
    forums_titles_txt: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#a77ce8",
    },
    /////////////////Forum_Subject/////////////////
    open_sub_btn: {
        position: 'absolute',
        bottom: '7%',
        left: '5%',
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: "#a77ce8",
        textAlign: "center",
        borderWidth: 2,
        borderRadius: 100,
        padding: 5,
    },
    open_sub_btn_text: {
        color: "#fdc123",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10,
    },
    subjects: {
        marginTop: '1%',
    },
    subjects_txt: {
        fontSize: 18,
        color: "#a77ce8",
        fontWeight: "bold",
        margin: '2%',
        marginBottom: '5%',
    },
    /////////////////Forum_Create_Thread/////////////////

    /////////////////Forum_Thread/////////////////

    /////////////////Forum_Comment/////////////////
    Forum_Comment: {
        marginBottom: '15%',
        borderColor: "black",
        borderWidth: 1,
        padding: "4%",
        borderRadius: 20,
        width: "96%",
        marginLeft: "3%"

    },

    Forum_Button:{
        borderColor: "black",
        borderStyle: 'solid',
        backgroundColor: "#a77ce8",
        borderRadius: 50,
        borderWidth: 3,
        marginTop: "5%",
        width: "30%",
    },

    Forum_Button_Text:{
        color: "#fdc123",
        fontSize: 15,
        fontWeight: "bold",
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop:5,

    },

    Forum_Comment_Text:{

    }
});