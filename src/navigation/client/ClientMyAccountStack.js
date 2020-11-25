import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {logout} from '../../actions/authAction';
import ClientMyAccount from '../../screens/client/ClientMyAccount';
import ClientEditProfile from '../../screens/client/ClientEditProfile';
import ClientChangePassword from '../../screens/client/ClientChangePassword';
import ClientFaq from '../../screens/client/ClientFaq';
import ClientFeedback from '../../screens/client/ClientFeedback';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
function ClientMyAccountStack(props) {
  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (!token) {
        props.navigation.navigate('LoginStack');
      }
    });
  });

  return (
    <Stack.Navigator initialRouteName="ClientMyAccount">
      <Stack.Screen
        name="ClientMyAccount"
        component={ClientMyAccount}
        options={{
          title: 'My Account',
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: null,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => props.logout(props.navigation)}>
                <Text style={{marginRight: 15, fontSize: 20, color: '#fff'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          cardStyle: {
            backgroundColor: '#f1f1f1',
          },
        }}
      />
      <Stack.Screen
        name="ClientEditProfile"
        component={ClientEditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          cardStyle: {
            backgroundColor: '#f1f1f1',
          },
        }}
      />
      <Stack.Screen
        name="ClientChangePassword"
        component={ClientChangePassword}
        options={{
          title: 'Change Password',
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          cardStyle: {
            backgroundColor: '#f1f1f1',
          },
        }}
      />
      <Stack.Screen
        name="ClientFaq"
        component={ClientFaq}
        options={{
          title: 'FAQ',
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          cardStyle: {
            backgroundColor: '#f1f1f1',
          },
        }}
      />
      <Stack.Screen
        name="ClientFeedback"
        component={ClientFeedback}
        options={{
          title: 'ClientFeedback',
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          cardStyle: {
            backgroundColor: '#f1f1f1',
          },
        }}
      />
    </Stack.Navigator>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout}, dispatch);
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.isLoading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientMyAccountStack);
