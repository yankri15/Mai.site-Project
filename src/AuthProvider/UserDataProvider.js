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
  where,
  deleteDoc,
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
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [project, setProject] = useState([]);

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
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setName(docSnap.data().name);
  };

  const getUsersList = async () => {
    setUsersList([]);
    const docRef = collection(db, "users");
    const docSnap = await getDocs(docRef);
    docSnap.docs.forEach((element) => {
      if (currentUser.uid !== element.id) {
        setUsersList((prev) => [
          ...prev,
          { id: element.id, data: element.data() },
        ]);
      }
    });
  };

  const deleteComment = async (commentLocation, commentId) => {
    await deleteDoc(doc(commentLocation, commentId));
  };

  const deleteSelf = async () =>{
    //We should delete image from the storage
    await deleteDoc(doc(db, "users", currentUser.uid));
  }

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };
  const getPosts = async () => {
    setPostsList([]);

    const q = query(collection(db, "posts1"), orderBy("creation", "desc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) => {
      setPostsList((prev) => [...prev, { id: item.id, data: item.data() }]);
    });
  };

  const getProjects = async (uid) => {
    setProjects([]);

    const q = query(
      collection(db, "projects"),
      where("uid", "==", uid ? uid : currentUser.uid)
    );
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) => {
      setProjects((prev) => [...prev, item.data()]);
    });
  };

  const getJobs = async () => {
    setJobs([]);

    const q = query(collection(db, "jobs"), orderBy("creation", "desc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) =>
      setJobs((prev) => [...prev, { id: item.id, data: item.data() }])
    );
  };

  const getProject = async (pid) => {
    const docRef = doc(db, 'projects', pid);
    const docSnap = await getDoc(docRef);
    setProject(docSnap.data());
  }

  const getTags = async () => {
    setTagsList([]);
    const docRef = collection(db, "tags");
    const docSnap = await getDocs(docRef);

    docSnap.docs[0].data().tags.forEach((tag, index) => {
      setTagsList(prev => [...prev, { id: index, name: tag }])
    })
  };

  const getNeighborhoods = async () => {
    setTagsList([]);
    const docRef = collection(db, "neighborhoods");
    const docSnap = await getDocs(docRef);

    return docSnap.docs[0].data().neighborhoods;
  }

  const uploadJob = async (jobTitle, jobDescription, projectName) => {

    await addDoc(collection(db, "jobs"), {
      projectName: projectName,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      uid: currentUser.uid,
      creation: serverTimestamp(),
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

  const uploadProjectPost = async (pid, postText, images, stage) => {
    await addDoc(collection(db, "posts1"), {
      pid: pid,
      uid: currentUser.uid,
      postText: postText,
      images: images,
      creation: serverTimestamp(),
      stage: stage,
    });

    if (stage === 'create') {
      //addImagesToProject(images);
    }
  };

  const uploadProject = async (
    name,
    organization,
    collaborators,
    neighborhood,
    images,
    tags,
    description
  ) => {
    const temp = await addDoc(collection(db, "projects"), {
      name: name,
      organization: organization,
      creation: serverTimestamp(),
      uid: currentUser.uid,
      tags: tags,
      collaborators: collaborators,
      neighborhood: neighborhood,
      images: images,
      description: description,
    });
    return temp.id;
  };

  const uploadImg = async (path, image) => {
    const docRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(docRef, bytes);
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
    changeData,
    checkAdmin,
    deleteComment,
    deletePost,
    deleteSelf,
    jobs,
    usersList,
    postsList,
    projects,
    project,
    tagsList,
    setUserToDB,
    setPostsList,
    approveUser,
    addDataToDB,
    getName,
    getJobs,
    getUsersList,
    getPosts,
    getProjects,
    getTags,
    getProject,
    getNeighborhoods,
    changeData,
    uploadJob,
    uploadDataPost,
    uploadProject,
    uploadProjectPost,
    uploadImg,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
