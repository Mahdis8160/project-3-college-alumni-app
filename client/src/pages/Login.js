import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';

// import useMutation and LOGIN-USER
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
// import { validateEmail } from '../utils/helpers'
import Auth from "../utils/auth";
import { Link as ReactLink } from 'react-router-dom';
import { QUERY_ME } from "../utils/queries";

// redirect -----
import { useNavigate } from "react-router-dom";


const errorStyle = {
  fontWeight: '700',
  color: 'red'
}

export default function LoginForm() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [loginUser, { error, data }] = useMutation(LOGIN_USER, {
    refetchQueries: [
      { query: QUERY_ME },
    ]
  });

  // redirect -----
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use loginUser function
    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);

      setUserFormData({
        // username: "",
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
          <Link as={ReactLink} to="/me">to Dashboard.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} id='loginForm'>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Login to your account</Heading>
              </Stack>
              <Box
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name='email'
                      id='email'
                      value={userFormData.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name='password'
                      id='password'
                      value={userFormData.password}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      <Text fontSize={'lg'} color={'gray.600'}>
                        Don't have an account?
                      </Text>
                      <Link as={ReactLink} to="/signup" color={'blue.400'}>Sign Up</Link>
                    </Stack>
                    {error && <div style={errorStyle}>Login failed!</div>}
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      disabled={
                        !(
                          userFormData.email &&
                          userFormData.password
                        )
                      }
                      type='submit'
                      form="loginForm"
                    >
                      Login
                    </Button>
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