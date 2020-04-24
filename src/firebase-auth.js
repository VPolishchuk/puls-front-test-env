import React, { useEffect, useState }  from 'react';
import app from "./firebase-config";
//////////////////////////////////////////////////////

export const AuthContext = React.createContext();

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) =>  setCurrentUser(user))
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};





export default FirebaseProvider;