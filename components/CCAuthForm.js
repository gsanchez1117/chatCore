import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Dimensions,
  View,
} from 'react-native';
import { FormInput, ButtonGroup } from 'react-native-elements'
import { Button, Text } from 'native-base';

let ScreenSize = Dimensions.get('window')

// type Props = {
//     style?: any,
// }
// CCAuthForm.propTypes = {
//     test: React.propTypes.bool
// };

// CCAuthForm.defaultProps = {
//     test: false,
// };

const linearAnimation = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.curveEaseInEaseOut,
    },
};

export default class CCAuthForm extends React.Component {

    state = {
        sclideInAnimation: new Animated.Value(ScreenSize.height),  // Initial value for opacity: 0
        buttonText: "Login",
        isLogin: true,
        isForgotPassword: false,
        forgotPasswordText: "Forgot Password?",
        buttonGroupIndex: 0,
    }

    componentDidMount() {
        Animated.timing(                  
        this.state.sclideInAnimation,            
        {
            toValue: ScreenSize.height/2-200,                  
            duration: 1000,             
        }
        ).start();                   
    }

    _updateButtonGroupIndex(index){
        var isLogin = !index;

        if (this.state.isForgotPassword){
            this._forgotPasswordPressed();
        }

        LayoutAnimation.configureNext(linearAnimation);
        this.setState({
            buttonGroupIndex: index,
            isLogin: isLogin,
            buttonText: (isLogin ? "Login" : "Sign Up" )
        });

    }

    _forgotPasswordPressed(){
        var newVal = !this.state.isForgotPassword;
        LayoutAnimation.configureNext(linearAnimation);
        this.setState({
            isForgotPassword: newVal,
            forgotPasswordText: newVal ? 'Log In' : 'Forgot Password?',
            buttonText: newVal ? "Submit" : "Log In",
        });        
    }
  
    render() {
        let { 
            sclideInAnimation,
            buttonText,
        } = this.state;

        return (
            <Animated.View style={[styles.loginForm, {top: sclideInAnimation}]}>
                <FormInput
                    containerStyle={styles.inputStyle}
                    placeholder="Email"
                    autoCorrect={false}
                    //onChangeText={this.someFunction}
                />
                {!this.state.isForgotPassword ?
                    <FormInput
                    containerStyle={styles.inputStyle}
                    autoCorrect={false}
                    secureTextEntry
                    placeholder="Password"
                    //value={this.state.password}
                    //onChangeText={this.onPasswordEntry}
                    />
                    : null
                }
                {!this.state.isLogin ?
                    <FormInput
                        containerStyle={styles.inputStyle}
                        autoCorrect={false}
                        secureTextEntry
                        placeholder="Re-enter Password"
                        //value={this.state.password}
                        //onChangeText={this.onPasswordEntry}
                    />
                    : null
                }
                { this.state.isLogin ? 
                    <TouchableOpacity
                        onPress = {() => {this._forgotPasswordPressed()}}
                    >
                        <Text style={styles.forgotText}>{this.state.forgotPasswordText}</Text>
                    </TouchableOpacity>
                    : null
                }
                <Button 
                    style={styles.submitButton} 
                    block
                >
                    <Text>{buttonText}</Text>
                </Button>
                <ButtonGroup
                    buttons={["Log In", "Sign Up"]}
                    containerStyle={styles.buttonGroup}
                    selectedIndex={this.state.buttonGroupIndex}
                    onPress={(index) => {this._updateButtonGroupIndex(index)}}
                />
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    loginForm: {
        position: 'absolute',
        backgroundColor: '#fff',
        marginHorizontal: "10%",
        width: '80%',
        paddingTop: 30,
        borderRadius: 10,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 20,
            },
          }),
    },
    inputStyle: {
        marginVertical: 10,
        borderColor: '#336688',
    },
    forgotText: {
        marginVertical: 10,
        textAlign: 'center',
        color: '#336688',
    },
    submitButton: {
        marginVertical: 20,
        marginHorizontal: 20, //matches the margin of the input fields
        backgroundColor: '#336688',
    },
    buttonGroup: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
    },
});
