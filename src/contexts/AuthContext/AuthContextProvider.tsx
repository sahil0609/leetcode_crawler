import { createContext, useContext, useState } from "react"

interface IAuthContext {
    username: string | undefined,
    setUsername(username: string) : void
    isLogin: boolean,
    logout(): void
}


const AuthContext = createContext<IAuthContext | null >(null)

const useAuthContext = () : IAuthContext => {

    const context = useContext(AuthContext)

    if(!context) {
        throw new Error("AuthContext must be used inside AuthContext provider")
    }
    return context

}


const AuthContextProvider: React.FC<{children?: React.ReactNode }> = (props) => {

    const [username, setUsername] = useState<string>()
    const [isLogin, setIsLogin] = useState(true)

    const logout = () => {
        //TODO expire the token
        setIsLogin(false)
    }

    const value = {
        username, 
        setUsername,
        isLogin,
        logout
    };
    
    return <AuthContext.Provider value={value} {...props} />
}

export {AuthContextProvider, useAuthContext}
