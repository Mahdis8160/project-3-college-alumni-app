import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import Auth from '../utils/auth';
import { Link as ReactLink } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import { useParams } from 'react-router-dom';



export default function Navigation() {
  const { username: userParam } = useParams();

  // const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // refetch()

  const { isOpen, onToggle } = useDisclosure();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('white');

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box>
      <Flex
        bg={'gray.200'}
        color={'gray.600'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            _hover={{ color: linkHoverColor, bg: 'gray.400', }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            fontSize="22" fontWeight="bold"
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily={'heading'}
            color={'gray.800'}>
            UCLA ALUMNI CONNECT
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {Auth.loggedIn() ? (
            <>
              <Button
                // display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                onClick={logout}
                color={'white'}
                bg={'pink.400'}
                _hover={{
                  bg: 'pink.300',
                }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                p={2}
                as={ReactLink}
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                color={linkColor}
                _hover={{ textDecoration: 'none', color: linkHoverColor, bg: 'gray.400', }}
                to={'/login'}>
                Login
              </Button>
              <Button
                as={ReactLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                to={'/signup'}
                _hover={{
                  bg: 'pink.300',
                }}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('white');

  return (
    <Stack direction={'row'} spacing={4}>
      <Box>
        <Button
          p={2}
          as={ReactLink}
          to='/'
          fontSize={'sm'}
          variant={'link'}
          fontWeight={600}
          color={linkColor}
          _hover={{ textDecoration: 'none', color: linkHoverColor, bg: 'gray.400', }}
        >
          Home
        </Button>

        {Auth.loggedIn() ? (
          <>
            <Button p={2}
              to='/dashboard'
              as={ReactLink}
              variant={'link'}
              fontSize={'sm'}
              fontWeight={500}
              color={'pink.400'}
              _hover={{ textDecoration: 'none', color: linkHoverColor, bg: 'gray.400',}}>
              {Auth.getProfile().data.username}'s Dashboard
            </Button>
          </>
        ) : (
          <>

          </>
        )}
      </Box>
    </Stack>
  );
};


const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      spacing={1}
      display={{ md: 'none' }}>
      <Flex
        py={2}
        as={ReactLink}
        to='/'
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          Home
        </Text>
      </Flex>

      {Auth.loggedIn() ? (
        <>
          <Flex
            py={2}
            as={ReactLink}
            to='/dashboard'
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}
              color={'pink.400'}
            >
              {Auth.getProfile().data.username}'s Dashboard
            </Text>
          </Flex>
        </>
      ) : (
        <>

        </>
      )}

    </Stack>
  );
};

