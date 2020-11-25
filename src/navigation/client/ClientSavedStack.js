import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleSearch, updateField } from '../../actions/searchAction'
import { loadSavedList } from '../../actions/userAction';
import ClientSaved from '../../screens/client/ClientSaved';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
function ClientSavedStack(props) {
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
              props.loadSavedList()
            }}>
              <AntDesignIcon style={{ marginTop: 10 }} name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
            <TextInput
            placeholder="Search"
            placeholderTextColor='gray'
            value={props.search.keyword}
            onChangeText={keyword => props.updateField({keyword})}
            onSubmitEditing={props.loadSavedList}
            style={styles.keyword} />
            <TouchableOpacity style={styles.search} onPress={() => props.loadSavedList()}>
              <FontAwesomeIcon name="search" size={30} color="#a40ffe" />
            </TouchableOpacity>
          </View>
        )
      },
    }
  } else {
    screenOptions = { 
      ...screenOptions, 
      title: 'Saved',
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
    <Stack.Navigator initialRouteName='ClientSaved'>
      <Stack.Screen
        name='ClientSaved'
        component={ClientSaved}
        options={screenOptions}
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
	return bindActionCreators({ toggleSearch, updateField, loadSavedList }, dispatch)
}

const mapStateToProps = state => {
	return {
    search: state.search
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientSavedStack)