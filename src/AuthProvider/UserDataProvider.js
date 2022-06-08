import {
  addDoc,
  collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
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
  const [projectPosts, setProjectPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [project, setProject] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [image, setImage] = useState("");

  //Add user to db with email and status
  const setUserToDB = async (uid, email) => {
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
      "profilePic",
      uri
    ).then(() => {
      console.log("details updated");
    });
  };

  const updateAdmin = async (uid, admin) => {
    await updateDoc(doc(db, "users", uid), "admin", admin);
  };

  const saveDownloadURL = async (path) => {
    const imgRef = ref(storage, path);
    let res;
    await getDownloadURL(imgRef).then(async (img) => {
      await updateDoc(doc(db, "users", currentUser.uid), "pic", path, "profilePic", img);
      res = img;
      setImage(img);
    });
    return res;
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

  const deleteThread = async (threadLocation, threadId) => {
    await deleteDoc(doc(threadLocation, threadId));
  };

  const deleteSelf = async () => {

    await deleteDoc(doc(db, "users", currentUser.uid));
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const deleteJob = async (jobId) => {
    await deleteDoc(doc(db, "jobs", jobId));
  };

  const deleteProject = async (projectId) => {
    await deleteDoc(doc(db, "projects", projectId));
    const q = query(collection(db, "posts"), where("pid", "==", projectId));
    const docSnap = await getDocs(q);
    docSnap.docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const deleteFile = (path) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, path);

    // Delete the file
    deleteObject(desertRef).then(() => {
      console.log("File deleted successfully");
    }).catch((error) => {
      console.log("Uh-oh, an error occurred!");
    });
  }

  const getPosts = async () => {
    setPostsList([]);

    const q = query(collection(db, "posts"), orderBy("creation", "desc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach((item) => {
      setPostsList((prev) => [...prev, { id: item.id, data: item.data() }]);
    });

    return docSnap.docs.map((item) => {
      return { id: item.id, data: item.data() };
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
      setProjects((prev) => [...prev, { pid: item.id, data: item.data() }]);
    });
  };

  const getMarkers = async () => {
    setMarkers([]);
    const docRef = doc(db, "neighborhoods", "mfZyKVFznFxlcSqn0WQe");
    const docSnap = await getDoc(docRef);
    setMarkers(docSnap.data()["neighborhoodsMap"]);
  };
  const getJobs = async () => {
    setJobs([]);

    const q = query(collection(db, "jobs"), orderBy("creation", "desc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) =>
      setJobs((prev) => [...prev, { id: item.id, data: item.data() }])
    );
  };

  const getMyJobs = async (uid) => {
    setMyJobs([]);

    const q = query(
      collection(db, "jobs"),
      where("uid", "==", uid),
      orderBy("creation", "desc")
    );
    const docSnap = await getDocs(q);

    docSnap.docs.forEach(async (item) =>
      setMyJobs((prev) => [...prev, { id: item.id, data: item.data() }])
    );
  };
  const getProject = async (pid) => {
    const docRef = doc(db, "projects", pid);
    const docSnap = await getDoc(docRef);
    setProject(docSnap.data());
  };

  const getProjectPosts = async (pid) => {
    setProjectPosts([]);

    const q = query(
      collection(db, "posts"),
      where("pid", "==", pid),
      orderBy("creation", "desc")
    );
    const docSnap = await getDocs(q);
    docSnap.docs.forEach(async (item) =>
      setProjectPosts((prev) => [...prev, { id: item.id, data: item.data() }])
    );
  };
  const getTags = async () => {
    setTagsList([]);
    const docRef = collection(db, "tags");
    const docSnap = await getDocs(docRef);

    docSnap.docs[0].data().tags.forEach((tag, index) => {
      setTagsList((prev) => [...prev, { id: index, name: tag }]);
    });
  };

  const getNeighborhoods = async () => {
    setTagsList([]);
    const docRef = collection(db, "neighborhoods");
    const docSnap = await getDocs(docRef);

    return docSnap.docs[0].data().neighborhoods;
  };

  const uploadJob = async (jobTitle, jobDescription, projectName) => {
    await addDoc(collection(db, "jobs"), {
      projectName: projectName,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      uid: currentUser.uid,
      creation: serverTimestamp(),
    });
  };
  // const checkAdmin = async () => {
  //   if (currentUser) {
  //     const docRef = doc(db, "users", currentUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     setAdmin(docSnap.data().admin);
  //   }
  // };

  const uploadDataPost = async (postText, pid, images, tags) => {
    await addDoc(collection(db, "posts"), {
      images: images,
      postText: postText,
      creation: serverTimestamp(),
      uid: currentUser.uid,
      pid: pid,
      tags: tags,
    });
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

  const uploadImg = async (path, uri) => {
    const docRef = ref(storage, path);
    const img = await fetch(uri);
    const bytes = await img.blob();
    await uploadBytes(docRef, bytes);
  };

  useEffect(() => {
    const getData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUserStatus(docSnap.data().status);
        setImage(docSnap.data().profilePic);
        setAdmin(docSnap.data().admin);
      }
    };
    getData().catch(console.error);
    return;
  }, [currentUser]);

  const value = {
    userStatus,
    name,
    admin,
    changeData,
    deleteComment,
    deleteThread,
    deletePost,
    deleteSelf,
    deleteProject,
    deleteJob,
    deleteFile,
    image,
    jobs,
    myJobs,
    usersList,
    postsList,
    projects,
    projectPosts,
    project,
    markers,
    tagsList,
    setUserToDB,
    setPostsList,
    approveUser,
    addDataToDB,
    getName,
    getMarkers,
    getJobs,
    getMyJobs,
    getUsersList,
    getPosts,
    getProjects,
    getProjectPosts,
    getTags,
    getProject,
    getNeighborhoods,
    changeData,
    uploadJob,
    uploadDataPost,
    uploadProject,
    uploadImg,
    updateAdmin,
    saveDownloadURL,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
