import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Splash({ navigation }) {
  useEffect(() => {
    const delay = 3000;
    AsyncStorage.multiGet(['token', 'email', 'role']).then(storage => {
      setTimeout(() => {
        if (storage[0][1] && storage[1][1]) {
          if (storage[2][1] === 'business_owner') {
            navigation.navigate("BusinessOwnerHomeTab")
          } else {
            navigation.navigate("ClientHomeTab")
          }
        } else {
          navigation.navigate("LoginStack")
        }
      }, delay);
    });
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../res/images/logo.png')} />
      <Text style={styles.description}>{`Shop, Travel and Entertain with PRIDE\nit's never been easier to find your local LGBTQ business`}</Text>
      <Image style={styles.footerImage} source={require('../res/images/footer.png')} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>@2020 Pride</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: "45%",
    height: "45%",
    flex: 4
  },
  footerImage: {
    position: "absolute",
    resizeMode: "stretch",
    width: "100%",
    height: "15%",
    bottom: 0
  },
  description: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold' 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '3%'
  },
  footerText: {
    color: "#fff"
  }
});