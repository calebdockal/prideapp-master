import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import LoginStack from '../navigation/LoginStack';
import RegisterAs from '../screens/auth/RegisterAs';
import RegisterClient from '../screens/auth/RegisterClient';
import RegisterBusinessStack from '../navigation/businessOwner/RegisterBusinessStack';
import ClientHomeTab from './client/ClientHomeTab';
import BusinessOwnerHomeTab from './businessOwner/BusinessOwnerHomeTab';

const Stack = createStackNavigator();
export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClientHomeTab">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterAs"
          component={RegisterAs}
          options={{
            title: 'Register as',
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: null,
            headerTintColor: '#a40ffe',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 32,
            },
          }}
        />
        <Stack.Screen
          name="RegisterClient"
          component={RegisterClient}
          options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: null,
            headerTintColor: '#a40ffe',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 32,
            },
          }}
        />
        <Stack.Screen
          name="RegisterBusinessStack"
          component={RegisterBusinessStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClientHomeTab"
          component={ClientHomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BusinessOwnerHomeTab"
          component={BusinessOwnerHomeTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
