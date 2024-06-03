import * as S from './styles'


interface ISimpleButton {
    onClick(): void,
    value: string,
    className?: any
}

export const SimpleButton: React.FC<ISimpleButton> = (props) => {

    return (
        <S.SimpleButton onClick={props.onClick} className={props.className}>
            {props.value}
        </S.SimpleButton>
    )
}