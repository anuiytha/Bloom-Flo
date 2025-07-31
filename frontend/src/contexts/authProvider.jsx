import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                const snapshot = await getDoc(userRef);
                setUser(currentUser);
                setProgress(snapshot.data().progress);
            }
            else {
                setUser(null);
                setProgress(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, progress, loading }}>
            {children}
        </AuthContext.Provider>
    )
}