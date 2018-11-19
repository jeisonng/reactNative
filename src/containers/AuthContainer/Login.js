/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, TouchableOpacity,ImageBackground, Alert, Image, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import { Icon } from 'react-native-elements'
var {height, width} = Dimensions.get('window');

type Props = {};
export default class Login extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      senha: "",
      email: "",
      deviceWidth: width,
      deviceHeight: height
    };
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user){
     if(user){
       console.log("current user");
       console.log(JSON.stringify(user))
       if(user){
         Actions.dashboard();
       }
     }else{
       
     }
    })
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>

       <View style={styles.logoContainer}>
            <Image style={styles.logoStyle} source={require('../../Images/logo.png')}/>
            <Text style={styles.titleText}>Flirter</Text>
       </View>      
       <View style={styles.viewInput}> 
     {/*<Icon style={styles.inputIcon}  name='person'
            color={'rgba(255,255,255,0.7)'}/> */}  
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({email: text})}
              placeholder="Ex: fulano@gmail.com"
              value={this.state.email}
              placeholderTextColor="#47476b"
              underlineColorAndroid='transparent'
            
            />
        </View>
        <View style={styles.viewInput}> 
      { /* <Icon style={styles.inputIcon}  name='lock'
             color={'rgba(255,255,255,0.7)'}/> */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({senha: text})}
          placeholder="Senha"
          secureTextEntry
          value={this.state.senha}
          placeholderTextColor="#47476b"
          underlineColorAndroid='transparent'
        />
        </View>
        <TouchableOpacity onPress={()=> this.logar(this.state.email,this.state.senha)} style={styles.askButton} >
          <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.openSignup()} style={styles.askButton2} >
          <Text style={styles.buttonText}>Cadastro</Text>
    </TouchableOpacity>
      </ImageBackground>
    );
  }

  
  textoCondicional(condicao){
    if (condicao == "maior de minas"){
      Alert.alert("Atenção", "Cruzeirão Cabuloso");
    }
    else {
      Alert.alert("Atenção", "Não tem bi");
    }
    
  }

  logar(email,senha){
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((dadosUsuario)=>{
      Actions.dashboard();
    }
    )
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("ERROU!");
      // ...
    });
  }
  openAskAlert(){
    Alert.alert(
      'Título do Alerta',
      'Você quer mesmo confirmar?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.openSimpleAlert()
        },
      ],
      { cancelable: false }
    )
  }

  openSimpleAlert(){
    Alert.alert("Olá", "Você confirmou");
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
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  askButton2: {
    backgroundColor: "#039BE5",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },

  buttonText:{
    color: "white"
  },
  welcomeText: {
    color: "gray",
    fontSize: 38,
    alignItems: "center",
    textAlign: 'center'
  },
  logoStyle: {
    width: width * 0.55,
    height: width * 0.55
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  },
  meuBotao:{
    backgroundColor: 'green',
    width: width * 0.8,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  estiloTexto:{
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center'
  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.85, 
    borderBottomColor: 'white', 
    borderBottomWidth: 1,
    //margin: width * 0.04,
    
  },
  viewInput:{
    margin:10,
    flexDirection:'row',
    justifyContent:'center',
    borderColor: 'blue',
   
    width:width*1,

   

    
    
    
  },
  input:{
    width: width -80,
    height: 45,
    borderRadius:50,
    fontSize:16,
    paddingLeft:25,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'white',
    //marginHorizontal:-27,
    
    
  },
  inputIcon:{
    position:'absolute',
    top:8,
    left:35,
  },
  logoContainer:{
    alignItems:'center'
  }
});























