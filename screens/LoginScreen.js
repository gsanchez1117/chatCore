import React from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';
import { Content } from 'native-base';
import  { LinearGradient } from 'expo';
import CCAuthForm from '../components/CCAuthForm';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
  }

  _submitPressed(item) {
      console.log(item);
  }

  render() {

    return (
        <LinearGradient
            style={styles.container}
            colors={['#ef820d', '#FFCC00']}
            >
            <Content 
                style={styles.container} contentContainerStyle={styles.contentContainer}
                behavior= {(Platform.OS === 'ios')? "padding" : null}
                keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            >
                <CCAuthForm
                    onSubmitPressed = {(item) => this._submitPressed(item)}
                />
            </Content>
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
        height: '100%',
    },
});
