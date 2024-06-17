import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  LogBox,
  FlatList
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "./MyContext";
import { useNavigation } from "@react-navigation/native";
// Icons
import { Fontisto } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { DB_URL } from "./Components/Constants/Constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { vw } from "react-native-viewport-units";


LogBox.ignoreLogs([
  "Possible unhandled promise rejection (id: 1): Error: Unable to open URL: mailto:contact@unitedscientificgroup.net"
]);

const { width } = Dimensions.get("window");

const Home = () => {
  const listReference = useRef();
  const [month, setMonth] = useState("All");
  const [activeIndex, setAtiveIndex] = useState(0);
  const { ConferenceData } = useContext(MyContext);
  const filteredConferences = ConferenceData.filter(
    conference => conference.token === "live"
  );
  const seenMonths = new Set();
  const navigation = useNavigation();

  // useEffect(() => {
  //   setInterval(() => {
  //     if (activeIndex === 0) {
  //       setAtiveIndex(activeIndex + 1);
  //       listReference.current.scrollToIndex({
  //         index: activeIndex,
  //         animation: false,
  //       });
  //     } else if (activeIndex === filteredConferences.length - 1) {
  //       setAtiveIndex(0);
  //       listReference.current.scrollToIndex({
  //         index: activeIndex,
  //         animation: false,
  //       });
  //     }
  //   }, 5000);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAtiveIndex((prevIndex) => {
  //       if (prevIndex === filteredConferences.length - 1) {
  //         listReference.current.scrollToIndex({
  //           index: 0,
  //           animation: true,
  //         });
  //         return 0;
  //       } else {
  //         listReference.current.scrollToIndex({
  //           index: prevIndex + 1,
  //           animation: true,
  //         });
  //         return prevIndex + 1;
  //       }
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval); // Cleanup the interval on component unmount
  // }, [filteredConferences.length, activeIndex]);
  useEffect(
    () => {
      if (filteredConferences.length > 0) {
        const interval = setInterval(() => {
          setAtiveIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % filteredConferences.length;
            listReference.current.scrollToIndex({
              index: newIndex,
              animation: true
            });
            return newIndex;
          });
        }, 5000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
      }
    },
    [filteredConferences.length, activeIndex]
  );

  const handpleUrlPress = ({ conference }) => {
    // navigation.navigate("Display Pdf", {pdf_url: conference.name});
    const imageUrl = `${DB_URL}uploads/banners/${conference.banner}`;
    // const screenname = "Display Pdf";
    const screenname = "Conference screen";
    const url = `${screenname}`;
    try {
      navigation.navigate(url, {
        name: conference.name,
        title: conference.title,
        dates: conference.dates,
        month: conference.month,
        year: conference.year,
        price: conference.price,
        venu: conference.venu,
        url: conference.url,
        image: imageUrl,
        about: conference.about,
        aboutshort: conference.aboutshort,
        hotelAddress: conference.hotelAddress,
        url: conference.url,
        latitude: conference.latitude,
        longitude: conference.longitude,
        pdf_url: conference.pdf_url
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const UpComingConferences = ({ conference }) => {
    if (!conference) {
      return null;
    }
    if (conference.token == "upcoming") {
      const imageUrl = `${DB_URL}uploads/logos/${conference.logo}`;
      // console.log("Banner", imageUrl);

      return (
        <View style={styles.notificationcontainer}>
          <View style={{ flexDirection: "row", flex: 3 }}>
            <View
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                textAlign: "left",
                flex: 1
              }}
            >
              {conference.logo
                ? <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
                : <Text>No Logo</Text>}
            </View>
            <View style={{ flex: 3 }}>
              <Text style={{ fontWeight: "600", fontSize: 17 }}>
                {conference.name} {"\n"}
                <View>
                  <Text
                    style={{ fontWeight: "normal", fontSize: 13, marginTop: 4 }}
                  >
                    {conference.month} {conference.dates}, {conference.year}
                    <Text
                      style={{
                        color: "#f66b10",
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}|{" "}
                    </Text>
                  </Text>
                  <Text>
                    {conference.venu}
                  </Text>
                </View>
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "end",
              borderLeftWidth: 1,
              paddingLeft: 5,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                marginBottom: 5,
                fontWeight: "bold",
                color: "#f66b10",
                fontSize: 14
              }}
            >
              From ${conference.price}
            </Text>
            {/* <Button title="Join" onPress={() =>}/> */}
            {/* <TouchableOpacity onPress={() => alert('Button Pressed')}> */}
            <TouchableOpacity
              style={{ borderWidth: 1, borderRadius: 10 }}
              onPress={() => handpleUrlPress({ conference })}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  paddingHorizontal: 5,
                  paddingVertical: 5
                }}
              >
                Join Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <Animated.ScrollView>
      <View style={styles.center}>
        {/* Top View */}
        <View>
          {ConferenceData &&
            ConferenceData.length > 0 &&
            <View
              style={{
                backgroundColor: "#363942",
                paddingHorizontal: 25 * vw,
                flexDirection: "row",
                justifyContent: "space-between",
                height: 120 * vh,
                paddingTop: 15 * vw
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17 * vw,
                  fontWeight: "bold"
                }}
              >
                {ConferenceData[0].month} {ConferenceData[0].year} Conferences
              </Text>
              {/* <TouchableOpacity onPress={() => navigation.navigate("CurrentConferences")}>
                            <Text style={{ textAlign: "right", color: "red" }}> View all</Text>
                          </TouchableOpacity> */}
              <Text
                style={{ textAlign: "right", color: "red" }}
                onPress={() =>
                  navigation.navigate("User CurrentConference Tab")}
              >
                {" "}View all
              </Text>
            </View>}
        </View>
        {/* End Of Top View */}
        {/* Banner Section */}
        <View
          style={{
            marginTop: -60 * vw,
            flexDirection: "row",
            marginBottom: 30 * vw
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={ConferenceData.filter(
              conference => conference && conference.token === "live"
            )}
            keyExtractor={item => item.id}
            ref={listReference}
            renderItem={({ item }) => {
              const imageUrl = `${DB_URL}uploads/banners/${item.banner}`;
              return (
                <View>
                  <View style={styles.viewBox}>
                    <View
                      style={{
                        borderWidth: 10 * vw,
                        borderColor: "#fff",
                        borderRadius: 15 * vw,
                        backgroundColor: "#fff",
                        width: (width - 20),
                        alignItems: "center",
                        overflow: "hidden"
                      }}
                    >
                      {item.banner
                        ? <Image
                          source={{ uri: imageUrl }}
                          style={{
                            borderRadius: 15 * vw,
                            width: "100%",
                            aspectRatio: 236 / 153,
                            resizeMode: "cover"
                          }}
                        />
                        : <Text>No Banner</Text>}
                      <Text
                        style={{
                          fontSize: 20 * vw,
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17 * vw,
                          fontWeight: "600",
                          textAlign: "center",
                          color: "#f66b10"
                        }}
                      >
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 12 * vw,
                          justifyContent: "center"
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Fontisto name="date" size={18} color="#f66b10" />
                          <Text
                            style={{
                              fontSize: 15 * vw,
                              fontWeight: "600",
                              marginHorizontal: 10 * vw
                            }}
                          >
                            {item.month} {item.dates}, {item.year}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            textAlign: "center"
                          }}
                        >
                          <EvilIcons
                            name="location"
                            size={20}
                            color="#f66b10"
                          />
                          <Text
                            style={{
                              fontSize: 15 * vw,
                              fontWeight: "600"
                            }}
                          >
                            {item.venu}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            marginVertical: 10 * vw,
                            flexDirection: "row",
                            justifyContent: "center",
                            marginHorizontal: 10 * vw
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderRadius: 10 * vw,
                              backgroundColor: "#363942",
                              paddingVertical: 12 * vw,
                              paddingHorizontal: 20 * vw,
                            }}
                            onPress={() => {
                              handpleUrlPress({ conference: item });
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 20 * vw
                              }}
                            >
                              {" "}Register Now{" "}
                            </Text>
                          </TouchableOpacity>
                          {item.pdf_url && (item.pdf_url.length !== 0) &&
                            <TouchableOpacity
                              style={{
                                borderRadius: 10 * vw,
                                backgroundColor: "#e58027",
                                paddingVertical: 12 * vw,
                                paddingHorizontal: 20 * vw,
                                marginLeft: 20 * vw
                              }}
                              onPress={() => {
                                Linking.openURL(item.pdf_url);
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  textAlign: "center",
                                  fontSize: 20 * vw
                                }}
                              >
                                {" "}Program{" "}
                              </Text>
                            </TouchableOpacity>
                          }
                        </View>
                        <View />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>

      {/* End Of Banner Section */}
      {/* Comming COnferences */}
      <View>
        <View>
          <Text style={styles.header2}>Coming Conferences</Text>
        </View>
        {/* <View>
              {ConferenceData.map((conference, index) => (
                <UpComingConferences key={index} conference={conference} />
              ))}
            </View> */}
        <View>
          <Animated.ScrollView>
            {ConferenceData &&
              ConferenceData.filter(conference => conference.token === "upcoming")
                .length > 0
              ? ConferenceData.map((conference, index) => {
                if (conference.token == "upcoming") {
                  const imageUrl = `${DB_URL}uploads/logos/${conference.logo}`;
                  // console.log("Banner", imageUrl);

                  return (
                    <View style={styles.notificationcontainer} key={index}>
                      <View style={{ flexDirection: "row", flex: 3 }}>
                        <View
                          style={{
                            paddingLeft: 5 * vw,
                            paddingRight: 5 * vw,
                            textAlign: "left",
                            flex: 1
                          }}
                        >
                          {conference.logo
                            ? <Image
                              source={{ uri: imageUrl }}
                              resizeMode="cover"
                              style={{
                                width: 60 * vw,
                                height: 60 * vh,
                                borderRadius: 50 * vw
                              }}
                            />
                            : <Text>No Logo</Text>}
                        </View>
                        <View style={{ flex: 3 }}>
                          <Text style={{ fontWeight: "600", fontSize: 17 * vw}}>
                            {conference.name} {"\n"}
                            <View>
                              <Text
                                style={{
                                  fontWeight: "normal",
                                  fontSize: 13 * vw,
                                  marginTop: 4 * vw
                                }}
                              >
                                {conference.month} {conference.dates},{" "}
                                {conference.year}
                                <Text
                                  style={{
                                    color: "#f66b10",
                                    fontSize: 15 * vw,
                                    fontWeight: "bold"
                                  }}
                                >
                                  {" "}|{" "}
                                </Text>
                              </Text>
                              <Text>
                                {conference.venu}
                              </Text>
                            </View>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: "end",
                          borderLeftWidth: 1 ,
                          paddingLeft: 5 * vw,
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 5 * vw,
                            fontWeight: "bold",
                            color: "#f66b10",
                            fontSize: 14 * vw
                          }}
                        >
                          From ${conference.price}
                        </Text>
                        {/* <Button title="Join" onPress={() =>}/> */}
                        {/* <TouchableOpacity onPress={() => alert('Button Pressed')}> */}
                        <TouchableOpacity
                          style={{ borderWidth: 1 * vw, borderRadius: 10 * vw }}
                          onPress={() => handpleUrlPress({ conference })}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 15 * vw,
                              paddingHorizontal: 5 * vw,
                              paddingVertical: 5 * vw
                            }}
                          >
                            Join Now
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              })
              : <View style={{ justifyContent: "center", marginBottom: 10 * vw }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20 * vw,
                    fontWeight: "bold",
                    color: "#f66b10"
                  }}
                >
                  Will Be updated Soon..
                </Text>
              </View>}
          </Animated.ScrollView>
        </View>
      </View>
      {/* End Comming Conferences */}
      {/* All Conferences 2024 */}
      <View>
        <View>
          <Text style={styles.header2}>Conferences 2024</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View
                style={[
                  month == "All"
                    ? {
                      backgroundColor: "#f66b10",
                      borderRadius: 10 * vw,
                      borderColor: "#fff",
                      marginHorizontal: 10 * vw
                    }
                    : {
                      backgroundColor: "#fff",
                      borderRadius: 10 * vw,
                      borderColor: "#fff",
                      marginHorizontal: 10 * vw
                    }
                ]}
              >
                <TouchableOpacity onPress={() => setMonth("All")}>
                  <Text
                    style={[
                      month === "All"
                        ? {
                          margin: 10 * vw,
                          fontSize: 20 * vw,
                          paddingHorizontal: 15 * vw,
                          color: "#fff"
                        }
                        : {
                          margin: 10 * vw,
                          fontSize: 20 * vw,
                          paddingHorizontal: 15 * vw,
                          color: "#000"
                        }
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {ConferenceData.map((conference, index) => {
              if (conference.year == "2024") {
                if (!seenMonths.has(conference.month)) {
                  seenMonths.add(conference.month);
                  return (
                    <View
                      key={index}
                      style={[
                        conference.month == month
                          ? {
                            backgroundColor: "#f66b10",
                            borderRadius: 10 * vw,
                            borderColor: "#fff",
                            marginHorizontal: 10 * vw
                          }
                          : {
                            backgroundColor: "#fff",
                            borderRadius: 10 * vw,
                            borderColor: "#fff",
                            marginHorizontal: 10 * vw
                          }
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => setMonth(conference.month)}
                      >
                        <Text
                          style={[
                            conference.month === month
                              ? {
                                margin: 10 * vw,
                                fontSize: 20 * vw,
                                paddingHorizontal: 15 * vw,  
                                color: "#fff"
                              }
                              : {
                                margin: 10 * vw,
                                fontSize: 20 * vw,
                                paddingHorizontal: 15 * vw,
                                color: "#000"
                              }
                          ]}
                        >
                          {conference.month}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              }
            })}
          </Animated.ScrollView>
          <View style={{ marginTop: 10 * vw }}>
            {ConferenceData &&
              ConferenceData.map((conference, index) => {
                if (month == "All") {
                  if (conference.year === "2024") {
                    return (
                      <View style={styles.flatlistcontainer} key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 10 * vw
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal: 10 * vw,
                              alignItems: "center",
                              flexDirection: "column"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 17 * vw,
                                marginTop: 4 * vw
                              }}
                            >
                              {conference.month}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 17 * vw,
                                marginTop: 4 * vw,
                                color: "#f66b10"
                              }}
                            >
                              {conference.dates}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              paddingLeft: 5 * vw
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "600",
                                fontSize: 18 * vw
                              }}
                            >
                              {conference.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 16 * vw
                              }}
                            >
                              {conference.venu}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderTopWidth: 1 * vw,
                            flexDirection: "row",
                            flex: 1,
                            borderColor: "#bfbfbf"
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text style={{ fontSize: 16 * vw }}>
                              {" "}<Entypo
                                name="ticket"
                                size={18}
                                color="black"
                              />{" "}
                              From{" "}
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 18 * vw
                                }}
                              >
                                {conference.price}
                              </Text>
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              borderLeftWidth: 1 * vw,
                              paddingHorizontal: 10 * vw,
                              paddingBottom: 5 * vw,
                              borderColor: "#bfbfbf"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 16 * vw,
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#363942",
                                paddingVertical: 10 * vw,
                                marginTop: 5 * vw,
                                borderRadius: 5 * vw
                              }}
                              onPress={() => {
                                Linking.openURL(`${conference.url}`);
                              }}
                            >
                              Register Now
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                } else {
                  if (conference.year == "2024" && conference.month === month) {
                    return (
                      <View style={styles.flatlistcontainer} key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 10 * vw
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal: 10 * vw,
                              alignItems: "center",
                              flexDirection: "column"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 17 * vw,
                                marginTop: 4 * vw
                              }}
                            >
                              {conference.month}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 17 * vw,
                                marginTop: 4 * vw,
                                color: "#f66b10"
                              }}
                            >
                              {conference.dates}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              paddingLeft: 5 * vw
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "600",
                                fontSize: 18 * vw
                              }}
                            >
                              {conference.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 16 * vw
                              }}
                            >
                              {conference.venu}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderTopWidth: 1 * vw,
                            flexDirection: "row",
                            flex: 1,
                            borderColor: "#bfbfbf"
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text style={{ fontSize: 16 * vw }}>
                              {" "}<Entypo
                                name="ticket"
                                size={18}
                                color="black"
                              />{" "}
                              From{" "}
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 18 * vw
                                }}
                              >
                                {conference.price}
                              </Text>
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              borderLeftWidth: 1,
                              paddingHorizontal: 10 * vw,
                              paddingBottom: 5 * vw,
                              borderColor: "#bfbfbf"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 16 * vw,
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#363942",
                                paddingVertical: 10 * vw,
                                marginTop: 5 * vw,
                                borderRadius: 5 * vw
                              }}
                              onPress={() => {
                                Linking.openURL(`${conference.url}`);
                              }}
                            >
                              Register Now
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                }
              })}
          </View>
        </View>
      </View>
      {/* End Of All Conferences 2024 */}
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10  * vw,
          height: "100%"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20  * vw,
            fontWeight: "bold"
          }}
        >
          About USG
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image source={require("./assets/logo.png")} />
          <View style={{ marginHorizontal: 15 * vw }}>
            <Text
              style={{
                fontSize: 18 * vw,
                textAlign: "justify",
                lineHeight: 25 * vw
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                United Scientific Group (USG)
              </Text>{" "}
              is a scientific event organizer and publisher founded in 2014 in
              San Jose, CA. In 2016, it relocated to Plano, TX. USG is known for
              organizing national and international scientific conferences with
              participant numbers ranging from 50 to 350. It holds tax-exempt
              status under Section 501c3 of the Internal Revenue Service in the
              United States.
              {"\n"}
            </Text>
            <Text
              style={{
                fontSize: 1 * vw8,
                textAlign: "justify",
                lineHeight: 25 * vw
              }}
            >
              USG's primary goal is to establish scientific networking platforms
              through conferences. These platforms aim to bridge the gap between
              research and business, facilitating the translation of scientific
              discoveries and innovative ideas into practical solutions and
              products for the betterment of humanity.
              {"\n"}
            </Text>
            <Text
              style={{
                fontSize: 18 * vw,
                textAlign: "justify",
                lineHeight: 25 * vw
              }}
            >
              USG is governed by a board of directors comprising renowned
              scientists. Their dedication lies in supporting the scientific
              community by providing exceptional services in organizing
              scientific conferences and open access scientific publications.
            </Text>
          </View>
        </View>
        {/* <View style={{ marginVertical: 10, marginHorizontal: 10, backgroundColor: "green", alignItems: "stretch", flexDirection: "row"}}>
                      <View style={{ flexDirection: "row", padding: 10 }}>
                        <MaterialIcons name="keyboard-voice" size={24} color="white" />
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", paddingLeft: 5, justifyContent: "flex-end", textAlign: "right" }}>
                          CONFERENCES
                        </Text>
          
                      </View>
                      <View style={{ justifyContent: "center", flexDirection: "row", }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", justifyContent: "flex-end" }}>79</Text>
                      </View>
                    </View> */}
        <View
          style={{
            marginVertical: 10 * vw,
            marginHorizontal: 10 * vw,
            backgroundColor: "#86bc42"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10 * vw,
                justifyContent: "flex-end"
              }}
            >
              <MaterialIcons name="keyboard-voice" size={45 * vw} color="white" />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20 * vw,
                    fontWeight: "600",
                    paddingLeft: 5 * vw
                  }}
                >
                  CONFERENCES
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15 * vw,
                    paddingLeft: 5 * vw,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  By Our Experienced Team
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 * vw, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20 * vw,
                  fontWeight: "600",
                  justifyContent: "flex-end"
                }}
              >
                79
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1 * vw,
              marginHorizontal: 30 * vw,
              borderColor: "#ffffff1a"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10 * vw,
                justifyContent: "flex-end"
              }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={45 * vw}
                color="white"
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20 * vw,
                    fontWeight: "600",
                    paddingLeft: 5
                  }}
                >
                  SPEAKERS
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15 * vw,
                    paddingLeft: 5 * vw,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  Keynotes, Featured Speakers
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 * vw, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20 * vw,
                  fontWeight: "600",
                  justifyContent: "flex-end"
                }}
              >
                3547
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1 * vw,
              marginHorizontal: 30 * vw,
              borderColor: "#ffffff1a"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10 * vw,
                justifyContent: "flex-end"
              }}
            >
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={45 * vw}
                color="white"
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20 * vw,
                    fontWeight: "600",
                    paddingLeft: 5 * vw
                  }}
                >
                  PARTNERS
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15 * vw,
                    paddingLeft: 5 * vw,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  We Provides All Industry Services
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 * vw, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20 * vw,
                  fontWeight: "600",
                  justifyContent: "flex-end"
                }}
              >
                56
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1 * vw,
              marginHorizontal: 30 * vw,
              borderColor: "#ffffff1a"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10 * vw,
                justifyContent: "flex-end"
              }}
            >
              <SimpleLineIcons name="globe-alt" size={45 * vw} color="white" />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20 * vw,
                    fontWeight: "600",
                    paddingLeft: 5 * vw
                  }}
                >
                  COUNTRIES
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15 * vw,
                    paddingLeft: 5 * vw,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  We are in All Continents
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 * vw, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20 * vw,
                  fontWeight: "600",
                  justifyContent: "flex-end"
                }}
              >
                75
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#373a43",
            borderTopLeftRadius: 80 * vw,
            borderTopEndRadius: 80 * vw
          }}
        >
          <View>
            <View
              style={{
                borderTopWidth: 5 * vw,
                borderColor: "#fff",
                marginTop: 12 * vw,
                height: 1 * vh,
                marginHorizontal: 150 * vw,
                borderRadius: 50 * vw
              }}
            >
              {/* <Text>-------------</Text> */}
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#373a43",
              flexDirection: "row",
              paddingVertical: 20 * vw,
              paddingHorizontal: 10 * vw,
              justifyContent: "space-evenly",
              borderTopLeftRadius: 60 * vw,
              borderTopEndRadius: 60 * vw
            }}
          >
            <View
              style={{
                backgroundColor: "#f66b10",
                borderRadius: 60 * vw,
                paddingHorizontal: 5 * vw
              }}
            >
              <Zocial
                name="call"
                size={45 * vw}
                color="white"
                onPress={() => {
                  Linking.openURL(`tel:+1-469-854-2280/81`);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fbbf47",
                borderRadius: 60 * vw,
                padding: 5 * vw
              }}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={48 * vw}
                color="white"
                onPress={() => {
                  Linking.openURL(`mailto:contact@unitedscientificgroup.net`);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#3f82f7",
                borderRadius: 60 * vw,
                padding: 5 * vw
              }}
            >
              {/* <MaterialCommunityIcons name="directions" size={50} color="white" /> */}
              <FontAwesome5
                name="globe"
                size={45 * vw}
                color="white"
                onPress={() => {
                  Linking.openURL("https://unitedscientificgroup.org");
                }}
              />
            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1
  },
  viewBox: {
    paddingHorizontal: 20 * vw,
    justifyContent: "center",
    width: width,
    alignItems: "center"
    // height: 430,
  },
  notificationcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15 * vw,
    marginVertical: 10 * vw,
    paddingHorizontal: 10 * vw,
    paddingVertical: 15 * vw,
    flexDirection: "row",
    borderRadius: 25 * vw,
    justifyContent: "space-between",
    flex: 1
  },
  header2: {
    fontSize: 20 * vw,
    paddingLeft: 20 * vw,
    fontWeight: "bold",
    marginBottom: 20 * vw
  },
  flatlistcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15 * vw,
    marginVertical: 10 * vw,
    flexDirection: "column",
    borderRadius: 10 * vw,
    justifyContent: "space-between"
  }
});

export default Home;
