import { View, Text, ScrollView, TextInput, LogBox } from 'react-native'
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ImagePick from './ImagePick';
import { DB_URL } from './Constants/Constants';

LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated']);

const EditScreen = ({ route }) => {
  const data = route.params.data;
  console.log("first", route);

  const [image, setImage] = useState(null);
  const [old_path, setold_path] = useState(route.params.profile);
  const [profile_path, setProfile_path] = useState(route.params.profile);

  const [name, setName] = useState(data.name);
  const [title, setTitle] = useState(data.title);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phoneno);
  const [dates, setDates] = useState(data.dates);
  const [month, setMonth] = useState(data.month);
  const [year, setYear] = useState(data.year);
  const [venu, setVenu] = useState(data.venu);
  const [url, setUrl] = useState(data.url);
  const [hoteladdress, setHoteladdress] = useState(data.hoteladdress);
  const [about, setAbout] = useState(data.about);
  const [aboutshort, setAboutshort] = useState(data.aboutshort);
  const [latitude, setLatitude] = useState(data.latitude);
  const [longitude, setLongitude] = useState(data.longitude);
  const [banner, setBanner] = useState(data.banner);
  const [logo, setLogo] = useState(data.logo);
  const [token, setToken] = useState(data.token);
  const name1 = useRef();
  const title1 = useRef();
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

  const handleCreate = async () => {
    if ((name !== data.name) || (email !== data.email) || (title !== data.title) || (phone !== data.phone) || (dates !== data.dates) || (month !== data.month) || (year !== data.year) || (venu !== data.venu) || (url !== data.url) || (hoteladdress !== data.hoteladdress) || (about !== data.about) || (aboutshort !== data.aboutshort) || (latitude !== data.latitude) || (banner !== data.banner) || (logo !== data.logo) || (token !== data.token) || (name !== data.name) || (longitude !== data.longitude)) {

      if (name.length === 0) {
        alert("Name can not be empty");
        name1.current.focus();
        return;
      } else if (email.length === 0) {
        alert("Email can not be empty");
        email1.current.focus();
        return;
      } else if (title.length === 0) {
        alert("Title can not be empty");
        title1.current.focus();
        return;
      } else if (year.length === 0) {
        alert("Year can not be empty");
        year1.current.focus();
        return;
      } else if (phone.length === 0) {
        alert("Phone can not be empty");
        phone1.current.focus();
        return;
      } else if (url.length === 0) {
        alert("URL can not be empty");
        url1.current.focus();
        return;
      } else if (venu.length === 0) {
        alert("Venu can not be empty");
        venu1.current.focus();
        return;
      } else if (month.length === 0) {
        alert("Month can not be empty");
        month1.current.focus();
        return;
      } else if (dates.length === 0) {
        alert("Dates can not be empty");
        dates1.current.focus();
        return;
      } else if (hoteladdress.length === 0) {
        alert("Hoteladdress can not be empty");
        hoteladdress1.current.focus();
      } else if (aboutshort.length === 0) {
        alert("aboutshort can not be empty");
        aboutshort1.current.focus();
        return;
      } else if (about.length === 0) {
        alert("about can not be empty");
        about1.current.focus();
      } else if (latitude.length === 0) {
        alert("latitude can not be empty");
        latitude1.current.focus();
        return;
      } else if (longitude.length === 0) {
        alert("longitude can not be empty");
        longitude1.current.focus();
        return;
      } else if (token.length === 0) {
        alert("token can not be empty");
        token1.current.focus();
        return;
      }
      try {
        var APIURL = `${DB_URL}CreateConference.php`;

        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        // uploadImage()

        var Data = {
          Name: name,
          Title: title,
          Email: email,
          PhoneNumber: phone,
          Dates: dates,
          Month: month,
          Year: year,
          Venu: venu,
          Url: url,
          Hoteladdress: hoteladdress,
          About: about,
          Aboutshort: aboutshort,
          Latitude: latitude,
          Longitude: longitude,
          Token: token,
          Logo: Logo_path,
          // Banner : ;
        };

        fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        })
          .then((Response) => Response.json())
          .then((Response) => {
            // console.log("Login ===", Response);
            if (Response[0].Message == "Success") {
              alert(Response[0].Message);
              console.log("Created =============", Response)
            }
            else {
              alert(Response[0].Message);
              console.log(Response);
            }
          })
          .catch((error) => {
            console.error("ERROR FOUND " + error);
          })
        console.log("data from js ==", Data);
      } catch (error) {
        alert("Fetch Error!")
      }
    }
    else {
      alert("No Change Found!");
    }
  }

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 20, flex: 1, paddingVertical: 20, backgroundColor: "#fff" }}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Name </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference name' clearTextOnFocus={false} defaultValue={name} onChangeText={name => setName(name)} ref={name1} />

        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Title </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference name' clearTextOnFocus={false} defaultValue={title} onChangeText={title => setTitle(title)} ref={title1} />

        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> year </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference year' clearTextOnFocus={false}
            defaultValue={year} onChangeText={year => setYear(year)} ref={year1} />

        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Email </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference email' clearTextOnFocus={false}
            defaultValue={email} onChangeText={email => setEmail(email)} ref={email1} />

        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Phone </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference phone' clearTextOnFocus={false}
            defaultValue={phone} onChangeText={phone => setPhone(phone)} ref={phone1} />

        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> URL </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference URL' clearTextOnFocus={true} defaultValue={url} onChangeText={url => setUrl(url)} ref={url1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Venu </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference venu' clearTextOnFocus={true} defaultValue={venu} onChangeText={venu => setVenu(venu)} ref={venu1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Month </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference month' clearTextOnFocus={true} defaultValue={month} onChangeText={month => setMonth(month)} ref={month1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Dates </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder="Type conference date's" clearTextOnFocus={true} defaultValue={dates} onChangeText={dates => setDates(dates)} ref={dates1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Hoteladdress </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference hottel address' clearTextOnFocus={true} defaultValue={hoteladdress} onChangeText={hoteladdress => setHoteladdress(hoteladdress)} ref={hoteladdress1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> About </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference about' clearTextOnFocus={true} defaultValue={about} onChangeText={about => setAbout(about)} ref={about1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Aboutshort </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference about in short' clearTextOnFocus={true} defaultValue={aboutshort} onChangeText={aboutshort => setAboutshort(aboutshort)} ref={aboutshort1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Latitude </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference latitude' clearTextOnFocus={true} defaultValue={latitude} onChangeText={latitude => setLatitude(latitude)} ref={latitude1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Longitude </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Type conference longitude' clearTextOnFocus={true} defaultValue={longitude} onChangeText={longitude => setLongitude(longitude)} ref={longitude1} />
        </View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}> Token </Text>
        <View style={styles.inputbox}>
          <TextInput style={styles.textinput} placeholder='Category Type' clearTextOnFocus={true} defaultValue={token} onChangeText={token => setToken(token)} ref={token1} />
        </View>
        <ImagePick />
        <View style={{ marginTop: 25, marginBottom: 40 }}>
          <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleCreate}>
            <Text style={{ color: "#fff", textAlign: "center" }}> Create </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default EditScreen



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
    paddingVertical: 10,
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