import React from 'react' ;
import styled from 'styled-components' ;
import { Link, withRouter } from 'react-router-dom' ;

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
` ;

const List = styled.ul`
    display : flex ;
` ;

const Item = styled.li`
    width : 80px ;
    height : 50px ;
    border-bottom : 4px solid 
        ${ props => props.current ? "#3498db" : "transparent" } ;
    transition : border-bottom 0.4s ease-in-out ;
`;

const Rlink = styled(Link)` 
    height : 50px ;
    display : flex ;
    align-items : center ;
    justify-content : center ;
`;

export default  withRouter(({ location : { pathname } }) => (
    <Header>
        <List>
            <Item current={ pathname === "/" }>
                <Rlink to="/">Moives</Rlink>
            </Item>
            <Item current={ pathname === "/tv"  }>
                <Rlink to="/tv">TV</Rlink>
            </Item>
            <Item current={ pathname === "/search" }>
                <Rlink to="/search">Search</Rlink>
            </Item>
        </List>
    </Header>
));