import React from 'react' ;
import PropTypes from 'prop-types' ;
import styled from 'styled-components' ;

const Container = styled.div`
    &:not(:last-child) {
        margin-bottom : 50px ;
    }
` ;

const Title = styled.span`
    font-size : 14px ;
    font-weight : 600 ;

    @media ${props => props.theme.mobileS} {
        display : block ;
        text-align : center ;
    }
` ;

const Grid = styled.div`
    margin-top : 25px ;
    display : grid ;
    grid-template-columns : repeat(auto-fill, 125px) ;
    grid-gap : 25px ;

    @media ${props => props.theme.mobileS} {
        justify-content : center ;
    }
` ;

type SectionProps = {
    title : string
    children : React.ReactNode[]
}

const Section = ({ title, children } : SectionProps) => (
    <Container>
        <Title>{ title }</Title>
        <Grid>{ children }</Grid>
    </Container>
) ;

Section.propTypes = {
    title : PropTypes.string.isRequired,
    children : PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

export default Section;