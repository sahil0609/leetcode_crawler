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
            <S.LoginPageButton value='sign in' onClick={openLoginPage} />
            <S.LoginPageButton value = "sign up" onClick={openSignUpPage} />
        </S.LoginPageWrapper>
    )

}