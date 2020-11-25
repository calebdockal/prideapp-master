import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { updateField } from '../../actions/authAction'

function RegisterAs(props) {
  useEffect(() => {
    props.auth.role === '' && props.navigation.goBack();
  });

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../res/images/img_1.png')} />

      <View style={styles.form}>
        <TouchableOpacity style={styles.clientBtn} onPress={() => props.updateField({role: "client"})}>
          <Image style={styles.btn} source={props.auth.role === "client" ? require('../../res/images/c_2.png') : require('../../res/images/c.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.businessOwnerBtn} onPress={() => props.updateField({role: "business_owner"})}>
          <Image style={styles.btn} source={props.auth.role === "business_owner" ? require('../../res/images/bo_2.png') : require('../../res/images/bo.png')} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={() => props.auth.role === "client" ? props.navigation.navigate("RegisterClient") : props.navigation.navigate("RegisterBusinessStack")}>
        <Image style={styles.btn} source={require('../../res/images/next.png')} />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField }, dispatch)
}

const mapStateToProps = state => {
	return {
    auth: state.auth,
    isLoading: state.isLoading
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  clientBtn: {
    marginTop: '8%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  businessOwnerBtn: {
    marginTop: '3%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtn: {
    height: '8%',
    justifyContent: 'flex-end',
    alignContent: "center",
    marginBottom: '3%',
    marginHorizontal: '20%'
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    marginTop: '8%'
  },
  form: {
    flex: 2,
    alignSelf: 'stretch'
  },
  btn: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default connect(
  mapStateToProps,
	mapDispatchToProps
)(RegisterAs)