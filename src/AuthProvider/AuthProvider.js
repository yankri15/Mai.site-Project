import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    login,
    signup,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider