import React, { createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // const idToken = await result.user.getIdToken();
        // localStorage.setItem("access-token", idToken);
        return result;
    };

    const signIn = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        // const idToken = await result.user.getIdToken();
        // localStorage.setItem("access-token", idToken);
        return result;
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const logOut = async () => {
        await signOut(auth);
        // localStorage.removeItem("access-token");
    };

    const googleSignIn = async () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        // const idToken = await result.user.getIdToken();
        // localStorage.setItem("access-token", idToken);
        return result;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        googleSignIn,
        loading,
        setLoading,
        updateUser,
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;