import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateLocationService, updateField, updateProfilePicture } from '../../actions/userAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';
import ImagePicker from 'react-native-image-picker';

function BusinessOwnerMyAccount(props) {
  const handleChoosePhoto = () => ImagePicker.showImagePicker({ title: 'Select Images', noData: true }, (response) => !response.didCancel && props.updateProfilePicture({profilePicture: response}));

  return (
    <View>
      <View style={styles.profileImageBorder}/>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={props.user.profilePicture ? {uri: props.user.profilePicture} : require('../../res/images/profile-unavailable.png')}/>
        </View>
        <View>
          <Text style={styles.profileName}>{`${props.user.firstName} ${props.user.lastName}`}</Text>
          <Text style={styles.profileEmail}>{props.user.email}</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menu} onPress={() => props.navigation.navigate('BusinessOwnerEditProfile')}>
            <Image style={styles.menuIcon} source={require('../../res/images/profile.png')} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <View style={styles.iconContainer}>
              <Icon name="angle-right" size={40} color="#aaa" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menu} onPress={() => props.navigation.navigate('BusinessOwnerChangePassword')}>
            <Image style={styles.menuIcon} source={require('../../res/images/change_password.png')} />
            <Text style={styles.menuText}>Change Password</Text>
            <View style={styles.iconContainer}>
              <Icon name="angle-right" size={40} color="#aaa" />
            </View>
          </TouchableOpacity>

          <View style={styles.menu}>
            <Image style={styles.menuIcon} source={require('../../res/images/gps.png')} />
            <Text style={styles.menuText}>Location Service</Text>
            <View style={styles.iconContainer}>
              <Switch
                value={props.user.locationService}
                onValueChange={(val) => props.updateLocationService({locationService: val})}
                disabled={false}
                activeText={null}
                inActiveText={null}
                circleSize={25}
                barHeight={25}
                circleBorderWidth={0.5}
                backgroundActive={'#bd66e8'}
                backgroundInactive={'gray'}
                circleActiveColor={'#fff'}
                circleInActiveColor={'#fff'}
                changeValueImmediately={true}
                innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderColor: "#bd66e8" }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.menu} onPress={() => props.navigation.navigate('BusinessOwnerFaq')}>
            <Image style={styles.menuIcon} source={require('../../res/images/faq.png')} />
            <Text style={styles.menuText}>FAQ</Text>
            <View style={styles.iconContainer}>
              <Icon name="angle-right" size={40} color="#aaa" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: 'transparent', height: 120, width: 120, borderRadius: 60, top: 40, position: 'absolute' }} onPress={() => handleChoosePhoto()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profileEmail: {
    fontSize: 18,
    textAlign: 'center'
  },
  menuContainer: {
    flex: 1,
    marginTop: 30
  },
  menu: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    padding: 20,
    height: 60
  },
  menuText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  menuIcon: {
    height: 30,
    width: 35,
    resizeMode: 'contain',
    marginRight: 10
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
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
	return bindActionCreators({ updateLocationService, updateField, updateProfilePicture }, dispatch)
}

const mapStateToProps = state => {
	return {
    user: state.user,
    isLoading: state.isLoading
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BusinessOwnerMyAccount)