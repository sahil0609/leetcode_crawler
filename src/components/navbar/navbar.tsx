import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleButton from '../button'
import * as S from './styles'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import CheckBox from '../checkbox'
import { useState } from 'react'

export const Navbar =  () => {

    const logoutFn = () => {
        console.log("should you be doing this ?")
    }

    const darkModeFn = () => {
        console.log("dark mode toggle");
    }

    const [check, setCheck] = useState(false)

    const toggleCheck = () => {
        setCheck(s => !s)
    }


    return (
        <S.NavbarWrapper>
            <SimpleButton onClick={logoutFn}>
                    logout
            </SimpleButton> 
            <S.SettingWrapper>
                <SimpleButton onClick={darkModeFn}>
                    <FontAwesomeIcon icon={faGear}/>
                </SimpleButton>
                <S.SettingsDropDown $display={true}>
                    <CheckBox value='dark mode' checked={check} toggleCheck={toggleCheck}></CheckBox>
                    <CheckBox value='auto sync' checked={true} toggleCheck={logoutFn}></CheckBox>
                </S.SettingsDropDown>

            </S.SettingWrapper>
        </S.NavbarWrapper>
    )
}