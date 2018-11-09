/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';


var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class SignUp extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      nome: "",
      email: "",
      senha: "",
      cidade: "",
      telefone: "",
      idade: ""
    };
  }

  componentDidMount(){
    const { currentUser } = firebase.auth();
    if (currentUser){
      console.log("Estou logado: ", currentUser.uid)
    }
    //Buscar os dados do usuário logado no banco (depois de ter aprendido a fazer push no banco e criar auth)
  }

  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>
        <TouchableOpacity onPress={()=> this.backToLogin()} style={styles.backButton} >
          <Icon name='arrow-back'  color='#00aced'/> 
        </TouchableOpacity>
        
       
        <Text style={styles.titleText}>Cadastro de Usuário</Text>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({nome: text})}
          placeholder="Ex: João Silva"
          value={this.state.nome}
          placeholderTextColor='white'
          
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Ex: fulano@gmail.com"
          value={this.state.email}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({senha: text})}
          placeholder="Senha aqui"
          secureTextEntry
          value={this.state.senha}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({cidade: text})}
          placeholder="Ex: Belo Horizonte"
          value={this.state.cidade}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({telefone: text})}
          placeholder="Ex: (31) 99999=9999"
          value={this.state.telefone}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({idade: text})}
          placeholder="Ex: 19 anos"
          value={this.state.idade}
          placeholderTextColor='white'
        />
        <TouchableOpacity onPress={()=> this.askRegister()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  backToLogin(){
    Actions.login();
  }

  askRegister(){
    Alert.alert(
      'Registrar',
      'Confirma o seu registo?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
        //  this.confirmRegister()
          this.registerUser(this.state.email, this.state.senha, this.state.nome, this.state.cidade, this.state.telefone, this.state.idade)
        },
      ],
      { cancelable: false }
    )
  }

  registerUser (email, password, nome, cidade, telefone, idade) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      firebase.database().ref("Users/"+currentUser.user.uid).update({
        uid: currentUser.user.uid,
        email: email,
        nome: nome,
        cidade: cidade,
        telefone: telefone,
        idade: idade
      });
      Alert.alert("Sucesso!", "Usuário criado");
      Actions.pop();
    })
    .catch((error) => { 
      console.log("firebase error: " + error);
      Alert.alert("Errou no auth!", error.code)
    });
  }

  confirmRegister () {
    const userData = {
      nome: this.state.nome,
      email: this.state.email,
      cidade: this.state.cidade,
      telefone: this.state.telefone,
      idade: this.state.idade,
      altura: 170,
    }
      firebase.database().ref("Shops/").push(userData)
      .then((snapshot) => {
        Alert.alert("Sucesso!", "Usuário criado");
        Actions.pop();
      })
      .catch((error) =>{
        console.log("Error: ", error);
        Alert.alert("Errou na persistência!", error.code)
      })
      
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  backButton: {
    
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignSelf: "flex-start"
  },
  registerButton: {
   
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText:{
    color: "white",
    borderColor:'white',
    borderRadius:25,   
    alignItems:"center",
    borderWidth:1,
    padding:25,
    textAlign:"center",
    margin:-25,
    justifyContent:"center",
    alignContent:"center",
    fontSize:20

  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.85, 
    borderBottomColor: 'white', 
    borderBottomWidth: 1,
    margin: width * 0.04,
    
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  }
});
