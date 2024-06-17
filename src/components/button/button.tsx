import * as S from './styles'


interface ISimpleButton {
    onClick(): void,
    className?: any
    children? : React.ReactNode
    
}

export const SimpleButton: React.FC<ISimpleButton> = (props) => {

    return (
        <S.SimpleButton onClick={props.onClick} className={props.className}>
            {props.children}
        </S.SimpleButton>
    )
}