import React, { useState } from 'react'
import styled from 'styled-components'


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bgLighter};
    height: 100vh;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
    `;

    const Hr = styled.hr`
        margin: 15px 0px;
        border: 0.5px solid ${({theme}) => theme.soft};
    `;


    const Menu = ({theme, setTheme}) => {
        return (
            <Container>

            </Container>
        )
    }

    export default Menu
