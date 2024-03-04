import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import MyContext from '../MyContext';
import { DB_URL } from './Constants/Constants';


const CurrentConferences = () => {
  const { ConferenceData } = useContext(MyContext);

  const HandleUrl = ({ item }) => {
    const handpleRegister = () => {
      // const url = `${item.url}`;
      const url = "https://catalysis.unitedscientificgroup.org/registration_form";
      Linking.openURL(url);
    }
    const handpleAbstract = () => {
      // const url = `${item.abstracturl}`;
      const url = "https://catalysis.unitedscientificgroup.org/abstract_submission";
      Linking.openURL(url);
    }
    const handpleProgram = () => {
      // const url = `${item.programurl}`;
      const url = "https://catalysis.unitedscientificgroup.org/pdfs/CCE-Program-2024.pdf";
      Linking.openURL(url);
    }
    const imageUrl = `${DB_URL}uploads/banners/${item.banner}`;
    if (item.token == "live" || item.token == "upcoming") {


      return (
        <View style={{ borderWidth: 10, borderColor: "#fff", borderRadius: 15, backgroundColor: "#fff", marginVertical: 10, }}>
          <Image source={{ uri: imageUrl }} style={{ borderRadius: 15, width: "100%", height: 230 }} />
          <View style={{ paddingHorizontal: 10, borderColor: "#000", flex: 1, }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{item.name}</Text>
            <Text style={{ fontSize: 15, fontWeight: "600", textAlign: 'center', color: "#f66b10" }}>{item.title}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 12 }}>
              <Fontisto name="date" size={16} color="#f66b10" />
              <Text style={{ fontSize: 12, fontWeight: "600", marginHorizontal: 10, }}>{item.dates} {item.month}, {item.year}</Text>
              <EvilIcons name="location" size={18} color="#f66b10" />
              <Text style={{ fontSize: 12, fontWeight: "600" }}>{item.venu}</Text>
            </View>
          </View>
          <View>
            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 10 }}>
              <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 12, paddingHorizontal: 20 }} onPress={handpleRegister}>
                <Text style={{ color: "#fff", textAlign: "center" }}> Register Now </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 12, paddingHorizontal: 10 }} onPress={handpleAbstract}>
                <Text style={{ color: "#fff", textAlign: "center" }}> Submit Abstract </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {item.programurl ?
              <TouchableOpacity onPress={handpleProgram}>
                <Text style={{ color: "#fff", textAlign: "center", backgroundColor: "#f66b10", paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10, }}> Program 2023</Text>
              </TouchableOpacity>
              :
              <></>
            }
          </View>
        </View>
      )
    }
  }
  return (
    <SafeAreaProvider style={styles.container}>
      <View>
        <FlatList
          data={ConferenceData}
          renderItem={({ item }) =>
            <HandleUrl item={item} />
          }
          // horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaProvider>
  )
}

export default CurrentConferences


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})