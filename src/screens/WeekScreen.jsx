import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
 View,
 Text,
 StyleSheet,
 SafeAreaView,
 TouchableOpacity,
 FlatList,
} from "react-native";
import { createAppContainer } from "react-navigation";

const WEATHER_API_KEY = "c5477876d6955b2d33be8b747f1718f3";

const Item = ({ time, temp }) => {
 return (
  <View style={styles.list}>
   <View style={styles.listBox}>
    <Text style={styles.listText}>{`${time.substring(0, 2)}시`}</Text>
    <Text style={styles.listText2}>{`${temp}℃`}</Text>
   </View>
  </View>
 );
};
const WeekScreen = () => {
 const renderItem = ({ item }) => {
  return <Item time={String(item.dateTime).split(` `)[1]} temp={item.temp} />;
 };
 const [data0Date, setData0Date] = useState(null);
 const [data1Date, setData1Date] = useState(null);
 const [data2Date, setData2Date] = useState(null);
 const [data3Date, setData3Date] = useState(null);
 const [data4Date, setData4Date] = useState(null);
 const [temp0Date, setTemp0Date] = useState({
  maxTemp: 0,
  minTemp: 0,
 });
 const [temp1Date, setTemp1Date] = useState({
  maxTemp: null,
  minTemp: null,
 });
 const [temp2Date, setTemp2Date] = useState({
  maxTemp: null,
  minTemp: null,
 });
 const [temp3Date, setTemp3Date] = useState({
  maxTemp: null,
  minTemp: null,
 });
 const [temp4Date, setTemp4Date] = useState({
  maxTemp: null,
  minTemp: null,
 });

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

 const [errMsg_S, setErrMsg_S] = useState("");

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
      let tempArr0 = [];
      let tempArr1 = [];
      let tempArr2 = [];
      let tempArr3 = [];
      let tempArr4 = [];
      json.list.map((data) => {
       const compareData = data.dt_txt.split(` `)[0];

       switch (compareData) {
        case data0:
         const prevData = {
          temp: parseInt(String(data.main.temp).split(`.`)[0]),
          dateTime: data.dt_txt,
         };
         tempArr0.push(parseInt(String(data.main.temp).split(`.`)[0]));
         arr0.push(prevData);
         break;
        case data1:
         const prevData1 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         tempArr1.push(parseInt(String(data.main.temp).split(`.`)[0]));
         arr1.push(prevData1);
         break;
        case data2:
         const prevData2 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         tempArr2.push(parseInt(String(data.main.temp).split(`.`)[0]));
         arr2.push(prevData2);
         break;
        case data3:
         const prevData3 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         tempArr3.push(parseInt(String(data.main.temp).split(`.`)[0]));
         arr3.push(prevData3);
         break;
        case data4:
         const prevData4 = {
          temp: String(data.main.temp).split(`.`)[0],
          dateTime: data.dt_txt,
         };
         tempArr4.push(parseInt(String(data.main.temp).split(`.`)[0]));
         arr4.push(prevData4);
         break;
       }
      });
      setData0Date(arr0);
      setData1Date(arr1);
      setData2Date(arr2);
      setData3Date(arr3);
      setData4Date(arr4);
      // ===================
      setTemp0Date({
       maxTemp: Math.max.apply(null, tempArr0),
       minTemp: Math.min.apply(null, tempArr0),
      });
      setTemp1Date({
       maxTemp: Math.max.apply(null, tempArr1),
       minTemp: Math.min.apply(null, tempArr1),
      });
      setTemp2Date({
       maxTemp: Math.max.apply(null, tempArr2),
       minTemp: Math.min.apply(null, tempArr2),
      });
      setTemp3Date({
       maxTemp: Math.max.apply(null, tempArr3),
       minTemp: Math.min.apply(null, tempArr3),
      });
      setTemp4Date({
       maxTemp: Math.max.apply(null, tempArr4),
       minTemp: Math.min.apply(null, tempArr4),
      });
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
   <SafeAreaView style={styles.box2}>
    {tab === 0 && (
     <View style={styles.tabContainer}>
      <View style={styles.tabTapBox}>
       <View style={styles.tabTitleBox}>
        <Text style={styles.tabDataTitle}>{btnName0}</Text>
       </View>
       <View style={styles.tabDataBox}>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최저기온</Text>
         <Text style={styles.tabDataText2}>{`${temp0Date.minTemp}℃`}</Text>
        </View>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최고기온</Text>
         <Text style={styles.tabDataText2}>{`${temp0Date.maxTemp}℃`}</Text>
        </View>
       </View>
      </View>
      <FlatList
       data={data0Date && data0Date}
       renderItem={renderItem}
       keyExtractor={(item) => item.dataTime}
      />
     </View>
    )}
    {tab === 1 && (
     <View style={styles.tabContainer}>
      <View style={styles.tabTapBox}>
       <View style={styles.tabTitleBox}>
        <Text style={styles.tabDataTitle}>{btnName1}</Text>
       </View>
       <View style={styles.tabDataBox}>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최저기온</Text>
         <Text style={styles.tabDataText2}>{`${temp1Date.minTemp}℃`}</Text>
        </View>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최고기온</Text>
         <Text style={styles.tabDataText2}>{`${temp1Date.maxTemp}℃`}</Text>
        </View>
       </View>
      </View>
      <FlatList
       data={data1Date && data1Date}
       renderItem={renderItem}
       keyExtractor={(item) => item.dataTime}
      />
     </View>
    )}
    {tab === 2 && (
     <View style={styles.tabContainer}>
      <View style={styles.tabTapBox}>
       <View style={styles.tabTitleBox}>
        <Text style={styles.tabDataTitle}>{btnName2}</Text>
       </View>
       <View style={styles.tabDataBox}>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최저기온</Text>
         <Text style={styles.tabDataText2}>{`${temp2Date.minTemp}℃`}</Text>
        </View>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최고기온</Text>
         <Text style={styles.tabDataText2}>{`${temp2Date.maxTemp}℃`}</Text>
        </View>
       </View>
      </View>
      <FlatList
       data={data2Date && data2Date}
       renderItem={renderItem}
       keyExtractor={(item) => item.dataTime}
      />
     </View>
    )}
    {tab === 3 && (
     <View style={styles.tabContainer}>
      <View style={styles.tabTapBox}>
       <View style={styles.tabTitleBox}>
        <Text style={styles.tabDataTitle}>{btnName3}</Text>
       </View>
       <View style={styles.tabDataBox}>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최저기온</Text>
         <Text style={styles.tabDataText2}>{`${temp3Date.minTemp}℃`}</Text>
        </View>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최고기온</Text>
         <Text style={styles.tabDataText2}>{`${temp3Date.maxTemp}℃`}</Text>
        </View>
       </View>
      </View>
      <FlatList
       data={data3Date && data3Date}
       renderItem={renderItem}
       keyExtractor={(item) => item.dataTime}
      />
     </View>
    )}
    {tab === 4 && (
     <View style={styles.tabContainer}>
      <View style={styles.tabTapBox}>
       <View style={styles.tabTitleBox}>
        <Text style={styles.tabDataTitle}>{btnName4}</Text>
       </View>
       <View style={styles.tabDataBox}>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최저기온</Text>
         <Text style={styles.tabDataText2}>{`${temp4Date.minTemp}℃`}</Text>
        </View>
        <View style={styles.tabDataBoxBox}>
         <Text style={styles.tabDataText1}>최고기온</Text>
         <Text style={styles.tabDataText2}>{`${temp4Date.maxTemp}℃`}</Text>
        </View>
       </View>
      </View>
      <FlatList
       data={data4Date && data4Date}
       renderItem={renderItem}
       keyExtractor={(item) => item.dataTime}
      />
     </View>
    )}
   </SafeAreaView>
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
  // justifyContent: "center",
  alignItems: "center",
 },
 standarBtn: {
  width: `19%`,
  height: 35,

  justifyContent: "center",
  alignItems: "center",
  borderRadius: 1.5,
  borderColor: `#fad390`,
  borderWidth: 1,

  shadowColor: "#999",
  shadowOffset: {
   width: 0,
   height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,

  borderRadius: 7,

  elevation: 18,
 },
 btnText: {
  color: `#0b0b0b`,
 },
 activeBtn: {
  width: `19%`,
  height: 35,
  backgroundColor: `#fad390`,

  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 10,
  },
  shadowOpacity: 0.48,
  shadowRadius: 5,

  borderRadius: 7,

  elevation: 18,
 },
 list: {
  width: `100%`,
  justifyContent: "center",
  alignItems: "center",
 },
 listBox: {
  width: `80%`,
  height: 50,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: 10,
  backgroundColor: `#F7EDDF`,
  borderRadius: 10,
  // borderColor: `#fad390`,
  // borderBottomWidth: 5,
 },
 listText: {
  fontSize: 20,
  color: `#0b0b0b`,
 },
 listText2: {
  fontSize: 20,
  fontWeight: `700`,
  color: `#0b0b0b`,
 },
 tabContainer: {
  flex: 1,
 },
 tabTopBox: {
  flex: 3,
  justifyContent: "center",
  alignItems: "center",
 },
 tabTitleBox: {
  justifyContent: "center",
  alignItems: "center",
 },
 tabDataBox: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50,
  marginBottom: 30,
 },
 tabDataBoxBox: {
  width: "50%",
  justifyContent: "center",
  alignItems: "center",
 },
 tabDataTitle: {
  fontSize: 40,
  fontWeight: `600`,
 },
 tabDataText1: {
  fontSize: 30,
  fontWeight: `600`,
 },
 tabDataText2: {
  fontSize: 40,
  fontWeight: `600`,
  marginTop: 10,
 },
});

export default createAppContainer(WeekScreen);
