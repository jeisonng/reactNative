/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*

componentDidMounth(){

  const currentUser=firebase.auth().currentUser;
  if(currentUser){
    Actions.dashboard();
  }
}


*/
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, ImageBackground, View, FlatList, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import EditarPerfil from '../AuthContainer/EditarPerfil';
import { Icon } from 'react-native-elements'

var { height, width } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Dashboard extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      
      deviceWidth: width,
      deviceHeight: height,

    };
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>
        
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignContent:'center',marginLeft:'25%'}}> 
        <TouchableOpacity onPress={() => this.createPlace()} style={styles.askButton} >
          <Text style={styles.buttonText}>Criar Locais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()} style={styles.askButton} >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.editar()} style={styles.askButton} >
          <Text style={styles.buttonText2}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goToPlaceListe()} style={styles.askButton} >
          <Text style={styles.buttonText2}>Places</Text>
        </TouchableOpacity>
        </View>
        

      </ImageBackground>
    );
  }
  logout() {
    firebase.auth().signOut()
      .then(function () {
        Actions.login();
      })
      .catch(function (error) {

      });




  }
  editar() {
    Actions.editarperfil();
  }
  createPlace(){
    Actions.createplace();
  }
  goToPlaceListe(){
    Actions.placelist();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    borderColor: 'white',
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    
    padding:10,
    textAlign: "center",
   
    
    justifyContent: "center",
    alignContent: "center",
    fontSize: 20,
    width:width * 0.45

  },
  registerButton: {

    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText2: {
    color: "white",
    borderColor: 'white',
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
   padding:10,
    
    textAlign: "center",
    
    justifyContent: "center",
    alignContent: "center",
    fontSize: 20,
    width:width * 0.45

  },
  askButton: {
    margin: width * 0.02
  }
});
