import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleButton from "../button";
import * as S from "./styles";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../checkbox";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext/AuthContextProvider";
import { useSettingContext } from "../../contexts/settingsContext/SettingsContextProvider";

export const Navbar = () => {
    //get the authContext
    const {isLogin, logout} = useAuthContext()
    const settingContext = useSettingContext()

    const [showDropDown, setShowDropDown] = useState(false);
   
    const toggleDropDown = () => {
        setShowDropDown(s => !s)
    }

    const toggledarkMode = () => {settingContext.setDarkTheme(s => !s)}
    const toggleautoSync = () => {settingContext.setautoSync(s => !s)}
   



  return (
    <S.NavbarWrapper> 

      {isLogin ? <SimpleButton onClick={logout}>logout</SimpleButton> : null}

      <S.SettingWrapper>
        <SimpleButton onClick={toggleDropDown}>
          <FontAwesomeIcon icon={faGear} />
        </SimpleButton>
        <S.SettingsDropDown $display={showDropDown}>
          <CheckBox
            value="dark mode"
            checked={settingContext.darkTheme}
            toggleCheck={toggledarkMode}
          ></CheckBox>
          <CheckBox
            value="auto sync"
            checked={settingContext.autoSync}
            toggleCheck={toggleautoSync}
          ></CheckBox>
        </S.SettingsDropDown>
      </S.SettingWrapper>
    </S.NavbarWrapper>
  );
};
