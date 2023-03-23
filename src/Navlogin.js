import { React, useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5, FontAwesome, Foundation } from '@expo/vector-icons';
import { splashBGColorPrimary, splashBGColorPrimaryLight, splashBGColorPrimaryLight1, splashBGColorSec, logoColor } from './color';
import authContext from '../contact/auth/authContext';
import contactContext from '../contact/contactContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertContext from '../contact/alert/alertContext';
import Alerts from './components/Alerts';

const Navlogin = ({ navigation }) => {

    const { isAuthenticated, user, login } = useContext(authContext);
    const { setAlert } = useContext(AlertContext);
    const { getContacts, error } = useContext(contactContext);
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('DashBoard')
            console.log('navlogin useEffect', user, isAuthenticated);
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('DashBoard')
            console.log('navlogin useEffect', user, isAuthenticated);
        }
    }, [isAuthenticated])

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = state;

    const loginUser = async () => {
        await AsyncStorage.setItem('userr', "")
        await AsyncStorage.removeItem('userr')
        if (!email || !password) {
            setAlert('Kindly fill the credentials')
        } else {
            login({ email, password })
            console.log('erro', await AsyncStorage.getItem('error'));

            let er = await AsyncStorage.getItem('error')
            await AsyncStorage.setItem('error', "");
            await AsyncStorage.removeItem('error')
            if (er === 'Incorrect password.' || er === 'A user having this email address does not exists.') {
                return setAlert(er)
            }
            setTimeout(async () => {
                let isAuthenticatedd = await AsyncStorage.getItem('isAuthenticatedd')
                console.log('isAuthenticatedd', JSON.parse(isAuthenticatedd));
                console.log('!isAuthenticatedd', !JSON.parse(isAuthenticatedd) === "false");
                (JSON.parse(isAuthenticatedd) === "true") && navigation.navigate('DashBoard')
                getContacts();
            }, 1000);
        }
    }

    return (
        <View style={{
            backgroundColor: splashBGColorSec, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <View style={{ flex: .2, backgroundColor: 'yellow' }}></View>
            <View style={{ flex: 1 }}>
                <Ionicons name="logo-foursquare" size={120} color={splashBGColorPrimary} />
            </View>
            <View style={{ flex: 2, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontSize: 50 }}>Login</Text>
                <Alerts />
                <View style={{ display: 'flex', flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
                    <View style={{
                        height: 35,
                        width: 35,
                        borderRightWidth: 1,
                        borderRightColor: 'white',
                        padding: 5,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -38,
                        backgroundColor: splashBGColorPrimaryLight1,
                        zIndex: 9
                    }}>
                        <FontAwesome5 name="user-alt" size={19} color={logoColor} />
                    </View>
                    <TextInput style={{
                        height: 40,
                        width: '80%',
                        borderWidth: 1,
                        padding: 10,
                        paddingLeft: 48,
                        borderRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: splashBGColorPrimaryLight,
                        borderColor: splashBGColorPrimaryLight,
                    }}
                        placeholder="Enter your username"
                        name={state.email}
                        value={state.email}
                        onChangeText={(text) => setState({ ...state, email: text })}
                        autoFocus={true}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
                    <View style={{
                        height: 35,
                        width: 35,
                        borderRightWidth: 1,
                        borderRightColor: 'white',
                        padding: 5,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -38,
                        backgroundColor: splashBGColorPrimaryLight1,
                        zIndex: 9
                    }}>
                        <FontAwesome name="lock" size={24} color={logoColor} />
                    </View>
                    <TextInput style={{
                        height: 40,
                        width: '80%',
                        borderWidth: 1,
                        padding: 10,
                        paddingLeft: 45,
                        borderRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: splashBGColorPrimaryLight,
                        borderColor: splashBGColorPrimaryLight,
                    }}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        name={state.password}
                        value={state.password}
                        onChangeText={(text) => setState({ ...state, password: text })}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20, marginTop: 120 }}>
                    <View style={{
                        height: 35,
                        width: 35,
                        borderRightWidth: 1,
                        borderRightColor: 'white',
                        padding: 5,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -38,
                        backgroundColor: splashBGColorPrimaryLight1,
                        zIndex: 9
                    }}>
                        <FontAwesome name="sign-in" size={24} color={logoColor} />
                    </View>
                    <TouchableOpacity style={{
                        height: 40,
                        width: '60%',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: splashBGColorPrimaryLight,
                        borderColor: splashBGColorPrimaryLight,
                    }}
                        onPress={loginUser}
                    >
                        <Text style={{
                            textAlign: 'center', color: 'white', fontSize: 20, height: 40, top: -6,
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20, marginTop: -20 }}>
                    <View style={{
                        height: 35,
                        width: 35,
                        borderRightWidth: 1,
                        borderRightColor: 'white',
                        padding: 5,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -38,
                        backgroundColor: splashBGColorPrimaryLight1,
                        zIndex: 9
                    }}>
                        <Foundation name="clipboard-pencil" size={24} color="black" />
                    </View>
                    <TouchableOpacity style={{
                        height: 40,
                        width: '60%',
                        borderWidth: 2,
                        padding: 10,
                        borderRadius: 20,
                        borderColor: splashBGColorPrimaryLight,
                    }}
                        onPress={() =>
                            navigation.navigate('Registration')
                        }
                    >
                        <Text style={{
                            textAlign: 'center', color: splashBGColorPrimary, fontSize: 20, height: 40, top: -8,
                        }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Navlogin