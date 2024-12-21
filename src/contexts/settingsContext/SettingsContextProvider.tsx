import React, { createContext, useContext, useState } from "react"

interface ISettingsContext {
    darkTheme: boolean,
    autoSync: boolean,
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
    setautoSync: React.Dispatch<React.SetStateAction<boolean>>
}


const SettingContext = createContext<ISettingsContext | null>(null)

const useSettingContext = (): ISettingsContext => {

    const context = useContext(SettingContext)

    if(!context){
        throw new Error("setting context  must be used in setting context provider")
    }
    return context
}


const SettingContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {

    const [darkTheme, setDarkTheme] = useState(false);
    const [autoSync, setautoSync] = useState(false);


    const contextValue = {
        darkTheme,
        autoSync,  
        setDarkTheme,
        setautoSync     
    }

    return (
        <SettingContext.Provider value={contextValue}>
            {props.children}
        </SettingContext.Provider>
    )

}

export {SettingContextProvider, useSettingContext}