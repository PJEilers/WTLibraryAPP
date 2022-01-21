import React from 'react';
import Footer from './FooterTags';
import { StyleLink } from '../Styling/FooterStyling';

export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                <Footer.Column>
                    <Footer.Title> Algemeen </Footer.Title>
                    <StyleLink to='/'> Homepage</StyleLink>
                    <StyleLink to='/boekenlijst'> Boeken</StyleLink>                    
                    <StyleLink to='/ReserveringTabel'> Reserveringen</StyleLink>                    

                </Footer.Column>
                <Footer.Column>
                    <Footer.Title> Contact </Footer.Title>
                    <Footer.Item>Working Talent</Footer.Item>
                    <Footer.Item>Kerkbuurt 4</Footer.Item>
                    <Footer.Item>1551 BD Oostzaan</Footer.Item>
                    <Footer.Item>tel: 08506 08506</Footer.Item>

                </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
       

    )
}