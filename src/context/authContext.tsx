import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './auth'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      setIsAuthenticated(Boolean(user));
    });
    return unsubscribe; 
  },[]);
  const login = async(email: string, password: string) => {
    const userFirebase = await signInWithEmailAndPassword(
      auth, email, password
    );
    
    return userFirebase.user;
  }
  
  const logout = async() => {
    await signOut(auth);
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthProvider }
