import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import MyContext from '../MyContext';

const EditProfile = () => {
  const { user_name } = useContext(MyContext);

  const notification_image = require("../assets/emptyNotification.jpg");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profile_container}>

          <Image source={notification_image} style={styles.profile_image} />
          {user_name ?
            <Text>{user_name}</Text>
            :
            <Text style={styles.profile_name}>P.NanduKumar Goud</Text>
          }
        </View>
      </View>
    </>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  profile_container: {
    alignItems: "center",
    paddingVertical: 30,
    // backgroundColor: "#373a43",
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    // borderTopRightRadius: 35,
    // borderTopLeftRadius: 35,
  },
  profile_image: {
    height: 150,
    width: 150,
    marginBottom: 15,
    // borderColor: "#000",
    // borderWidth: 2
  },
  profile_name: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff"
  },
})