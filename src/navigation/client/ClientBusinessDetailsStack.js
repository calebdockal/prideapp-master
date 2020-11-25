import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { saveBusiness } from '../../actions/userAction';
import ClientBusinessDetails from '../../screens/client/ClientBusinessDetails';

const Stack = createStackNavigator();
function ClientBusinessDetailsStack(props) {
  return (
    <Stack.Navigator initialRouteName='ClientBusinessDetails'>
      <Stack.Screen
        name='ClientBusinessDetails'
        component={ClientBusinessDetails}
        options={{
          title: props.route.params.businessName,
          headerStyle: {
            backgroundColor: '#a40ffe',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => props.saveBusiness()}>
                <Image style={{ width: 30, height: 30, marginRight: 15, resizeMode: 'contain' }} source={require('../../res/images/saved.png')} />
              </TouchableOpacity>
            )
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

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ saveBusiness }, dispatch)
}

const mapStateToProps = state => {
	return {
    auth: state.auth,
    user: state.user,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientBusinessDetailsStack)