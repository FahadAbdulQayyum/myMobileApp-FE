// name:fahad,number&343333*gender.male
// name: Hanzala, number & 9343333 * gender.male

import { React, useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, LogBox } from 'react-native';
import uuid from 'react-native-uuid';
import ContactContext from '../../contact/contactContext';
import AlertContext from '../../contact/alert/alertContext';
import Alerts from './Alerts';
import { RadioButton } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const InsertContact = ({ navigation, route }) => {

    const id = uuid.v4();

    const [form, setForm] = useState([
        {
            name: 'Fahad',
            number: '03232845',
            gender: 'Male',
            id: id
        },
        {
            name: 'Fahad',
            number: '03232845',
            gender: 'Male',
            id: id
        }
    ])
    const [index, setIndex] = useState()
    const [update, setUpdate] = useState(false)
    const [state, setState] = useState(
        {
            name: '',
            number: '',
            gender: '',
            id: id
        }
    )

    let i
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        i = route?.params?.index
        if (route?.params != undefined) {
            setState(contact[i])
            setUpdate(true)
            console.log('if route');
        }
        console.log('useEffect update', update);
    }, [route?.params, route?.params != undefined])

    const contactContext = useContext(ContactContext);
    const { addContact, contact, deleteFunc, updateFunc, tContact } = contactContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext

    useEffect(() => {
        let aaaa = tContact.toString()
        let name = aaaa.slice(aaaa.indexOf(':') + 1, aaaa.indexOf(','))
        let number = aaaa.slice(aaaa.indexOf('&') + 1, aaaa.indexOf('*'))
        let gender = aaaa.slice(aaaa.indexOf('.') + 1)
        setState({ name: name, number: number, gender: gender })
    }, [tContact])

    const onSubmit = () => {
        if (!state.name || !state.number || !state.gender) {
            setAlert('Kindly fill the credentials')
            console.log('setAlert State');
        } else {
            addContact(state)
            form.push(state)
            setForm([...form])
            setState({
                name: '',
                number: '',
                gender: ''
            })
            console.log('submitted state', state);
            console.log('submitted form', form);
            navigation.navigate('DashBoard')
        }
    }

    const updateContact = () => {
        console.log('updateContact state', state);
        setUpdate(false)
        form[index] = state
        setForm([...form])
        setIndex('')
        updateFunc(state)
        setState({
            name: '',
            number: '',
            gender: ''
        })
        console.log('updatedContact', update);
        navigation.navigate('DashBoard')
    }

    const clearContact = () => {
        console.log('clearContact');
        setState({
            name: '',
            number: '',
            gender: ''
        })
        setUpdate(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Alerts />
            <TextInput placeholder='Enter your name'
                name={state.name}
                value={state.name}
                onChangeText={(text) => setState({ ...state, name: text })}
                autoFocus={true}
                style={{ borderWidth: 1, borderColor: 'lightblue', width: '80%', marginBottom: 5, padding: 5, borderRadius: 10 }}
            />
            <TextInput placeholder='Enter your number'
                name={state.number}
                value={state.number}
                onChangeText={(text) => setState({ ...state, number: text })}
                keyboardType="phone-pad"
                style={{ borderWidth: 1, borderColor: 'lightblue', width: '80%', marginBottom: 5, padding: 5, borderRadius: 10 }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                    value={state.gender}
                    status={state.gender === 'male' ? 'checked' : 'unchecked'}
                    useNativeDriver={false}
                    onPress={() => setState({ ...state, gender: 'male' })}
                />
                <Text>
                    Male
                </Text>
                <RadioButton
                    value={state.gender}
                    status={state.gender === 'female' ? 'checked' : 'unchecked'}
                    useNativeDriver={false}
                    onPress={() => setState({ ...state, gender: 'female' })}
                />
                <Text>
                    Female
                </Text>
            </View>
            <View style={{ backgroundColor: '#0096c7', width: '70%', height: 40, marginTop: 30, borderRadius: 20 }}>
                {!update ?
                    <TouchableOpacity onPress={onSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                        <Text>
                            <Ionicons name="add" size={24} color="white" />
                        </Text>

                        <Text style={{ color: 'white', }}>
                            {'  '} ADD CONTACT
                        </Text>
                    </TouchableOpacity>
                    :
                    (
                        <View style={{ backgroundColor: 'white', width: '100%', height: 80, marginTop: 0, borderRadius: 20 }}>
                            <TouchableOpacity onPress={updateContact} style={{ backgroundColor: '#0096c7', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 6, width: '100%', height: 40, borderRadius: 20 }}>
                                <Text>
                                    <Ionicons name="add" size={24} color="white" />
                                </Text>

                                <Text style={{ color: 'white', }}>
                                    {'  '} UPDATE CONTACT
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={clearContact} style={{ backgroundColor: '#0096c7', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 6, width: '100%', height: 40, borderRadius: 20 }}>
                                <Text>
                                    <Ionicons name="add" size={24} color="white" />
                                </Text>

                                <Text style={{ color: 'white', }}>
                                    {'  '} CLEAR CONTACT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        </View>
    )
}

export default InsertContact;