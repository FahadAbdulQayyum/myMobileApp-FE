import { React, useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ContactContext from '../../contact/contactContext';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const contactsList = ({ navigation }) => {

    const { addContact, deleteFunc, contact } = useContext(ContactContext);
    const [filterCont, setFilterCont] = useState([])

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

    const deleteList = ii => {
        deleteFunc(ii);

    }

    const editCont = ii => {
        setUpdate(true)
        console.log('form[i]', form[i]);
        setState(contact[ii])
        setIndex(i)
        navigation.navigate('InsertContact', { index: ii, update: update })
    }

    return (
        <ScrollView style={{ width: '80%' }}>
            {contact && contact.map((v, i) => (
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
                        <TouchableOpacity onPress={() => deleteList(i)}>
                            <Text style={{ backgroundColor: 'red', color: 'white', borderRadius: 50, width: 55, height: 55, textAlign: 'center', fontSize: 39 }}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
            }
        </ScrollView >
    )
}

export default contactsList
