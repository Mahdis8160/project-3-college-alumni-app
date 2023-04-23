import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
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
  Input,
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleBirthdateChange = (event) => setBirthdate(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);

  const handleSave = () => {
    // TODO: update user information
  };

  refetch();
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
      <Box style={styles.messageStyle}>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          You need to be logged in to see this. Use the navigation links to
          <Link as={ReactLink} style={styles.linkStyle} to="/login">
            {' '}
            login{' '}
          </Link>
          or
          <Link as={ReactLink} style={styles.linkStyle} to="/signup">
            {' '}
            signup{' '}
          </Link>
          .
        </Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" align="center">
    <Stack maxW="700px" w="100%" spacing={8}>
    <Flex justify="space-between" align="center">
    <Heading style={styles.titleStyle}>{user.username}'s Dashboard</Heading>
    <Button colorScheme="red" variant="solid" onClick={handleLogout}>
    Logout
    </Button>
    </Flex>
    <Box>
    <SimpleGrid columns={2} spacing={6}>
    <Box>
    <Input
      type="text"
      placeholder="Name"
      value={name}
      onChange={handleNameChange}
      />
    </Box>
    <Box>
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={handleEmailChange}
      />
    </Box>
    <Box>
    <Input
     type="text"
     placeholder="Birthdate"
     value={birthdate}
     onChange={handleBirthdateChange}
     />
    </Box>
    <Box>
    <Input
     type="tel"
     placeholder="Phone"
      value={phone}
      onChange={handlePhoneChange}
      />
    </Box>
    </SimpleGrid>
    <Button colorScheme="blue" variant="solid" onClick={handleSave}>
    Save Changes
    </Button>
    </Box>
    </Stack>
    </Flex>
    );
    };
    
    export default Dashboard;
