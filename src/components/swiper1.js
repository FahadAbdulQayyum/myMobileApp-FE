import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ContactContext from '../../contact/contactContext';

const swipper1 = () => {

    const contactContext = useContext(ContactContext);

    const [listData, setListData] = useState(
        Array(25).fill('').map((_, i) => ({ key: `${i}`, text: `Item ${++i}` }))
    );

    const closeItem = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
            // rowMap[rowKey].onRowClose();
        }
    };

    const deleteItem = (rowMap, rowKey) => {
        closeItem(rowMap, rowKey);
        // const newData = [...listData];
        // const prevIndex = listData.findIndex(item => item.ke.toString() === rowKey);
        // newData.splice(prevIndex, 1);
        // setListData(newData);
    };

    const onItemOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#fff'}
        >
            <View>
                {/* <Text style={styles.list}>{data.item.map(v => v.name)}</Text> */}
                <Text style={styles.list}>{data.item.name}</Text>
                <Text style={styles.list}>{data.item.number}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.actionButton, styles.closeBtn]}
                // onPress={() => closeItem(rowMap, data.item.ke.toString())}
                // onPress={() => console.log('data:', data, "rwoMap", rowMap, "justFinished")}

                onPress={() => closeItem(rowMap, data.item.key)}

            // onPress={() => console.log('closeItemmmm:', data.item.ke.toString())}
            // onPress={() => console.log('closeItemmmm:', typeof (data.item.ke.toString()))}
            >
                <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.actionButton, styles.deleteBtn]}
                // onPress={() => deleteItem(rowMap, data.item.ke.toString())}
                // onPress={() => deleteItem(rowMap, +data.item.key)}
                onPress={() => deleteItem(rowMap, data.item.ke.toString())}
            >
                <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
        </View >
    );

    return (
        <View style={styles.container} >
            <SwipeListView
                data={contactContext.contact}
                // data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onItemOpen}
            />
        </View>
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
        alignItems: 'center',
        backgroundColor: 'lightcoral',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        height: 50,
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

export default swipper1;