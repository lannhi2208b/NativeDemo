import { Button } from 'native-base';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./styles";
export { styles };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checkLogin: 0,
            isLoading: false,
        }
    }

    validate = () => {
        let messages = []
        let textMessages = ''
        if (!this.state.email.trim()) {
            messages.push('Please enter your email.')
        }
        else if(!this.state.password.trim()) {
            messages.push('Please enter your password.')
        }

        if(this.state.email.trim()) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(this.state.email).toLowerCase())) {
                messages.push("Your email in invalid format.")
            }
        }

        messages.forEach((msg, index) => {
            if (index + 1 == messages.length) {
                textMessages += msg
            }
        })
        return textMessages
    }

    login = () => {
        let validation = this.validate();
        if(!validation) {
            let formData = {
                email: this.state.email, 
                password: this.state.password
            }
            this.setState({ isLoading: true })
            axios.post('http://192.168.92.2:8080/api/login', formData)
            .then(res => {
                this.setState({ isLoading: false })
                if(res.data.status == 1) {
                    AsyncStorage.setItem('ReactNativeStore:token', res.data.token).then(() => {
                        this.setState({ isLoading: false }, () => {
                            Alert.alert(
                                "Successful!", 
                                res.data.msg,
                                [{ 
                                    text: "Ok",
                                    onPress: () => this.props.navigation.navigate('Home'),
                                }], 
                                { cancelable: false }
                            );
                        })
                    })
                }
                else {
                    Alert.alert(
                        "Error!", 
                        res.data.msg,
                        [{ 
                            text: "Ok",
                            onPress: () => console.log("Ok Pressed"),
                        }], 
                        { cancelable: false }
                    );
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
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
        const { isLoading } = this.state

        return (
            <View style={styles.container}>
                <Spinner visible={isLoading} />
                <View>
                    <Text style={[styles.header, styles.textAlignCenter]}>Login</Text>
                    <View style={[styles.boxMainLogin, styles.boxWithShadow, styles.borderBox]}>
                        <TextInput placeholder="Email" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            value={this.state.email}
                            style={styles.txtInput} onChangeText={(email) => this.setState({email:email})}/>

                        <TextInput placeholder="Password"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            value={this.state.password}
                            style={styles.txtInput} onChangeText={(password) => this.setState({password:password})}/>

                        <Text 
                            onPress={() => this.props.navigation.navigate('Forgot Password')} 
                            style={[styles.textSmall, styles.textColorBlue, styles.textAlignRight]}>Forgot Password?</Text>

                        <TouchableOpacity onPress={this.login} style={styles.button}>
                            <Text style={styles.txtButton}>LOGIN</Text>
                        </TouchableOpacity>

                        <Text style={[styles.textSmall, styles.textAlignCenter]}>Don't have account? 
                            <Text 
                                onPress={() => this.props.navigation.navigate('Register')} 
                                style={styles.textColorBlue}> Create a new account</Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}