import React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, save } from '../../actions/reviewAction'
import StarRating from 'react-native-star-rating';

function ClientWriteReview(props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileImageBorder} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={props.business.images.length ? {uri: props.business.images[0]} : require('../../res/images/image-unavailable.png')}/>
        </View>
        { props.isLoading ? (
           <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
           <ActivityIndicator size="large" color="#0000ff" />
           <Text style={styles.loadingText}>LOADING...</Text>
         </View>
        ) : (
          <React.Fragment>
            <View style={styles.profile}>
              <Text style={styles.profileName}>{ props.business.businessName }</Text>
              <StarRating
                maxStars={5}
                rating={props.review.rate}
                halfStarEnabled={true}
                halfStarColor="#fda400"
                fullStarColor="#fda400"
                emptyStarColor="#fda400"
                starSize={35}
                starStyle={{
                  marginHorizontal: 5
                }}
                selectedStar={rate => props.updateField({rate})}
              />
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewText}>Review</Text>
              <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={11}
                blurOnSubmit={false}
                style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: 20,
                  textAlignVertical: 'top'
                }}
                onChangeText={message => props.updateField({message})}
                value={props.review.message}
              />
            </View>
          </React.Fragment>
        )}
      </View>
      { !props.isLoading && (
        <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', bottom: 0 }} onPress={() => props.save(props.navigation.goBack)}>
          <Image style={styles.writeReview} source={require('../../res/images/write-review.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    backgroundColor: "#fff",
    height: 405,
    borderRadius: 25,
    marginTop: 100,
    paddingTop: 80,
  },
  profileContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -70,
    width: 140,
    height: 70,
    backgroundColor: "#bd66e8",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  profileImageBorder: {
    height: 300,
    width: '100%',
    backgroundColor: "#a40ffe",
    position: 'absolute',
    top: 0
  },
  profileImage: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 10,
    bottom: 0,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  profile: {  
    alignItems: 'center'
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  reviewContainer: {
    marginHorizontal: 10,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  writeReview: {
    height: 55,
    resizeMode: 'contain',
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField, save }, dispatch)
}

const mapStateToProps = state => {
	return {
    isLoading: state.isLoading,
    business: state.business,
    review: state.review
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientWriteReview)