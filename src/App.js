import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen'
import firebase from 'firebase';

import Router from './Router';

const customTextProps = {
  style: {
    fontFamily: 'roboto-regular'
  }
};

console.disableYellowBox = true;

class App extends Component {
  componentWillMount () {
    //Posso Fazer qualquer tipo de configuração global aqui como por exemplo o Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyBS-Ltt7gmDwVDtI5T3JzrNMlJ-ug66s_8",
        authDomain: "flitter-db915.firebaseapp.com",
        databaseURL: "https://flitter-db915.firebaseio.com",
        projectId: "flitter-db915",
        storageBucket: "flitter-db915.appspot.com",
        messagingSenderId: "205532639397"
      })
    }
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 100,
      delay: 50,
   })
  }

  render() {
    return (
      <Router></Router>
    );
  }
}

export default App