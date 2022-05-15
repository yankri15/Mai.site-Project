import { doc, setDoc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { useAuth } from "./AuthProvider";

const UserDataContext = React.createContext();
export function useData() {
  return useContext(UserDataContext);
}

const UserDataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userStatus, setUserStatus] = useState();
  const [name, setName] = useState("");

  //Add user to db with email and status
  const setUserToDB = async (uid, email) => {
    console.log("Creating collection for user " + uid + "......");
    await setDoc(doc(db, "users", uid), {
      email: email,
      status: 0,
    }).then(() => setUserStatus(0));
  };

  //Add other registration details (name, school, organization etc.)
  const addDataToDB = async (
    uid,
    name,
    day,
    month,
    year,
    school,
    classs,
    neighborhood,
    organiztion,
    uri
  ) => {
    await updateDoc(
      doc(db, "users", uid),
      "name",
      name,
      "birthDate",
      day + "/" + month + "/" + year,
      "school",
      school,
      "class",
      classs,
      "neighborhood",
      neighborhood,
      "organiztion",
      organiztion,
      "status",
      1,
      "pic",
      uri
    ).then(() => {
      setUserStatus(1);
    });
  };

  const changeData = async (
    uid,
    name,
    school,
    classs,
    neighborhood,
    organiztion,
    uri
  ) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    // if(name === "") name = userData.name;
    // if(school=== "") school = userData.school;
    // if(neighborhood=== "") neighborhood = userData.neighborhood;
    // if(organiztion === "") organiztion = userData.organization;
    // if(classs === "") classs = userData.classs;
    await updateDoc(
      doc(db, "users", uid),
      "name",
      name,
      "school",
      school,
      "class",
      classs,
      "neighborhood",
      neighborhood,
      "organiztion",
      organiztion,
      "pic",
      uri
    ).then(() => {
      console.log("details updated");
    });
  };



  //Approve user
  const approveUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), "status", 2).then(() => {
      setUserStatus(2);
    });
  };

  const getName = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
    }
  };

  const uploadDataPost = async (path, postText) => {
    await setDoc(doc(db, "posts", currentUser.uid), {
      filler: "Think about this problem",
    });
    await addDoc(collection(db, "posts", currentUser.uid, "userPosts"), {
      downloadURL: path,
      postText: postText,
      creation: serverTimestamp(),
    });
  }

  const uploadImg = async (path, image) => {
    const docRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(docRef, bytes);
    console.log("Up loaded succeffuly to path: ", path);
  }

  useEffect(() => {
    const getStatus = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUserStatus(docSnap.data().status);
      }
    };
    getStatus().catch(console.error);
    return;
  }, [currentUser]);

  const value = {
    userStatus,
    name,
    setUserToDB,
    approveUser,
    addDataToDB,
    getName,
    changeData,
    uploadDataPost,
    uploadImg,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
