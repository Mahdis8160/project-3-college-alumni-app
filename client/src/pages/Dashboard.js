import React from 'react' 
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';
import {
    Box,
    Button,
    Flex,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Heading,
  } from '@chakra-ui/react';
  import { Link as ReactLink } from 'react-router-dom';

  const styles = {
    messageStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
        color: 'red',
        marginTop: 50,
        marginBottom: 50,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
    linkStyle: {
        color: 'blue',
        textDecoration: 'none',
        fontWeight: 600,
        '&:hover': {
            textDecoration: 'underline',
        },
    },
};


const handleLogout = () => {
    Auth.logout();
    // Redirect to the homepage
    window.location.replace('/');
  };

const Dashboard = () => {
    const { username: userParam } = useParams();

    const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });



    refetch()
    const user = data?.me || data?.user || {};
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4 style={styles.messageStyle}>
                You need to be logged in to see this. Use the navigation links to
                <Link as={ReactLink} style={styles.linkStyle} to="/login">
                    login
                </Link>{' '} 
                or{' '} 
                <Link as={ReactLink} style={styles.linkStyle} to="/signup">
                    signup.
                </Link>
            </h4>
        );
    }
    
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
          <Stack spacing={8}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Welcome, {user.name}</Heading>
            </Stack>
            <SimpleGrid columns={2} spacing={4}>
              <Box>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                  Name:
                </Text>
                <Text>{user.name}</Text>
              </Box>
              <Box>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                  Email:
                </Text>
                <Text>{user.email}</Text>
              </Box>
              <Box>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                  Birthdate:
                </Text>
                <Text>{user.birthdate}</Text>
              </Box>
              <Box>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                Phone Number:
                    </Text>
                    <Text>{user.phone}</Text>
                </Box>
                </SimpleGrid>
                <Button colorScheme={'blue'} size={'lg'} onClick={handleLogout}>
                Logout
</Button>
</Stack>
</Flex>
);
};



export default Dashboard
