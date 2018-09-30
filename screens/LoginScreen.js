import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import  { LinearGradient } from 'expo';
import CCAuthForm from '../components/CCAuthForm';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
  }

  render() {

    return (
    <LinearGradient
        style={styles.container}
        colors={['#ef820d', '#FFCC00']}
    >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <CCAuthForm></CCAuthForm>
        </ScrollView>
    </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
});
