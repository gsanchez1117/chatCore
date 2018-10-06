import React from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { Content, Toast } from 'native-base';
import  { LinearGradient } from 'expo';
import CCAuthForm from '../components/CCAuthForm';
import * as globalStyles from '../styles/globalStyles';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    
    state = {
        isLoading: false
    }

    _submitPressed(item) {
        var self = this;
        switch(item.type){
            case "login": {
                this.setState({ isLoading:true });
                firebase.auth().signInWithEmailAndPassword(item.email, item.password).catch(function(error) {
                    self._displayMessage('danger', error.message);
                });
                break;
            }case "signup":{
                this.setState({ isLoading:true });
                firebase.auth().createUserWithEmailAndPassword(item.email, item.password).catch(function(error) {
                    self._displayMessage('danger', error.message);
                });
                break;
            }case "forgotpassword":{
                this.setState({ isLoading:true });
                firebase.auth().sendPasswordResetEmail(item.email).then(function() {
                    self._displayMessage('success', 'Email Sent!');
                }).catch(function(error) {
                    self._displayMessage('danger', error.message);
                });
                break;
            }
        }
    }

    _displayMessage = (type, text) => {
        if (this.state.isLoading)
            this.setState({ isLoading:false });
        Toast.show({
            type: type,
            text: text,
            buttonText: 'Okay',
            duration: 3000,
        });
    }
    
    render() {
            
        return (
        <LinearGradient
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            colors={[globalStyles.GS_Color_Contrast_2, globalStyles.GS_Color_Contrast_2]}
        >
            <View style={{position: 'absolute', width: '100%', height: '50%', backgroundColor: globalStyles.GS_Color_Main_1}}/>
            {/* The type of view used to avoid the keyboard unfortunately must be different on each device.
                IOS likes the Content view while Android likes the KeyboardAvoidingView
            */}
            { Platform.OS === 'ios' ?
                <Content 
                    style={styles.container} 
                >
                    <CCAuthForm
                        isLoading={this.state.isLoading}
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
                        isLoading={this.state.isLoading}
                        onSubmitPressed = {(item) => this._submitPressed(item)}
                    />
                </KeyboardAvoidingView>
            }
            {this.state.isLoading ?
                <View style={{position: 'absolute', width:"100%", height:"100%", backgroundColor:"#00000000"}} />
                : null
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
