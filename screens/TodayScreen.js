import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtil";
import { Feather, Ionicons } from "@expo/vector-icons";

const WEATHER_API_KEY = "c5477876d6955b2d33be8b747f1718f3";

const TodayScreen = () => {
 //  const [location_S, setLocation_S] = useState(null);
 const [errMsg_S, setErrMsg_S] = useState(``);

 const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
 const [viewTime, setViewTime] = useState(`00:00`);

 const [currentTemp, setCurrentTemp] = useState(`0`);
 const [currentCity, setCurrentCity] = useState(``);

 const [maxTemp, setMaxTemp] = useState(`0`);
 const [minTemp, setMinTemp] = useState(`0`);

 const [weatherStatus, setWeatherStatus] = useState(``);
 const [rainStatus, setRainStatus] = useState(``);

 const [windStatus, setWindStatus] = useState(``);
 const [humidity, setHumidity] = useState(``);

 setInterval(() => {
  const { currentDate, currentTime } = getCurrentDate();
  setViewDate(currentDate);
  setViewTime(currentTime);
 }, 1000);
 useEffect(() => {
  const { currentDate, currentTime } = getCurrentDate();
  setViewDate(currentDate);
  setViewTime(currentTime);
  (async () => {
   const { status } = await Location.requestPermissionsAsync();

   if (status !== "granted") {
    setErrMsg_S("Refuse Permission This Device.");
    return;
   }

   const locData = await Location.getCurrentPositionAsync();
   //    setLocation_S(locData);
   try {
    // const weather = await axios.get(
    //  `api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}`
    // );
    const weather = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
    )
     .then((res) => {
      return res.json();
     })
     .then((json) => {
      const rainTime = Object.keys(json.rain)[0];
      const windSpeed = String(json.wind.speed).split(".")[0];
      const temp = String(json.main.temp).split(".")[0];
      // 소수점을 기준으로 배열로 나눠지게함
      const minTemp = String(json.main.temp_min).split(".")[0];
      const maxTemp = String(json.main.temp_max).split(".")[0];

      const status = json.weather[0].description;

      switch (status) {
       case "clear sky":
        setWeatherStatus("날씨가 좋습니다.");
        break;
       case "few clouds":
        setWeatherStatus("조금 흐립니다.");
        break;
       case "overcast clouds":
        setWeatherStatus("구름이 흐립니다.");
        break;
       case "scattered clouds":
        setWeatherStatus("구름이 많습니다.");
        break;
       case "broken clouds":
        setWeatherStatus("비가 올수도 있습니다.");
        break;
       case "light rain":
        setWeatherStatus("약한 비가 올수도 있습니다.");
        break;
       case "shower rain":
        setWeatherStatus("비가 오고 있습니다.");
        break;
       case "rain":
        setWeatherStatus("비가 오고 있습니다.");
        break;
       case "thunderstorm":
        setWeatherStatus("태풍이 오고 있습니다.");
        break;
       case "snow":
        setWeatherStatus("눈이 오고 있습니다.");
        break;
       case "mist":
        setWeatherStatus("안개가 심합니다.");
        break;
      }

      switch (rainTime) {
       case "1h":
        setRainStatus(`1시`);
        break;
       case "2h":
        setRainStatus(`2시`);
        break;
       case "3h":
        setRainStatus(`3시`);
        break;
       case "4h":
        setRainStatus(`4시`);
        break;
       case "5h":
        setRainStatus(`5시`);
        break;
       case "6h":
        setRainStatus(`6시`);
        break;
       case "7h":
        setRainStatus(`7시`);
        break;
       case "8h":
        setRainStatus(`8시`);
        break;
       case "9h":
        setRainStatus(`9시`);
        break;
       case "10h":
        setRainStatus(`10시`);
        break;
       case "11h":
        setRainStatus(`11시`);
        break;
       case "12h":
        setRainStatus(`12시`);
        break;
      }

      /**
       * broken clouds
       * overcast clouds
       * clear sky
       * few clouds
       * scattered clouds
       *
       */

      setCurrentCity(json.name);
      setCurrentTemp(temp);
      setMinTemp(minTemp);
      setMaxTemp(maxTemp);
      setWindStatus(windSpeed);
      setHumidity(json.main.humidity);
     });
   } catch (e) {
    console.log(e);
    return;
   }
  })();
 }, []);

 //  return (
 //   <View style={styles.container}>
 //    <View style={styles.box_1}>
 //     <Text style={styles.timeText}>{viewTime}</Text>
 //     <Text style={styles.dateText}>{viewDate}</Text>
 //    </View>
 //    <View style={styles.box_2}>
 //     <Text style={styles.statusText}>{weatherStatus}</Text>
 //     <Text style={styles.tempText}>{currentTemp}℃</Text>
 //    </View>
 //    <View style={styles.box_3}>
 //     <Text style={styles.cityText}>{currentCity}city</Text>
 //    </View>
 //    <View style={styles.box_4}>
 //     <View style={styles.box_4_box}>
 //      <Text style={styles.tempGuideText}>최저기온</Text>
 //      <Text style={styles.minMaxTemp}>{minTemp}℃</Text>
 //     </View>
 //     <View style={styles.box_4_box}>
 //      <Text style={styles.tempGuideText}>최고기온</Text>
 //      <Text style={styles.minMaxTemp}>{maxTemp}℃</Text>
 //     </View>
 //    </View>
 //   </View>
 //  );
 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.box_1}>
    <Text style={styles.box_1_font}>{currentCity}</Text>
   </View>
   <View style={styles.box_2}>
    <Text style={styles.box_2_font_1}>TODAY</Text>
    <View style={styles.box_2_box}>
     <Text style={styles.box_2_font_2}>{currentTemp}</Text>
     <Text style={styles.box_2_font_3}>℃</Text>
    </View>
    <Text style={styles.box_2_status_font}>{weatherStatus}</Text>
   </View>
   <View style={styles.box_3}>
    <View style={styles.box_3_box}>
     <Text style={styles.box_3_box_font_1}>최저기온</Text>
     <Text style={styles.box_3_box_font2}>{minTemp}℃</Text>
    </View>
    <View style={styles.box_3_box}>
     <Text style={styles.box_3_box_font_1}>최고기온</Text>
     <Text style={styles.box_3_box_font2}>{maxTemp}℃</Text>
    </View>
   </View>
   <View style={styles.box_4}>
    <View style={styles.box_4_box}>
     <Feather name="wind" size={30} />
     <Text style={styles.box_4_box_font}>{windStatus} km/h</Text>
    </View>
    <View style={styles.box_4_box}>
     <Ionicons name="water-outline" size={30} />
     <Text style={styles.box_4_box_font}>{humidity}%</Text>
    </View>
    <View style={styles.box_4_box}>
     <Ionicons name="umbrella-outline" size={30} />
     <Text style={styles.box_4_box_font}>{rainStatus}</Text>
    </View>
   </View>
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 box_1: {
  flex: 0.5,
  alignItems: "center",
  justifyContent: "center",
 },
 box_1_font: {
  fontSize: 18,
 },
 box_2: {
  flex: 4,
  alignItems: "flex-start",
  justifyContent: "center",
  paddingLeft: 50,
  backgroundColor: "#f1c40f",
 },
 box_2_box: {
  flexDirection: "row",
 },
 box_2_font_1: {
  fontSize: 25,
  fontWeight: `600`,
 },
 box_2_font_2: {
  fontSize: 100,
  fontWeight: `600`,
 },
 box_2_font_3: {
  fontSize: 40,
  fontWeight: "300",
  marginTop: 10,
  color: "#718093",
 },
 box_2_status_font: {
  fontSize: 30,
 },
 box_3: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
 },
 box_3_box: {
  flex: 1.5,
  alignItems: "center",
  justifyContent: "center",
 },
 box_3_box_font_1: {
  fontSize: 30,
  fontWeight: "600",
 },
 box_3_box_font2: {
  fontSize: 45,
  fontWeight: "600",
 },
 box_4: {
  flex: 0.5,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
 },
 box_4_box: {
  width: 100,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
 },
 box_4_box_font: {
  margin: 3,
  fontSize: 18,
  fontWeight: "500",
 },
});

// const styles = StyleSheet.create({
//  container: {
//   flex: 1,
//   alignItems: "center",
//   justifyContent: "center",
//  },
//  box_1: {
//   width: `100%`,
//   flex: 1.5,
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//  },
//  dateText: {
//   fontSize: 19,
//   color: `#718093`,
//  },
//  timeText: {
//   fontSize: 34,
//   fontWeight: `700`,
//  },
//  statusText: {
//   fontSize: 22,
//   fontWeight: `500`,
//   marginBottom: 100,
//  },
//  box_2: {
//   width: `70%`,
//   flex: 3,
//   alignItems: "center",
//   justifyContent: "flex-end",
//   flexDirection: "column",
//   borderBottomWidth: 5,
//   borderBottomColor: `#0b0b0b`,
//   borderRadius: 10,
//  },
//  tempText: {
//   fontWeight: `500`,
//   fontSize: 90,
//  },
//  box_3: {
//   width: `100%`,
//   flex: 1,
//   alignItems: "center",
//   justifyContent: "flex-start",
//   flexDirection: "column",
//  },
//  cityText: {
//   fontSize: 20,
//   fontWeight: `500`,
//   marginTop: 10,
//   color: `#718093`,
//  },
//  box_4: {
//   width: `100%`,
//   flex: 2,
//   alignItems: "center",
//   justifyContent: "space-around",
//   flexDirection: "row",
//   //   borderTopWidth: 3,
//   //   borderColor: `#0b0b0b`,
//   //   backgroundColor: `#38ada9`,
//  },
//  box_4_box: {
//   width: `40%`,
//   height: `100%`,
//   alignItems: "center",
//   justifyContent: "center",
//   flex: 1,
//  },
//  tempGuideText: {
//   fontSize: 26,
//   fontWeight: `500`,
//   padding: 5,
//   //   color: `#fff`
//  },
//  minMaxTemp: {
//   fontSize: 22,
//   fontWeight: `400`,
//   //   color: `#fff`
//  },
// });

export default TodayScreen;
