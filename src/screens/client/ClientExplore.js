import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateCoordinates, updateCurrentCoordinates, load } from '../../actions/businessAction';
import { getDistance } from '../../utils/compute';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '@env';

function ClientExplore(props) {
  useEffect(() => {
    setCurrentLocation();
    Geocoder.init(GOOGLE_API_KEY);
  }, []);

  const mapRef = React.createRef();

  const setCurrentLocation = () => {
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
          Geocoder.from(latitude, longitude)
            .then(json => {
                var location = json.results[0].formatted_address;
                props.updateCurrentCoordinates(latitude, longitude, location)
            })
            .catch(error => console.warn(error));
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

  const navigateTo = (item) => {
    props.load(item._id);
    props.navigation.navigate("ClientBusinessDetailsStack", { businessName: item.businessName });
  }

  const animateToCurrentLocation = () => {
    mapRef.current.animateToRegion({
      latitude: props.business.currentLatitude,
      longitude: props.business.currentLongitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
        <View style={{ width: '85%', height: 55, borderRadius: 55, backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 15 }}>
          <Text>Current Location</Text>
          <Text style={{ fontSize: 10, color: "#aaa" }}>{props.business.currentLocation}</Text>
        </View>
        <TouchableOpacity style={{flex: 1, resizeMode: 'contain'}} onPress={() => animateToCurrentLocation()}>
          <Image style={{ height: 55, width: 55 }} source={require('../../res/images/locate.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        { props.business.currentLatitude && props.business.currentLongitude && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: props.business.currentLatitude,
              longitude: props.business.currentLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{
                latitude: props.business.currentLatitude,
                longitude: props.business.currentLongitude,
              }}
            >
              <Image style={{ flex: 1, resizeMode: 'contain', height: 55 }} source={require('../../res/images/location.png')} />
            </Marker>

            { props.business.list && props.business.list.map(business => {
              const stars = business.ratings.length && ((business.ratings.reduce((total, rating) => total + rating.rate, 0) / business.ratings.length) || 0).toFixed(2);
              const milesAway = getDistance(props.business.latitude, props.business.longitude, business.latitude, business.longitude).toFixed(2);

              return (
                <Marker
                  key={business._id}
                  coordinate={{
                    latitude: business.latitude,
                    longitude: business.longitude,
                  }}
                  title={"title"}
                  description={"description"}
                >
                  <Image style={{ flex: 1, resizeMode: 'contain', height: 55 }} source={require('../../res/images/location_0.png')} />
                  <Callout tooltip={true}  onPress={() => navigateTo(business)}>
                    <Text style={{ minHeight: 135, minWidth: 250, top: -35 }}>
                      <Image style={{ height: 100, width: 250, resizeMode: 'cover' }} source={require('../../res/images/dialog.png')} />
                    </Text>
                    <Text style={{ position: 'absolute', minHeight: 105, minWidth: 70, top: -12, left: 10 }}>
                      <Image style={{ height: 65, width: 65 }} source={business.images.length ? {uri: business.images[business.images.length-1]} : require('../../res/images/image-unavailable.png')} />
                    </Text>
                    <View style={{ position: 'absolute', left: 80, top: 20 }}>
                      <Text style={{ fontWeight: 'bold' }}>{business.businessName}</Text>
                      <Text style={{ fontSize: 10 }}>{`${milesAway} Miles Away`}</Text>
                      <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={parseFloat(stars)}
                          halfStarEnabled={true}
                          halfStarColor="#fda400"
                          fullStarColor="#fda400"
                          emptyStarColor="#fda400"
                          starSize={15}
                          containerStyle={{
                            width: 90
                          }}
                        />
                    </View>
                    <View style={{position: 'absolute', right: 10, top: 25 }}>
                      <Icon name="angle-right" size={40} color="#aaa" />
                    </View>
                  </Callout>
                </Marker>
              )
            })}
          </MapView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  mapContainer: {
    flex: 11, 
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateCoordinates, updateCurrentCoordinates, load }, dispatch)
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
)(ClientExplore)