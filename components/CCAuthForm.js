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
import PropTypes from 'prop-types'
import { FormInput, ButtonGroup } from 'react-native-elements'
import { Button, Text } from 'native-base';

let ScreenSize = Dimensions.get('window')

const linearAnimation = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
};

export default class CCAuthForm extends React.Component {

    /**
     * The initial state for the component
     */
    state = {
        slideInAnimation: new Animated.Value(ScreenSize.height),
        buttonText: "Log In",
        isLogin: true,
        isForgotPassword: false,
        forgotPasswordText: "Forgot Password?",
        buttonGroupIndex: 0,
        emailText: '',
        passwordText: '',
        repasswordText: '',
    }

    /**
     * Called immediately after the component mounts
     */
    componentDidMount() {
        //animate the component in from the bottom of the screen
        Animated.timing(                  
        this.state.slideInAnimation,            
        {
            toValue: ScreenSize.height*.33,                  
            duration: 1000,             
        }
        ).start();                   
    }

    /**
     * Called when the email text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _emailTextChanged(value){
        this.setState({ emailText: value });
    }
    
    /**
     * Called when the password text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _passwordTextChanged(value){
        this.setState({ passwordText: value });
    }
    
    /**
     * Called when the repassword text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _repasswordTextChanged(value){
        this.setState({ repasswordText: value });
    }

    /**
     * Clears the text input fields.
     */
    _clearInputs(){
        this.setState({
            emailText: '',
            passwordText: '',
            repasswordText: '',
        });
    }

    /**
     * Updates the state of the form based on the button group index passed in.
     * Index 0: Login state, Index 1: Sign Up state.
     * If the isForgotPassword flag is set then it will be disabled.
     * @param {*} index - the index of the state(0 = login, 1 = sign up)
     */
    _updateButtonGroupIndex(index){

        //clear the input fields
        this._clearInputs();

        //create a more readable version of the index
        var isLogin = !index;

        //if the isForgotPassword flag is set
        if (this.state.isForgotPassword){
            //disable it
            this._forgotPasswordPressed();
        }

        //Setup a layout animation to be fired on the next setState() call
        LayoutAnimation.configureNext(linearAnimation);

        //update the state with the new valeus
        this.setState({
            buttonGroupIndex: index,
            isLogin: isLogin,
            buttonText: (isLogin ? "Log In" : "Sign Up" )
        });

    }

    /**
     * Toggles the isForgotPassword flag and updates the state accordingly.
     */
    _forgotPasswordPressed(){
        //get the opposite of the old value for the flag
        var newVal = !this.state.isForgotPassword;

        //setup a layout animation to fire on the next setState() call
        LayoutAnimation.configureNext(linearAnimation);

        //update the state accordingly
        this.setState({
            isForgotPassword: newVal,
            forgotPasswordText: newVal ? 'Log In' : 'Forgot Password?',
            buttonText: newVal ? "Submit" : "Log In",
        });        
    }

    /**
     * Called whenever the user presses the (login/sinup/submit) button.
     * This method makes a call to the "onSubmitPressed" prop if it is available.
     * The object passed back is as follows: 
     * { type: ('login', 'signup', 'forgotpassword'), email:string, password:sring, repassword:string }
     */
    _submitPressed() {
        //if the onSubmitPressed prop is not null
        if (this.props.onSubmitPressed){

            //get the type
            var type = this.state.isLogin ? (this.state.isForgotPassword ? 'forgotpassword' : 'login') : 'signup';

            //call the onSubmitPressed prop and pass in the object
            this.props.onSubmitPressed({
                type: type,
                email: this.state.emailText,
                password: this.state.passwordText,
                repassword: this.state.repasswordText
            });
        }
    }
    
    /**
     * Called whenever the component needs to redraw itseld. (mainly when state or props are changed)
     */
    render() {
        return (
            <Animated.View style={[styles.loginForm, {top: this.state.slideInAnimation}]}>
                <FormInput
                    containerStyle={styles.inputStyle}
                    placeholder="Email"
                    autoCorrect={false}
                    value={this.state.emailText}
                    onChangeText={(value) => this._emailTextChanged(value)}
                />
                { this.state.isForgotPassword === false ?
                    <FormInput
                    containerStyle={styles.inputStyle}
                    autoCorrect={false}
                    secureTextEntry
                    placeholder="Password"
                    value={this.state.passwordText}
                    onChangeText={(value) => this._passwordTextChanged(value)}
                    />
                    : null
                }
                { this.state.isLogin === false ?
                    <FormInput
                        containerStyle={styles.inputStyle}
                        autoCorrect={false}
                        secureTextEntry
                        placeholder="Re-enter Password"
                        value={this.state.repasswordText}
                        onChangeText={(value) => this._repasswordTextChanged(value)}
                    />
                    : null
                }
                { this.state.isLogin === true ? 
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
                    onPress={() => {this._submitPressed()}}
                >
                    <Text>{this.state.buttonText}</Text>
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

/**
 * A list of the props and their types that this components accepts
 */
CCAuthForm.propTypes = {
    onSubmitPressed: PropTypes.func.isRequired
};

/**
 * A list of the default values for props on this component
 */
CCAuthForm.defaultProps = {
    onSubmitPressed: null,
};

const styles = StyleSheet.create({
    loginForm: {
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
