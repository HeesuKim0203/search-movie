import React from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    position : fixed ;

    bottom : 5px ;
    right : 5px ;

    z-index : 100 ;
`;

const FixedMenu = () => {

    function onClickScrollTop(event : React.MouseEvent<HTMLDivElement, MouseEvent>) {
        window.scroll({
            behavior : 'smooth',
            top : 0
        }) ;
    }

    return (
        <Container onClick = { onClickScrollTop }>
            <FontAwesomeIcon icon = { faArrowAltCircleUp } size="3x" />
        </Container>
    );
};

export default FixedMenu;