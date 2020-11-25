import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadSavedList, unsaveBusiness } from '../../actions/userAction';
import { load } from '../../actions/businessAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { Swipeable } from 'react-native-gesture-handler';

function ClientSaved(props) {
  const navigateTo = (item) => {
    props.load(item._id);
    props.navigation.navigate("ClientBusinessDetailsStack", { businessName: item.businessName });
  }

  return (
    <ScrollView style={styles.container}>
      { props.isLoading ? (
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View>
          {props.user.saves.length > 0 ? props.user.saves.map(item => {
            if (!item.business) return false;
            
            const stars = item.business.ratings.length && ((item.business.ratings.reduce((total, rating) => total + rating.rate, 0) / item.business.ratings.length) || 0).toFixed(2);

            return (
              <Swipeable key={item._id} renderRightActions={() => (
                <TouchableOpacity style={styles.deleteBtn} onPress={() => props.unsaveBusiness(item._id)}>
                  <Icon style={styles.icon} name="trash-o" size={25} color="#fff" /><Text style={styles.deleteBtnText}>Remove</Text>
                </TouchableOpacity>
              )}>
                <TouchableOpacity style={styles.item} onPress={() => navigateTo(item.business)}>
                  <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={item.business.images.length ? {uri: item.business.images[item.business.images.length-1]} : require('../../res/images/image-unavailable.png')} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.title}>{item.business.businessName}</Text>
                      <Text style={styles.address}>{`${item.business.municipality}, ${item.business.zipCode}, ${item.business.country}`}</Text>
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
                          width: 100
                        }}
                      />
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon style={styles.icon} name="angle-right" size={40} color="#aaa" />
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            )
          }) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>No data available</Text>
            </View>
          )}
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
    paddingTop: 20
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red",
    width: "35%",
    height: 90
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  itemContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  item: {
    backgroundColor: "#fff",
    width: '100%',
    height: 90,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10
  },
  itemImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    padding: 5
  },
  itemInfo: {
    flex: 5,
    justifyContent: 'center',
    margin: 10
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  icon: {
    marginRight: 5
  },
  title: {
    fontSize: 15,
  },
  address: {
    fontSize: 10.5,
    color: "#999"
  }
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ loadSavedList, load, unsaveBusiness }, dispatch)
}

const mapStateToProps = state => {
	return {
    auth: state.auth,
    user: state.user,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientSaved)