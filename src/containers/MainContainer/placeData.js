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
import { Platform, StyleSheet, Text, TouchableOpacity, ImageBackground, View, FlatList, Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import EditarPerfil from '../AuthContainer/EditarPerfil';
import { Icon } from 'react-native-elements'
import _ from 'lodash'

var { height, width } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class PlaceData extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      deviceWidth: width,
      deviceHeight: height,
      shopsData:[]

    };
  }




  renderItem = ({ item }) => {
    return (

      <TouchableOpacity onPress={() => this.openPlaceDatail(item)} style={this.setColorByCity(item.cidade)}>
       { /*   <Image style={{ width: 50, height: 50, margin: 5, borderRadius:50 }}
          source={{ uri: item.image }}
    /> */   } 
        <View  style={{ fontSize: 18, color: 'green', marginBottom: 10,width:width * 0.7 }}>
          <Text>
            {item.nome}
          </Text>
          <Text>
            {item.cidade}
          </Text>
          
        </View>
        <Icon 
          name='keyboard-arrow-right' />
      </TouchableOpacity>
    )
  }
  componentDidMount() {

    
    this.searchPlaces();
  }


  /*  const url = 'https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.book_array

        })
      })
      .catch((error) => {
        console.log(error)
      })*/


  

  searchPlaces() {
    firebase.database().ref("Places")
    .once("value")
    .then((snapshot)=>{
     //  const placesValues = _.values(snapshot.val())



      item=[]
      snapshot.forEach((child)=>{

      /*  console.log(snapshot.val())
       this.dataSource.push({
        nome:child.val().nome,
        cidade:child.val().cidade
       }) */
      
        
        item.push({
          nome:child.val().nome,
          cidade:child.val().cidade,
          endereco:child.val().endereco,
        })
        
      })
     console.log(item)
      this.setState({
        dataSource:item
      })
         

        /* for(let i; i<snapshot.length; i++){
           console.log()
         }*/
  
    })
    


    /*firebase.database().ref("Users")
            .orderByChild("uid")
            .equalTo(user.uid)
            .once("value")
            .then((snapshot)=>{
                this.setState({userData: snapshot.val()[user.uid]})
            })*/
          }
        
      
  
  render() {
    return (
      <ImageBackground source={require('../../Images/background.png')} style={styles.container}>
       
        <TouchableOpacity onPress={()=> this.backToLogin()} style={styles.backButton} >
          <Icon name='arrow-back'  color='#00aced'/>          
        </TouchableOpacity>
        <Text style={{marginLeft:width * 0.45,top:'-10%', fontSize:18}}>Places  </Text>
       


        <FlatList
        style={styles.flat}
          data={this.state.dataSource}
          renderItem={this.renderItem}
    
        />
{/*   outro metodo de render   renderItem = {({item}) => this.renderPLaces(item)}      */}
        

      </ImageBackground>
    );
  }
  
  backToLogin(){
    Actions.dashboard();
  }
  openPlaceDatail(local){
    Actions.placeClassDatail({dataLocal : local});
  }
  setColorByCity(cidade){
if(cidade=='Contagem'){
  return styles.flatGreen
}else if(cidade == 'Belo horizonte')
{
  return styles.flatRed
}else{
  return styles.flatBlue
}
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
  flatGreen:{
    flexDirection: 'row',
     alignItems:'stretch', 
     flex: 1,
      marginBottom: 3,
       backgroundColor: 'green',
       borderRadius:5,
  },
  flatRed:{
    flexDirection: 'row',
     alignItems:'stretch', 
     flex: 1,
      marginBottom: 3,
       backgroundColor: 'red',
       borderRadius:5,
  },
  flatBlue:{
    flexDirection: 'row',
     alignItems:'stretch', 
     flex: 1,
      marginBottom: 3,
       backgroundColor: 'blue',
       borderRadius:5,
  }
});
