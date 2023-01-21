import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const primaryColor= "blue";
const secondaryColor="";
const primaryBackgroundColor="white";
const secondBackgroundaryColor="";
const primaryTextColor = "white";
const primaryIconColor = "blue";

const url = "https://www.boredapi.com/api/activity/";
export default function App() {
  const [activity,setActivity] = useState({});


  const boredApiActivity = async () => {
    const response = await fetch(url);
    setActivity(await response.json())
  }
  //.json() https://www.boredresponse

  useEffect(()=>{
    boredApiActivity()
  },[])
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.activityTitle}>{activity.activity}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={boredApiActivity}>
        <FontAwesome5 name="redo" size={30} color={primaryIconColor} />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    backgroundColor: primaryColor,
    width: "100%",
    height: "75%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle:{
    fontSize:50,
    fontWeight:"bold",
    color:primaryTextColor,
    fontStyle: "italic",
    marginVertical: 5
  },
  btn:{
    margin: 10,
    height:60,
    width:60,
    borderRadius:50,
    backgroundColor: primaryBackgroundColor,
    alignItems:"center",
    justifyContent:"center",
    borderColor: primaryIconColor,
    borderWidth:1,
  }
});
