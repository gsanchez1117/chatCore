import React from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { Content } from 'native-base';
import  { LinearGradient } from 'expo';
import CCAuthForm from '../components/CCAuthForm';
import * as globalStyles from '../styles/globalStyles';

export default class HomeScreen extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    
    state = {
    }

    _submitPressed(item) {
        //TODO: Pass the item tot he Auth Controller and check the response.
        //for now just log the item and navigate the user to the main page...
        console.log(item);
        this.props.navigation.navigate('Main');
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
