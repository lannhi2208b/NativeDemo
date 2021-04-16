import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, SafeAreaView } from 'react-native';
import images from "../../Themes/images";
import styles from "./styles";
export { styles, images };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            register: {
                fname: '',
                lname: '',
                email: '',
                phone: '',
                address: '',
            },
            getToken: '',
        }
    }

    componentDidMount() {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        AsyncStorage.getItem('ReactNativeStore:token')
        .then(token => {
            headers = {...headers, ...{ Authorization: `Bearer ${token}`}}
            axios.get('http://192.168.92.2:8080/api/profile/edit/', { headers: headers })
            .then(response => {
                this.setState({ register: response.data.register, getToken: response.data.token });
            })
            .catch(error => console.log(error))
        })
    }
    
    validate = () => {
        let messages = []
        let textMessages = ''
        let register = this.state.register

        if (!register.fname.trim()) {
            messages.push('Please enter your first name.')
        }
        else if(!register.lname.trim()) {
            messages.push('Please enter your last name.')
        }
        else if(!register.email.trim()) {
            messages.push('Please enter your email.')
        }
        else if(!register.phone.trim()) {
            messages.push('Please enter your phone.')
        }
        else if(!register.address.trim()) {
            messages.push('Please enter your address.')
        }

        if(register.phone.trim() && register.phone.length < 9) {
            messages.push('Phone at least 9 characters.')
        }

        if(register.email.trim()) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(register.email).toLowerCase())) {
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

    saveProfile = () => {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        let validation = this.validate();
        if(!validation) {
            this.setState({ isLoading: true })
            headers = {...headers, ...{ Authorization: `Bearer ${this.state.getToken}`}}
            axios.post('http://192.168.92.2:8080/api/profile/update', this.state.register, { headers: headers })
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
                    Alert.alert(
                        "Successful!",
                        res.data.msg,
                        [{ 
                            text: "Ok",
                            onPress: () => this.props.navigation.navigate('Profile'),
                        }],
                        { cancelable: false }
                    );
                    this.setState({ register: { fname: '', lname: '', email: '', phone: '', address: '' }})
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
        let register = this.state.register;
        this.setState({ register: { ...register, ...item } });
    }

    render() {
        const { register, isLoading } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={isLoading} />
                <ScrollView style={styles.scrollView}>
                    <View>
                        <Text style={[styles.header, styles.textAlignCenter]}>Edit Profile</Text>
                        <View style={styles.boxAvatar}>
                            <Image source={images.avatar} resizeMode='stretch' style={styles.imgAvatar} />
                            <Image source={images.camera} resizeMode='stretch' style={styles.imgCamera} />
                        </View>
                        <View>
                            <Text style={styles.txtTittle}>First Name</Text>
                            <TextInput 
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                value={register.fname} 
                                style={styles.txtInputProfile} onChangeText={(fname) => this.changeFormData({fname})}/>

                            <Text style={styles.txtTittle}>Last Name</Text>
                            <TextInput
                                placeholderTextColor="gray" 
                                underlineColorAndroid="transparent"
                                value={register.lname} 
                                style={styles.txtInputProfile} onChangeText={(lname) => this.changeFormData({lname})}/>

                            <Text style={styles.txtTittle}>Email Address</Text>
                            <TextInput
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                value={register.email}  
                                style={styles.txtInputProfile} onChangeText={(email) => this.changeFormData({email})}/>

                            <Text style={styles.txtTittle}>Phone Number</Text>
                            <TextInput
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                value={register.phone} 
                                style={styles.txtInputProfile} onChangeText={(phone) => this.changeFormData({phone})}/>

                            <Text style={styles.txtTittle}>Address</Text>
                            <TextInput
                                placeholderTextColor="gray" 
                                underlineColorAndroid="transparent"
                                value={register.address}  
                                style={styles.txtInputProfile} onChangeText={(address) => this.changeFormData({address})}/>

                            <TouchableOpacity onPress={this.saveProfile} style={styles.button}>
                                <Text style={styles.txtButton}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}