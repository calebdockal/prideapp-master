import React, { useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, changePassword } from '../../actions/userAction';

function ClientChangePassword(props) {
  const confirmPasswordRef = useRef(null);

  return (
    <View style={styles.container}>
      { props.isLoading ? (
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>New Password</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} autoFocus={true} onSubmitEditing={() => confirmPasswordRef.current.focus()} returnKeyType={'next'} secureTextEntry autoCapitalize="none" onChangeText={newPassword => props.updateField({newPassword})} value={props.user.newPassword} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={confirmPasswordRef} onSubmitEditing={() => props.changePassword(props.navigation)}  secureTextEntry autoCapitalize="none" onChangeText={confirmPassword => props.updateField({confirmPassword})} value={props.user.confirmPassword} />
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.registerBtn} onPress={() => props.changePassword(props.navigation)}>
        <Image style={styles.btn} source={require('../../res/images/submit.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20
  },
  form: {
    flex: 2,
    marginBottom: 48,
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'stretch'
  },
  row: {
    marginTop: 10
  },
  field: {
    marginRight: '2%'
  },
  firstNameFields: {
    flexDirection: 'row'
  },
  firstName: {
    flex: 1,
    marginRight: '2%'
  },
  lastName: {
    flex: 1,
    marginLeft: '2%'
  },
  success: {
    color: "#22bb33",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
    color: "#000",
    borderRadius: 30,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  registerBtn: {
    height: '8.5%',
    justifyContent: 'flex-end',
    alignContent: "center",
    marginHorizontal: '20%'
  },
  loginBtn: {
    justifyContent: 'flex-end',
    alignContent: "center",
    marginBottom: '3%'
  },
  loginBtnText: {
    color: "#414959",
    fontSize: 14
  },
  loginBtnLink: {
    fontWeight: "bold",
    color: "#a40ffe"
  },
  btn: {
    flex: 1,
    resizeMode: "contain",
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField, changePassword }, dispatch)
}

const mapStateToProps = state => {
	return {
    user: state.user,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientChangePassword)