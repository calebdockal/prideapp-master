import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { logout } from '../../actions/authAction';
import BusinessOwnerMyAccount from '../../screens/businessOwner/BusinessOwnerMyAccount';
import BusinessOwnerEditProfile from '../../screens/businessOwner/BusinessOwnerEditProfile';
import BusinessOwnerChangePassword from '../../screens/businessOwner/BusinessOwnerChangePassword';
import BusinessOwnerFaq from '../../screens/businessOwner/BusinessOwnerFaq';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
function BusinessOwnerMyAccountStack(props) {
  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (!token) {
          props.navigation.navigate("LoginStack")
      }
    })
  });

  return (
    <Stack.Navigator initialRouteName='BusinessOwnerMyAccount'>
      <Stack.Screen
        name='BusinessOwnerMyAccount'
        component={BusinessOwnerMyAccount}
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
                <Text style={{ marginRight: 15, fontSize: 20, color: "#fff" }}>Logout</Text>
              </TouchableOpacity>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
          cardStyle: {
            backgroundColor: '#f1f1f1'
          }
        }}
      />
      <Stack.Screen
        name='BusinessOwnerEditProfile'
        component={BusinessOwnerEditProfile}
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
            fontSize: 32
          },
          cardStyle: {
            backgroundColor: '#f1f1f1'
          }
        }}
      />
      <Stack.Screen
        name='BusinessOwnerChangePassword'
        component={BusinessOwnerChangePassword}
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
            fontSize: 32
          },
          cardStyle: {
            backgroundColor: '#f1f1f1'
          }
        }}
      />
      <Stack.Screen
        name='BusinessOwnerFaq'
        component={BusinessOwnerFaq}
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
            fontSize: 32
          },
          cardStyle: {
            backgroundColor: '#f1f1f1'
          }
        }}
      />
    </Stack.Navigator>
  );
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ logout }, dispatch)
}

const mapStateToProps = state => {
	return {
    auth: state.auth,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BusinessOwnerMyAccountStack)