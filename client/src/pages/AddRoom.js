import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Link,
    Input,
    InputGroup,
    Stack,
    Textarea,
    VStack,
    RadioGroup,
    Radio,
    HStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_ROOMS, QUERY_ME } from '../utils/queries'
import { ADD_ROOM } from '../utils/mutations';
import Auth from '../utils/auth'
import { Link as ReactLink } from 'react-router-dom';

// redirect -----
import { useNavigate } from "react-router-dom"


const styles = {
    messageStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
        color: 'red'
    },
    errorStyle: {
        fontWeight: '700',
        color: 'red'
    },
    linkStyle: {
        color: 'blue'
    }
}



export default function AddRoomForm() {

    const [formData, setFormData] = useState({
        location: '',
        totalRooms: '',
        parkingSpace: '',
        price: '',
        ownerEmail: '',
        ownerContact: '',
        withFurniture: '',
        isShareBill: '',
        description: ''
    })

    // redirect -----
    const navigate = useNavigate()


    const [addRoom, { error }] = useMutation(ADD_ROOM, {
        refetchQueries: [
            {query: QUERY_ROOMS},
            {query: QUERY_ME},
        ]


        // cache ------
        // update(cache, { data: { addRoom } }) {
        //     try {
        //         const roomsQuery = cache.readQuery({ query: QUERY_ROOMS })

        //         if (!roomsQuery) {
        //             const rooms = roomsQuery.rooms
        //             cache.writeQuery({
        //                 query: QUERY_ROOMS,
        //                 data: { rooms: [addRoom, ...rooms] },
        //             })
        //         }
        //     } catch (e) {
        //         console.error(e)
        //     }

        //     const meQuery = cache.readQuery({ query: QUERY_ME });

        //     if (!meQuery) {
        //         const me = meQuery.me;
        //         cache.writeQuery({
        //             query: QUERY_ME,
        //             data: { me: { ...me, rooms: [...me.rooms, addRoom] } }
        //         })
        //     }
        // }
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addRoom({
                variables: {
                    ...formData,
                    price: Number(formData.price),
                    totalRooms: Number(formData.totalRooms),
                    parkingSpace: Number(formData.parkingSpace),
                },
            });

            setFormData({
                location: '',
                totalRooms: '',
                parkingSpace: '',
                price: '',
                ownerEmail: '',
                ownerContact: '',
                withFurniture: '',
                isShareBill: '',
                description: ''
            });

            //redirect ----
            const path = '/dashboard'
            navigate(path)
            
            // window.location.assign('/dashboard')

        } catch (err) {
            console.error(err);
        }

    };

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }



    return (
        <>
            {Auth.loggedIn() ? (
                <>
                    <form id='addRoomForm' onSubmit={handleFormSubmit}>
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
                                            Post your room info
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
                                                        <FormLabel>Location</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                maxLength={300}
                                                                minLength={3}
                                                                value={formData.location}
                                                                type="text"
                                                                name="location"
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel>Total Rooms</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                type="number"
                                                                name="totalRooms"
                                                                value={formData.totalRooms}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel>Parking Space Nubmer</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                type="number"
                                                                name="parkingSpace"
                                                                value={formData.parkingSpace}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel>Price per Week</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                type="number"
                                                                name="price"
                                                                value={formData.price}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel>Owner Email</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                type="text"
                                                                name="ownerEmail"
                                                                value={formData.ownerEmail}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel>Owner Phone Number</FormLabel>
                                                        <InputGroup>
                                                            <Input
                                                                type="text"
                                                                name="ownerContact"
                                                                value={formData.ownerContact}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel>With Furniture or Not</FormLabel>
                                                        {/* <InputGroup>
                                                            <Input
                                                                maxLength={300}
                                                                minLength={3}
                                                                type="text"
                                                                name="withFurniture"
                                                                value={formData.withFurniture}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup> */}
                                                        <RadioGroup>
                                                            <HStack spacing={'24px'}>
                                                                <Radio value={'YES'} name="withFurniture" onChange={handleInputChange} checked={formData.withFurniture === 'YES'} >YES</Radio>
                                                                <Radio value={'NO'} name="withFurniture" onChange={handleInputChange} checked={formData.withFurniture === 'NO'}>NO</Radio>
                                                            </HStack>
                                                        </RadioGroup>
                                                    </FormControl>


                                                    <FormControl>
                                                        <FormLabel>Share Bill or Not</FormLabel>
                                                        {/* <InputGroup>
                                                            <Input
                                                                type="text"
                                                                name="isShareBill"
                                                                value={formData.isShareBill}
                                                                onChange={handleInputChange}
                                                            />
                                                        </InputGroup> */}
                                                        <RadioGroup>
                                                            <HStack spacing={'24px'}>
                                                                <Radio value={'YES'} name="isShareBill" onChange={handleInputChange} checked={formData.isShareBill === 'YES'} >YES</Radio>
                                                                <Radio value={'NO'} name="isShareBill" onChange={handleInputChange} checked={formData.isShareBill === 'NO'}>NO</Radio>
                                                            </HStack>
                                                        </RadioGroup>
                                                    </FormControl>


                                                    <FormControl>
                                                        <FormLabel>Description</FormLabel>
                                                        <Textarea
                                                            name="description"
                                                            rows={6}
                                                            resize="none"
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                        />
                                                    </FormControl>

                                                    <Button
                                                        px={'20'}
                                                        colorScheme="blue"
                                                        type='submit'
                                                        form='addRoomForm'
                                                        bg="blue.400"
                                                        color="white"
                                                        _hover={{
                                                            bg: 'blue.500',
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                    {error && (
                                                        <div style={styles.errorStyle}>
                                                            Something Wrong!
                                                        </div>
                                                    )}

                                                </VStack>
                                            </Box>
                                        </Stack>
                                    </VStack>
                                </Box>
                            </Box>
                        </Flex>
                    </form>
                </>
            ) : (
                <p style={styles.messageStyle}>
                    You need to be logged in to post your rooms. Please{' '}
                    <Link as={ReactLink} style={styles.linkStyle} to="/login">login</Link> or <Link as={ReactLink} style={styles.linkStyle} to="/signup">signup.</Link>
                </p>
            )}
        </>
    )
}