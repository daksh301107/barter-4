import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert,
  ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends React.Component {
  constructor(){
    super()
    this.state={
      userName: firebase.auth().currentUser.email,
      itemName: '',
      itemDescription: '',
    }
  }
  createUniqueId(){
    return Math.random().toString(36).substring(6);
  }

  addItem=(itemName, itemDescription)=>{
    var userName = this.state.userName
    var randomRequestId = this.createUniqueId()
    db.collection('Exchange').add({
      "userName": userName,
      "itemName": itemName,
      "itemDescription": itemDescription,
      "requestId": randomRequestId
    })
    this.setState({
      itemName: '',
      itemDescription: ''
    })
    return Alert.alert(
      'Item Ready To Exchange',
      '',
      [
        {text: 'OK', onPress:()=>{
          this.props.navigation.navigate('HomeScreen')
        }}
      ]
    )
  }


  render(){
    return (
      <View>
      <MyHeader title = "Exchange Here" navigation = {this.props.navigation} />

        <KeyboardAvoidingView style = {styles.keyboardStyle}>
        <TextInput
        style={styles.Textinput}
        placeholder = {'Enter Item Name'}
        onChangeText = {(text)=>{
          this.setState({itemName: text})
        }}
        value = {this.state.itemName}
        />
        <TextInput 
        style={styles.Textinput2}
        multiline
        numberOfLines = {10}
        placeholder = {'Item Description'}
        onChangeText = {(text)=>{
          this.setState({itemDescription: text})
        }}
        value = {this.state.itemDescription}
        />
        <TouchableOpacity
        style={{
        backgroundColor: '#3282b8',
        height: 40,
        width: 80,
        height: 60,
        alignSelf: 'center'}}
        onPress={()=>{
        this.addItem(this.state.itemName, this.state.itemDescription)
        }}
        >
          <Text
          style={{alignSelf: 'center',
          textAlign: 'center',
          alignContent: 'center',
          color: 'white',
          fontSize: 20,
          margin:3,
          color: 'black',
          fontWeight: 'bold'
        }}
          >
           Add Item
          </Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
   
      </View>
    );
    }
  
  }
  
  const styles = StyleSheet.create({
    keyboardStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    Textinput:{
     height : 38,
     fontSize: 28,
     width: 300,
     alignSelf: "center",
     textAlign: "center",
     margin: 10,
     borderWidth: 2.5 
   },
   Textinput2:{
    height : 38,
    fontSize: 28,
    width: 300,
    height: 300,
    alignSelf: "center",
    textAlign: "center",
    margin: 10,
    borderWidth: 2.5 
   }
   });
