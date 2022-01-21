import react from 'react';
import {Container, Wrapper, Row, Column, StyleLink, Item, Title} from '../Styling/FooterStyling'

export default function Footer({ children, ...restProps}) {
    return <Container {... restProps}>{children}</Container>
}

Footer.Wrapper = function FooterWrapper({ children, ...restProps}) {
    return <Wrapper {... restProps}>{children}</Wrapper>
}

Footer.Row = function FooterRow({ children, ...restProps}) {
    return <Row {...restProps}>{children}</Row>
}

Footer.Column = function FooterColumn({ children, ...restProps}) {
    return <Column {... restProps}>{children}</Column>
}

Footer.StyleLink = function FooterLink({ children, ...restProps}) {
    return <StyleLink {... restProps}>{children}</StyleLink>
}

Footer.Item = function FooterItem({ children, ...restProps}) {
    return <Item {... restProps}>{children}</Item>
}


Footer.Title = function FooterTitle({ children, ...restProps}) {
    return <Title {... restProps}>{children}</Title>
}