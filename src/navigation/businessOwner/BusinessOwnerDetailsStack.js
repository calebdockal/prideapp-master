import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BusinessOwnerDetails from '../../screens/businessOwner/BusinessOwnerDetails';

const Stack = createStackNavigator();
export default function BusinessOwnerAddStack(props) {
  return (
    <Stack.Navigator initialRouteName='BusinessOwnerDetails'>
      <Stack.Screen
        name='BusinessOwnerDetails'
        component={BusinessOwnerDetails}
        options={{
          title: props.route.params.businessName,
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
          cardStyle: {
            backgroundColor: '#a40ffe'
          }
        }}

      />
    </Stack.Navigator>
  );
}