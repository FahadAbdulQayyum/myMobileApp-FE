import { React, useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import ContactContext from '../../contact/contactContext';

const swiper = () => {

    const contactContext = useContext(ContactContext);


    // const [listData, setListData] = useState(
    //     // Array(25).fill('').map((_, i) => ({ key: `${i}`, text: `Item ${++i}` }))
    //     contactContext.contact
    // );

    // const [listData, setListData] = useState([
    //     contactContext.contact
    // ])

    useEffect(() => {
        // setListData(contactContext.contact)
        console.log('swipper wala', contactContext.contact);
        // listData.splice('')
        // listData.push(contactContext.contact)
        // setListData([...listData])
        // setListData(listData)
        // contactContext.contact.map(v => listData.push(v), setListData([...listData]))
        // setListData(...listData)
        // contactContext.contact.map(v => listData.push(v), setListData(listData))
        // contactContext.contact.map(v => listData.push(v), setListData([listData]))
        // contactContext.contact.map(v => listData1.push(v), setListData1(listData1))
        // listData.splice('')
        // listData.push(contactContext.contact)
        // contactContext.contact.map(v => listData.push(v), setListData(listData))
        // setListData(listData)
        // console.log('listData.splice()', listData)
    }, [contactContext.contact])
    // }, [])

    console.log('contactContext.contact', contactContext.contact);
    console.log('listData swiper', listData);
    // setListData(contactContext.contact)
    // listData.splice('')
    // contactContext.contact.map(v => listData.push(v), setListData(listData))
    // console.log('listData', listData);
    // useEffect(() => {
    //     // listData.push(contactContext.contact)
    //     // setListData(listData)

    //     // listData.push('')
    //     // setListData(listData)

    //     contactContext.contact.map(v => listData.push(v), setListData(listData))

    //     // contactContext.contact.map(v => listData.push(v))
    //     // setListData(listData)

    //     console.log('useEffect of Swiper')
    // }, [contactContext.contact])

    const closeItem = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteItem = (rowMap, rowKey) => {
        console.log('JustdeleteItem')
        closeItem(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.ke === rowKey);
        console.log('prevIndex: ', prevIndex)
        newData.splice(prevIndex, 1);
        setListData(newData);
        contactContext.addContacts(newData)
        console.log('deleteItem', newData)
    };

    const onItemOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        // const renderItem = (data.map(v => v)[0]) => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#fff'}
        >
            <View>{data.item.map(v => v).map(v => {
                {/* <View>{contactContext.contact.map(v => { */ }
                return (
                    // <View>
                    //     <Text style={{ fontSize: 25, textAlign: 'center' }}>{'  '}{v.name}</Text>
                    // </View>
                    <View>
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
                )
            })}</View>
            {/* <Text style={styles.list}>This Is {data.item.text} Of Swipe List View</Text> */}
            {/* <View style={styles.list}>{data.item.map(v => <Text>{v.name}</Text>)}</View> */}
            {/* <View style={styles.list}>{console.log('renderItem: ', data.item)}</View> */}
            {/* <View style={styles.list}>{console.log('renderItem: ', Object.entries(data.item))}</View> */}
            {/* <View style={styles.list}>{console.log('renderItem: ', Object.entries(data.item).map(v => v[1])[0])}</View> */}
            {/* <View style={styles.list}>{console.log('renderItem: ', (Object.entries(data.item)).map(v => v[1]))}</View> */}
            {/* <View style={styles.list}>{Object.entries(data.item).map((v) => v[1])[0]}</View> */}
            {/* <View><Text style={styles.list}>{Object.entries(data.item).map((v) => v[1])[0]}</Text></View> */}
            {/* <View><Text style={styles.list}>{data.item.map(v => v)[0].map((v, i) => ( */}
            {/* <View><Text style={styles.list}>{data.item.map((v, i) => {
                return (
                    <View key={i} style={{ marginBottom: 5, backgroundColor: 'lightblue', padding: 1, borderTopRightRadius: 30, borderBottomRightRadius: 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: .5, borderRadius: 50, width: 50, height: 50, alignItems: 'center', textAlign: 'center', justifyContent: 'center', marginRight: 8, marginLeft: 5 }}>
                            <AntDesign name="contacts" size={52} color="black" />
                        </View>

                        <View>
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
                    </View>
                )
            })}</Text></View> */}
        </TouchableHighlight >
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.actionButton, styles.closeBtn]}
                onPress={() => closeItem(rowMap, data.item.ke)}
            >
                <Text style={styles.btnText}>{<AntDesign name="close" size={24} color="white" />}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.actionButton, styles.deleteBtn]}
                onPress={() => deleteItem(rowMap, data.item.ke)}
            >
                <Text style={styles.btnText}>{<MaterialIcons name="delete" size={24} color="black" />}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container} >
            <SwipeListView
                // data={listData}
                data={contactContext.contact}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onItemOpen}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    list: {
        color: '#FFF',
    },
    btnText: {
        color: '#FFF',
    },
    rowFront: {
        // alignItems: 'center',
        // backgroundColor: 'lightcoral',
        backgroundColor: 'lightblue',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        height: 70,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
    },
    actionButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    closeBtn: {
        backgroundColor: 'blue',
        right: 75,
    },
    deleteBtn: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default swiper;