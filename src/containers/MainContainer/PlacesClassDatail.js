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
import {  StyleSheet, Text, TouchableOpacity, ImageBackground, View, FlatList, Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import EditarPerfil from '../AuthContainer/EditarPerfil';
import { Icon } from 'react-native-elements'
import _ from 'lodash'

var { height, width } = Dimensions.get('window');



type Props = {};
export default class PlaceClassDatail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
     
      deviceWidth: width,
      deviceHeight: height,
      dataLocal:props.dataLocal,

    };
  }
      
  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>
       
        <TouchableOpacity onPress={()=> this.backToList()} style={styles.backButton} >
          <Icon name='arrow-back'  color='#00aced'/>          
        </TouchableOpacity>
        <Text style={{marginLeft:width * 0.45,top:'-10%', fontSize:18}}>Places  </Text>
        <Text>{this.state.dataLocal.cidade}</Text>
        <Text>{this.state.dataLocal.nome}</Text>
        <Text>{this.state.dataLocal.endereco}</Text>
        <Text>{this.state.dataLocal.telefone}</Text>
        <Text>{this.state.dataLocal.abertura}</Text>
        <Text>{this.state.dataLocal.fechamento}</Text>
       

      </ImageBackground>
    );
  }
  backToList(){
      Actions.pop();
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
  },
  backButton: {
    
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignSelf: "flex-start"
  },
});
