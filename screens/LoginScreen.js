import React from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Content } from 'native-base';
import  { LinearGradient } from 'expo';
import CCAuthForm from '../components/CCAuthForm';

let ScreenSize = Dimensions.get('window');

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
            contentContainerStyle={styles.contentContainer}
            colors={['#ef820d', '#FFCC00']}
        >
            {/* The type of view used to avoid the keyboard unfortunately must be different on each device.
                IOS likes the Content view while Android likes the KeyboardAvoidingView
            */}
            { Platform.OS === 'ios' ?
                <Content 
                    style={styles.container} 
                >
                    <CCAuthForm
                        onSubmitPressed = {(item) => this._submitPressed(item)}
                    />
                </Content>
            :
                <KeyboardAvoidingView 
                    style={styles.container} 
                    behavior= "position" //this is the only behavior that will work on android
                    //This is the distance from the top of the screen the inner view will be when the keyboard appears
                    //negative is bellow, 0 is touching, and positive is above
                    keyboardVerticalOffset = {-150} 
                >
                    <CCAuthForm
                        onSubmitPressed = {(item) => this._submitPressed(item)}
                    />
                </KeyboardAvoidingView>
            }
        </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        height: '100%',
    },
});
