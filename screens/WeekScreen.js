import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
 View,
 Text,
 StyleSheet,
 SafeAreaView,
 TouchableOpacity,
} from "react-native";

const WEATHER_API_KEY = "c5477876d6955b2d33be8b747f1718f3";

const WeekScreen = () => {
 const [data0Date, setData0Date] = useState(null);
 const [data1Date, setData1Date] = useState(null);
 const [data2Date, setData2Date] = useState(null);
 const [data3Date, setData3Date] = useState(null);
 const [data4Date, setData4Date] = useState(null);

 const [tab, setTab] = useState(0);
 const [btnName0, setBtnName0] = useState(null);
 const [btnFlag0, setBtnFlag0] = useState(true);

 const [btnName1, setBtnName1] = useState(null);
 const [btnFlag1, setBtnFlag1] = useState(true);

 const [btnName2, setBtnName2] = useState(null);
 const [btnFlag2, setBtnFlag2] = useState(true);

 const [btnName3, setBtnName3] = useState(null);
 const [btnFlag3, setBtnFlag3] = useState(true);

 const [btnName4, setBtnName4] = useState(null);
 const [btnFlag4, setBtnFlag4] = useState(true);

 const buttonClickHandler = (tab) => {
  setTab(tab);
 };

 useEffect(() => {
  (async () => {
   const { status } = await Location.requestPermissionsAsync();

   if (status !== "granted") {
    setErrMsg_S("Refuse Permission This Device.");
    return;
   }

   const locData = await Location.getCurrentPositionAsync();
   try {
    const weather = await fetch(
     `https://api.openweathermap.org/data/2.5/forecast?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
    )
     .then((res) => {
      return res.json();
     })
     .then((json) => {
      // ====================================================================================

      const now = new Date();

      const data0 = `${now.getFullYear()}-${
       now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

      // ====================================================================================

      now.setDate(now.getDate() + 1);
      const data1 = `${now.getFullYear()}-${
       now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

      // ====================================================================================

      now.setDate(now.getDate() + 1);
      const data2 = `${now.getFullYear()}-${
       now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

      // ====================================================================================

      now.setDate(now.getDate() + 1);
      const data3 = `${now.getFullYear()}-${
       now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

      // ====================================================================================

      now.setDate(now.getDate() + 1);
      const data4 = `${now.getFullYear()}-${
       now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

      // ====================================================================================

      let arr0 = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      json.list.map((data) => {
       const compareData = data.dt_txt.split(` `)[0];
       console.log(compareData);

       switch (compareData) {
        case data0:
         const prevData = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         arr0.push(prevData);
         break;
        case data1:
         const prevData1 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         arr1.push(prevData1);
         break;
        case data2:
         const prevData2 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         arr2.push(prevData2);
         break;
        case data3:
         const prevData3 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         arr3.push(prevData3);
         break;
        case data4:
         const prevData4 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         arr4.push(prevData4);
         break;
       }
      });
      setData0Date(arr0);
      setData1Date(arr1);
      setData2Date(arr2);
      setData3Date(arr3);
      setData4Date(arr4);
     });
   } catch (e) {
    console.log(e);
    return;
   }
  })();
 }, []);

 if (data0Date) {
  if (btnFlag0) {
   setBtnName0(String(data0Date[0].dateTime).substring(5, 10));
   setBtnFlag0(false);
  }
 }
 if (data1Date) {
  if (btnFlag1) {
   setBtnName1(String(data1Date[0].dateTime).substring(5, 10));
   setBtnFlag1(false);
  }
 }
 if (data2Date) {
  if (btnFlag2) {
   setBtnName2(String(data2Date[0].dateTime).substring(5, 10));
   setBtnFlag2(false);
  }
 }
 if (data3Date) {
  if (btnFlag3) {
   setBtnName3(String(data3Date[0].dateTime).substring(5, 10));
   setBtnFlag3(false);
  }
 }
 if (data4Date) {
  if (btnFlag4) {
   setBtnName4(String(data4Date[0].dateTime).substring(5, 10));
   setBtnFlag4(false);
  }
 }
 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.box1}>
    {btnName0 && (
     <TouchableOpacity
      style={tab === 0 ? styles.activeBtn : styles.standarBtn}
      onPressOut={() => buttonClickHandler(0)}
     >
      <Text style={styles.btnText}>{btnName0}</Text>
     </TouchableOpacity>
    )}
    {btnName1 && (
     <TouchableOpacity
      style={tab === 1 ? styles.activeBtn : styles.standarBtn}
      onPressOut={() => buttonClickHandler(1)}
     >
      <Text style={styles.btnText}>{btnName1}</Text>
     </TouchableOpacity>
    )}
    {btnName2 && (
     <TouchableOpacity
      style={tab === 2 ? styles.activeBtn : styles.standarBtn}
      onPressOut={() => buttonClickHandler(2)}
     >
      <Text style={styles.btnText}>{btnName2}</Text>
     </TouchableOpacity>
    )}
    {btnName3 && (
     <TouchableOpacity
      style={tab === 3 ? styles.activeBtn : styles.standarBtn}
      onPressOut={() => buttonClickHandler(3)}
     >
      <Text style={styles.btnText}>{btnName3}</Text>
     </TouchableOpacity>
    )}
    {btnName4 && (
     <TouchableOpacity
      style={tab === 4 ? styles.activeBtn : styles.standarBtn}
      onPressOut={() => buttonClickHandler(4)}
     >
      <Text style={styles.btnText}>{btnName4}</Text>
     </TouchableOpacity>
    )}
   </View>
   <View style={styles.box2}>
    {tab === 0 && <Text>111111</Text>}
    {tab === 1 && <Text>222222</Text>}
    {tab === 2 && <Text>333333</Text>}
    {tab === 3 && <Text>444444</Text>}
    {tab === 4 && <Text>555555</Text>}
   </View>
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 },

 box1: {
  width: `100%`,
  flex: 0.5,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
 },
 box2: {
  width: `100%`,
  flex: 4,
 },
 standarBtn: {
  width: `19%`,
  height: 35,
  backgroundColor: `#fad390`,

  justifyContent: "center",
  alignItems: "center",

  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 9,
  },
  shadowOpacity: 0.48,
  shadowRadius: 5,

  borderRadius: 7,

  elevation: 18,
 },
 btnText: {
  color: `#fff`,
 },
 activeBtn: {
  width: `19%`,
  height: 35,
  backgroundColor: `#f6b93b`,

  justifyContent: "center",
  alignItems: "center",

  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 9,
  },
  shadowOpacity: 0.48,
  shadowRadius: 5,

  borderRadius: 7,

  elevation: 18,
 },
});

export default WeekScreen;
