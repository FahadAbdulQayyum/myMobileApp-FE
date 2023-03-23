import axios from "axios";

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        console.log('Im in if token condition', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        console.log('Im in else token condition');
    }
}

export default setAuthToken;