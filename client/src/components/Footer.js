import {
    Box,
    Container,
    Button,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import LinkedIn from '../icons/linkedin.png'
import Github from '../icons/github.png'
import Facebook from '../icons/facebook_icon.png'
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { useLocation } from 'react-router-dom';

// for Stripe donation------
const stripePromise = loadStripe(
    'pk_test_51LsfpjHtPeyJEzsnDUvg872ybKpKrO19NrPsJ5Zb0oqpXYgaDYdp2zqwSFnHQponV9PHBmx9RwZMZo6oqIYKaV2T00OcKUDTEj'
)
//------


const imgStyle = {
    width: '40px',
    height: '40px',
}


export default function Footer() {

    const handleClick = async (event) => {
        const stripe = await stripePromise
        stripe.redirectToCheckout({
            lineItems: [{ price: 'price_1Lsg1dHtPeyJEzsnBM6uaBPW', quantity: 1 }],
            mode: 'payment',
            successUrl: "https://buy.stripe.com/test_aEU5nxgULfFG0Xm288",
            cancelUrl: "https://buy.stripe.com/test_aEU5nxgULfFG0Xm288",
            submitType: "donate",
        })
            .then(function (result) {
                if (result.error) {
                    console.log(result)
                }
            })
    }

    const [footerStyle, setFooterStyle] = useState({});
    const location = useLocation();
    // in use effect
    useEffect(() => {
        setTimeout(() => {

            // obtain height of main container
            const mainContainer = document.querySelector(".container");
            const height = mainContainer.clientHeight;
            console.log(height);
            // if > 700px
            if(height < 700){
                setFooterStyle({
                    position: 'fixed',
                    width: '100%',
                    bottom: 0,
                });
            }else{
                setFooterStyle({})
            }
            // then do nothing
            // else apply 'fixed ' styling to footer
        }, 1000)
    }, [location.pathname])



    


    return (
        <Box
            style={footerStyle}
            bg={useColorModeValue('gray.200', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text fontSize="18" fontWeight="700">© 2022 Made with ❤️ by Sean Nzeribe</Text>
                    <Stack direction={'row'} spacing={6}>
                        <Button onClick={handleClick} colorScheme='blue'>Donate 5.00$</Button>
                        <Link label={'LinkedIn'} href={'https://www.linkedin.com/in/sean-nzeribe-53929221b/'} target="_blank">
                            <img src={LinkedIn} alt="LinkedIn" style={imgStyle}></img>
                        </Link>
                        <Link label={'Github'} href={'https://github.com/snzeribe?tab=repositories'} target="_blank">
                            <img src={Github} alt="Github" style={imgStyle}></img>
                        </Link>
                        <Link label={'Fackbook'} href={'https://www.facebook.com/snzeribe'} target="_blank">
                            <img src={Facebook} alt="Facebook" style={imgStyle}></img>
                        </Link>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}