import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

export default function ClientFaq(props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Pride App</Text>
      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>1. Who is the target audience?</Text>
        <Text>- The LGBTQ+ community</Text>
        <Text>- LGBTQ+ businesses looking to expand their customer base</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>2. What does the app do?</Text>
        <Text>- Helps users find LGBTQ+ “friendly”, owned and/or operated businesses</Text>
        <Text>- also allows for a 5 star rating system for users to share their experiences and opinions at a particular business.</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>3. How much does the app cost?</Text>
        <Text>- free for users</Text>
        <Text>- free registration for businesses; see all “Business Premium Account”  </Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>4. How does the app work?</Text>
        <Text>- the app can help users find places of interest based on GPS location or desired destination.</Text>
        <Text>- free registration for businesses; see all “Business Premium Account”  </Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>5. When will the app launch?</Text>
        <Text>- The Google App is expected to launch Fall 2020</Text>
        <Text>- The Apple App will launch Winter 2021</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>6. What is a “Business Premium Account”</Text>
        <Text>- any registered business may upgrade to a Business Premium Account for a monthly or yearly fee</Text>
        <Text>- this allows the business to update information like special events, dinner/drink promotions, hours and special promotions for mentioning the app.</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>7. What are the “Business Premium Account” fees?</Text>
        <Text>- Monthly: $60</Text>
        <Text>- Yearly: $500</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>8. Why is a 5 star rating system important?</Text>
        <Text>- to all users the chance to share their opinions with other users.</Text>
        <Text>- helps businesses to be ranked among other likewise businesses.</Text>
        <Text>- would allow businesses the chance for feedback and to see where the excel or need improvement.</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>9. What if a business receives too much negative feedback?</Text>
        <Text>- they will be removed from the app search results.</Text>
      </View>

      <View style={styles.faq}>
        <Text style={{fontWeight: 'bold'}}>10. What kind of ads will fund the app itself?</Text>
        <Text>- small banner ads or 5 second clips (nothing longer or more annoying than that)</Text>
      </View>

      <View style={{...styles.faq, marginBottom: 40 }}>
        <Text style={{fontWeight: 'bold'}}>11. Who was the app conceived by?</Text>
        <Text>- Jonathon W. Pritchard</Text>
        <Text>- Aaron J. Kolk, Jonathon’s husband of almost 9 years.</Text>
        <Text>- Brittain T. Thorton, Jonathon’s friend of almost 30 years.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  faq: {
    marginHorizontal: 10,
    marginBottom: 10
  }
});