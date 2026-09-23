import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './auth'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    });
    return unsubscribe; 
  },[]);
  
  const login = async(email: string, password: string) => {
    const userFirebase = await signInWithEmailAndPassword(
      auth, email, password
    );
    return userFirebase.user;
  }
  const register = async(email: string, password: string)=>{
    const userFirebase = await createUserWithEmailAndPassword(auth, email, password);
    return userFirebase.user;
  }

  const logout = async() => {
    await signOut(auth);
  }

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login,register, logout }}>{children}</AuthContext.Provider>
}

export { AuthProvider }
