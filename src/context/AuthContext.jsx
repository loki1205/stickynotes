import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)

        useEffect(() => {
            //setLoading(false)
            checkUserStatus()
        }, [])
        
        
        const checkUserStatus = async () => {
            try{
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                
            }
            setLoading(false)
        }

         const loginUser = async (userInfo) => {
            setLoading(true)
            try{
                let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password)
                let accountDetails = await account.get();
                setUser(accountDetails)
                navigate("/")
            }catch(error){
                console.error(error)
            }
            setLoading(false)        
        }

        const logoutUser = async () => {
            await account.deleteSession('current');
            setUser(null)
        }

         const registerUser = async (userInfo) => {}


        const contextData = {
            user,
            loginUser,
            logoutUser,
            registerUser
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;