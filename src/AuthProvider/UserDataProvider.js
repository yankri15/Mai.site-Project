import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
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
  const [admin, setAdmin] = useState();
  const [usersList, setUsersList] = useState([]);
  const [postsList, setPostsList] = useState([]);

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
    birthDate,
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
      birthDate,
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

  const getUsersList = async () => {
    setUsersList([]);
    const docRef = collection(db, "users");
    const docSnap = await getDocs(docRef);
    docSnap.docs.forEach((element) => {
      // setUsersList((prev) => [...prev, { "id": elemet.id, "data": elemet.data() }]);
      // if (element.data().name.includes(nameToSearch)) {
      setUsersList((prev) => [
        ...prev,
        { id: element.id, data: element.data() },
      ]);
      // }
    });
  };

  const getPosts = async () => {
    setPostsList([]);

    const q = query(collection(db, "posts"), orderBy("creation", "desc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) => {
      setPostsList((prev) => [...prev, { id: item.id, data: item.data() }]);
    });
  };

  const checkAdmin = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setAdmin(docSnap.data().admin);
    }
  };

  const uploadDataPost = async (path, postText) => {
    await addDoc(collection(db, "posts"), {
      downloadURL: path,
      postText: postText,
      creation: serverTimestamp(),
      uid: currentUser.uid,
      tags: [],
    });
  };
  const uploadImg = async (path, image) => {
    const docRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(docRef, bytes);
    console.log("Up loaded succeffuly to path: ", path);
  };

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
    admin,
    usersList,
    postsList,
    setUserToDB,
    approveUser,
    addDataToDB,
    getName,
    checkAdmin,
    getUsersList,
    getPosts,
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
