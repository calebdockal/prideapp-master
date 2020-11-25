import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, passwordReset } from '../../actions/authAction'

function ForgotPassword(props) {
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
            <Text style={styles.inputTitle}>Your Email</Text>
            <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => props.updateField({email})} value={props.auth.email}></TextInput>
          </View>

          <View style={styles.row}>
            <Text style={styles.inputTitle}>New Password</Text>
            <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password => props.updateField({password})} value={props.auth.password}></TextInput>
          </View>

          <View style={styles.row}>
            <Text style={styles.inputTitle}>Repeat Password</Text>
            <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={confirmPassword => props.updateField({confirmPassword})} value={props.auth.confirmPassword}></TextInput>
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={() => props.passwordReset(props.navigation.navigate)}>
            <Image style={styles.button} source={require('../../res/images/next.png')} />
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
  row: {
    marginTop: 10
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: '40%',
    height: '40%'
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
  nextBtn: {
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
	return bindActionCreators({ updateField, passwordReset }, dispatch)
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
)(ForgotPassword)