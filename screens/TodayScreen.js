import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtil";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TypeWriter from "react-native-typewriter";

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

 const [weatherImg, setWeatherImg] = useState(null);
 const [weatherBackGround, setWeatherBackGround] = useState(1);

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
      // const rainTime = Object.keys(json.rain)[0];
      const windSpeed = String(json.wind.speed).split(".")[0];
      const temp = String(json.main.temp).split(".")[0];
      // 소수점을 기준으로 배열로 나눠지게함
      const minTemp = String(json.main.temp_min).split(".")[0];
      const maxTemp = String(json.main.temp_max).split(".")[0];

      const status = json.weather[0].description;
      // const status = "few clouds";

      console.log(status);

      switch (status) {
       case "clear sky":
        setWeatherStatus("날씨가 좋습니다.");
        setWeatherBackGround(0);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fsun.png?alt=media&token=a3e817c2-405d-4c32-8182-f9a5da76b536`
        );
        break;
       case "few clouds":
        setWeatherStatus("조금 흐립니다.");
        setWeatherBackGround(1);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fcloud-computing.png?alt=media&token=d6415adb-871d-428a-84a1-5ba70c902c5a`
        );
        break;
       case "overcast clouds":
        setWeatherStatus("구름이 흐립니다.");
        setWeatherBackGround(1);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fcloud-computing.png?alt=media&token=d6415adb-871d-428a-84a1-5ba70c902c5a`
        );
        break;
       case "scattered clouds":
        setWeatherStatus("구름이 많습니다.");
        setWeatherBackGround(1);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fclouds.png?alt=media&token=3371f929-d208-4cc6-9cd0-44e9f86edea9`
        );
        break;
       case "broken clouds":
        setWeatherStatus("비가 올수도 있습니다.");
        setWeatherBackGround(2);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fcloudy.png?alt=media&token=adf96b1e-07c4-45e7-b5fa-c787a48f6172`
        );
        break;
       case "light rain":
        setWeatherStatus("약한 비가 올수도 있습니다.");
        setWeatherBackGround(2);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Frain.png?alt=media&token=faeb844e-4c8d-4f2e-84b8-b0445a566303`
        );
        break;
       case "shower rain":
        setWeatherStatus("비가 오고 있습니다.");
        setWeatherBackGround(2);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Frain.png?alt=media&token=faeb844e-4c8d-4f2e-84b8-b0445a566303`
        );
        break;
       case "moderate rain":
        setWeatherStatus("적당히 비가 오고 있습니다.");
        setWeatherBackGround(2);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Frain.png?alt=media&token=faeb844e-4c8d-4f2e-84b8-b0445a566303`
        );
        break;
       case "rain":
        setWeatherStatus("비가 오고 있습니다.");
        setWeatherBackGround(2);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Frain.png?alt=media&token=faeb844e-4c8d-4f2e-84b8-b0445a566303`
        );
        break;
       case "thunderstorm":
        setWeatherStatus("태풍이 오고 있습니다.");
        setWeatherBackGround(3);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Ftwister.png?alt=media&token=eb9c2efe-2e62-46a5-ae00-454faea0823f`
        );
        break;
       case "snow":
        setWeatherStatus("눈이 오고 있습니다.");
        setWeatherBackGround(4);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Fsnowflake.png?alt=media&token=51985323-e567-4181-9135-6b6ac2b275c4`
        );
        break;
       case "mist":
        setWeatherStatus("안개가 심합니다.");
        setWeatherBackGround(5);
        setWeatherImg(
         `https://firebasestorage.googleapis.com/v0/b/hmg-fileserver.appspot.com/o/WEATHER%2Ffog.png?alt=media&token=d231932d-ec8b-474f-aefd-2610d9ea9603`
        );
        break;
      }

      // switch (rainTime) {
      //  case "1h":
      //   setRainStatus(`1시`);
      //   break;
      //  case "2h":
      //   setRainStatus(`2시`);
      //   break;
      //  case "3h":
      //   setRainStatus(`3시`);
      //   break;
      //  case "4h":
      //   setRainStatus(`4시`);
      //   break;
      //  case "5h":
      //   setRainStatus(`5시`);
      //   break;
      //  case "6h":
      //   setRainStatus(`6시`);
      //   break;
      //  case "7h":
      //   setRainStatus(`7시`);
      //   break;
      //  case "8h":
      //   setRainStatus(`8시`);
      //   break;
      //  case "9h":
      //   setRainStatus(`9시`);
      //   break;
      //  case "10h":
      //   setRainStatus(`10시`);
      //   break;
      //  case "11h":
      //   setRainStatus(`11시`);
      //   break;
      //  case "12h":
      //   setRainStatus(`12시`);
      //   break;
      // }

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

 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.box_1}>
    <Text style={styles.box_1_font}>{currentCity}</Text>
   </View>
   <LinearGradient
    colors={
     weatherBackGround === 0
      ? [`#F2994A`, `#F2C94C`]
      : weatherBackGround === 1
      ? [`#bdc3c7`, `#2c3e50`]
      : weatherBackGround === 2
      ? [`#076585`, `#fff`]
      : weatherBackGround === 3
      ? [`#283048`, `#859398`]
      : weatherBackGround === 4
      ? [`#E6DADA`, `#274046`]
      : weatherBackGround === 5
      ? [`#bdc3c7`, `#2c3e50`]
      : ""
    }
    style={styles.box_2}
   >
    <View style={styles.weatherTextBox}>
     <Text style={styles.box_2_font_1}>TODAY</Text>
     <View style={styles.box_2_box}>
      <Text style={styles.box_2_font_2}>{currentTemp}</Text>
      <Text style={styles.box_2_font_3}>℃</Text>
     </View>
     <TypeWriter typing={1} style={styles.box_2_status_font}>
      {weatherStatus}
     </TypeWriter>
    </View>
    <View style={styles.weatherImageBox}>
     {weatherImg && (
      <Image
       style={styles.weatherImage}
       source={{
        uri: weatherImg,
       }}
      />
     )}
    </View>
   </LinearGradient>
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
 weatherImage: {
  width: 200,
  height: 200,
 },
 weatherImageBox: {
  position: "absolute",
  zIndex: 1,
  marginLeft: 200,
 },
 weatherTextBox: {
  zIndex: 3,
  marginLeft: 30,
 },
 gradientBox: {
  width: `100%`,
 },
});

export default TodayScreen;
