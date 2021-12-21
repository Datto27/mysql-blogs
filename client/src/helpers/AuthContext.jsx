import {createContext, useContext, useState} from "react"


const AuthContext = createContext("")

export function AuthProvider({children}) {
  const [authState, setAuthState] = useState({
    username:"", id:"", status:false
  })

  return <AuthContext.Provider value={{authState, setAuthState}}>
    {children}
  </AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}