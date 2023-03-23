// I'm the right beautiful one, Fahad!

import { React, useState, useEffect } from 'react';
import { Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import HomeScreen from './src/HomeScreen';
import Navlogin from './src/Navlogin';
import Navregistration from './src/Navregistration';
import Qr from './src/qr';
import { splashBGColorPrimary } from './src/color';
import ContactState from './contact/ContactState';
import AuthState from './contact/auth/AuthState';
import AlertState from './contact/alert/AlertState';
import Splash from './src/splash';
import InsertContact from './src/components/insertContact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Swiper1 from './src/components/swiper1';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BarFull = () => {

  return (
    <Tab.Navigator
      initialRouteName="tiendas"
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: splashBGColorPrimary
      })}
    >
      <Tab.Screen name="DashBoard" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />

          ),
        }
        }
      />
      <Tab.Screen name="InsertContact" component={InsertContact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-user" size={size} color={color} />
          ),
          // headerShown: false
        }}
      />
      <Tab.Screen name="Swiper" component={Swiper1}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="swipe" size={size} color={color} />
          ),
          // headerShown: false
        }}
      />
      <Tab.Screen name="QR Scanner" component={Qr}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
          ),
          // headerShown: false
        }}
      />
    </Tab.Navigator >
  )
}

const App = () => {

  const [splash, setSplash] = useState(true);
  const [user, setUser] = useState('')

  useEffect(() => {
    console.log('Splash Screen')
    setTimeout(() => {
      setSplash(false)
      console.log('Home Screen')
    }, 2000);
  }, [splash])

  useEffect(async () => {
    let bb = await AsyncStorage.getItem('userr')
    console.log('bbbb', bb);
    setUser(bb)
    setTimeout(async () => {
      await AsyncStorage.setItem('userr', "")
    }, 1000);
  }, [])

  const logOut1 = async (alerTitle, alertMsg, { navigation }) => {
    console.log('logout1 pressed');
    await AsyncStorage.removeItem('userr')
    Alert.alert(alerTitle, alertMsg, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logOut({ navigation }) },
    ],
      {
        cancelable: true,
      }
    );

  }
  const logOut = async ({ navigation }) => {
    await AsyncStorage.setItem('userr', "")
    await AsyncStorage.setItem('isAuthenticatedd', JSON.stringify('false'))
    await AsyncStorage.setItem('token', '')

    setTimeout(async () => {
      let isAuthenticatedd = await AsyncStorage.getItem('isAuthenticatedd')
      console.log('isAuthenticatedd', JSON.parse(isAuthenticatedd));
      console.log('!isAuthenticatedd', !JSON.parse(isAuthenticatedd) === "false");
      (JSON.parse(isAuthenticatedd) === "false") && navigation.navigate('Login')
    }, 3000);
  }

  return (
    <AlertState>
      <AuthState>
        <ContactState>
          {splash ? <Splash /> :
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                      <Button
                        title={'Welcome ' + user}
                        color={`${splashBGColorPrimary}`}
                      />
                    ),
                    headerRight: () => (
                      <IconButton
                        icon="logout"
                        size={30}
                        color={`${splashBGColorPrimary}`}
                        style={{ borderWidth: 1, borderColor: splashBGColorPrimary }}

                        onPress={() => logOut1('LOGOUT', 'Are you sure to logout?', ({ navigation }))
                        }
                      />
                    ),
                  })
                  }
                  name="DashBoard" component={BarFull} initialRouteName={BarFull} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Navlogin} />
                <Stack.Screen options={{ headerShown: false }} name="Registration" component={Navregistration} />
              </Stack.Navigator>
            </NavigationContainer>
          }
        </ContactState>
      </AuthState>
    </AlertState >
  );
}

export default App; 