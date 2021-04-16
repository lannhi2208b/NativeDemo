import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Native } from '../NativeDemo/App/index';
import { AppRegistry } from 'react-native';

export default function App() {
    return (
        <>
          <Native />
        </>
    );
};

// AppRegistry.registerComponent('main',() => App);
