import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    Stack,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_ROOM } from '../utils/queries'
import { useParams } from 'react-router-dom';
// redirect -----
import { useNavigate  } from "react-router-dom";


export default function SendMessageForm() {
    const { roomId } = useParams()

    const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
        variables: { roomId: roomId }
    })

    // redirect -----
    const navigate = useNavigate()

    const room = data?.room || {}

    const [status, setStatus] = useState("Submit");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        const { tenantName, tenantEmail, message } = e.target.elements;
        let details = {
            name: tenantName.value,
            email: tenantEmail.value,
            message: message.value,
            // owner's email
            to: room.ownerEmail


        };
        let response = await fetch(`https://p3-easy-rent.herokuapp.com/sendmessage/:roomId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);


        //redirect ----
        const path = '/'
        navigate(path)
        // window.location.assign('/')
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <form
            id='sendMessageForm'
            onSubmit={handleSubmit}
        >
            <Flex
                bg={'gray.100'}
                align="center"
                justify="center"
                css={{
                    backgroundAttachment: 'fixed',
                }}
            >
                <Box
                    borderRadius="lg"
                    m={{ base: 5, md: 16, lg: 10 }}
                    p={{ base: 5, lg: 16 }}
                >

                    <Box>
                        <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
                            <Heading
                                fontSize={{
                                    base: '4xl',
                                    md: '5xl',
                                }}>
                                Your message to owner
                            </Heading>

                            <Stack
                                spacing={{ base: 10, md: 30, lg: 50 }}
                                direction={{ base: 'column', md: 'row' }}>

                                <Box
                                    // boxSize={'500'}
                                    w={[300, 400, 700]}
                                    bg={'white'}
                                    borderRadius="lg"
                                    p={8}
                                    color={'gray.700'}
                                    shadow="base">
                                    <VStack spacing={5}>

                                        <FormControl isRequired>
                                            <FormLabel>Your name</FormLabel>
                                            <InputGroup>
                                                <Input
                                                    type="text"
                                                    id="tenantName"
                                                // onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Your Email</FormLabel>
                                            <InputGroup>
                                                <Input
                                                    type="email"
                                                    id="tenantEmail"
                                                // onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Your message</FormLabel>
                                            <Textarea
                                                id="message"
                                                rows={6}
                                                resize="none"
                                            // onChange={handleInputChange}
                                            />
                                        </FormControl>

                                        <Button
                                            px={'20'}
                                            colorScheme="blue"
                                            type='submit'
                                            form='sendMessageForm'
                                            bg="blue.400"
                                            color="white"
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                        >
                                            {status}
                                        </Button>
                                        {/* {error && (
                                                        <div style={styles.errorStyle}>
                                                            {error.message}
                                                        </div>
                                                    )} */}

                                    </VStack>
                                </Box>
                            </Stack>
                        </VStack>
                    </Box>
                </Box>
            </Flex>
        </form>
    )
}