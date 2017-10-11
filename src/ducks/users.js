import axios from 'axios';

const initialState = {
    user: {},
    listings: [],
    listingImages: [],
    messages: []
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_LISTINGS = 'GET_LISTINGS';
const GET_LISTING_IMAGES = "GET_LISTING_IMAGES";
const GET_MESSAGES = "GET_MESSAGES";

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

export function getMessages(userId) {
    const displayMessages = axios.get('http://localhost:3005/api/messages/' + userId)
    .then( messages => {
        return messages.data
    })

    return {
        type: GET_MESSAGES,
        payload: displayMessages
    }
}

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_LISTINGS + '_FULFILLED':
            return Object.assign({}, state, {listings: [...state.listings, action.payload]})

        case GET_LISTING_IMAGES + '_FULFILLED':
            return Object.assign({}, state, {listingImages: [...state.listingImages, action.payload]})

        case GET_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {messages: [...state.messages, action.payload]})

        default:
            return state;
    }
}