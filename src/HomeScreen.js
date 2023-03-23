import { React, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import ContactContext from '../contact/contactContext';
import AlertContext from '../contact/alert/alertContext';
import { FontAwesome, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../contact/auth/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext)
    const { loadUser } = authContext
    const { contact, deleteFunc, updateFunc, getContacts } = contactContext;

    const id = uuid.v4();

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

    useEffect(async () => {
        loadUser()
        const isAuthenticatedd = await AsyncStorage.getItem('isAuthenticatedd')
        console.log('isAuthenticateddd:', isAuthenticatedd);
        console.log('isAuthenticateddd check:', isAuthenticatedd);
        console.log('JSON.parse(isAuthenticatedd):', JSON.parse(isAuthenticatedd));
        console.log('JSON.parse(isAuthenticatedd) check:', !JSON.parse(isAuthenticatedd));
        console.log('JSON.parse(isAuthenticatedd) check:', JSON.parse(isAuthenticatedd) === "false");

        setTimeout(async () => {
            let isAuthenticatedd = await AsyncStorage.getItem('isAuthenticatedd')
            let tokenn = await AsyncStorage.getItem('token')
            console.log('tokenn', tokenn);
            console.log('isAuthenticatedd', JSON.parse(isAuthenticatedd));
            console.log('!isAuthenticatedd', !JSON.parse(isAuthenticatedd) === "false");
            (JSON.parse(isAuthenticatedd) === "false") && navigation.navigate('Login')
            getContacts();
        }, 4000);

        // eslint-disable-next-line
    }, [])
    const deleteList = ii => {

        deleteFunc(ii)
    }

    const editCont = async ii => {
        console.log('Before editCont update', update);
        setUpdate(true)
        console.log('form[i]', form[ii]);
        console.log('After editCont update', update);
        setState(contact[ii])
        setIndex(ii)
        updateFunc(state)
        navigation.navigate('InsertContact', { index: ii, update: update })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView style={{ width: '80%' }}>
                {contactContext.contact && contactContext.contact.map((v, i) => (
                    <View key={i} style={{ marginBottom: 5, backgroundColor: 'lightblue', padding: 1, borderTopRightRadius: 30, borderBottomRightRadius: 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => editCont(i)}>
                            <View style={{ padding: .5, borderRadius: 50, width: 50, height: 50, alignItems: 'center', textAlign: 'center', justifyContent: 'center', marginRight: 5 }}>
                                <AntDesign name="contacts" size={52} color="black" />
                            </View>
                        </TouchableOpacity>

                        <View style={{ position: 'relative' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', alignItems: 'center' }}>
                                <Text style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20, width: 30, height: 30, }}>
                                    {' '}<Feather name="user" size={24} color="white" />
                                </Text>
                                <Text style={{ fontSize: 25, textAlign: 'center' }}>{'  '}{v.name}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', alignItems: 'center' }}>
                                <Text style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    {' '}<MaterialIcons name="call" size={24} color="green" />
                                </Text>
                                <Text style={{ textAlign: 'center' }}>{'    '}{v.number}</Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', top: 4, right: 5 }}>
                            <TouchableOpacity onPress={() => deleteList(v._id)}>
                                <Text style={{ backgroundColor: 'red', color: 'white', borderRadius: 50, width: 55, height: 55, textAlign: 'center', fontSize: 39 }}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
                }
            </ScrollView >
        </View >
    )
}

export default HomeScreen;