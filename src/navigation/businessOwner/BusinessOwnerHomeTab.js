import React, {useEffect} from 'react';
import { Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load } from '../../actions/authAction'
import { clear } from '../../actions/businessAction';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import BusinessOwnerHomeStack from './BusinessOwnerHomeStack';
import BusinessOwnerAddStack from './BusinessOwnerAddStack';
import BusinessOwnerMyAccountStack from './BusinessOwnerMyAccountStack';

const Tab = createBottomTabNavigator();

function BusinessOwnerHomeTab(props) {
  useEffect(() => {
    props.load()
    AsyncStorage.multiGet(['token', 'userId', 'email', 'role']).then(storage => !storage[0][1] && props.navigation.navigate("LoginStack", "Login"))
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'BusinessOwnerHomeStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/home-2.png') : require('../../res/images/home.png')} />
          } else if (route.name === 'BusinessOwnerAddStack') {
            return focused ? null : <Image style={{ position: 'absolute', resizeMode: 'contain', height: '150%', width: '150%', bottom: 2 }} source={require('../../res/images/add.png')} onPress={() => props.navigation.navigate('BusinessOwnerMyAccountStack')} />
          } else if (route.name === 'BusinessOwnerMyAccountStack') {
            return <Image style={ focused ? styles.iconActive : styles.icon } source={ focused ? require('../../res/images/account-2.png') : require('../../res/images/account.png')} />
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
      <Tab.Screen name="BusinessOwnerHomeStack" component={BusinessOwnerHomeStack}/>
      <Tab.Screen name="BusinessOwnerAddStack" component={BusinessOwnerAddStack} initialParams={{type: 'add'}} options={{tabBarVisible: false}} listeners={{tabPress: () => props.clear()}}/>
      <Tab.Screen name="BusinessOwnerMyAccountStack" component={BusinessOwnerMyAccountStack} />
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
	return bindActionCreators({ load, clear }, dispatch)
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
)(BusinessOwnerHomeTab)