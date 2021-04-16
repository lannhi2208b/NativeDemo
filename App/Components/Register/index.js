import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { 
    View, Text, TextInput, TouchableOpacity, Alert
} from 'react-native';

import styles from "../Login/styles";
export { styles };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ForgotPassword from '../Login/forgot';
import Login from '../Login/login';
export { Login, ForgotPassword };
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formData: {
                fname: '',
                lname: '',
                email: '',
                phone: '',
                password: '',
            }
        }
    }
    
    validate = () => {
        let messages = []
        let textMessages = ''
        let formData = this.state.formData

        if (!formData.fname.trim()) {
            messages.push('Please enter your first name.')
        }
        else if(!formData.lname.trim()) {
            messages.push('Please enter your last name.')
        }
        else if(!formData.email.trim()) {
            messages.push('Please enter your email.')
        }
        else if(!formData.phone.trim()) {
            messages.push('Please enter your phone.')
        }
        else if(!formData.password.trim()) {
            messages.push('Please enter your password.')
        }

        if(formData.password.trim() && formData.password.length < 6) {
            messages.push('Password at least 6 characters.')
        }

        if(formData.phone.trim() && formData.phone.length < 9) {
            messages.push('Phone at least 9 characters.')
        }

        if(formData.email.trim()) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(formData.email).toLowerCase())) {
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

    register = () => {
        let validation = this.validate();
        if(!validation) {
            this.setState({ isLoading: true })
            axios.post('http://192.168.92.2:8080/api/register', this.state.formData)
            .then(res => {
                this.setState({ isLoading: false })
                if(res.data.status == 0) {
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
                else if(res.data.status == 2) {
                    let msg_error = this.first_array(res.data.msg)
                    Alert.alert(
                        "Error!", 
                        msg_error[0],
                        [{ 
                            text: "Ok",
                            onPress: () => console.log("Ok Pressed"),
                        }], 
                        { cancelable: false }
                    );
                }
                else {
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
                    this.setState({ formData: { fname: '', lname: '', email: '', phone: '', password: '' }})
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
                [{ 
                    text: "Ok",
                    onPress: () => console.log("Ok Pressed"),
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }],
                { cancelable: false }
            );
        }
    }

    first_array(array) {
        return array[Object.keys(array)[0]];
    }

    changeFormData = (item) => {
        let formData = this.state.formData;
        this.setState({ formData: { ...formData, ...item } });
    }

    render() {
        const { formData, isLoading } = this.state

        return (
            <View style={styles.container}>
                <Spinner visible={isLoading} />
                <View>
                    <Text style={[styles.header, styles.textAlignCenter]}>Register</Text>
                    <View style={[styles.boxMainRegister, styles.boxWithShadow, styles.borderBox]}>
                        <TextInput placeholder="First Name *" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            value={formData.fname}
                            style={styles.txtInput} onChangeText={(fname) => this.changeFormData({fname})}/>

                        <TextInput placeholder="Last Name *" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            value={formData.lname}
                            style={styles.txtInput} onChangeText={(lname) => this.changeFormData({lname})}/>
                        
                        <TextInput placeholder="Email Address *" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            value={formData.email}
                            style={styles.txtInput} onChangeText={(email) => this.changeFormData({email})}/>

                        <TextInput placeholder="Phone Number *" 
                            placeholderTextColor="gray" 
                            underlineColorAndroid="transparent"
                            value={formData.phone}
                            style={styles.txtInput} onChangeText={(phone) => this.changeFormData({phone})}/>

                        <TextInput placeholder="Password *"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            value={formData.password}
                            style={styles.txtInput} onChangeText={(password) => this.changeFormData({password})}/>

                        <Text 
                            onPress={() => this.props.navigation.navigate('Forgot Password')} 
                            style={[styles.textSmall, styles.textColorBlue, styles.textAlignRight]}>Forgot Password?</Text>

                        <TouchableOpacity onPress={this.register} style={styles.button}>
                            <Text style={styles.txtButton}>REGISTER</Text>
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

