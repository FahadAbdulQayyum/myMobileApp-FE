import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOADED, REGISTER_USER, AUTH_ERROR, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

const authReducer = async (state, action) => {

    switch (action.type) {
        case USER_LOADED:
            console.log('USER_LOADED reducer');
            await AsyncStorage.setItem('isAuthenticatedd', JSON.stringify('true'))
            await AsyncStorage.setItem('userr', JSON.stringify(action.payload.name))
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case REGISTER_USER:
        case LOGIN_SUCCESS:
            await AsyncStorage.setItem('token', action.payload.token)
            await AsyncStorage.setItem('isAuthenticatedd', JSON.stringify('true'))
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            await AsyncStorage.setItem('isAuthenticatedd', JSON.stringify('false'))
            await AsyncStorage.setItem('error', action.payload)
            return {
                ...state,
                token: null,
                loading: false,
                user: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default authReducer;