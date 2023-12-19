import React from 'react' ;
import styled from 'styled-components' ;
import { Link, useLocation } from 'react-router-dom' ;

const Header = styled.header`
    color : white ;
    position : fixed ;
    top : 0 ;
    left : 0 ;
    width : 100% ;
    height : 50px ;
    display : flex ;
    align-items : center ;
    padding : 0 10px ;
    background-color : rgba(20, 20, 20, 0.8) ;
    box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.8);
    z-index : 100 ;

    @media ${props => props.theme.mobileS} {
        justify-content : center ;
    }
` ;

const List = styled.ul`
    display : flex ;
` ;

const Item = styled.li`
    width : 80px ;
    height : 50px ;
    border-bottom : 4px solid 
        ${ props => props.current ? "#00695c" : "transparent" } ;
    transition : border-bottom 0.4s ease-in-out ;

    @media ${props => props.theme.mobileS} {
        font-size : 15px ;
    }
`;

const Rlink = styled(Link)` 
    height : 50px ;
    display : flex ;
    align-items : center ;
    justify-content : center ;
`;

export default () => {
    
    const { pathname } = useLocation() ;
    return (
        <Header>
            <List>
                <Item current={ pathname === "/" }>
                    <Rlink to="/">Movie</Rlink>
                </Item>
                <Item current={ pathname === "/tv"  }>
                    <Rlink to="/tv">TV</Rlink>
                </Item>
                <Item current={ pathname === "/search" }>
                    <Rlink to="/search">Search</Rlink>
                </Item>
            </List>
        </Header>
    )
};