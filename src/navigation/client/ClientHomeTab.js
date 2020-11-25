import React, {useEffect} from 'react';
import { Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load } from '../../actions/authAction'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import ClientHomeStack from './ClientHomeStack';
import ClientExploreStack from './ClientExploreStack';
import ClientSavedStack from './ClientSavedStack';
import ClientMyAccountStack from './ClientMyAccountStack';

const Tab = createBottomTabNavigator();

function ClientHomeTab(props) {
  /*useEffect(() => {
    props.load()
    AsyncStorage.multiGet(['token', 'userId', 'email', 'role']).then(storage => !storage[0][1] && props.navigation.navigate("LoginStack", "Login"))
  } , []); */ 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'ClientHomeStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/home-2.png') : require('../../res/images/home.png')} />
          } else if (route.name === 'ClientExploreStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/explore-2.png') : require('../../res/images/explore.png')} />
          } else if (route.name === 'ClientSavedStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/saved-2.png') : require('../../res/images/saved.png') } />
          } else if (route.name === 'ClientMyAccountStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/account-2.png') : require('../../res/images/account.png') } />
          }
        }
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25
        },
      }}
    >
      <Tab.Screen name="ClientHomeStack" component={ClientHomeStack} options={(props) => { 
        if (props.route.state && props.route.state.index > 0) return { tabBarVisible: false }
      }} />
      <Tab.Screen name="ClientExploreStack" component={ClientExploreStack} />
      <Tab.Screen name="ClientSavedStack" component={ClientSavedStack} options={{ headerShown: false }}/>
      <Tab.Screen name="ClientMyAccountStack" component={ClientMyAccountStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 15
  },
  iconActive: {
    flex: 1,
    resizeMode: 'contain',
    margin: 10,
    marginBottom: 5
  }
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ load }, dispatch)
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
)(ClientHomeTab)