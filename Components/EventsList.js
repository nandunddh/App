import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Animated } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import MyContext from '../MyContext';
import { DB_URL } from './Constants/Constants';


const EventsList = ({ navigation }) => {

  const { ConferenceData, setConferenceData } = useContext(MyContext);
  
  const handleupcomingconferencelist = async () => {
    try {
      const APIURL = `${DB_URL}GetConferenceDetails.php`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(APIURL, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.text(); // Get the response as text

      if (responseData) {
        try {
          const parsedData = JSON.parse(responseData); // Parse the response
          if (parsedData[0].Message === "Success") {
            setConferenceData(parsedData[0].data);
          } else {
            setConferenceData(null);
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
          alert("Error parsing response data");
        }
      } else {
        console.error("Empty response from server");
        // Handle empty response here
      }
    } catch (error) {
      console.error("Error fetching conference data:", error);
      setConferenceData(null);
    }
  };

  return (
    <Animated.ScrollView style={{ backgroundColor: "#f4f5f6" }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleupcomingconferencelist}>
            <Ionicons name="refresh" size={30} color="white" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Ionicons name="add-circle-outline" size={30} color="white" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ backgroundColor: "#fff", padding: 10, borderTopLeftRadius: 20, borderTopEndRadius: 20, flex: 1, flexDirection: "row", }}>
            <View style={{ width: "20%", marginEnd: 10, alignItems: "center", borderRightWidth: 2, }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Logo</Text>
            </View>
            <View style={{ width: "30%", marginEnd: 10, borderRightWidth: 2, alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
            </View>
            <View style={{ width: "30%", alignItems: "center", borderRightWidth: 2, }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", }}>Status</Text>
            </View>
            <View style={{ width: "18%", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", alignItems: "center" }}>Action</Text>
            </View>
          </View>
          {ConferenceData ?
            <View style={{ borderBottomLeftRadius: 20, borderBottomEndRadius: 20, flex: 1, marginVertical: 20 }}>
              {ConferenceData[0] && ConferenceData.map((conference, index) => {
                const Logo = `${DB_URL}uploads/logos/${conference.logo}`;
                return (
                  <View key={index} style={{ flexDirection: "row", marginBottom: 10, backgroundColor: "#fff", padding: 10, }}>
                    <View style={{ width: "15%", marginEnd: 10, justifyContent: "center" }}>
                      {conference.logo ? (
                        <Image
                          source={{ uri: Logo }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                          }}
                        />
                      ) : (
                        <Text style={{ alignSelf: "center", color: "red" }}>No Logo</Text>
                      )}
                    </View>
                    <View style={{ width: "30%", marginEnd: 10, alignItems: "center", justifyContent: "center" }}>
                      <Text>{conference.name}</Text>
                    </View>
                    <View style={{ width: "30%", alignItems: "center", justifyContent: "center", }}>
                      {conference.token == "live" &&
                        <Text style={{ backgroundColor: "green", color: "#fff", paddingVertical: 5, borderRadius: 30, paddingHorizontal: 20, fontSize: 16 }}>{conference.token}</Text>
                      }
                      {conference.token == "upcoming" &&
                        <Text style={{ backgroundColor: "#0d6efd", color: "#fff", paddingVertical: 5, borderRadius: 30, fontSize: 16, paddingHorizontal: 5 }}>{conference.token}</Text>
                      }
                      {conference.token == "completed" &&
                        <Text style={{ backgroundColor: "#dc3545", color: "#fff", paddingVertical: 5, borderRadius: 30, fontSize: 16, paddingHorizontal: 5 }}>{conference.token}</Text>
                      }
                      {conference.token == "next" &&
                        <Text style={{ backgroundColor: "#6c757d", color: "#fff", paddingVertical: 5, borderRadius: 30, fontSize: 16, paddingHorizontal: 15 }}>{conference.token}</Text>
                      }
                    </View>
                    <View style={{ width: "25%", alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
                      <TouchableOpacity onPress={() => navigation.navigate("EditScreen", {data : conference})}>
                        <Feather name="edit" size={30} color={"#ffc107"} style={{ alignSelf: "center" }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </View>
            :
            <View style={{ backgroundColor: "#fff", padding: 10, borderBottomLeftRadius: 20, borderBottomEndRadius: 20, flex: 1, flexDirection: "row", marginVertical: 20, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, }}>No Data Found</Text>
            </View>
          }
        </View>
      </View>
    </Animated.ScrollView>
  )
}

export default EventsList


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    marginVertical: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  buttonPrimary: {
    backgroundColor: "#142764",
    paddingVertical: 10,
    margin: 5,
    borderRadius: 100
  },
  textWhite: {
    color: "#fff",
  },
  Success: {
    backgroundColor: "green"
  },
  warning: {
    backgroundColor: "yellow"
  }
})