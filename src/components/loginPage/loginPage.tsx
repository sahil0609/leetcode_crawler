import SimpleButton from '../button'
import * as S from './styles'

export const LoginPage = () => {


    const openLoginPage = () => {
        console.log("test1")
    }

    const openSignUpPage = () => {
        console.log("TEST2");
    }


    return (
        <S.LoginPageWrapper>
            <S.LoginPageButton onClick={openLoginPage}>
                    sign in
                </S.LoginPageButton>
            <S.LoginPageButton  onClick={openSignUpPage} >
                    sign up
                </S.LoginPageButton>
        </S.LoginPageWrapper>
    )

}