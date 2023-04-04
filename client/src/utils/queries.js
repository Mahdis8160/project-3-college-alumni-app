import { gql } from "@apollo/client";

export const QUERY_ME = gql`
   query me {
        me {
            _id
            username
            email
            rooms {
                _id
                image
                location
                price
                totalRooms
                parkingSpace
                isShareBill
                withFurniture
                description
                ownerEmail
                ownerContact
                createdAt
            }
        }
    }
`

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            rooms {
                _id
                image
                location
                price
                totalRooms
                parkingSpace
                isShareBill
                withFurniture
                description
                ownerEmail
                ownerContact
                createdAt
            }
        }
    }
`

export const QUERY_ROOMS = gql`
    query rooms {
        rooms {
            _id
            image
            location
            price
            totalRooms
            parkingSpace
            isShareBill
            withFurniture
            description
            ownerEmail
            ownerContact
            createdAt
        }
    }
`


export const QUERY_SINGLE_ROOM = gql`
    query room($roomId: ID!) {
        room(roomId: $roomId) {
            _id
            image
            location
            price
            totalRooms
            parkingSpace
            isShareBill
            withFurniture
            description
            ownerEmail
            ownerContact
            createdAt
        }
    }
`