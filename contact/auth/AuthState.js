import { React, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from './authReducer';
import AuthContext from "./authContext";
import { REGISTER_USER, USER_LOADED, REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, CONFIGURATION } from "../types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const AuthState = props => {
    const initialState = {
        token: AsyncStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        console.log('passing loaduser');
        if (await AsyncStorage.getItem('token')) {
            setAuthToken(await AsyncStorage.getItem('token'))
        }

        try {
            console.log('passing loaduser try');
            const res = await axios.get(`${CONFIGURATION}/api/auth`);
            console.log('passing loaduser try res');
            dispatch({ type: USER_LOADED, payload: res.data })
            console.log('SUCESSFULL');
        } catch (err) {
            console.log('passing loaduser catch', err);
            console.log('passing loaduser catch msg', err.msg);
            dispatch({ type: AUTH_ERROR })
        }
    }

    const register = async form => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log('before trycatch');
        console.log('tokennn', state.token);

        try {
            const res = await axios.post(`${CONFIGURATION}/api/users`, form, config);
            console.log('ress', res);
            dispatch({ type: REGISTER_USER, payload: res.data })
            console.log('before loadUser');
            loadUser();
            console.log('After loadUser');
        } catch (err) {
            console.log('Before dispatch err', err);
            dispatch({ type: REGISTER_FAIL, payload: err.res.data.msg })
            console.log('err.response.data', err);
            console.log('After dispatch err', err);
        }
    }

    const LogOut = () => {
        console.log('logoutted in authstate');
    }

    const login = async form => {
        const config = {
            headers: {
                'Context-Type': 'application/json'
            }
        }
        try {
            console.log('login try');
            const res = await axios.post(`${CONFIGURATION}/api/auth`, form, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            console.log('before loadUser in login');
            loadUser();
            console.log('after loadUser in login');
        } catch (err) {
            console.log('login_fail in login', err);
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                LogOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState