import React, { useRef } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, updateImages, deleteImage } from '../../actions/authAction'
import DropDownPicker from 'react-native-dropdown-picker';
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ImagePicker from 'react-native-image-picker';
import { registerBusinessDetailsValidation } from '../../utils/validation';
import { showMessage } from "react-native-flash-message";

function RegisterBusiness2(props) {
  const handleChoosePhoto = () => ImagePicker.showImagePicker({ title: 'Select Images', noData: true }, (response) => !response.didCancel && props.updateImages(response));
  const detailsRef = useRef(null);

  const validateOnSubmit = () => {
    const { error } = registerBusinessDetailsValidation({
      businessName: props.auth.businessName,
      category: props.auth.category,
      details: props.auth.details
    });
    
    if(error) {
      return showMessage({
        message: "Validation Failed",
        description: error.details[0].message,
        type: "danger",
        icon: "danger"
      });
    }

    props.navigation.navigate("RegisterBusiness3");
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.images} contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity 
          style={styles.addImageBtn}
          onPress={handleChoosePhoto}
        >
          <EntypoIcon name="images" style={styles.addImageIcon} />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
        { props.auth.images && props.auth.images.map((res, id) => (
          <View key={res.uri+id} style={styles.imagesContainer}>
            <Image 
              source={{uri: res.uri}}
              style={styles.imagesImage}
            />
            <AntIcon name="closecircle" style={styles.imagesCloseIcon} onPress={() => props.deleteImage(id)}/>
          </View>
        ))}
      </ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Business Name</Text>
          <View style={styles.field}>
            <TextInput style={styles.input} autoFocus={true} returnKeyType={'next'} onSubmitEditing={() => detailsRef.current.focus()} autoCapitalize="none" onChangeText={businessName => props.updateField({businessName})} value={props.auth.businessName} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputTitle}>Select Category</Text>
          <View style={styles.field}>
              <DropDownPicker
                onSubmitEditing={() => detailsRef.current.focus()}
                items={[
                  { label: 'Accomodations', value: 'Accomodations' },
                  { label: 'Bars', value: 'Bars' },
                  { label: 'Restaurants', value: 'Restaurants' },
                  { label: 'Services', value: 'Services' },
                  { label: 'Shopping', value: 'Shopping' },
                  { label: 'LGBTQ Owned or Operated', value: 'LGBTQ Owned or Operated' },
                  { label: 'LGBTQ Friendly', value: 'LGBTQ Friendly' }
                ]}
                searchable={true}
                defaultValue=""
                containerStyle={{height: 50}}
                labelStyle={{ fontSize: 20, color: "#000" }}
                arrowSize={30}
                style={{backgroundColor: '#f5f5f5', borderColor: 'transparent', borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                dropDownStyle={{backgroundColor: '#fafafa', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                onChangeItem={item => {
                  props.updateField({category: item.value});
                  detailsRef.current.focus();
                }}
              />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputTitle}>Details</Text>
          <View style={styles.field}>
            <TextInput 
              ref={detailsRef}
              onSubmitEditing={() => props.navigation.navigate("RegisterBusiness3")}
              style={{...styles.input, height: '75%', textAlignVertical: "top"}}
              numberOfLines={10}
              multiline={true}
              autoCapitalize="none"
              onChangeText={details => props.updateField({details})}
              value={props.auth.details}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextBtn} onPress={() => validateOnSubmit()}>
        <Image style={styles.btn} source={require('../../res/images/next.png')} />
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
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  field: {
    marginRight: '2%'
  },
  row: {
    marginTop: 10
  },
  addImageBtn: {
    width: 100,
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 10,
    borderColor: '#eeeeee',
    backgroundColor: '#f5f5f5',
    marginTop: 10
  },
  addImageIcon: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 12,
    color: '#dddddd'
  },
  addImageText: {
    textAlign: 'center',
    color: '#dddddd',
    fontSize: 12
  },
  imagesContainer: {
    width: 100, 
    borderWidth: 1, 
    borderRadius: 15,
    marginRight: 10, 
    borderColor: '#eeeeee',
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  imagesImage: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#eeeeee'
  },
  imagesCloseIcon: {
    position: 'absolute',
    right: -12,  
    top: -12,
    fontSize: 25,
    color: '#e6625f',
    backgroundColor: 'transparent'
  },
  images: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 5
  },
  form: {
    flex: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    alignSelf: 'stretch'
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
  nextBtn: {
    height: '8.5%',
    justifyContent: 'flex-end',
    alignContent: "center",
    marginHorizontal: '20%'
  },
  btn: {
    flex: 1,
    resizeMode: "contain",
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField, updateImages, deleteImage }, dispatch)
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
)(RegisterBusiness2)