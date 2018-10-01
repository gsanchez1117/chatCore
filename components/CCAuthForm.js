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
import { Button, Text, Toast } from 'native-base';
import * as globalStyles from '../styles/globalStyles';

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

const badColor = '#afb7c2';
const mediumColor = '#f68e4f';
const goodColor = '#33c4b3';

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
        emailColor: badColor,
        passwordColor: badColor,
        repasswordColor: badColor,
        height: 0,
        initialHeightSet: false,
    }

    /**
     * Called immediately after the component size is set for the first time
     */
    _initialAnimation() {
        //return if the method has already run once
        if (this.state.initialHeightSet === true){ return; }

        //animate the component in from the bottom of the screen
        Animated.timing(                  
        this.state.slideInAnimation,            
        {
            toValue: ScreenSize.height*.5 - this.state.height*.5,                  
            duration: 1000,             
        }
        ).start();

        //set the initialHeightSet flag after running this method once
        this.setState({
            initialHeightSet: true
        });
    }

    /**
     * Called when the email text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _emailTextChanged(value){
        if (this.props.emailRegex.test(value)){
            this.setState({ 
                emailText: value,
                emailColor: goodColor,
            });
        }else{
            this.setState({ 
                emailText: value,
                emailColor: badColor
            });
        }
    }
    
    /**
     * Called when the password text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _passwordTextChanged(value){
        if (this.props.strongPasswordRegex.test(value)){
            this.setState({ 
                passwordText: value,
                passwordColor: goodColor,
                repasswordText: '',
                repasswordColor: badColor,
            });
        }else if (this.props.mediumPasswordRegex.test(value)){
            this.setState({ 
                passwordText: value,
                passwordColor: mediumColor,
                repasswordText: '',
                repasswordColor: badColor,
            });
        }else{
            this.setState({ 
                passwordText: value,
                passwordColor: badColor,
                repasswordText: '',
                repasswordColor: badColor,
            });
        }
    }
    
    /**
     * Called when the repassword text has changed and needs updating in the state.
     * @param {*} value - value to update the state with.
     */
    _repasswordTextChanged(value){
        if (this.props.mediumPasswordRegex.test(this.state.passwordText) && this.state.passwordText === value){
            this.setState({ 
                repasswordText: value,
                repasswordColor: goodColor
            });
        }else{
            this.setState({ 
                repasswordText: value,
                repasswordColor: badColor
            });
        }
    }

    /**
     * Clears the text input fields.
     */
    _clearInputs(){
        this.setState({
            emailText: '',
            passwordText: '',
            repasswordText: '',
            emailColor: badColor,
            passwordColor: badColor,
            repasswordColor: badColor,
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

        //get the type
        var type = this.state.isLogin ? (this.state.isForgotPassword ? 'forgotpassword' : 'login') : 'signup';

        var validInput = true;

        //check email for all types
        if (type == 'forgotpassword' || type == 'login' || type == 'signup'){
            validInput = this.props.emailRegex.test(this.state.emailText);
            if (validInput == false){
                Toast.show({
                    type: 'danger',
                    text: 'Not a valid Email Address!',
                    buttonText: 'Okay'
                });
                if (this.emailInput)
                    this.emailInput.shake();
                return;
            }
        }
        //check password only for login and signup
        if (type == 'login' || type == 'signup'){
            validInput = this.props.mediumPasswordRegex.test(this.state.passwordText);
            if (validInput == false){
                Toast.show({
                    type: 'danger',
                    text: 'Password not strong enough!',
                    buttonText: 'Okay'
                });
                if (this.passwordInput)
                    this.passwordInput.shake();
                return;
            }
        }
        //check repassword only for signup
        if (type == 'signup'){
            validInput = this.props.mediumPasswordRegex.test(this.state.passwordText) && this.state.passwordText === this.state.repasswordText;
            if (validInput == false){
                Toast.show({
                    type: 'danger',
                    text: 'Passwords do not match!',
                    buttonText: 'Okay'
                });
                if (this.repasswordInput)
                    this.repasswordInput.shake();
                return;
            }
        }

        //if the input is valid and the onSubmitPressed prop is not null
        if (validInput && this.props.onSubmitPressed){

            //call the onSubmitPressed prop and pass in the object
            this.props.onSubmitPressed({
                type: type,
                email: this.state.emailText,
                password: this.state.passwordText,
                repassword: this.state.repasswordText
            });

            //clear the inputs after a successful submission
            this._clearInputs();
        }
    }

    /**
     * this method is called after each render when the root component has 
     * calculated its size. If the size has changed we udpate it in the state.
     * After updated the new size we attempt to call the initial animation.
     * If it has animated once already the functino will never run.
     * @param {*} layout - the layout object passed back in the form: { x:int, y:int, width:int, height:int}
     */
    _onLayout(layout) {
        var newHeight = Math.floor(layout.height);
        if (this.state.height != newHeight){
            this.setState({
                height: newHeight,
            },() => {
                //try calling the initial animation after setState has finished
                this._initialAnimation();
            });
        }
    }
    
    /**
     * Called whenever the component needs to redraw itseld. (mainly when state or props are changed)
     */
    render() {
        return (
            <Animated.View 
                style={[styles.loginForm, {top: this.state.slideInAnimation}]}
                onLayout = {(event) => {this._onLayout(event.nativeEvent.layout)}}
            >
                <View style={styles.inputContainer}>
                    <View style={[styles.textStatusBox, {backgroundColor: this.state.emailColor}]}/>
                    <FormInput
                        ref = {input=>this.emailInput = input }
                        containerStyle={styles.inputStyle}
                        placeholder="Email"
                        autoCorrect={false}
                        value={this.state.emailText}
                        onChangeText={(value) => this._emailTextChanged(value)}
                    />
                </View>
                { this.state.isForgotPassword == false ?
                    <View style={styles.inputContainer}>
                        <View style={[styles.textStatusBox, {backgroundColor: this.state.passwordColor}]}/>
                        <FormInput
                            ref = {input=>this.passwordInput = input }
                            containerStyle={styles.inputStyle}
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Password"
                            value={this.state.passwordText}
                            onChangeText={(value) => this._passwordTextChanged(value)}
                        />
                    </View>
                    : null
                }
                { this.state.isLogin === false ?
                    <View style={styles.inputContainer}>
                        <View style={[styles.textStatusBox, {backgroundColor: this.state.repasswordColor}]}/>
                        <FormInput
                            ref = {input=>this.repasswordInput = input }
                            containerStyle={styles.inputStyle}
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Re-enter Password"
                            value={this.state.repasswordText}
                            onChangeText={(value) => this._repasswordTextChanged(value)}
                        />
                    </View>
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
    onSubmitPressed: PropTypes.func.isRequired,
    emailRegex: PropTypes.instanceOf(RegExp),
    strongPasswordRegex: PropTypes.instanceOf(RegExp),
    mediumPasswordRegex: PropTypes.instanceOf(RegExp),
};

/**
 * A list of the default values for props on this component
 */
CCAuthForm.defaultProps = {
    onSubmitPressed: null,
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    strongPasswordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    mediumPasswordRegex: /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{8,})/,
};

const styles = StyleSheet.create({
    loginForm: {
        backgroundColor: globalStyles.GS_Color_Contrast_1,
        marginHorizontal: "10%",
        width: '80%',
        paddingTop: 30,
        borderRadius: 10,
        //overflow: 'hidden',
        ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    inputContainer: {
        flexDirection: 'row',
        marginRight: 10,
        width: '100%',
    },
    inputStyle: {
        flex:1,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 10,
        borderColor: '#33c4b3',
    },
    textStatusBox: {
        width: 10,
        height: '100%'
    },
    forgotText: {
        marginVertical: 10,
        textAlign: 'center',
    },
    submitButton: {
        marginVertical: 20,
        marginHorizontal: 20, //matches the margin of the input fields
        backgroundColor: globalStyles.GS_Color_Highlight_1,
    },
    buttonGroup: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        borderColor: '#0000',
        borderRadius: 10,
    },
});
