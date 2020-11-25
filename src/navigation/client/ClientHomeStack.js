import React from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import ClientHome from '../../screens/client/ClientHome';
import ClientBusinessDetailsStack from '../../navigation/client/ClientBusinessDetailsStack';
import ClientWriteReview from '../../screens/client/ClientWriteReview';
import { toggleSearch, updateField } from '../../actions/searchAction'
import { loadBusinessList } from '../../actions/userAction';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
function ClientHomeStack(props) {
  let screenOptions = {
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
  }

  if (props.search.isSearching) {
    screenOptions = {
      ...screenOptions,
      headerTitle: () => {
        return (
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => { 
              props.toggleSearch();
              props.updateField({keyword: ''});
              props.loadBusinessList()
            }}>
              <AntDesignIcon style={{ marginTop: 10 }} name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
            <TextInput
            placeholder="Search"
            placeholderTextColor='gray'
            value={props.search.keyword}
            onChangeText={keyword => props.updateField({keyword})}
            onSubmitEditing={props.loadBusinessList}
            style={styles.keyword} />
            <TouchableOpacity style={styles.search} onPress={() => props.loadBusinessList()}>
              <FontAwesomeIcon name="search" size={30} color="#a40ffe" />
            </TouchableOpacity>
          </View>
        )
      },
    }
  } else {
    screenOptions = { 
      ...screenOptions, 
      title: 'Home',
      headerLeft: null,
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => props.toggleSearch()}>
            <FontAwesomeIcon style={{ marginRight: 15 }} name="search" size={30} color="#fff" />
          </TouchableOpacity>
        );
      },
    }
  }

  return (
    <Stack.Navigator initialRouteName='ClientHome'>
      <Stack.Screen
        name='ClientHome'
        component={ClientHome}
        options={screenOptions}
      />

      <Stack.Screen
        name='ClientBusinessDetailsStack'
        component={ClientBusinessDetailsStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='ClientWriteReview'
        component={ClientWriteReview}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  keyword: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    paddingHorizontal: 10,
    color: "#000",
    paddingRight: 40,
    fontSize: 16
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },  
  search: {
    marginTop: 8,
    right: 10,
    position: 'absolute'
  }
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ toggleSearch, updateField, loadBusinessList }, dispatch)
}

const mapStateToProps = state => {
	return {
    search: state.search
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientHomeStack)