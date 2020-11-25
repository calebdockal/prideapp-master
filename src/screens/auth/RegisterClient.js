import React, { useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, register } from '../../actions/authAction';

function RegisterClient(props) {
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef  = useRef(null);
  const confirmPasswordRef  = useRef(null);

  return (
    <View style={styles.container}>
      { props.isLoading ? (
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View style={styles.form}>
          <View>
            <View style={styles.firstNameFieldLabels}>
              <Text style={{ ...styles.inputTitle, flex: 6 }}>First Name</Text>
              <Text style={{...styles.inputTitle, flex: 6, marginLeft: 10 }}>Last Name</Text>
            </View>
            <View style={styles.firstNameFields}>
              <View style={styles.firstName}>
                <TextInput style={styles.input} autoFocus={true} returnKeyType={'next'} onSubmitEditing={() => lastNameRef.current.focus()} autoCapitalize="words" onChangeText={firstName => props.updateField({firstName})} value={props.auth.firstName} placeholder="John" />
              </View>
              <View style={styles.lastName}>
                <TextInput style={styles.input} ref={lastNameRef} returnKeyType={'next'} onSubmitEditing={() => emailRef.current.focus()} autoCapitalize="words" onChangeText={lastName => props.updateField({lastName})} value={props.auth.lastName} placeholder="Doe" />
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Email</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={emailRef} returnKeyType={'next'} onSubmitEditing={() => mobileRef.current.focus()} autoCapitalize="none" onChangeText={email => props.updateField({email})} value={props.auth.email} placeholder="Name@email.com" />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Mobile</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={mobileRef} returnKeyType={'next'} onSubmitEditing={() => passwordRef.current.focus()} onChangeText={mobile => props.updateField({mobile})} value={props.auth.mobile} placeholder="644 631-5465" />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Password</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={passwordRef} returnKeyType={'next'} onSubmitEditing={() => confirmPasswordRef.current.focus()} secureTextEntry autoCapitalize="none" onChangeText={password => props.updateField({password})} value={props.auth.password} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={confirmPasswordRef} onSubmitEditing={() => props.register()} secureTextEntry autoCapitalize="none" onChangeText={confirmPassword => props.updateField({confirmPassword})} value={props.auth.confirmPassword} />
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.registerBtn} onPress={() => props.register()}>
        <Image style={styles.btn} source={require('../../res/images/register.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.loginBtnText}>
          Already have an account? <Text style={styles.loginBtnLink}>Login</Text>
        </Text>
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
  firstNameFieldLabels: {
    flexDirection: 'row'
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
	return bindActionCreators({ updateField, register }, dispatch)
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
)(RegisterClient)