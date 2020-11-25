import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateCoordinates } from '../../../actions/businessAction';
import { View, Text, StyleSheet, Image, PermissionsAndroid, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

function GeolocationScreen(props) {
  useEffect(() => {
    if (!props.business.latitude && !props.business.longitude) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'This App needs access to your location'
        }
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            props.updateCoordinates(latitude, longitude)
          },
          error => {
            console.log(error.code, error.message)
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000
          });
        } else {
          alert("Location permission denied")
        }
      }).catch(error => {
        alert(error)
      });
    }
  }, []);

  return props.isLoading || !props.business.latitude || !props.business.longitude ? (
    <View style={styles.container}>
      <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>LOADING...</Text>
      </View>
    </View>
  ) : (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: props.business.latitude,
        longitude: props.business.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      onPress={data => {
        props.updateCoordinates(data.nativeEvent.coordinate.latitude, data.nativeEvent.coordinate.longitude);
      }}
    >
      <Marker
        coordinate={{
          latitude: props.business.latitude,
          longitude: props.business.longitude,
        }}
      >
        <Image style={{ flex: 1, resizeMode: 'contain', height: 55 }} source={require('../../../res/images/location_0.png')} />
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginBottom: 48,
    marginHorizontal: 20,
    paddingTop: 50,
    alignSelf: 'stretch'
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateCoordinates }, dispatch)
}

const mapStateToProps = state => {
	return {
    business: state.business,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GeolocationScreen)
