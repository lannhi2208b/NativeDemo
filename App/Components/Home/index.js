import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import images from "../../Themes/images";
import styles from "./style";
export { styles, images };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            email: '',
        };
    }

    componentDidMount() {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        AsyncStorage.getItem('ReactNativeStore:token')
        .then(token => {
            headers = {...headers, ...{ Authorization: `Bearer ${token}`}}
            axios.get('http://192.168.92.2:8080/api/home', { headers: headers })
            .then(res => {
                this.setState({ email: res.data });
            })
            .catch(error => console.log(error))
        })
    }

    render() {
        const navigation = this.props.navigation
        const { isActive, email } = this.state;

        return (
            <View style={styles.container}>
                <Text>Email: { email }</Text>
                <Text style={[
                    styles.header,
                    isActive ? styles.colorRed : styles.colorGreen,
                ]}>Home</Text>
                <Text style={styles.textAlignTitle}>Hello React Native!!</Text>
                <View>
                    <Image source={images.banner} resizeMode='stretch' style={styles.backgroundImage} />
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile')} 
                        style={styles.buttonProfile}>
                        <Text style={styles.textButton}>MY PROFILE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')} 
                        style={styles.buttonSignIn}>
                        <Text style={styles.textButton}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={[styles.textSmall, styles.textAlignCenter]}>Don't have account? 
                        <Text 
                            onPress={() => navigation.navigate('Register')} 
                            style={styles.textColorBlue}> Create a new account
                        </Text>
                    </Text>
                </View> 
            </View>
        );
    }
}
