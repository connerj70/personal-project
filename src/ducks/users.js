import axios from 'axios';

const initialState = {
    user: {user_id: 1, username: 'Conner Jensen'},
    // user: {},
    userGrails: [],
    users: [],
    userListings: [],
    listings: [],
    listingImages: [],
    sentMessages: [],
    recievedMessages: []
}

const GET_USER_INFO = "GET_USER_INFO";
const GET_USERS = "GET_USERS";
const GET_USER_LISTINGS = "GET_USER_LISTINGS";
const DELETE_USER_LISTING = "DELETE_USER_LISTING";
const GET_LISTINGS = "GET_LISTINGS";
const GET_LISTING_IMAGES = "GET_LISTING_IMAGES";
const GET_SENT_MESSAGES = "GET_SENT_MESSAGES";
const GET_RECIEVED_MESSAGES = "GET_RECIEVED_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";
const NEW_GRAIL = "NEW_GRAIL";
const GET_GRAILS = "GET_GRAILS";
const REMOVE_GRAIL = "REMOVE_GRAIL";

export function getUserInfo() {
    const userData = axios.get('/auth/me')
    .then( res => {
        return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getUsers() {
    const usersData = axios.get('http://localhost:3005/api/users')
    .then( res => {
        return res.data
    });

    return {
        type: GET_USERS,
        payload: usersData
    }
}

export function getUserListings(userId) {
    const userListings = axios.get('http://localhost:3005/api/userlistings/' + userId)
    .then( res => {
        return res.data
    })
    return {
        type: GET_USER_LISTINGS,
        payload: userListings
    }
}

export function deleteUserListing(userId, listingId) {
    const deleteListing = axios.post('http://localhost:3005/api/userlistings/delete', {userId, listingId})
    .then( res => {
        return res.data
    })
    return {
        type : DELETE_USER_LISTING,
        payload: deleteListing
    }
}

export function getListings() {
    const listings = axios.get('http://localhost:3005/api/listings')
    .then(listing => {
        return listing.data
    });
    return {
        type: GET_LISTINGS,
        payload: listings
    }
}

export function getListingImages() {
    const listingImages = axios.get('http://localhost:3005/api/listings/images')
    .then( images => {
        return images.data
    })

    return {
        type: GET_LISTING_IMAGES,
        payload: listingImages
    }
}

export function getSentMessages(userId) {
    const displayMessages = axios.get('http://localhost:3005/api/messages/' + userId)
    .then( messages => {
        return messages.data
    })

    return {
        type: GET_SENT_MESSAGES,
        payload: displayMessages
    }
}

export function getRecievedMessages(userId) {
    const displayMessages = axios.get('http://localhost:3005/api/recievedmessages/' + userId)
    .then( messages => {
        return messages.data
    })

    return {
        type: GET_RECIEVED_MESSAGES,
        payload: displayMessages
    }
}

export function addMessage(senderId, messageText, userId) {
    const messages = axios.post('http://localhost:3005/api/messages', {senderId: senderId, messageText: messageText, userId: userId})
    .then(messages => {
        return messages.data
    })
    return {
        type: ADD_MESSAGE,
        payload: messages
    }
}

export function newGrail(newGrail, listingId, userId, callback) {
    const grails = axios.post('http://localhost:3005/api/grails', {listingId, userId})
    .then( response => {
        return (
            response.data
        )
    })
    return {
        type: NEW_GRAIL,
        payload: grails
    }
}

export function getGrails(userId) {
    const grails = axios.get('http://localhost:3005/api/grails/' + userId)
    .then( grails => {
        return grails.data;
    })
    return {
        type: GET_GRAILS,
        payload: grails
    }
}

export function removeGrail(userId, listingId) {
    const grails  = axios.post('http://localhost:3005/api/grails/delete', {userId, listingId})
    .then( grails => {
        return grails.data
    })
    return {
        type: REMOVE_GRAIL,
        payload: grails
    }
}

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_USERS + '_FULFILLED':
            return Object.assign({}, state, {users: [...state.users, action.payload]})

        case GET_USER_LISTINGS + '_FULFILLED':
            return Object.assign({}, state, {userListings: [...state.userListings, action.payload]})

        case DELETE_USER_LISTING + '_FULFILLED':
            return Object.assign({}, state, {userListings: [...state.userListings, action.payload]})    

        case GET_LISTINGS + '_FULFILLED':
            return Object.assign({}, state, {listings: [...state.listings, action.payload]})

        case GET_LISTING_IMAGES + '_FULFILLED':
            return Object.assign({}, state, {listingImages: [...state.listingImages, action.payload]})

        case GET_SENT_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {sentMessages: [...state.sentMessages, action.payload]})

        case GET_RECIEVED_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {recievedMessages: [...state.recievedMessages, action.payload]})

        case ADD_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, {sentMessages: [...state.sentMessages, action.payload]})    

        case NEW_GRAIL:
            return Object.assign({}, state, {userGrails: [...state.userGrails, action.payload]})

        case GET_GRAILS + '_FULFILLED':
            return Object.assign({}, state, {userGrails: [...state.userGrails, action.payload]})

        case REMOVE_GRAIL + '_FULFILLED':
            return Object.assign({}, state, {userGrails: [...state.userGrails, action.payload]})

        default:
            return state;
    }
}