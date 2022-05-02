import { async } from "@firebase/util";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "./AuthProvider";
const UserDataContext = React.createContext();

export function useData() {
  return useContext(UserDataContext);
}

const UserDataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userStatus, setUserStatus] = useState();

  //Add user to db with email and status
  const setUserToDB = async (uid, email) => {
    console.log("Creating collection for user " + uid + "......");
    await setDoc(doc(db, "users", uid), {
      email: email,
      status: 0,
    }).then(() => setUserStatus(0));
  };

  //Add other registration details (name, school, organization etc.)
  const addDataToDB = async (uid, name, school) => {
    await updateDoc(doc(db, "users", uid), "name", name, "school", school).then(
      () => {
        setUserStatus(1);
      }
    );
  };

  //Approve user
  const approveUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), "status", 2).then(() => {
      setUserStatus(2);
    });
  };

  useEffect(() => {
    const getStatus = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUserStatus(docSnap.data().status);
    };
    getStatus().catch(console.error);
    return;
  }, [currentUser]);

  const value = {
    userStatus,
    setUserToDB,
    approveUser,
    addDataToDB,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
