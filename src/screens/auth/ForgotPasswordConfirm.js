import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, passwordResetConfirm } from '../../actions/authAction'
import AsyncStorage from '@react-native-community/async-storage';

function ForgotPasswordConfirm(props) {
  useEffect(() => {
    AsyncStorage.multiGet(['token', 'email']).then(storage => storage[0][1] && props.navigation.navigate("HomeStack"))
  });

  if (props.auth.error) props.navigation.goBack()

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../res/images/logo-2.png')} />
      { props.isLoading ? (
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Verification Code</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={verificationCode => props.updateField({verificationCode})} value={props.auth.verificationCode}></TextInput>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={() => props.passwordResetConfirm()}>
            <Image style={styles.button} source={require('../../res/images/submit.png')} />
          </TouchableOpacity>

        </View>
      )}
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
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: '40%',
    height: '40%'
  },
  socialIcon: {
    flex: 1,
    resizeMode: "contain",
    width: 55,
    height: 55
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  submitBtn: {
    marginTop: 32
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'contain',
    width: "100%",
    height: 57
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    flex: 2,
    marginBottom: 48,
    marginHorizontal: 30,
    alignSelf: 'stretch'
  },
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField, passwordResetConfirm }, dispatch)
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
)(ForgotPasswordConfirm)