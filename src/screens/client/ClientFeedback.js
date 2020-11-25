import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';
import email from 'react-native-email';

const firstOptions = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];

state = {
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  answer5: '',
  answer6: '',
};

export default class ClientFeedback extends Component {
  handleEmail = () => {
    const to = ['caleb.dockal@gmail.com'];
    email(to, {
      cc: ['caleb.dockal@gmail.com'],
      subject: 'Feedback',
      body:
        'What feature would you like to see in the app?' +
        this.state.answer1 +
        ' How could we improve your experience? ' +
        this.state.answer2 +
        ' How can we improve the rating system? ' +
        this.state.answer3 +
        ' What information would you like to see about listed businesses? ' +
        this.state.answer4 +
        ' How did you hear about the app? ' +
        this.state.answer5 +
        ' What countries would you like to see the app in? ' +
        this.state.answer6,
    }).catch(console.error);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Would you like to see a paid app without ads?
            </Text>
            <SwitchSelector
              options={firstOptions}
              initial={0}
              onPress={(value) => this.setState({firstAnswer: value})}
              buttonColor="#a40ffe"
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              What feature would you like to see in the app?
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer1) => this.setState({answer1})}></TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              How could we improve your experience?
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer2) => this.setState({answer2})}></TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              How can we improve the rating system.
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer3) => this.setState({answer3})}></TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              What information would you like to see about listed businesses?
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer4) => this.setState({answer4})}></TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              How Did you hear about the app?
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer5) => this.setState({answer5})}></TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.questionText}>
              What counties would you like to see the app in?
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(answer6) => this.setState({answer6})}></TextInput>
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={this.handleEmail}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  questionText: {
    marginBottom: 10,
    color: '#696969',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#E4C8EE',
    padding: 10,
    borderRadius: 10,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: '#a40ffe',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
