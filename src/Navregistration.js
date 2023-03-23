import { React, useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo, FontAwesome, FontAwesome5, Foundation } from '@expo/vector-icons';
import { splashBGColorPrimary, splashBGColorPrimaryLight, splashBGColorPrimaryLight1, splashBGColorSec, logoColor } from './color';
import Alerts from './components/Alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authContext from '../contact/auth/authContext';
import AlertContext from '../contact/alert/alertContext';
import contactContext from '../contact/contactContext';

const Navregistration = ({ navigation }, props) => {

    const { register, isAuthenticated, user } = useContext(authContext);
    const { setAlert } = useContext(AlertContext);
    const { getContacts } = useContext(contactContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('DashBoard')
            console.log('NavRegistration useEffect', user, isAuthenticated);
        }
    }, [isAuthenticated])


    const [state, setState] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confpassword: ''
    });

    const { name, surname, email, password, confpassword } = state;

    const registerUser = async () => {
        console.log('registerUser', state);
        if (!name || !email || !password) {
            setAlert('Kindly fill the credentials')
        } else {
            register({ name, email, password })
            setTimeout(async () => {
                let isAuthenticatedd = await AsyncStorage.getItem('isAuthenticatedd')
                console.log('isAuthenticatedd', JSON.parse(isAuthenticatedd));
                console.log('!isAuthenticatedd', !JSON.parse(isAuthenticatedd) === "false");
                (JSON.parse(isAuthenticatedd) === "true") && navigation.navigate('DashBoard')
                getContacts()
            }, 3000);
        }
    }

    return (
        <View style={{
            backgroundColor: splashBGColorSec, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <View style={{ flex: .2, backgroundColor: 'yellow' }}></View>
            <View style={{ flex: .5 }}>
                <Ionicons name="logo-foursquare" size={120} color={splashBGColorPrimary} />
            </View>
            <View style={{ flex: 2, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontSize: 50 }}>Registration</Text>
                <Alerts />
                <View style={{ display: 'flex', flexDirection: 'row', margin: -5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
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
                        placeholder="Enter your First Name"
                        name={state.name}
                        value={state.name}
                        onChangeText={(text) => setState({ ...state, name: text })}
                        autoFocus={true}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: -5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
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
                        placeholder="Enter your Surname"
                        name={state.surname}
                        value={state.surname}
                        onChangeText={(text) => setState({ ...state, surname: text })}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: -5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
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
                    }}
                    >
                        <Entypo name="email" size={24} color="black" />
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
                        placeholder="Enter your Gmail"
                        name={state.email}
                        value={state.email}
                        onChangeText={(text) => setState({ ...state, email: text })}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: -5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
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
                <View style={{ display: 'flex', flexDirection: 'row', margin: -5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 20 }}>
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
                        placeholder="Enter your confirm password"
                        name={state.confpassword}
                        value={state.confpassword}
                        onChangeText={(text) => setState({ ...state, confpassword: text })}
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
                        <Foundation name="clipboard-pencil" size={24} color="black" />
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
                        onPress={registerUser}
                    >
                        <Text style={{
                            textAlign: 'center', color: 'white', fontSize: 20, height: 40, top: -6,
                        }}>Register</Text>
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
                        <FontAwesome name="sign-in" size={24} color={logoColor} />
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
                            navigation.navigate('Login')
                        }
                    >
                        <Text style={{
                            textAlign: 'center', color: splashBGColorPrimary, fontSize: 20, height: 40, top: -8,
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Navregistration