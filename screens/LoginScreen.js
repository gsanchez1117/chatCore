import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Container, Content } from 'native-base';
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
    <Container>
        <LinearGradient
            style={styles.container}
            colors={['#ef820d', '#FFCC00']}
            >
            <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
                <CCAuthForm></CCAuthForm>
            </Content>
        </LinearGradient>
    </Container>
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
