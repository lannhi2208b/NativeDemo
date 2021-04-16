import { Button } from 'native-base';
import React, { Component } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import styles from "./styles";
export { styles };

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }

    validate = () => {
        let messages = []
        let textMessages = ''
        if (!this.state.email.trim()) {
            messages.push('Please enter your email.')
        }
        messages.forEach((msg, index) => {
            if (index + 1 == messages.length) {
                textMessages += msg
            }
        })
        return textMessages
    }

    forgotPassword = () => {
        let validation = this.validate();
        if(!validation) {
            Alert.alert(
                "Successful!",
                "Welcome to React Native!",
                [
                    { 
                        text: "Ok",
                        onPress: () => console.log("Ok Pressed"),
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    }
                ],
                { cancelable: false }
            );
        } 
        else {
            Alert.alert(
               "Error!", 
                validation,
                [
                    { 
                        text: "Ok",
                        onPress: () => console.log("Ok Pressed"),
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    }
                ],
                { cancelable: false }
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={[styles.header, styles.textAlignCenter]}>Forgot Password</Text>
                    <View style={[styles.boxMainLogin, styles.boxWithShadow, styles.borderBox]}>
                        <TextInput placeholder="Email" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            style={styles.txtInput} onChangeText={(email) => this.setState({email:email})}/>

                        <TouchableOpacity onPress={this.forgotPassword} style={styles.button}>
                            <Text style={styles.txtButton}>SEND</Text>
                        </TouchableOpacity>

                        <Text style={[styles.textSmall, styles.textAlignCenter]}>Already have an account? 
                            <Text 
                                onPress={() => this.props.navigation.navigate('Login')} 
                                style={styles.textColorBlue}> Login</Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}