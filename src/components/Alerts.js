import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AlertContext from '../../contact/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext)

    const { alerts } = alertContext;

    return (
        alerts.length > 0 &&
        alerts.map((alert, i) => (
            <View key={i} className={`alert alert-${alert.type}`} style={{ padding: 5, zIndex: 99, width: '70%', justifyContent: 'center' }}>
                <Text style={{ backgroundColor: 'red', color: 'white', textAlign: 'center', padding: 5, borderRadius: 30 }}>
                    {alert.msg}
                </Text>
            </View >
        ))
    )
};

export default Alerts;