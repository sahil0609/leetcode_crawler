import SimpleButton from '../button'
import * as S from './styles'

export const Navbar =  () => {

    const logoutFn = () => {
        console.log("should you be doing this ?")
    }

    const darkModeFn = () => {
        console.log("dark mode toggle");
    }

    return (
        <S.NavbarWrapper>
            <SimpleButton value = "logout" onClick={logoutFn}/>
            <SimpleButton value = "darkMode" onClick={darkModeFn}/>
        </S.NavbarWrapper>
    )
}