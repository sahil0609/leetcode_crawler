import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as S from './styles'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const SyncPage = () => {

    const [spin, setSpin] = useState(false)

    const onButtonClick = () =>{
        setSpin(s => !s)
        //TODO start the sync from here
    }



return (
    <S.DivWrapper>
        <S.SyncButton onClick= {onButtonClick} $disabled={spin}>
            <FontAwesomeIcon icon={faSync} size='6x' spin={spin}/>
        </S.SyncButton>
        <div>
            <label> syncing...</label>
            <progress max={100} value={10} />
        </div>
    </S.DivWrapper>
)

}