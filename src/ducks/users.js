import axios from 'axios';

const initialState = {
    user: {user_id: 1, username: 'Conner Jensen'},
    userGrails: [],
    users: [],
    listings: [],
    listingImages: [],
    sentMessages: [],
    recievedMessages: []
}

const GET_USER_INFO = "GET_USER_INFO";
const GET_USERS = "GET_USERS";
const GET_LISTINGS = "GET_LISTINGS";
const GET_LISTING_IMAGES = "GET_LISTING_IMAGES";
const GET_SENT_MESSAGES = "GET_SENT_MESSAGES";
const GET_RECIEVED_MESSAGES = "GET_RECIEVED_MESSAGES";
const NEW_GRAIL = "NEW_GRAIL";
const GET_GRAILS = "GET_GRAILS";

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

export function newGrail(newGrail, listingId, userId) {
    axios.post('http://localhost:3005/api/grails', {listingId, userId})
    return {
        type: NEW_GRAIL,
        payload: newGrail
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

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_USERS + '_FULFILLED':
            return Object.assign({}, state, {users: [...state.users, action.payload]})

        case GET_LISTINGS + '_FULFILLED':
            return Object.assign({}, state, {listings: [...state.listings, action.payload]})

        case GET_LISTING_IMAGES + '_FULFILLED':
            return Object.assign({}, state, {listingImages: [...state.listingImages, action.payload]})

        case GET_SENT_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {sentMessages: [...state.sentMessages, action.payload]})

        case GET_RECIEVED_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {recievedMessages: [...state.recievedMessages, action.payload]})

        case NEW_GRAIL:
            return Object.assign({}, state, {userGrails: [...state.userGrails, action.payload]})

        case GET_GRAILS + '_FULFILLED':
            return Object.assign({}, state, {userGrails: [...state.userGrails, action.payload]})

        default:
            return state;
    }
}