import React, { useContext, useRef, useState } from 'react'
import MyContext from './MyContext';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Web = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dates, setDates] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [venu, setVenu] = useState();
  const [url, setUrl] = useState();
  const [hoteladdress, setHoteladdress] = useState();
  const [about, setAbout] = useState();
  const [aboutshort, setAboutshort] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [banner, setBanner] = useState();
  const [logo, setLogo] = useState(null);
  const [token, setToken] = useState();

  const { Logo_path, setLogo_path } = useContext(MyContext);

  const name1 = useRef();
  const email1 = useRef();
  const phone1 = useRef();
  const dates1 = useRef();
  const month1 = useRef();
  const year1 = useRef();
  const venu1 = useRef();
  const url1 = useRef();
  const hoteladdress1 = useRef();
  const about1 = useRef();
  const aboutshort1 = useRef();
  const latitude1 = useRef();
  const longitude1 = useRef();
  const banner1 = useRef();
  const logo1 = useRef();
  const token1 = useRef();

  const handleCreate = () => {
    console.log("create conference");
    console.log(email, name, phone, dates, month, year, venu, url, hoteladdress, about, aboutshort,latitude, longitude, token, banner, logo);
    }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{ paddingHorizontal: 20, flex: 1, paddingVertical: 20, backgroundColor: "#fff", width: "50%" }}>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference name' clearTextOnFocus={false} defaultValue={name} onChangeText={name => setName(name)} ref={name1} />

        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference year' clearTextOnFocus={false}
            defaultValue={year} onChangeText={year => setYear(year)} ref={year1} />

        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference email' clearTextOnFocus={false}
            defaultValue={email} onChangeText={email => setEmail(email)} ref={email1} />

        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference phone' clearTextOnFocus={false}
            defaultValue={phone} onChangeText={phone => setPhone(phone)} ref={phone1} />

        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference URL' clearTextOnFocus={true} defaultValue={url} onChangeText={url => setUrl(url)} ref={url1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference venu' clearTextOnFocus={true} defaultValue={venu} onChangeText={venu => setVenu(venu)} ref={venu1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference month' clearTextOnFocus={true} defaultValue={month} onChangeText={month => setMonth(month)} ref={month1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder="Type conference date's" clearTextOnFocus={true} defaultValue={dates} onChangeText={dates => setDates(dates)} ref={dates1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference hottel address' clearTextOnFocus={true} defaultValue={hoteladdress} onChangeText={hoteladdress => setHoteladdress(hoteladdress)} ref={hoteladdress1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference about' clearTextOnFocus={true} defaultValue={about} onChangeText={about => setAbout(about)} ref={about1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference about in short' clearTextOnFocus={true} defaultValue={aboutshort} onChangeText={aboutshort => setAboutshort(aboutshort)} ref={aboutshort1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference latitude' clearTextOnFocus={true} defaultValue={latitude} onChangeText={latitude => setLatitude(latitude)} ref={latitude1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference longitude' clearTextOnFocus={true} defaultValue={longitude} onChangeText={longitude => setLongitude(longitude)} ref={longitude1} />
        </View>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Category Type' clearTextOnFocus={true} defaultValue={token} onChangeText={token => setToken(token)} ref={token1} />
        </View>
        <View style={{ marginTop: 25, marginBottom: 40 }}>
          <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleCreate}>
            <Text style={{ color: "#fff", textAlign: "center" }}> Create </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Web


const styles = StyleSheet.create({
  inputbox: {
    borderWidth: 1,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    flex: 1,
  },
  firsttext: {
    fontSize: 20,
    marginVertical: 20,
    marginBottom: 40
    // color: "#838488"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    // width: "60%"
    flex: 5
  },
  forgetpassword: {
    color: "#ff6500",
    textAlign: "right",
    marginVertical: 20
  },
  container: {
    flexDirection: 'row',
    alignItems: "center"
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#bcbaba',
    marginHorizontal: 15
  },
  logos: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderColor: "#e1e1e3",

  }
})