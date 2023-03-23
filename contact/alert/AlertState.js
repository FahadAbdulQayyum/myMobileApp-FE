import { React, useReducer } from 'react';
import uuid from 'react-native-uuid';
import alertContext from './alertContext';
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 2000) => {
        const id = uuid.v4();
        console.log('uuid.v4', id);
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        console.log('after dispatch in SET_ALERT', id);

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
        console.log('after dispatch in REMOVE_ALERT', id);
    }

    return (
        <alertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </alertContext.Provider >
    )
}

export default AlertState;