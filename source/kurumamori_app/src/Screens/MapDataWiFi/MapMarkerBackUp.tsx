import React, {useContext, useRef, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {Platform, Alert, FlatList} from "react-native";
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

import Geolocation from 'react-native-geolocation-service';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Text = Styled.Text`
  font-size: 16px;
`;
const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFFFFDD;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  top: 1%;
  left: 2%;
  width: 50%;
  padding: 5% 10%;
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
  top: 44%;
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
  bottom: 2%;
  left: 20%;
  right: 2%;
`;
const SaveContainer = Styled.View`
  padding: 8px;
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

const TopViewTEST = Styled.View`
  position: absolute;
  background-color: #0F0;
  border: 5px;
  right: 2%;
  top: 20%;
  width: 40px;
  height: 5%;
`;
const TopViewTEST2 = Styled.View`
  position: absolute;
  background-color: #0F0;
  border: 5px;
  right: 2%;
  top: 30%;
  width: 40px;
  height: 5%;
`;

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}
import {DrivingDataContext} from '~/Contexts/DrivingData';

const MapMarker = ({navigation}: DrawerProp) => {

  const {defaultInfo, setDefaultInfo} = useContext(DrivingDataContext);

  const saveLocations2 = require('./saveLocations2.json');
  let saveData = [];
  // for(let i=0; i<saveLocations2.length; i++){
  for(let i=0; i<2; i++){
    let arr = saveLocations2[i].routes[0].geometry.coordinates.map(
      (item: any[]) =>{ return {latitude: item[1], longitude: item[0]}}
    );
    saveData.push(arr);
  }

  const [poly, setPoly] = useState<number>(-1);
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });
  const [locations, setLocations] = useState<Array<IGeolocation>>([]);
  const [locationsArr, setLocationsArr] = useState<Array<any>>(saveData);
  const [time, setTime] = useState<any>();

  const [p1, setP1] = useState<number>(0);
  const [p2, setP2] = useState<number>(0);
  const [p3, setP3] = useState<number>(0);

  const [region, setRegion] = useState<any>({
    latitude: 35.896311,
    longitude: 128.622051,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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
    console.log(locationsArr[0]);
    console.log("--- --- MapMarker Mount");
    return () => {
      console.log("--- --- MapMarker return");
    };
  },[]);

  // useEffect(() => {
  //   return () => {}
  // },[ ___ ]);

  const renderItem = ({ item, index }:any) => {
    let num = 0;
    num = index;
    return (
      <SaveContainer>
        <TouchableOpacity
        style={index<2?{borderColor:"#00F", borderWidth:3}:index<4?{borderColor:"#0AA", borderWidth:3}:index<6?{borderColor:"#CA7", borderWidth:3}:{borderColor:"#CCC", borderWidth:3}} onPress={(index)=>{
          setPoly(num);
          console.log(item[0]);
          let {latitude, longitude} = item[0];
          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          })
          console.log("region");
          console.log(region);
          setP1(Math.floor(Math.random() * 15) + 1);
          setP2(Math.floor(Math.random() * 15) + 1);
          setP3(Math.floor(Math.random() * 5) + 1);
        }}>
          <Save>
            <Icon2
              name="map"
              color={'#000000'}
              size={30}
            />
          </Save>
          <SaveName numberOfLines={1}>{index}</SaveName>
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

        region={region}
      >
        {poly >= 0 && <Polyline
          coordinates={locationsArr[poly]}
          strokeWidth={3}
          strokeColor="#00f"
        />}
      </MapView>

        <TopLeftView style={{marginTop:getStatusBarHeight()}}>
          <Text>
            날짜 : {time}
          </Text>
          <Text>
            급정거  : {p1}
          </Text>
          <Text>
            급가속 : {p2}
          </Text>
          <Text>
            졸음 : {p3}
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
              setRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta - (region.latitudeDelta/2),
                longitudeDelta: region.longitudeDelta - (region.longitudeDelta/2),
              });
              console.log(region);
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
              setRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
              });
              console.log(region);
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
                  setRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta,
                  })
                  console.log(position.coords);
                  console.log("나에위치");
                },
                error => {
                  console.log(error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );
            }}
          />
        </BottomLeftView>
      


      <TopViewTEST>
        <TouchableOpacity style={{flex:1}}
          onPress={()=>removeLocationsArr()}
        >
        </TouchableOpacity>
      </TopViewTEST>
      
      <TopViewTEST2>
      <TouchableOpacity style={{flex:1}}
          onPress={()=>addLocationsArr()}
        >
        </TouchableOpacity>
      </TopViewTEST2>
      
      <Footer>
        <FlatList
        data={locationsArr}
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