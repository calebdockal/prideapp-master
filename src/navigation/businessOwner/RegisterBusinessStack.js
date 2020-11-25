import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterBusiness1 from '../../screens/auth/RegisterBusiness1';
import RegisterBusiness2 from '../../screens/auth/RegisterBusiness2';
import RegisterBusiness3 from '../../screens/auth/RegisterBusiness3';
import Geolocation from '../../screens/shared/Geolocation';

const Stack = createStackNavigator();
export default function RegisterBusinessStack() {
  return (
    <Stack.Navigator initialRouteName='RegisterBusiness1'>
      <Stack.Screen
        name='RegisterBusiness1'
        component={RegisterBusiness1}
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
            fontSize: 32
          },
        }}
      />
      <Stack.Screen
        name='RegisterBusiness2' 
        component={RegisterBusiness2}
        options={{
          title: 'Business Details',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#a40ffe',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
        }}
      />
      <Stack.Screen
        name='RegisterBusiness3' 
        component={RegisterBusiness3}
        options={{
          title: 'Business Details',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#a40ffe',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
        }}
      />
      <Stack.Screen
        name='Geolocation' 
        component={Geolocation}
        options={{
          title: 'Select location',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#a40ffe',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
        }}
      />
    </Stack.Navigator>
  );
}