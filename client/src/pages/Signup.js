import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import { Link as ReactLink } from 'react-router-dom';

import Auth from "../utils/auth";
import { QUERY_ME } from '../utils/queries';
// redirect -----
import { useNavigate  } from "react-router-dom";

const errorStyle = {
  fontWeight: '700',
  color: 'red'
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // redirect -----
  const navigate = useNavigate()

  const [addUser, { error, data }] = useMutation(ADD_USER, 
    {
    refetchQueries: [
      {query: QUERY_ME}
    ]
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use addUser function
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
      
      setUserFormData({
        username: "",
        email: "",
        password: "",
      });
  
      //redirect ----
      const path = '/dashboard'
      navigate(path)


    } catch (e) {
      console.error(e);
    }

    
  };


  return (

    <>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link as={ReactLink} to="/me">to Dashboard</Link>
        </p>

      ) : (
        <form onSubmit={handleFormSubmit} id='signupForm'>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to become a member ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleInputChange}
                      value={userFormData.username}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      value={userFormData.email}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    {error && <div style={errorStyle}>Sign up failed!</div>}
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      disabled={
                        !(
                          userFormData.username &&
                          userFormData.email &&
                          userFormData.password
                        )
                      }
                      type="submit"
                      form='signupForm'
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user? <Link as={ReactLink} to='/login' color={'blue.400'}>Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </form>
      )}

    </>
  );
}