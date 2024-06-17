import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleButton from '../button'
import * as S from './styles'
import { faGear } from '@fortawesome/free-solid-svg-icons'

export const Navbar =  () => {

    const logoutFn = () => {
        console.log("should you be doing this ?")
    }

    const darkModeFn = () => {
        console.log("dark mode toggle");
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
                    <S.DropDownWrapper>
                        <label> theme:</label>
                    </S.DropDownWrapper>
                    <S.DropDownWrapper>
                        <label> auto sync: </label>
                    </S.DropDownWrapper>
                </S.SettingsDropDown>

            </S.SettingWrapper>
        </S.NavbarWrapper>
    )
}