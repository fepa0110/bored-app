import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const primaryColor = "blue";
const secondaryColor = "";
const primaryBackgroundColor = "white";
const secondBackgroundaryColor = "";
const primaryTextColor = "white";
const primaryIconColor = "blue";

const translateApi = "https://api.mymemory.translated.net/get?q=";
//example translate api 
//"https://api.mymemory.translated.net/get?q={text}!&langpair={fromLanguaje}|{toLanguaje}"
const boredApi = "https://www.boredapi.com/api/activity/";
export default function App() {
  const [activity, setActivity] = useState({});

  const fetchActivity = async () => {
    const response = await fetch(boredApi);
    const activity = await response.json();
    const translatedActivity = await traslateActivity(activity.activity);
    activity.activity = translatedActivity;
    setActivity(activity);
  };

  const traslateActivity = async (text) => {
    const response = await fetch(translateApi + text + "&langpair=en|es");
    const tranlator = await response.json();
    return tranlator.responseData.translatedText;
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.activityTitle}>{activity.activity}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={fetchActivity}>
        <FontAwesome5 name="redo" size={30} color={primaryIconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 10,
    backgroundColor: primaryColor,
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: primaryTextColor,
    fontStyle: "italic",
    marginVertical: 5,
  },
  btn: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: primaryBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderColor: primaryIconColor,
    borderWidth: 1,
  },
});
