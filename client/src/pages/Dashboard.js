// v1
import React from 'react' 
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';
import { Button, Flex, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';

const styles = {
    messageStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
        color: 'red'
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 700,
    },
    linkStyle: {
        color: 'blue'
    }

}


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
                <Link as={ReactLink} style={styles.linkStyle} to="/login">login</Link> or <Link as={ReactLink} style={styles.linkStyle} to="/signup">signup.</Link>
            </h4>
        );
    }

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 style={styles.titleStyle}>
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
            </div>
        </div>
    );
};







export default Dashboard