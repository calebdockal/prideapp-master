import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, login, googleLogin, facebookLogin, twitterLogin } from '../../actions/authAction'
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';

function Login(props) {
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet(['token', 'email', 'role']).then(storage => storage[0][1] && storage[1][1] && (storage[2][1] === 'business_owner' ? props.navigation.navigate("BusinessOwnerHomeTab") : props.navigation.navigate("ClientHomeTab")))
  });

  const passwordRef = useRef(null);

  const redirectToRegisterAs = () => {
    AsyncStorage.multiGet(['token', 'email', 'role']).then(storage => {
      if (!storage[0][1] && storage[1][1] && storage[2][1]) {
        props.navigation.navigate("RegisterAs")
      }
    });
  }

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
            <TextInput style={styles.input} autoFocus={true} onSubmitEditing={() => passwordRef.current.focus()} returnKeyType={'next'} autoCapitalize="none" onChangeText={email => props.updateField({email})} value={props.auth.email}></TextInput>
          </View>

          <View style={styles.row}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput style={styles.input} ref={passwordRef} onSubmitEditing={() => props.login()} secureTextEntry autoCapitalize="none" onChangeText={password => props.updateField({password})} value={props.auth.password}></TextInput>
          </View>

          <View style={styles.rememberMeContainer}>
            <View style={{flex: 1}}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  tintColors={{ true: "#ff5586" }}
                  boxType={'circle'}
                  onChange={() => setRememberMe(!rememberMe)}
                  value={rememberMe}
                />
                <Text style={styles.rememberMe}>Remember me</Text>
              </View>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity style={styles.forgotPasswordBtn} onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordBtnText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => props.login()}>
            <Image style={styles.button} source={require('../../res/images/login-btn.png')} />
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialLoginIcon} onPress={() => props.googleLogin().then(() => redirectToRegisterAs())}>
              <Image style={styles.socialIcon} source={require('../../res/images/google-plus-icon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginIcon} onPress={() => props.facebookLogin().then(() => redirectToRegisterAs())}>
              <Image style={styles.socialIcon} source={require('../../res/images/facebook-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginIcon} onPress={() => props.twitterLogin().then(() => redirectToRegisterAs())}>
              <Image style={styles.socialIcon} source={require('../../res/images/twitter-icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.registerAsBtn} onPress={() => props.updateField({role: "client"}).then(() => props.navigation.navigate("RegisterAs"))}>
        <Text style={styles.registerAsBtnText}>
          or <Text style={styles.registerWithEmail}>Register with your email</Text>
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
  row: {
    marginTop: 10
  },
  rememberMeContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  rememberMe: {
    fontSize: 16,
    marginTop: 5
  },
  forgotPasswordContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  forgotPasswordBtn: {
    justifyContent: 'flex-end',
    alignContent: "center",
    marginBottom: '3%'
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    marginTop: 5
  },
  loginBtn: {
    marginTop: 32
  },
  socialLoginContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 32,
    marginHorizontal: '15%'
  },
  socialLoginIcon: {
    flex: 1,
    width: 55,
    height: 55
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: '40%',
    height: '40%'
  },
  socialIcon: {
    flex: 1,
    resizeMode: "stretch",
    width: 55,
    height: 55
  },
  registerAsBtn: {
    justifyContent: 'flex-end',
    alignContent: "center",
    marginBottom: '3%'
  },
  registerAsBtnText: {
    color: "#414959",
    fontSize: 14
  },
  registerWithEmail: {
    fontWeight: "bold",
    color: "#000"
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
  button: {
    width: '100%',
    resizeMode: 'contain',
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
	return bindActionCreators({ updateField, login, googleLogin, facebookLogin, twitterLogin }, dispatch)
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
)(Login)