import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, TEMP_CONTACT, GET_CONTACTS } from '../contact/types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: [...state.contact, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contact: state.contact.filter(V => V._id !== action.payload)
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contact: state.contact.map(v => v._id === action.payload._id ? action.payload : v)
            }
        case GET_CONTACTS:
            return {
                ...state,
                contact: action.payload
            }
        case TEMP_CONTACT:
            return {
                ...state,
                tContact: [...state.tContact, action.payload]
            }
        default:
            return state;
    }
}

export default contactReducer;