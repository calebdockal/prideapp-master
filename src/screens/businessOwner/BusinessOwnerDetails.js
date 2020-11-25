import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadImages } from '../../actions/businessAction'
import Entypo from 'react-native-vector-icons/Entypo'
import StarRating from 'react-native-star-rating';
import { SliderBox } from "react-native-image-slider-box";

function BusinessOwnerDetails(props) {
  const stars = props.business.ratings.length && ((props.business.ratings.reduce((total, rating) => total + rating.rate, 0) / props.business.ratings.length) || 0).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      { props.isLoading ? (
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View>
          <View style={styles.sliderContainer}>
            <SliderBox 
              images={props.business.images.length ? props.business.images : [require('../../res/images/image-unavailable.png')]}
              sliderBoxHeight={200}
              autoplay
              circleLoop
              resizeMode={'cover'}
              dotColor="#a40ffe"
              inactiveDotColor="#f1f1f1"
              ImageComponentStyle={{
                width: '94%',
                resizeMode: 'stretch',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
              }}
            />
          </View>
          <View style={styles.businessDetails}>
            <Text style={styles.title}>{props.business.businessName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{stars}</Text>
              <Entypo name="dot-single" size={20} color="#fda400" />
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
                  width: 80,
                  marginTop: 2
                }}
              />
            </View>
            <Text style={styles.address}>{props.business.businessAddress}</Text>
            <Text style={styles.description}>{props.business.details}</Text>
          </View>
          
          { props.business.ratings.length > 0 && <Text style={styles.reviewsText}>Reviews: </Text> }
          
          { props.business.ratings.length > 0 && props.business.ratings.map(rating => {
            
            return (
              <View key={rating._id} style={{...styles.review, ...styles.borderBottom}}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerImageContainer}>
                    <Image style={styles.reviewerImage} source={rating.user.profilePicture ? { uri: rating.user.profilePicture } : require('../../res/images/profile-unavailable.png')} />
                  </View>
                  <View style={styles.reviewerDetails}>
                    <Text style={styles.name}>{`${rating.user.firstName} ${rating.user.lastName}`}</Text>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rating.rate}
                      halfStarEnabled={true}
                      halfStarColor="#fda400"
                      fullStarColor="#fda400"
                      emptyStarColor="#fda400"
                      starSize={15}
                      containerStyle={{
                        width: 80,
                        marginTop: 2
                      }}
                    />
                  </View>
                  <View style={styles.reviewerTimestamp}>
                    <Text>1 Day ago</Text>
                  </View>
                </View>
                <View style={styles.reviewerReview}>
                  <Text>{ rating.message }</Text>
                </View>
              </View>
            );
          })}

          <TouchableOpacity onPress={() => props.navigation.navigate('BusinessOwnerAddStack', { type: 'edit' })}>
            <Image style={styles.writeReview} source={require('../../res/images/edit.png')} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  sliderContainer: {
    alignItems: 'center',
    height: 200
  },
  ratingContainer: {
    flexDirection: 'row'
  },
  rating: {
    color: "#fda400"
  },
  address: {
    fontSize: 11
  },
  businessDetails: {
    alignSelf: 'flex-start',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderColor: "#aaa",
    width: '100%'
  },
  description: {
    marginTop: 10
  },
  review: {
    flex: 1,
    paddingVertical: 10
  },
  reviews: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  name: {
    fontWeight: 'bold'
  },
  reviewsText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14
  },
  reviewerImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  reviewerImageContainer: {
    flex: 1
  },
  reviewerInfo: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  reviewerDetails: {
    flex: 5,
    marginTop: 5,
    marginLeft: 10
  },
  reviewerTimestamp: {
    flex: 2,
    marginTop: 5,
    alignItems: 'flex-end'
  },
  reviewerReview: {
    flex: 1,
    marginTop: 5
  },
  writeReview: {
    height: 55,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 20
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: "#aaa"
  }
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ loadImages }, dispatch)
}

const mapStateToProps = state => {
	return {
    auth: state.auth,
    business: state.business,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BusinessOwnerDetails)