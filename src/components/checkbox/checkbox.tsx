import React from 'react'
import * as S from './styles'

interface ICheckBox {
    value: string,
    checked: boolean,
    toggleCheck: () => void
}

export const CheckBox: React.FC<ICheckBox> = (props) => {

    const toggleCheck =  (e:React.MouseEvent) => {
        e.preventDefault()
        props.toggleCheck()
    }

    return (
        <S.checkBoxWrapper>
            <S.checkBoxLabel>{props.value}</S.checkBoxLabel>
            <S.checkBoxDiv onClick={toggleCheck}>
                <input type='checkbox' checked={props.checked}/>
                <span></span>
            </S.checkBoxDiv>
        </S.checkBoxWrapper>
    )
}