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
export default class EditarPerfil extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      userData:{}

    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user){
    
       if(user){
       console.log("Meus Usuarios",user.email)
       firebase.database().ref("Users")
       .orderByChild("email")
       .equalTo(user.email)
       .once('value')
       .then((snapshot)=>{
           console.log("Meus Usuario0333s",snapshot.val());
           this.setState({      userData:snapshot.val()[user.uid]   })
                  
       })
       
     }else{
       
     }
    }.bind(this));
  }
  valueChanged(field, text){
    let userData = this.state.userData;
    userData[field] = text;

    this.setState({userData: userData});
  }

  maskTEL(v) {
    return new Promise((resolve, reject) => {
        if(!v){
            resolve("");
            return;
        }
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        resolve(v);
    });
}

applyMask(value){
    this.maskTEL(value).then(masked => {
        let userData = this.state.userData;
        userData.telefone = masked;
        this.setState({
            userData: userData
        })
    })
}

  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>
        <TouchableOpacity onPress={()=> this.backToDashboar()} style={styles.backButton} >
          <Icon name='arrow-back'  color='#00aced'/> 
        </TouchableOpacity>
        
       
        <Text style={styles.titleText}>Editar Usuario</Text>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("nome", text)}
          placeholder="Ex: João Silva"
          value={this.state.userData.nome}
          placeholderTextColor='white'
          
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("email", text)}
          placeholder="fulano@gmail.com"
          value={this.state.userData.email}
          placeholderTextColor='white'
        />
        
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("cidade", text)}
          placeholder="Ex: Belo Horizonte"
          value={this.state.userData.cidade}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.applyMask(text)}
          placeholder="Ex: (31) 999999999"
          value={this.state.userData.telefone}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("idade", text)}
          placeholder="Ex: 19 anos"
          value={this.state.userData.idade}
          placeholderTextColor='white'
        />
        <TouchableOpacity  onPress={()=> this.askUpdate()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  backToDashboar(){
    Actions.dashboard();
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
  askUpdate(){
    Alert.alert(
      'Atualizar',
      'Confirma atualizar com os seguintes dados?\nNome: ' + this.state.userData.nome + "\nEmail: " + this.state.userData.email ,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          //this.confirmRegister()
          this.updateUser()
        },
      ],
      { cancelable: false }
    )
  }
  
  updateUser(){
    const userData = this.state.userData;
    const userUid = this.state.userUid;
    firebase.database().ref("Users/" + userUid)
    .update(userData)
    .then(() => {
        Actions.dashboard();
        Alert.alert("Sucesso!", "Dados atualizados.")
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
