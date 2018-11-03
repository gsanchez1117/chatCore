import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../../constants/Colors';

export default class CCEditProfileAboutMe extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{paddingVertical: 10}}>Tell others about yourself here.</Text>
                <TextInput 
                    style={styles.textInput}
                    multiline={true}
                    maxLength={200}
                />
                <Text>Characters remaining: 256</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    textInput: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.GS_Color_Contrast_3,
        borderRadius: 5,
        minHeight: 100
    }
});