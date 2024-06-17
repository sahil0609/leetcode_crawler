import styled from "styled-components";

export const NavbarWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-flow: row-reverse;
gap: 0.5rem;
background: #101820FF;
flex-wrap: wrap;
`

export const SettingWrapper = styled.div`
position: relative;
`

export const SettingsDropDown = styled.div<{$display: boolean}>`
position: absolute;
min-width: 4rem;
background-color: orange;
left: -5rem;
min-height: 2rem;
display: flex;
flex-direction: column;
padding: 0.5rem 0.2rem;

`

export const DropDownWrapper = styled.div`
    width: 100%;
`
