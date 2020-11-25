import React, { useRef } from 'react';
import { Text, View,StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateField, register, update } from '../../actions/businessAction'
import DropDownPicker from 'react-native-dropdown-picker';
import Countries from 'country-region-data'

function BusinessOwnerAdd2(props) {
  const [res] = Countries.filter(country => country.countryName === props.business.country);
  const regions = res ? res.regions.map(region => ({ label: region.name, value: region.name })) : props.business.regions;
  const zipcodeRef = useRef(null);
  const contactAddressRef = useRef(null);
  const contactNumberRef = useRef(null);

  return props.isLoading ? (
      <View style={styles.container}>
        <View style={{...styles.form, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.form}>
          <View>
            <View style={styles.field}>  
              <TouchableOpacity onPress={() => props.navigation.navigate("Geolocation")}>
                <Text style={{...styles.input, textAlignVertical: 'center', textAlign: 'center' }}>Pick Location</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.inputTitle}>Business Address</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} autoFocus={true} returnKeyType={'next'} autoCapitalize="none" onChangeText={businessAddress => props.updateField({businessAddress})} value={props.business.businessAddress} placeholder="Address" />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.field}>
                <DropDownPicker
                  items={props.business.countries}
                  searchable={true}
                  defaultValue={props.business.country ? props.business.country : ''}
                  containerStyle={{height: 50}}
                  labelStyle={{ fontSize: 20, color: "#000" }}
                  arrowSize={30}
                  style={{backgroundColor: '#f5f5f5', borderColor: 'transparent', borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                  dropDownStyle={{backgroundColor: '#fafafa', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                  onChangeItem={item => props.updateField({country: item.value})}
                  placeholder="Country"
                />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.field}>
              <DropDownPicker
                items={regions}
                searchable={true}
                defaultValue={props.business.municipality ? props.business.municipality : ''}
                containerStyle={{height: 50}}
                labelStyle={{ fontSize: 20, color: "#000" }}
                arrowSize={30}
                style={{backgroundColor: '#f5f5f5', borderColor: 'transparent', borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                dropDownStyle={{backgroundColor: '#fafafa', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
                onChangeItem={item => {
                  props.updateField({municipality: item.value})
                  zipcodeRef.current.focus();
                }}
                placeholder="Provinces/Municipality"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.field}>
              <TextInput style={styles.input} returnKeyType={'next'} ref={zipcodeRef} onSubmitEditing={() => contactAddressRef.current.focus()} autoCapitalize="none" onChangeText={zipCode => props.updateField({zipCode})} value={props.business.zipCode} placeholder="Zip Code" />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.inputTitle}>Organization Contact info</Text>
            <View style={styles.field}>
              <TextInput style={styles.input} returnKeyType={'next'} ref={contactAddressRef} onSubmitEditing={() => contactNumberRef.current.focus()} autoCapitalize="none" onChangeText={contactAddress => props.updateField({contactAddress})} value={props.business.contactAddress} placeholder="Contact Address" />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.field}>
              <TextInput style={styles.input} ref={contactNumberRef} onSubmitEditing={() => props.register()} autoCapitalize="none" onChangeText={contactNumber => props.updateField({contactNumber})} value={props.business.contactNumber} placeholder="Contact Number" />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={() => props.route.params.type === 'edit' ? props.update(props.navigation.navigate) : props.register(props.navigation.navigate)}>
          <Image style={styles.btn} source={require('../../res/images/done.png')} />
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
  row: {
    marginTop: 20
  },
  field: {
    marginRight: '2%'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20
  },
  registerBtn: {
    height: '8.5%',
    justifyContent: 'flex-end',
    alignContent: "center",
    marginHorizontal: '20%'
  },
  form: {
    flex: 2,
    marginBottom: 48,
    marginHorizontal: 20,
    marginTop: 20,
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
  btn: {
    flex: 1,
    resizeMode: "contain",
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateField, register, update }, dispatch)
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
)(BusinessOwnerAdd2)