import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'

const AboutConference = ({ route }) => {
  const [title, setTitle] = useState(route.params.title);
  const name = route.params.name;
  const about = route.params.about;
  const newtext = about.split(/\n/);
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff" }}>
        {newtext && newtext.map((text, index) =>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }} key={index}>
            <Text style={{ lineHeight: 22, textAlign: "justify", fontSize: 15, fontWeight: "400", fontFamily: "sans-serif" }}>{text}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default AboutConference