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
                paddingHorizontal: 25,
                flexDirection: "row",
                justifyContent: "space-between",
                height: 120,
                paddingTop: 15
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
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
            marginTop: -60,
            flexDirection: "row",
            marginBottom: 30
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
                        borderWidth: 10,
                        borderColor: "#fff",
                        borderRadius: 15,
                        backgroundColor: "#fff",
                        width: width - 20,
                        alignItems: "center",
                        overflow: "hidden"
                      }}
                    >
                      {item.banner
                        ? <Image
                          source={{ uri: imageUrl }}
                          style={{
                            borderRadius: 15,
                            width: "100%",
                            aspectRatio: 236 / 153,
                            resizeMode: "cover"
                          }}
                        />
                        : <Text>No Banner</Text>}
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
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
                          marginVertical: 12,
                          justifyContent: "center"
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Fontisto name="date" size={18} color="#f66b10" />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "600",
                              marginHorizontal: 10
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
                              fontSize: 15,
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
                            marginVertical: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                            marginHorizontal: 10
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderRadius: 10,
                              backgroundColor: "#363942",
                              paddingVertical: 12,
                              paddingHorizontal: 20,
                            }}
                            onPress={() => {
                              handpleUrlPress({ conference: item });
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 20
                              }}
                            >
                              {" "}Register Now{" "}
                            </Text>
                          </TouchableOpacity>
                          {item.pdf_url && (item.pdf_url.length !== 0) &&
                            <TouchableOpacity
                              style={{
                                borderRadius: 10,
                                backgroundColor: "#e58027",
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                marginLeft: 20
                              }}
                              onPress={() => {
                                Linking.openURL(item.pdf_url);
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  textAlign: "center",
                                  fontSize: 20
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
                            paddingLeft: 5,
                            paddingRight: 5,
                            textAlign: "left",
                            flex: 1
                          }}
                        >
                          {conference.logo
                            ? <Image
                              source={{ uri: imageUrl }}
                              resizeMode="cover"
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 50
                              }}
                            />
                            : <Text>No Logo</Text>}
                        </View>
                        <View style={{ flex: 3 }}>
                          <Text style={{ fontWeight: "600", fontSize: 17 }}>
                            {conference.name} {"\n"}
                            <View>
                              <Text
                                style={{
                                  fontWeight: "normal",
                                  fontSize: 13,
                                  marginTop: 4
                                }}
                              >
                                {conference.month} {conference.dates},{" "}
                                {conference.year}
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
              })
              : <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
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
                      borderRadius: 10,
                      borderColor: "#fff",
                      marginHorizontal: 10
                    }
                    : {
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      borderColor: "#fff",
                      marginHorizontal: 10
                    }
                ]}
              >
                <TouchableOpacity onPress={() => setMonth("All")}>
                  <Text
                    style={[
                      month === "All"
                        ? {
                          margin: 10,
                          fontSize: 20,
                          paddingHorizontal: 15,
                          color: "#fff"
                        }
                        : {
                          margin: 10,
                          fontSize: 20,
                          paddingHorizontal: 15,
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
                            borderRadius: 10,
                            borderColor: "#fff",
                            marginHorizontal: 10
                          }
                          : {
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            borderColor: "#fff",
                            marginHorizontal: 10
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
                                margin: 10,
                                fontSize: 20,
                                paddingHorizontal: 15,
                                color: "#fff"
                              }
                              : {
                                margin: 10,
                                fontSize: 20,
                                paddingHorizontal: 15,
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
          <View style={{ marginTop: 10 }}>
            {ConferenceData &&
              ConferenceData.map((conference, index) => {
                if (month == "All") {
                  if (conference.year === "2024") {
                    return (
                      <View style={styles.flatlistcontainer} key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 10
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal: 10,
                              alignItems: "center",
                              flexDirection: "column"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 17,
                                marginTop: 4
                              }}
                            >
                              {conference.month}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                marginTop: 4,
                                color: "#f66b10"
                              }}
                            >
                              {conference.dates}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              paddingLeft: 5
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "600",
                                fontSize: 18
                              }}
                            >
                              {conference.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 16
                              }}
                            >
                              {conference.venu}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderTopWidth: 1,
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
                            <Text style={{ fontSize: 16 }}>
                              {" "}<Entypo
                                name="ticket"
                                size={18}
                                color="black"
                              />{" "}
                              From{" "}
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 18
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
                              paddingHorizontal: 10,
                              paddingBottom: 5,
                              borderColor: "#bfbfbf"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#363942",
                                paddingVertical: 10,
                                marginTop: 5,
                                borderRadius: 5
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
                            paddingVertical: 10
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal: 10,
                              alignItems: "center",
                              flexDirection: "column"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 17,
                                marginTop: 4
                              }}
                            >
                              {conference.month}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                marginTop: 4,
                                color: "#f66b10"
                              }}
                            >
                              {conference.dates}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              paddingLeft: 5
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "600",
                                fontSize: 18
                              }}
                            >
                              {conference.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 16
                              }}
                            >
                              {conference.venu}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderTopWidth: 1,
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
                            <Text style={{ fontSize: 16 }}>
                              {" "}<Entypo
                                name="ticket"
                                size={18}
                                color="black"
                              />{" "}
                              From{" "}
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 18
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
                              paddingHorizontal: 10,
                              paddingBottom: 5,
                              borderColor: "#bfbfbf"
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#363942",
                                paddingVertical: 10,
                                marginTop: 5,
                                borderRadius: 5
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
          paddingVertical: 10,
          height: "100%"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          About USG
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image source={require("./assets/logo.png")} />
          <View style={{ marginHorizontal: 15 }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: "justify",
                lineHeight: 25
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
                fontSize: 18,
                textAlign: "justify",
                lineHeight: 25
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
                fontSize: 18,
                textAlign: "justify",
                lineHeight: 25
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
            marginVertical: 10,
            marginHorizontal: 10,
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
                padding: 10,
                justifyContent: "flex-end"
              }}
            >
              <MaterialIcons name="keyboard-voice" size={45} color="white" />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingLeft: 5
                  }}
                >
                  CONFERENCES
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    paddingLeft: 5,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  By Our Experienced Team
                </Text>
              </View>
            </View>
            <View style={{ padding: 10, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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
              borderWidth: 1,
              marginHorizontal: 30,
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
                padding: 10,
                justifyContent: "flex-end"
              }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={45}
                color="white"
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingLeft: 5
                  }}
                >
                  SPEAKERS
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    paddingLeft: 5,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  Keynotes, Featured Speakers
                </Text>
              </View>
            </View>
            <View style={{ padding: 10, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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
              borderWidth: 1,
              marginHorizontal: 30,
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
                padding: 10,
                justifyContent: "flex-end"
              }}
            >
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={45}
                color="white"
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingLeft: 5
                  }}
                >
                  PARTNERS
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    paddingLeft: 5,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  We Provides All Industry Services
                </Text>
              </View>
            </View>
            <View style={{ padding: 10, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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
              borderWidth: 1,
              marginHorizontal: 30,
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
                padding: 10,
                justifyContent: "flex-end"
              }}
            >
              <SimpleLineIcons name="globe-alt" size={45} color="white" />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingLeft: 5
                  }}
                >
                  COUNTRIES
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    paddingLeft: 5,
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}
                >
                  We are in All Continents
                </Text>
              </View>
            </View>
            <View style={{ padding: 10, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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
            borderTopLeftRadius: 80,
            borderTopEndRadius: 80
          }}
        >
          <View>
            <View
              style={{
                borderTopWidth: 5,
                borderColor: "#fff",
                marginTop: 12,
                height: 1,
                marginHorizontal: 150,
                borderRadius: 50
              }}
            >
              {/* <Text>-------------</Text> */}
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#373a43",
              flexDirection: "row",
              paddingVertical: 20,
              paddingHorizontal: 10,
              justifyContent: "space-evenly",
              borderTopLeftRadius: 60,
              borderTopEndRadius: 60
            }}
          >
            <View
              style={{
                backgroundColor: "#f66b10",
                borderRadius: 60,
                paddingHorizontal: 5
              }}
            >
              <Zocial
                name="call"
                size={45}
                color="white"
                onPress={() => {
                  Linking.openURL(`tel:+1-469-854-2280/81`);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fbbf47",
                borderRadius: 60,
                padding: 5
              }}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={48}
                color="white"
                onPress={() => {
                  Linking.openURL(`mailto:contact@unitedscientificgroup.net`);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#3f82f7",
                borderRadius: 60,
                padding: 5
              }}
            >
              {/* <MaterialCommunityIcons name="directions" size={50} color="white" /> */}
              <FontAwesome5
                name="globe"
                size={45}
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
    paddingHorizontal: 20,
    justifyContent: "center",
    width: width,
    alignItems: "center"
    // height: 430,
  },
  notificationcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "space-between",
    flex: 1
  },
  header2: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  flatlistcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: "column",
    borderRadius: 10,
    justifyContent: "space-between"
  }
});

export default Home;
