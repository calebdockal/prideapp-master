import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BusinessOwnerAdd1 from '../../screens/businessOwner/BusinessOwnerAdd1';
import BusinessOwnerAdd2 from '../../screens/businessOwner/BusinessOwnerAdd2';
import Geolocation from '../../screens/shared/Geolocation';

const Stack = createStackNavigator();
export default function BusinessOwnerAddStack(props) {
  return (
    <Stack.Navigator initialRouteName='BusinessOwnerAdd1'>
      <Stack.Screen
        name='BusinessOwnerAdd1'
        component={BusinessOwnerAdd1}
        initialParams={{type: props.route.params.type}}
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
        name='BusinessOwnerAdd2' 
        component={BusinessOwnerAdd2}
        initialParams={{type: props.route.params.type}}
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
        initialParams={{type: props.route.params.type}}
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