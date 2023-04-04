// with Chakra UI
import {
    Icon,
    Heading,
    Box,
    Center,
    List,
    ListItem,
    Image,
    Text,
    Stack,
    Button,
    Flex,
} from '@chakra-ui/react';
import { BiBed } from "react-icons/bi";
import { BiCar } from "react-icons/bi";
import { Link as ReactLink } from 'react-router-dom';


const styles = {
    Counters: {
        flexDirection: 'row',
    },

    iconCounter: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 21,
    },

    iconCounterText: {
        fontSize: 12,
        fontWeight: 700
    },
    h3Style: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600
    },
    spanStyle: {
        fontWeight: 700
    },
    emailStyle: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
}


export default function RoomCardHomePage({ rooms }) {
    if (!rooms.length) {
        return <h3 className='message' style={styles.h3Style}>No Room Info Yet!</h3>
    }
    return (
        <>
            {rooms && rooms.map(room => (
                <Center mx={6} py={6} key={room._id}>
                    <Box
                        maxW={'300px'}
                        w={'full'}
                        bg={'gray.300'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Image
                            h={'200px'}
                            w={'full'}
                            // room.image
                            src={
                                room.image ? (room.image) : (
                                    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2016%2F12%2F12165535%2Fcreamy-white-living-room-1216_0.jpg'
                                )
                            }
                            objectFit={'cover'}
                        />

                        <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                    ${room.price} / Week
                                </Heading>
                                <Text fontSize="sm" color={'gray.550'}>
                                    {room.description}
                                </Text>
                            </Stack>


                            <Flex>
                                <Stack style={styles.Counters} pl={'5px'} >
                                    <Icon as={BiBed} style={styles.iconCounter} />
                                    <Text style={styles.iconCounterText}>
                                        {room.totalRooms}
                                    </Text>
                                </Stack>
                                <Stack style={styles.Counters} pl={'5px'} >
                                    <Icon as={BiCar} style={styles.iconCounter} />
                                    <Text style={styles.iconCounterText}>
                                        {room.parkingSpace}
                                    </Text>
                                </Stack>
                            </Flex>

                            <Box bg={'gray.50'} px={5} py={6}>
                                <List spacing={3}>
                                    <ListItem fontSize="13">
                                        <span style={styles.spanStyle}>
                                            Location:
                                        </span><span> </span>
                                        {room.location}
                                    </ListItem>
                                    <ListItem fontSize="13">
                                        <span style={styles.spanStyle}>
                                            Share Bill:
                                        </span><span> </span>
                                        {room.isShareBill}
                                    </ListItem>
                                    <ListItem fontSize="13">
                                        <span style={styles.spanStyle}>
                                            With Furniture:
                                        </span><span> </span>
                                        {room.withFurniture}
                                    </ListItem>
                                    <ListItem fontSize="13" style={styles.emailStyle}>
                                        <span style={styles.spanStyle}>
                                            Owner Email:
                                        </span><span> </span>
                                        {room.ownerEmail}
                                    </ListItem>
                                    <ListItem fontSize="13">
                                        <span style={styles.spanStyle}>
                                            Owner Contact:
                                        </span><span> </span>
                                        {room.ownerContact}
                                    </ListItem>
                                    <ListItem fontSize="12px" fontWeight={600}>
                                        Post At: {room.createdAt}
                                    </ListItem>
                                </List>

                                <Button
                                    as={ReactLink}
                                    to={
                                        `/sendmessage/${room._id}`
                                    }
                                    mt={10}
                                    w={'full'}
                                    bg={'green.400'}
                                    color={'white'}
                                    rounded={'xl'}
                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}
                                    _focus={{
                                        bg: 'green.500',
                                    }}>
                                    Send Message
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Center>
            ))}
        </>
    );
}
