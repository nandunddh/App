import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MyContext from '../MyContext';
import Animated from 'react-native-reanimated';

const Notification = ({ route }) => {
  useEffect(() => {
    console.log("notificationDesc", notificationDesc)
  }, [notificationDesc]);

  const notification_image = require("../assets/emptyNotification.jpg");

  const { isNotification, setIsNotification, notificationDesc } = useContext(MyContext);

  // const [notificationDesc, setNotificationDesc] = useState([
  //   {
  //     name: "NextGen Solar(SUN-2023)",
  //     text: "Hello notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "Notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "FCT-2023",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "NextGen Solar(SUN-2023)",
  //     text: "Hello notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "Notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "FCT-2023",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "NextGen Solar(SUN-2023)",
  //     text: "Hello notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "Notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "FCT-2023",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "NextGen Solar(SUN-2023)",
  //     text: "Hello notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "Notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "FCT-2023",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "NextGen Solar(SUN-2023)",
  //     text: "Hello notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "Notification test!!!",
  //     image: require("../../assets/favicon.png")
  //   },
  //   {
  //     name: "FCT-2023",
  //     text: "FCT-2023",
  //     image: require("../../assets/favicon.png")
  //   },
  // ])
  return (
    <SafeAreaProvider>
      {isNotification ?
        <Animated.ScrollView>
          <View>
            {notificationDesc && notificationDesc.slice(0)
              .reverse().map((notificationDesc, index) => {
                return (
                  <View style={styles.notificationcontainer} key={index - 1}>
                    <View style={{ width: "18%", }}>
                      <Image source={notificationDesc.image} />
                    </View>
                    <View style={{ width: "60%", }}>
                      <Text style={{ fontWeight: "600", fontSize: 17 }}>{notificationDesc.name} {"\n"}<Text style={{ paddingLeft: 10, fontWeight: "normal", fontSize: 15 }}>{notificationDesc.text}</Text>
                      </Text>
                    </View>
                    <View style={{ width: "22%", paddingHorizontal: 1 }}>
                      {/* <Text>10 53 pm</Text> */}
                      <Text>{notificationDesc.time}</Text>
                      <Text>10/10/2023</Text>
                    </View>
                  </View>
                )
              })}
          </View>
        </Animated.ScrollView>
        :
        <View style={styles.container}>
          <View style={styles.imageConatiner}>
            <Image source={notification_image} />
          </View>
          <View style={styles.emptyNotification}>
            <Text style={styles.emptyNotificationText}>Ups! There is no notification</Text>
          </View>
        </View>
      }
    </SafeAreaProvider>
  )
}

export default Notification


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  imageConatiner: {
    alignItems: "center"
    ,
  },
  emptyNotification: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyNotificationText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  notificationcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    borderRadius: 25
    // width: 300,
    // justifyContent: "space-between",
  }
})