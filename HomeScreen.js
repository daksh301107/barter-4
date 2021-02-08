import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedItemList: []
    }
    this.requestRef = null
  }

  getRequestedItemList= ()=>{
    this.requestRef = db.collection("Exchange").onSnapshot((snapshot)=>{
      var requestedItemList = snapshot.docs.map((doc)=>doc.data());
      this.setState({
        requestedItemList: requestedItemList
      })
    })
  }
  
  componentDidMount(){
    this.getRequestedItemList()
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item,index)=> index.toString()
  renderItem = ({item,i})=>{
    return(
      <ListItem
        key = {i}
        title = {item.itemName}
        subtitle = {item.itemDescription}
        titleStyle = {{color: 'black', fontWeight: 'bold'}}
        rightElement = {
          <TouchableOpacity>
            <Text>
              Exchange
            </Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }
  render(){
  return (
  <View>
      <MyHeader title = "Home Screen" navigation = {this.props.navigation} />

    {
      this.state.requestedItemList.length === 0
    ? (
     <View><Text>List Of All Requested Items</Text></View>
    )
    : (
      <FlatList
      keyExtractor = {this.keyExtractor}
      data = {this.state.requestedItemList}
      renderItem = {this.renderItem}
      />
    )
    }
    </View>
  );
  }

}
 
const styles = StyleSheet.create({
 
});
