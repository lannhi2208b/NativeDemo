import React, { Component } from 'react';
import { Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import images from "../../Themes/images";
import styles from "./styles";
export { styles, images };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: [],
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
            axios.get('http://192.168.92.2:8080/api/profile/', { headers: headers })
            .then(response => {
                this.setState({ register: response.data });
            })
            .catch(error => console.log(error))
        })
    }

    render() {
        const navigation = this.props.navigation
        const { register } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View>
                    <Text style={[styles.header, styles.textAlignCenter]}>My Profile</Text>
                    <View style={[styles.boxProfileHeader, styles.borderBox]}>
                        <View style={styles.boxLeft}>
                            <Image source={images.avatar} resizeMode='stretch' style={styles.imgAvatar} />
                        </View>
                        <View style={[styles.boxRight]}>
                            <Text style={styles.txtProfileName}>{register.fname} {register.lname}</Text>
                            <Text style={styles.txtProfileGray}>Phone: {register.phone}</Text>
                            <Text style={styles.txtProfileGray}>Email: {register.email}</Text>
                            <Text style={styles.txtProfileGray}>Address: {register.address}</Text>
                        </View>
                    </View>
                    <View style={styles.boxProfileContent}>
                        <View style={[styles.txtProfileList, styles.borderBottom]}>
                            <Icon reverseColor name='user-edit' type='FontAwesome5' style={styles.boxLeftIcon}/>
                            <TouchableOpacity 
                                style={styles.boxRightButton}
                                onPress={() => navigation.navigate('Edit Profile')}>
                                <Text style={styles.textIcon}>Edit Profile</Text>
                                <Icon reverseColor name='chevron-right' type='FontAwesome5' style={styles.rightIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.txtProfileList, styles.borderBottom]}>
                            <Icon reverseColor name='star' type='FontAwesome5' style={styles.boxLeftIcon}/>
                            <TouchableOpacity 
                                style={styles.boxRightButton}>
                                <Text style={styles.textIcon}>Rate Us</Text>
                                <Icon reverseColor name='chevron-right' type='FontAwesome5' style={styles.rightIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.txtProfileList, styles.borderBottom]}>
                            <Icon reverseColor name='cog' type='FontAwesome5' style={styles.boxLeftIcon}/>
                            <TouchableOpacity 
                                style={styles.boxRightButton}
                                onPress={() => navigation.navigate('Settings')}>
                                <Text style={styles.textIcon}>Settings</Text>
                                <Icon reverseColor name='chevron-right' type='FontAwesome5' style={styles.rightIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.txtProfileList, styles.borderBottom]}>
                            <Icon reverseColor name='sign-out-alt' type='FontAwesome5' style={styles.boxLeftIcon}/>
                            <TouchableOpacity 
                                style={styles.boxRightButton}>
                                <Text style={styles.textIcon}>Sign Out</Text>
                                <Icon reverseColor name='chevron-right' type='FontAwesome5' style={styles.rightIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}