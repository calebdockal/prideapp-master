import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ForgotPasswordConfirm from '../screens/auth/ForgotPasswordConfirm';

const Stack = createStackNavigator();
export default function RegisterBusinessStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          title: 'Login',
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
        name='ForgotPassword' 
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
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
        name='ForgotPasswordConfirm' 
        component={ForgotPasswordConfirm}
        options={{
          title: 'Code Verification',
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