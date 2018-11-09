/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

import { Actions } from 'react-native-router-flux';

const instructions = Platform.select({
  ios: 'Texto IOS',
  android:
    'Texto Android',
});

type Props = {};
export default class TestContainer extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> Actions.pop()} style={styles.askButton} >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.openAskCadastro()} style={styles.signupButton} >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.openAskLogin()} style={styles.loginButton} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  openAskCadastro(){
    Alert.alert(
      'Cadastrar',
      'Você quer mesmo se cadastrar?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.openSimpleAlert()},
      ],
      { cancelable: false }
    )
  }

  openAskLogin(){
    Alert.alert(
      'Entrar',
      'Você quer realmente entrar?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.openSimpleAlert()},
      ],
      { cancelable: false }
    )
  }

  openSimpleAlert(){
    Alert.alert("Olá", "Você confirmou!");
  }

  openSignup(){
    Actions.signup();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainButton:{
    backgroundColor: "#4f8942",
  },
  textButton: {
    color: "white",
    margin: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
  askButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 20
  },
  signupButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 20
  },
  loginButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.4,
    alignItems: 'center'
  },
  buttonText:{
    color: "white"
  }
});
