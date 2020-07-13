import React, {useContext, useRef, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {Platform, Alert, FlatList} from "react-native";
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import Geolocation from 'react-native-geolocation-service';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User';

const Text = Styled.Text`
  font-size: 18px;
`;
const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFFDD;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  top: 1%;
  left: 2%;
  width: 70%;
  padding: 4% 6%;
`;
const TopRightView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 25px;
  border-width: 1px;
  border-color: #AAA;
  top: 1%;
  right: 2%;
  width: 50px;
  height: 50px;
`;
const CenterRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 46%;
  width: 40px;
  height: 12%;
`;
const CenterTestRightView = Styled.View`
  position: absolute;
  right: 2%;
  top: 30%;
  width: 40px;
  height: 12%;
`;
const BottomLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 25px;
  border-width: 1px;
  border-color: #AAA;
  bottom: 2%;
  left: 2%;
  width: 50px;
  height: 50px;
`;

// Footer -------------------------------
const Footer = Styled.View`
  position: absolute;
  bottom: 1%;
  left: 20%;
  right: 2%;
`;
const SaveContainer = Styled.View`
  padding: 4px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
`;
const Save = Styled.View`
  background-color: #FFF;
  width: 50px;
  height: 50px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const SaveName = Styled.Text`
  width: 100%;
  text-align: center;
  background-color: #FFF;
  font-weight: 600;
`;
// Footer -------------------------------

interface ILocation {
  latitude: number;
  longitude: number;
}
interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface ILatLng {
  latitude: number;
  longitude: number;
}

interface ICamera {
  center: ILatLng;
  heading: number;
  pitch: number;
  zoom: number;
  altitude: number;
}

interface IDriving {
  stopTime: number;
  drivingTime: number;
  sleepMarker: number;
  suddenStopMarker: number;
  suddenAccelerationMarker: number;
}

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const MapMarker = ({navigation}: DrawerProp) => {

  const {dummyAdd, dummyRemove, drivingSaveData, drivingSaveDataArr, defaultInfo, setDefaultInfo} = useContext(DrivingDataContext);
  const {userInfo2} = useContext<IUserContext>(UserContext);

  const saveLocations2 = require('./saveLocations2.json');
  let saveData = [];
  // for(let i=0; i<saveLocations2.length; i++){
  for(let i=0; i<2; i++){
    let arr = saveLocations2[i].routes[0].geometry.coordinates.map(
      (item: any[]) =>{ return {latitude: item[1], longitude: item[0]}}
    );
    saveData.push(arr);
  }

  const [drivingInfo, setDrivingInfo] = useState<IDriving>({
    stopTime: 0,
    drivingTime: 0,
    sleepMarker: 0,
    suddenStopMarker: 0,
    suddenAccelerationMarker: 0
  });

  const [poly, setPoly] = useState<number>(-2);
  const [locationsArr, setLocationsArr] = useState<Array<any>>(saveData);

  const [p1, setP1] = useState<number>(0);
  const [p2, setP2] = useState<number>(0);
  const [p3, setP3] = useState<number>(0);

  const [camera, setCamera] = useState<ICamera>({
    center: {
      latitude: 35.896311,
      longitude: 128.622051
    },
    heading: 0,
    pitch: 0,
    zoom: 15,
    altitude: 0
  });
  
  // const saveLocations = require('./saveLocations.json');
  // let jsonData = saveLocations2[0].routes[0].geometry.coordinates.map((item: any[]) =>{
  //   return {latitude: item[1], longitude: item[0]}});
  // console.log(jsonData);

  const removeLocationsArr = () => {
    let list = [...locationsArr];
    list.splice(list.length-1, 1);
    setLocationsArr(list);
    // AsyncStorage.setItem('save', JSON.stringify(list));
    console.log("removeLocationsArr");
  }
  const addLocationsArr = () => {
    let num = Math.floor(Math.random() * 10);
    let arr = saveLocations2[num].routes[0].geometry.coordinates.map((item: any[]) =>{ return {latitude: item[1], longitude: item[0]}});
    let list = [...locationsArr, arr];
    setLocationsArr(list);
    console.log("addLocationsArr");
  }
  
  useEffect(() => {
    console.log("--- --- MapMarker Mount");
    console.log(drivingSaveDataArr?.length);
    // console.log(drivingSaveDataArr);
    // console.log(drivingSaveDataArr[0].Drivingline);
    return () => {
      console.log("--- --- MapMarker return");
    };
  },[]);

  const renderItem = ({ item, index }:any) => {
    let num = 0;
    num = index;
    return (
      <SaveContainer>
        <TouchableOpacity
        style={index<2?{borderColor:"#00F", borderWidth:3}:index<4?{borderColor:"#0AA", borderWidth:3}:index<6?{borderColor:"#CA7", borderWidth:3}:{borderColor:"#CCC", borderWidth:3}} onPress={(index)=>{
          setPoly(num);
          let {latitude, longitude} = item.Drivingline[0];
          // console.log(item.DrivingMarker[1].bool_sudden_stop);
          let _sleepMarker = 0;
          let _suddenStopMarker = 0;
          let _suddenAccelerationMarker = 0;
          // if(item.DrivingMarker!= undefined)console.log(item.DrivingMarker.length);
          if(item.DrivingMarker!= undefined){
            console.log("마커 수 -> ", item.DrivingMarker.length);
            if(item.DrivingMarker && item.DrivingMarker.length > 0){
              for(let i=0; i<item.DrivingMarker.length; i++){
                if(item.DrivingMarker[i].bool_sleep)_sleepMarker++;
                if(item.DrivingMarker[i].bool_sudden_stop)_suddenStopMarker++;
                if(item.DrivingMarker[i].bool_sudden_acceleration)_suddenAccelerationMarker++;
              }
            }
          }
          // if(drivingSaveDataArr[num] != undefined) console.log(drivingSaveDataArr[num].DrivingMarker);
          // let saveNameTime = (new Date(item.endTime).getMonth()+1) + "월 " + new Date(item.endTime).getDate() + "일";
          // console.log(saveNameTime);
          setDrivingInfo({
            stopTime: item.endTime,
            drivingTime: item.endTime-item.startTime,
            sleepMarker: _sleepMarker,
            suddenStopMarker: _suddenStopMarker,
            suddenAccelerationMarker: _suddenAccelerationMarker
          });
          setCamera( camera => {
            return ({
              center: {
                latitude: latitude,
                longitude: longitude
              },
              heading: 0,
              pitch: 0,
              zoom: camera.zoom,
              altitude: 0
            });
          });
          setP1(Math.floor(Math.random() * 15) + 1);
          setP2(Math.floor(Math.random() * 15) + 1);
          setP3(Math.floor(Math.random() * 5) + 1);
        }}>
          <Save>
            <Icon2
              name="map-clock-outline"
              color={'#000000'}
              size={40}
            />
          </Save>
          <SaveName numberOfLines={1}>{(new Date(item.endTime).getMonth()+1) + " / " + new Date(item.endTime).getDate() + ""}</SaveName>
        </TouchableOpacity>
      </SaveContainer>
    );
  }
  return (
    <>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}

        showsUserLocation={true}

        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={true}

        camera={camera}
      >
        {poly >= 0 && drivingSaveDataArr != undefined && <Polyline
          coordinates={drivingSaveDataArr[poly].Drivingline}
          strokeWidth={3}
          strokeColor="#00f"
        />}
        {poly >= 0 && drivingSaveDataArr != undefined && drivingSaveDataArr[poly].DrivingMarker && drivingSaveDataArr[poly].DrivingMarker.map((markerLocation: ILocation, index: number) => (
          <Marker
            key={`markerLocation-${index}`}
            coordinate={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
            }}
          />
        ))}
      </MapView>
        <TopLeftView style={{marginTop:getStatusBarHeight()}}>
          {/* <Text>
            날짜 : {defaultInfo[0].toString().substr(0,4) + 
            " - " + defaultInfo[0].toString().substr(4,2) + 
            " - " + defaultInfo[0].toString().substr(6,2)}
          </Text> */}
          <Text>
            운행종료 :  {drivingInfo.stopTime != 0 ? 
            (new Date(drivingInfo.stopTime).getMonth()+1) + "월 " +
            (new Date(drivingInfo.stopTime).getDate() + "일  -  ") +
            (new Date(drivingInfo.stopTime).getHours() + "시 ") +
            (new Date(drivingInfo.stopTime).getMinutes())+ "분": ""}
          </Text>
          <Text>
            주행시간 :  {drivingInfo.drivingTime != 0 ? 
            (new Date(drivingInfo.drivingTime).getHours()-9) + "시간 " +
            (new Date(drivingInfo.drivingTime).getMinutes() + "분 ") +
            (new Date(drivingInfo.drivingTime).getSeconds() +"초") : ""}
          </Text>
          <Text style={{marginTop:8}}>
            급정거 :  {drivingInfo.stopTime != 0 ? drivingInfo.suddenStopMarker : ""} 회  -  졸음 :  {drivingInfo.stopTime != 0 ? drivingInfo.sleepMarker : ""} 회
          </Text>
          <Text>
            급가속 :  {drivingInfo.stopTime != 0 ? drivingInfo.suddenAccelerationMarker : ""} 회
          </Text>

        </TopLeftView>
        <TopRightView
          style={{marginTop:getStatusBarHeight()}}
        >
          <IconButton
            style={{flex:1}}
            icon="menu"
            color="#000000"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </TopRightView>

        <CenterRightView>
          <IconButton
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#AAA",
              borderRadius: 10,
              borderWidth: 1,
            }}
            icon="plus"
            color="#000000"
            onPress={() => {
              setCamera({
                center: {
                  latitude: camera.center.latitude,
                  longitude: camera.center.longitude
                },
                heading: 0,
                pitch: 0,
                zoom: camera.zoom+1,
                altitude: 0
              });
            }}
          />
          <IconButton
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#AAA",
              borderRadius: 10,
              borderWidth: 1,
            }}
            icon="minus"
            color="#000000"
            onPress={() => {
              setCamera({
                center: {
                  latitude: camera.center.latitude,
                  longitude: camera.center.longitude
                },
                heading: 0,
                pitch: 0,
                zoom: camera.zoom-1,
                altitude: 0
              });
            }}
          />
        </CenterRightView>

        <BottomLeftView>
          <IconButton
            icon="crosshairs-gps"
            color="#000000"
            onPress={() => {
              Geolocation.getCurrentPosition(
                async position => {
                  const {latitude, longitude} = position.coords;
                  setCamera( camera => {
                    return ({
                      center: {
                        latitude: latitude,
                        longitude: longitude
                      },
                      heading: 0,
                      pitch: 0,
                      zoom: camera.zoom,
                      altitude: 0
                    });
                  });
                },
                error => {
                  console.log(error.code, error.message);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 0,
                  maximumAge: 0
                },
              );
            }}
          />
        </BottomLeftView>
      
        <CenterTestRightView>
          <IconButton
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#AAA",
              borderRadius: 10,
              borderWidth: 1,
            }}
            icon="database-plus"
            color="#000000"
            onPress={() => {
              let num = Math.floor(Math.random() * 10);
              let arr = saveLocations2[num].routes[0].geometry.coordinates.map((item: any[]) =>{ return {latitude: item[1], longitude: item[0]}});
              let _drivingSaveData = Object.assign({}, drivingSaveData);
              let _endT = new Date().getTime();
              if(arr){
                if(userInfo2 && userInfo2.key){
                  _drivingSaveData.webUserId = userInfo2.key;
                }
                if(userInfo2 && userInfo2.name){
                  _drivingSaveData.Drivingline = arr;
                  // 탐지 객체도 넣어야함 DrivingMarker
                  _drivingSaveData.name = userInfo2.name;
                  _drivingSaveData.startTime = (_endT-(60000*Math.floor(Math.random() * 45 +10)));
                  _drivingSaveData.endTime = _endT;
                }

                // 랜덤 발생 위치 넣어야함
                _drivingSaveData.DrivingMarker = [];

                dummyAdd(_drivingSaveData);
                console.log("dummyAdd");
              }
            }}
          />
          {/* cloud-download-outline */}
          <IconButton
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#AAA",
              borderRadius: 10,
              borderWidth: 1,
            }}
            icon="database-remove"
            color="#000000"
            onPress={() => {
              if(drivingSaveDataArr != undefined && poly>=0){
                if(poly+1==drivingSaveDataArr.length){
                  setPoly((poly)=>poly-1);
                  if(poly == 0){ // 인포를 못함
                    console.log("정지");
                  } else { // 인포를 해도됨
                    setDrivingInfo({
                      stopTime: drivingSaveDataArr[poly-1].endTime,
                      drivingTime: (drivingSaveDataArr[poly-1].endTime-drivingSaveDataArr[poly-1].startTime),
                      sleepMarker: 0,
                      suddenStopMarker: 0,
                      suddenAccelerationMarker: 0
                    });
                    let {latitude, longitude} = drivingSaveDataArr[poly-1].Drivingline[0];
                    setCamera( camera => {
                      return ({
                        center: {
                          latitude: latitude,
                          longitude: longitude
                        },
                        heading: 0,
                        pitch: 0,
                        zoom: camera.zoom,
                        altitude: 0
                      });
                    });
                  }
                  console.log("같다 지운다");
                  dummyRemove();
                }
                else{
                  dummyRemove();
                }
              }
              if(poly== -2){
                dummyRemove();
              }
              
            }}
          />
          {/* cloud-upload-outline */}
        </CenterTestRightView>
      <Footer>
        <FlatList
        // data={locationsArr}
        data={drivingSaveDataArr}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return `myMarker-${index}`;
        }}
        renderItem={renderItem}
      />
      </Footer>
    </>
  );
};

export default MapMarker;