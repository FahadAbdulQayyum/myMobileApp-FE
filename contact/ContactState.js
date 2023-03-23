import { React, useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, GET_CONTACTS, TEMP_CONTACT, CONFIGURATION } from '../contact/types';

const ContactState = props => {
    const initialState = {
        contact: [],
        tContact: [],
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get(`${CONFIGURATION}/api/contacts`);
            console.log('ressss', res.data);
            console.log('contacttt', state.contact);
            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (err) {
            console.log('errrrr', err);
        }
    }

    // Add Contact
    const addContact = async form => {

        const config = {
            headers: {
                'Context-Type': 'application/json'
            }
        }
        console.log('mn ady atka addContact toka');
        try {
            const res = await axios.post(`${CONFIGURATION}/api/contacts`, form, config);
            console.log('before resss ADD_CONTACT', res);
            dispatch({ type: ADD_CONTACT, payload: res.data });
            console.log('after resss ADD_CONTACT', res);
        } catch (err) {
            console.log('errr', err);
        }
    }

    const deleteFunc = async index => {
        console.log("I'm in contactState deleteFun with index:", index);
        try {
            await axios.delete(`${CONFIGURATION}/api/contacts/${index}`);
            dispatch({ type: DELETE_CONTACT, payload: index })
        } catch (err) {
            console.log('delete err', err);
        }
    }

    const updateFunc = async form => {
        const config = {
            headers: {
                'Context-Type': 'application/json',
            }
        }
        console.log('mn ady atka updateContact toka homescree ');
        try {
            const res = await axios.put(`${CONFIGURATION}/api/contacts/${form._id}`, form, config);
            console.log('ressss', res.data);
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        } catch (err) {
            console.log('update err', err);
        }
        dispatch({ type: UPDATE_CONTACT, payload: form })
    }

    const tempContact = data => {
        dispatch({ type: TEMP_CONTACT, payload: data })
    }

    return (
        <contactContext.Provider
            value={{
                contact: state.contact,
                tContact: state.tContact,
                addContact,
                deleteFunc,
                updateFunc,
                getContacts,
                tempContact
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;