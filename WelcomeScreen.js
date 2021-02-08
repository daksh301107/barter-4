import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Modal,
    ScrollView, KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {Header, Icon} from 'react-native-elements';

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: 'false',
            FirstName: '',
            LastName: '', 
            Address: '',
            MobileNumber: '',
            ConfirmPassword: ''
        }
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
           this.props.navigation.navigate('HomeScreen')
        })
        .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
        })
    }

    userSignUp = (emailId, password, ConfirmPassword)=>{
        if(password !== ConfirmPassword){
            return Alert.alert("Password Doesn't Match\nCheck your password")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('Users').add({
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                MobileNumber: this.state.MobileNumber,
                emailId: this.state.emailId,
                Address: this.state.Address
            })
            return Alert.alert("User Added Successfully", '',
            [{text:'OK',onPress:()=>this.setState({"isModalVisible": false})},])
        })
        .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
        })
    }
}

    showModal = ()=>{
        return(
            <Modal 
            animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
            <View style={styles.modal}>
            <ScrollView style={{width: '100%'}}>
            <KeyboardAvoidingView style = {{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.textModal}>Registration</Text>
            <TextInput
            style={styles.Textinput2}
            placeholder = "First Name"
            onChangeText = {(text)=>{
                this.setState({FirstName: text})
            }}
            ></TextInput>
            <TextInput
            style={styles.Textinput2}
            placeholder = "Last Name"
            onChangeText = {(text)=>{
                this.setState({LastName: text})
            }}
            ></TextInput>
            <TextInput
            style={styles.Textinput2}
            placeholder = "Contact"
            maxLength = {10}
            keyboardType = {'numeric'}
            onChangeText = {(text)=>{
                this.setState({MobileNumber: text})
            }}
            ></TextInput>
            <TextInput
            style={{ borderColor: "white",
            height : 60,
            fontSize: 26,
            width: 300,
            alignSelf: "center",
            textAlign: "center",
            margin: 10,
            borderWidth: 2.5 ,
            backgroundColor: 'white'}}
            placeholder = "Address"
            multiline = {true}
            onChangeText = {(text)=>{
                this.setState({Address: text})
            }}
            ></TextInput>
            <TextInput
            style={styles.Textinput2}
            placeholder = "Email Address"
            keyboardType = {"email-address"}
            onChangeText = {(text)=>{
                this.setState({emailId: text})
            }}
            ></TextInput>
            <TextInput
            style={styles.Textinput2}
            placeholder = "Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({password: text})
            }}
            ></TextInput>
            <TextInput
            style={styles.Textinput2}
            placeholder = "Confirm Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({ConfirmPassword: text})
            }}
            ></TextInput>
            <View>
            <TouchableOpacity
            onPress = {()=>this.userSignUp(this.state.emailId, this.state.password, this.state.ConfirmPassword)}
            >
              <Text style={styles.textModal}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity
            onPress = {()=>this.setState({"isModalVisible": false})}
            >
            <Text style={styles.textModal}>Cancel</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </Modal>
        )
    }


  render(){
  return (
    <View>
     <View style={{justifyContent: 'center', alignItems: 'center'}}>
</View>
{this.showModal()}
    <View>
    <Header 
    centerComponent = {{text: 'Welcome Back User Of Barter App!', style: {color: '#6a7172', fontSize: 30, fontWeight: "bold"}}}
    backgroundColor = "#6dfcff"
    />

    </View>
    <View>
        <TextInput
        style={styles.Textinput}
        placeholder = "Email ID"
        keyboardType = 'email-address'
        onChangeText = {(text)=>{
            this.setState({emailId : text})
        }}
        /> 
        <TextInput
         style={styles.Textinput}
        secureTextEntry = {true}
        placeholder = "Password"
        onChangeText = {(text)=>{
            this.setState({password : text})
        }}
        /> 

        <TouchableOpacity
        style={styles.button}
        onPress = {()=>{
            this.userLogin(this.state.emailId, this.state.password)
        }}
        >
        <Text style = {styles.buttonText}>Login</Text>

        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress = {()=>this.setState({isModalVisible: true})}
        >
        <Text style = {styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
  }

}

const styles = StyleSheet.create({
 Textinput:{
     height : 38,
     fontSize: 28,
     width: 300,
     alignSelf: "center",
     textAlign: "center",
     margin: 10,
     borderWidth: 2.5 
 },
 title:{
     textAlign: "center",
     fontSize: 40,
     backgroundColor: "#4630eb",
     margin: 20
 },
 button:{
    margin: 20,
    backgroundColor: '#9212e8',
    width: 80,
    height: 60,
    alignSelf: 'center'
},
buttonText:{
alignSelf: 'center',
textAlign: 'center',
alignContent: 'center',
color: 'white',
fontSize: 20,
margin:3
},
modal:{
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    backgroundColor: 'black'
},
Textinput2:{
    borderColor: "white",
    height : 38,
    fontSize: 26,
    width: 300,
    alignSelf: "center",
    textAlign: "center",
    margin: 10,
    borderWidth: 2.5 ,
    backgroundColor: 'white'
},
textModal:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
}
});

