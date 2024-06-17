import styled from "styled-components";
import SimpleButton from "../button";


export const DivWrapper = styled.div`

display: flex;
height: 100%;
width: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 2rem;
`

export const SyncButton = styled(SimpleButton)<{$disabled: boolean}>`
border-radius: 50%;
height: 6rem;
width: 6rem;
border: none;
pointer-events: ${(props) => props.$disabled ?"none": null};
`


