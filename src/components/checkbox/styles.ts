import styled from "styled-components";

export const checkBoxWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 0.5rem;
padding: 0 0.2rem;
transition: 0.3s;

&:hover {
    background-color: lightcoral;
}

`
export const checkBoxLabel = styled.label`
display: inline-block;
white-space: nowrap;
font-weight: 400;
`

export const checkBoxDiv = styled.div`
position: relative;
border-radius: 0.5rem;
background-color: white;
width: 2rem;
height: 1rem;

input[type="checkbox"] {
    display: none;
}
span::before {
    content: "";
    position: absolute;
    left:0.1rem;
    width:1rem;
    height: 1rem;
    background-color: black;
    border-radius: 0.5rem;
    transition: 0.6s;
    
}

input[type="checkbox"]:checked ~ span::before {
    left: 0.9rem;
}

input[type="checkbox"]:checked ~ span::before {
    background-color: orange;
}


`

