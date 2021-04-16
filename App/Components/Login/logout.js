import React, { Component } from 'react';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        let headers = {
            Accept: 'application/json',
        }

        AsyncStorage.getItem('ReactNativeStore:token')
        .then(token => {
            this.setState({ isLoading: true })
            headers = {...headers, ...{ Authorization: `Bearer ${token}`}}
            axios.post('http://192.168.92.2:8080/api/logout/', token, { headers: headers })
            .then(res => {
                this.setState({ isLoading: false })
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
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
        })
    }   

    render() {
        const { isLoading } = this.state
        return <Spinner visible={isLoading} />
    }
}