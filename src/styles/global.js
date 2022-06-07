import { StyleSheet, StatusBar, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
  global: {
    marginTop: StatusBar.currentHeight,
    height: "100%",
  },
  container_enter_screens: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4A5F3",
  },
  textInput: {
    borderColor: "black",
    color: "#000000",
    width: "85%",
    padding: 5,
    paddingRight: "2%",
    fontSize: 17,
    borderWidth: 2,
    marginBottom: "2%",
    textAlign: "right",
    borderRadius: 5,
    backgroundColor: "#fffffa",
  },
  loading: {
    flex: 1,
  },
  mapScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  ////////////////////////////////////////////////
  landing_imageArea: {
    margin: 25,
  },
  landing_title_text: {
    color: "#FFD260",
    fontSize: 50,
    fontWeight: "bold",
  },
  landing_reg_button: {
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
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
  approval_waiting_view: {
    margin: '5%',
    borderWidth: 2,
    borderColor: '#FFD260',
    borderRadius: 20,
    backgroundColor: '#ffceee',
  },
  approval_waiting: {
    textAlign: 'center',
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    margin: '5%',
  },
  ////////////////////////////////////////////////
  enter_button: {
    alignItems: "center",
    justifyContent: "center",
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
    textDecorationLine: "underline",
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
  reg_bdate: {
    flexDirection: "row",
  },
  datePicker: {
    marginLeft: "22%",
  },
  picker: {
    flex: 1,
    margin: 2,
    fontSize: 10,
  },
  reg_choose: {
    //textAlign: "right",
    //justifyContent: 'flex-start',
    //width: "80%",
    height: 28,
    marginLeft: "-20%",
  },
  ////////////////////////////////////////////////
  draw_pic_name: {
    alignItems: "center",
    margin: "3%",
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
    paddingTop: "2%",
  },
  sign_out_area: {
    padding: "5%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  sign_out: {
    flexDirection: "row",
    alignItems: "center",
  },
  sign_out_text: {
    fontSize: 15,
    marginRight: "3%",
  },
  stage1: {
    flexDirection: "column",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginBottom: "2%",
  },
  stage2: {
    //backgroundColor: "#C4A5F3",
    textAlign: "center",
    //alignItems: 'center',
  },
  stage3: {
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: '5%',
  },
  touchable_profile_pic: {
    height: 35,
    width: 35,
    position: "absolute",
    right: "2%",
    top: "3%",
    borderRadius: 100,
  },
  hamburger_profile_pic: {
    flexDirection: "row",
  },
  profile_edit_btn: {
    position: "absolute",
    left: "3%",
    top: "2%",
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
    marginBottom: "3%",
  },
  edit_pic_view: {
    width: "10%",
    position: "absolute",
    top: "70%",
    left: "7%",
  },
  edit_pic: {
    backgroundColor: "#d8d8d8",
    borderRadius: 100,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  profile_title: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "2%",
    marginBottom: "2%",
  },
  edit_profile_pic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    //alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
  },
  profile_details: {
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1%",
  },
  profile_line: {
    width: "100%",
    borderWidth: 3,
    borderColor: "#fee6a7",
    //marginTop: '2%',
    //marginBottom: '5%',
  },
  picAndDetails: {
    alignItems: "center",
    justifyContent: "center",
  },
  side_details: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "3%",
  },
  side_details_comp: {
    flexDirection: "row",
    marginLeft: "2%",
    marginBottom: "2%",
    flexWrap: "wrap",
  },
  side_details_text: {
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "center",
    fontSize: 13,
    flexWrap: "wrap",
  },
  profile_project: {
    backgroundColor: "#fdc123",
    borderColor: "black",
    justifyContent: "center",
    width: 115,
    height: 80,
    //marginLeft: '17%',
    //marginRight: '17%',
    marginBottom: "8%",
    borderWidth: 2,
    borderRadius: 15,
  },
  profile_project_txt: {
    textAlign: "center",
    fontSize: 17,
    color: "#000000",
    fontWeight: "bold",
    padding: "2%",
    flexWrap: "wrap",
  },
  line: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: "black",
    marginBottom: "5%",
  },
  //////////////////project///////////////////////
  project_screen_details: {
    padding: "3%",
  },
  project_details_view: {
    flexDirection: "row",
    marginTop: "3%",
    flexWrap: "wrap",
  },
  project_title_details: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  project_details_container: {
    //alignContent: 'center',
    //alignItems: 'center',
    //width: '92%',
    marginLeft: "4%",
    marginRight: "4%",
    padding: "2%",
    marginBottom: "3%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e2e2e2",
  },
  project_details: {
    color: "black",
    fontSize: 15,
  },
  ////////////////////////////////////////////////
  plus_btn: {
    position: "absolute",
    bottom: "3%",
    left: "5%",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#a77ce8",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 100,
  },
  plus_btn_text: {
    textAlign: "center",
    color: "#fdc123",
    fontSize: 18,
    fontWeight: "bold",
    padding: "2%",
  },
  title_creat_post: {
    textAlign: "center",
    fontSize: 25,
    color: "#fdc123",
    fontWeight: "bold",
    top: "1.5%",
    marginBottom: "5%",
  },
  create_post_text: {
    marginLeft: "3%",
    color: "#000000",
    width: "94%",
    height: "45%",
    textAlignVertical: "top",
    marginBottom: "1%",
    padding: "2%",
    fontSize: 20,
    textAlign: "right",
  },
  choose_img: {
    width: "15%",
    //position: 'absolute',
    //bottom: '1%',
    left: "5%",
    //top: '1%',
    marginTop: "3%",
    marginBottom: "3%",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#fdc123",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 12,
  },
  choose_img_text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  del_img: {
    position: "absolute",
    top: 5,
    left: 5,
    color: "black",
    backgroundColor: "#DEDAD9",
    zIndex: 3,
    borderRadius: 5,
  },
  img_horizontal: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  create_post_img: {
    height: "75%",
    marginTop: "2%",
    //width: '92%',
    //marginLeft: '4%',
    resizeMode: "stretch",
    resizeMode: "contain",
  },
  to_post: {
    //position: 'absolute',
    width: "38%",
    alignItems: "center",
    //bottom: '1%',
    left: "5%",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#a77ce8",
    //textAlign: "center",
    borderWidth: 2,
    borderRadius: 12,
    padding: "2%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  to_post_text: {
    color: "#fdc123",
    fontWeight: "bold",
    fontSize: 20,
  },
  ////////////////////////////////////////////////
  feed: {
    // marginTop: '-7.5%',
    // bottom: '4.5%',
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
    width: "100%",
    marginBottom: "1%",
    backgroundColor: "#ffffff",
  },
  post: {
    width: "100%",
    paddingBottom: "1.5%",
    marginBottom: "1%",
    //marginTop: '0%',
    backgroundColor: "#ffffff",
  },
  post_text: {
    textAlign: "left",
    margin: "3%",
    fontSize: 17,
  },
  post_img: {
    width: "100%",
    height: 375,
    paddingBottom: "2%",
    resizeMode: "stretch",
    resizeMode: "contain",
  },
  images_length_view: {
    position: 'absolute',
    top: '4%',
    right: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 60,
  },
  images_length_txt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold', 
  },
  edit_post: {
    color: "#C8C8C8",
    alignSelf: "flex-end",
    position: "absolute",
    top: "1.5%",
    right: "2.5%",
  },
  edit_comment: {
    color: "#595959",
    alignSelf: "flex-end",
    position: "absolute",
    top: "6%",
    right: "10%",
  },
  be_first: {
    textAlign: "center",
    fontSize: 20,
    color: "#a77ce8",
    padding: "2%",
  },
  filter_btns: {
    padding: 8,
    margin: 7,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  user_pic: {
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: "hidden",
    margin: "2%",
  },
  user_name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  user_date: {
    fontSize: 13,
    color: "#808080",
    textAlign: "left",
  },
  user_pic_name: {
    flexDirection: "row",
    alignItems: "center",
  },
  name_date: {
    flexDirection: "column",
  },
  take_a_pic: {
    flexDirection: "row",
    marginBottom: "7%",
  },
  take_a_pic_btn: {
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: "10%",
    marginRight: "10%",
    // paddingBottom: "1%",
    marginTop: "1%",
  },
  details_like_comment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "4%",
    marginRight: "0.5%",
  },
  info_like_comment: {
    flexDirection: "row",
    marginBottom: "1%",
  },
  like_comment_btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  like_comment_btn_txt: {
    color: "#cecece",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "5%",
  },
  info_like_comment_txt: {
    color: "#cecece",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: "6%",
  },
  like_comment_line: {
    width: "94%",
    marginLeft: "3%",
    borderWidth: 0.2,
    borderColor: "#e2e2e2",
    marginTop: "1%",
    marginBottom: "1%",
  },
  comment_like_info_view: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bc99f0",
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  /////////////////Forum_Topic/////////////////
  forum_title_text: {
    color: "#fdc123",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  forums_titles: {
    alignItems: "center",
    backgroundColor: "#e2e2e2",
    padding: "5%",
    marginBottom: "1.5%",
    marginRight: "10%",
    marginLeft: "10%",
    borderRadius: 25,
  },
  forums_titles_txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a77ce8",
  },
  /////////////////Forum_Subject/////////////////
  open_sub_btn: {
    position: "absolute",
    bottom: "3%",
    left: "5%",
    borderColor: "black",
    borderStyle: "solid",
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
    marginTop: "1%",
  },
  subjects_txt: {
    fontSize: 18,
    color: "#a77ce8",
    fontWeight: "bold",
    margin: "2%",
    marginBottom: "5%",
  },
  comment: {
    backgroundColor: "#e2e2e2",
    paddingBottom: "2%",
    marginBottom: "2%",
    marginTop: "2%",
    width: "92%",
    marginLeft: "4%",
    borderRadius: 20,
  },
  dots: {
    position: "absolute",
    top: "1%",
    right: "3%",
  },
  first_comment: {
    justifyContent: "center",
    backgroundColor: "#fff89e",
    paddingBottom: "2%",
    marginBottom: "2%",
    //width: "92%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 25,
  },
  comment_data: {
    marginLeft: "15%",
    marginRight: "3%",
  },
  /////////////////Forum_Create_Thread/////////////////
  create_thread: {
    flex: 13,
    marginTop: "15%",
    marginLeft: "5%",
  },
  create_thread_title: {
    fontSize: 25,
    marginBottom: "10%",
  },
  create_thread_first_cmnt: {
    fontSize: 20,
  },
  /////////////////Forum_Thread/////////////////
  tread_title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#a77ce8",
    marginTop: "5%",
  },
  tread_comments: {
    marginLeft: "2%",
  },
  /////////////////Forum_Comment/////////////////
  Forum_Comment: {
    flexDirection: "row",
    marginBottom: "1%",
    borderColor: "black",
    //borderWidth: 1,
    padding: "4%",
    borderRadius: 20,
    width: "92%",
    marginLeft: "4%",
  },
  Forum_Comment_Text: {
    width: "80%",
    fontSize: 15,
  },
  Forum_Button: {
    position: "absolute",
    bottom: "25%",
    right: "4%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    paddingLeft: "5%",
    backgroundColor: "#a77ce8",
    borderRadius: 100,
    width: 45,
    height: 45,
  },

  /////////////settings////////////////////
  settingsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C4A5F3",
  },

  settingsBtn: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "1.5%",
    borderColor: "black",
    borderWidth: 2,
    marginTop: "4%",
    marginBottom: "4%",
    borderRadius: 10,
    backgroundColor: "#FFD260",
    width: "50%",
  },
  settingsBtnText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C4A5F3",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modal_btn: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 17,
    marginBottom: 17,
    borderRadius: 10,
    backgroundColor: "#FFD260",
    width: "45%",
  },

  delete_text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "10%",
  },
  delete_dots_btn: {
    width: 50,
  },
  delete_dots_text: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
  msg_text: {
    borderColor: "black",
    color: "#000000",
    width: "85%",
    height: "25%",
    padding: 5,
    paddingRight: 10,
    fontSize: 17,
    borderWidth: 2,
    textAlign: "right",
    borderRadius: 5,
    backgroundColor: "#fffffa",
    textAlignVertical: "top",
  },

  //////////wanted/////////
  wanted_container: {
    flexDirection: "row",
    padding: "1%",
    marginBottom: "3%",
    flex: 1,
  },
  wanted_list_item: {
    marginLeft: "7%",
    marginRight: "7%",
    marginBottom: "5%",
    padding: "3.5%",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 4,
    backgroundColor: "#fee6a7",
  },
  wanted_text_title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  wanted_details_text_info: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#60b5ff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    margin: "2%",
    padding: "1.5%",
  },
  wanted_details_text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#bf92d1",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    margin: "2%",
    padding: "1.5%",
  },
  wanted_text: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  wanted_header: {
    color: "#fdc123",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "5%",
  },
  wanted_add_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C4A5F3",
  },
  wanted_new_title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: "8%",
    marginTop: "3%",
    color: "#fdc123",
  },
  wanted_text_input: {
    borderColor: "black",
    color: "#000000",
    width: "85%",
    padding: 5,
    paddingRight: 10,
    fontSize: 16,
    borderWidth: 2,
    marginBottom: "2%",
    textAlign: "right",
    borderRadius: 5,
    backgroundColor: "#fffffa",
  },
  wanted_btn: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  wanted_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
  },
  textInputProject: {
    borderColor: "black",
    color: "#000000",
    width: "90%",
    padding: 5,
    paddingRight: "2%",
    fontSize: 17,
    borderWidth: 2,
    marginBottom: "1.5%",
    textAlign: "right",
    borderRadius: 5,
    backgroundColor: "#fffffa",
  },
  msg_text_project: {
    borderColor: "black",
    color: "#000000",
    width: "90%",
    height: 200,
    padding: "1.5%",
    paddingRight: 10,
    fontSize: 17,
    borderWidth: 2,
    textAlign: "right",
    borderRadius: 5,
    backgroundColor: "#fffffa",
    textAlignVertical: "top",
    marginBottom: "1%",
  },
  choose_img_project: {
    width: "15%",
    marginLeft: "5%",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#fdc123",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 8,
  },
  textInputProjectNieg: {
    backgroundColor: "#fffffa",
    borderColor: "black",
    borderRadius: 5,
    padding: "0.5%",
    paddingRight: 10,
    fontSize: 17,
    borderWidth: 2,
    marginBottom: "1%",
    textAlign: "right",
  },
  /////////////Admin///////////////
  admin_title: {
    position: "absolute",
    top: "20%",
    color: "#fdc123",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  admin_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: "3%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fdc123",
    margin: "3%",
  },
  admin_btn_txt: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  /////////////Statistic///////////////
  stat_det: {
    margin: 0,
    padding: 0,
    fontSize: 90,
    fontWeight: "bold",
    color: "#373F47",
  },
  stat_txt: {
    marginBottom: "10%",
    padding: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#61676E",
  },
  stat_hedaers: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#61676E",
  },
});
