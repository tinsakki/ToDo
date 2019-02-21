import React from 'react';
import {FlatList, AsyncStorage,StyleSheet, Text, View,TextInput,KeyboardAvoidingView,Dimensions,ScrollView,Alert,TouchableOpacity,Button,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
var {height, width} = Dimensions.get('window');
var d = new Date();
export default class App extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            noteList: [],
            noteText: ''
            
        }
    }
    
    addItems(){
        var a = this.state.noteText;
        this.state.noteList.push(a)
        this.setState({
            noteText:''
        })
        console.log(this.state.noteList)
            }
    
    removeItem(key) {
        var b = this.state.noteList.filter((i,j)=>{
            return j!=key
        })

        this.setState({ noteList:b })
        }

    saveData(){
        var a = this.state.noteList
        AsyncStorage.setItem('result',a)
        alert(a
        )

    }
    
  render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.header}>
            <Text style={{fontSize: 20}}>NOTER</Text>
        </View>

        <View style={styles.body}>
        {/* <FlatList
          data={[
            this.state.noteList
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        /> */}
            <ScrollView>

                {this.state.noteList.map(function(value,key){
                return(
                    <View key={key} style={styles.bodyElements} > 
                        <Text>{value}</Text>
                        <Text>{d.toDateString()}</Text>
                        <Icon name="cross"  
                        onPress={() => this.removeItem(key)} 

                        color="black"
                        size={40}/>
                    </View>
                )  
                },this)}
            </ScrollView>
        </View>


        <View style={styles.footer}>
            <TextInput style={{marginTop:10,marginLeft:10}}
            placeholder="Jot down your thoughts before they vanish :)"
            width={width/1.2}
            underlineColorAndroid="transparent"
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
        />
        <Icon style={{marginTop:15}} name="add-to-list" color="white" size={40} onPress={this.addItems.bind(this)}/>
        </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    backgroundColor:'#ff6666',
    justifyContent:'center',
    alignItems:'center'
  },

  body: {
    flex: 8,
    backgroundColor:'#d3cfcf',
    
  },

  footer: {
    flex: 1,
    backgroundColor:'#312222',    
    flexDirection:'row',
    justifyContent:'space-between',
    
  },

  bodyElements:{
      backgroundColor:'green',
      height:40,
      marginTop:2,
      flexDirection:'row',
      justifyContent:'space-between',
  }
});
