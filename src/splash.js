import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { splashBGColorPrimary, splashBGColorSec } from './color';

const splash = () => {
    return (
        <View style={{ backgroundColor: splashBGColorPrimary, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderWidth: 2, borderRadius: 200, padding: 1, height: 150, width: 150, borderColor: '#a8dadc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="logo-foursquare" size={120} color={splashBGColorSec} />
            </View >
        </View >
    )
}

export default splash
