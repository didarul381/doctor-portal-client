import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config'

 export  const AuthContext=createContext();
const auth=getAuth(app)
const AuthProvider = ({children}) => {
const[user,setUser]=useState('');
const[loding,setLoding]=useState(true)

    const createUser =(email,password)=>{
        setLoding(true)
        return createUserWithEmailAndPassword(auth,email,password);

    }

    const singIn =(email,password)=>{
        setLoding(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUser =(userInfo)=>{
         return updateProfile(auth.currentUser,userInfo)

    }

    const logOut =()=>{
        setLoding(true)
        return signOut(auth)
    }
    useEffect(()=>{

      const unsubscribe=  onAuthStateChanged(auth,currentUser=>{
            console.log("user observing..")
            setUser(currentUser);
            setLoding(false);
        })
        return ()=> unsubscribe();
    },[])
    const authIfo={
        createUser,
        singIn,
        logOut,
        updateUser,
        user,
        loding


    }
   
    return (
        <AuthContext.Provider value={authIfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;