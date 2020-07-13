import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';

import Toggle from '~/Screens/Bluetooth/List/Toggle';
import Subtitle from '~/Screens/Bluetooth/List/Subtitle';

import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import Button from '~/Components/Button';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Container = Styled.View`
  flex: 1;
  padding: 24px;
`;
const View = Styled.View`
  flex: 1;
`;
const RowView = Styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const FlatListContainer = Styled(FlatList)``;

const EmptyItem = Styled.View``;
const TouchableHighlight = Styled.TouchableHighlight``;

const Text = Styled.Text`
  padding: 4px;
  margin: 2px;
  background-color: #FFFFFF;
  border-color: #00F;
  text-align: center;
`;

const TestText = Styled.Text`
  position: absolute;
  right: 2%;
  bottom: 2%;
  text-align: center;
  background-color: #FFFFFF;
  margin: 2px;
  font-size: 24px;
`;

type NavigationProp = StackNavigationProp<MainThirdStackNavi, 'List'>;

interface Props {
  navigation: NavigationProp;
}

const List = ({navigation}: Props) => {

  // 안드로이드 블루투스 요청
  const androidPermissionBluetooth = () => {
    if (Platform.OS === 'android') {
      BleManager.enableBluetooth() // Android only
      .then(() => {
        console.log('android Bluetooth check OK');
      })
      .catch((error) => {
        Alert.alert('You need to enable bluetooth to use this app.');
      });
    } else if (Platform.OS === 'ios') {
      // Alert.alert('PermissionBluetooth, Android only');
    }
  };

  // 안드로이드 위치권한 요청
  const androidPermissionLocation = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // check
        if (result) {
          console.log("android LOCATION check OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // request
            if (result) {
              console.log("android LOCATION request Ok");
            } else {
              console.log("android LOCATION reject");
            }
          });
        }
      });
    } else if (Platform.OS === 'ios') {
      // Alert.alert('PermissionLocation, Android only');
    }
  };

  ////////// ////////// ////////// ////////// //////////

  const [isEnabled, setIsEnabled] = useState<boolean>(false); // blueToothEnable
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setPeripherals( new Map() );
  };

  const {defaultInfo, setDefaultInfo, linkInfo, setLinkInfo} = useContext<IDrivingData>(DrivingDataContext);
  // const {}  = useContext<IDrivingData>(DrivingDataContext);

  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);

  const [raspId, setRaspId] = useState<string>('');

  const [roll, setRoll] = useState<number>(0); // 갸웃갸웃
  const [pitch, setPitch] = useState<number>(0); // 끄덕끄덕
  const [yaw, setYaw] = useState<number>(0); // 도리도리

  const RASP_SERVICE_UUID = '13333333-3333-3333-3333-000000000000';
  const RASP_NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000001';
  const RASP_READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000002';
  const RASP_WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000003';

  const [restring, setRestring] = useState<string>("x");

  useEffect(()=>{

    // // TEST -----
    //       let myInterval = setInterval(() => {
    //         let now = new Date();
    //           let nowarr = [...linkInfo];
    //           nowarr[0] = now.getSeconds();
    //           nowarr[2] = now.getSeconds();
    //           setLinkInfo(nowarr); // 저장
    //       }, 1000);
          
    //       console.log('> List useEffect');
    //       // let _defaultInfo = [...defaultInfo];
    //       // let _defaultInfo = defaultInfo;
    //       let _defaultInfo = Object.assign({}, defaultInfo);
    //       _defaultInfo[3] = 0;
    //       // console.log(_defaultInfo);
    //       // // setDefaultInfo([2,2,2,2,2,2,2,2,2,2,2]);
    //       // setDefaultInfo([3,3,3,3,33,3,3,3,3]);
    //       // console.log(_defaultInfo);
    //       setDefaultInfo(_defaultInfo);
    // // TEST -----

    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }
    AppState.addEventListener("change", HandleAppStateChange);
    BleManager.start({showAlert: false}); // StartOptions 가능, showAlert->ios
    const HandlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', HandleDiscoverPeripheral );
    const HandlerStop = bleManagerEmitter.addListener('BleManagerStopScan', HandleStopScan );
    const HandlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', HandleDisconnectedPeripheral );
    const HandlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', HandleUpdateValueForCharacteristic );

    return() => {
      HandlerDiscoverPeripheral.remove();
      HandlerStop.remove();
      HandlerDisconnectedPeripheral.remove();
      HandlerUpdate.remove();
      AppState.removeEventListener("change", HandleAppStateChange);

      // // TEST -----
      //         console.log("--- --- MapData return");
      //         clearInterval(myInterval);
      // // TEST -----
    };
  }, []);

  ////////// ////////// ////////// ////////// //////////

  // 0. 화면 전환
  const HandleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('> App has come to the foreground!');
      // point
      // _RetrieveConnected();
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('!!! !!! Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  };
  // 1. Emitter addListener 장치 검색
  const HandleDiscoverPeripheral = (peripheral:any) => {
    console.log('> 장치 검색 성공 : ', peripheral.id);
    let _peripherals = peripherals;
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };
  // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  const HandleStopScan = () => {
    console.log('> Scanning Stop');
    setScanning(false);
  };
  // 3. Emitter addListener 연결 취소 됬을 경우
  const HandleDisconnectedPeripheral = (data:any) => {
    setRaspId('');
    console.log('> disconnect 2');
    console.log('> 연결 취소 : ' + data.peripheral);
    let _peripherals = peripherals;
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
  };
  // 4. Emitter addListener 변경
  const HandleUpdateValueForCharacteristic = (data:any) => {
    try {
      if (data){

        let str = JSON.stringify(data.value);
        setRestring(str);
        let arr = [...linkInfo];
        for(let i = 0 ; i < arr.length ; i++){
          arr[i] = data.value[i]
        }
        setLinkInfo(arr); // 저장
        // console.log(arr);
        /*
          임시 테스트 규칙
          0 -> 신고 ... 신고 119 취소 77 기본 50or0
          1 -> y
          2 -> p
          3 -> r
          4 -> 시선방향
          5 -> 좌눈
          6 -> 우눈
          8 -> 신고버튼적용 1회성
          9 -> 카운트
        */
      }
    } catch (error) {

    }
  };

  const _Scan = () => {
    if (isEnabled){
      if (!scanning) {
        // 기본 장치 값 초기화
        // setPeripherals( new Map() );
        BleManager.scan([], 2, false).then((results) => {
          setScanning(true);
          console.log('> Scanning ...');
        });
      }
    } else {
      Alert.alert("블루투스를 켜주세요");
    }
  }

  const _RetrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('> No connected peripherals');
      }
      console.log(results[0].id);
      let _peripherals = peripherals;
      for (let i = 0; i < results.length; i++) {
        let _peripheral = results[i];
        _peripheral.connected = true;
        _peripherals.set(_peripheral.id, _peripheral);
        setPeripherals( new Map(_peripherals) );
      }
    });
  }

  const _connectBtn = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.stopNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
          console.log('> stopNotification ' + peripheral.id);
        }).catch((error) => { // stopNotification
          console.log('> stopNotification error', error);
        });
        setRaspId('');
        setRestring('');
        setTimeout(() => {
          BleManager.disconnect(peripheral.id);
          console.log('> disconnect 1');
        }, 1000);
      } else {
        // try {
        //   BleManager.stopNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
        //     console.log('> stopNotification ' + peripheral.id);
        //   }).catch((error) => { // stopNotification
        //     console.log('> stopNotification error', error);
        //   });
        //   setRaspId('');
        //   setRestring('');
        // } catch (error) {
        //   console.log("크하하 에러");
        //   console.log(error);
        // }

        setTimeout(() => {

          BleManager.connect(peripheral.id).then(() => {
            let _peripherals = peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              _peripherals.set(peripheral.id, p);
              setPeripherals(new Map(_peripherals));
            }
            setRaspId(peripheral.id);
            console.log('###### Connected to ' + peripheral.id);

            setTimeout(() => {
              BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                console.log("### retrieveServices");
                console.log(peripheralInfo);
                setTimeout(() => { // 2 setTimeout
                  BleManager.startNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
                    console.log('### Started notification on ' + peripheral.id);

                      let _defaultInfo = [...defaultInfo];
                      _defaultInfo[3] = 1;
                      setDefaultInfo(_defaultInfo);

                      setTimeout(() => {
                        navigation.navigate('MainFirstStackNavi');
                      }, 2000);

                  }).catch((error) => { // startNotification
                    console.log('Notification error', error);
                  });
                }, 1000); // 2 setTimeout
                
              });
            }, 500);

          }).catch((error) => {
            console.log('> Connection error', error);
          });

        }, 1000);


      }
    }
  };

  const renderEmpty = () => {
    return (
      <LottieView
        style={{flex:1, backgroundColor:'#EFEFEF'}}
        resizeMode={'cover'}
        source={require('~/Assets/Lottie/blue2.json')}
        autoPlay
        imageAssetsFolder={'images'}
      />
    );
  }
  const renderItem = ({ item, index }:any) => {
    const color = item.connected ? '#0BF7' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { _connectBtn(item) }}>
        <RowView style={{paddingLeft:4, paddingRight:4, margin: 8, backgroundColor: color}}>
          <Icon
            style={{paddingLeft:32, paddingRight:16}}
            name="devices"
            color={'#888'}
            size={72}
          />
          <View style={item.name=="KURUMAMORI" || item.name=="raspberrypi" ?{borderWidth:1, borderColor:"#00F"}:{}}>
            <Text style={{fontSize: 16, textAlign: 'center', color: '#333333', padding: 4}}>{item.name=="KURUMAMORI" || item.name=="raspberrypi" ? "KURUMAMORI" : item.name}</Text>
            <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 2}}>{item.id}</Text>
          </View>
        </RowView>
      </TouchableHighlight>
    );
  }

  const list = Array.from(peripherals.values());
  const btnScanTitle = '장치 검색 ('+(scanning?'ON':'OFF')+')';

  return (
    <Container>
      <Toggle onValueChange={toggleSwitch} value={isEnabled} />
      <Subtitle title = {'Device List'} btnLabel={btnScanTitle} onPress={_Scan} />
      {isEnabled && <FlatListContainer
        keyExtractor={( item, index ):any => {
          return `key-${index}`;
        }}
        data={list}
        ListEmptyComponent={renderEmpty} // data 배열이 없을 경우 표시되는 컴포넌트
        renderItem={renderItem}
        contentContainerStyle={list.length === 0 && { flex: 1 }}
      />}
      {/* <ButtonContainer>
        <Button
          style={{ flex: 1 }}
          label="clear"
          onPress={() => {
            setPeripherals( new Map() );
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="url"
          onPress={() => {
            try {
              // json();
            } catch (error) {
              
            }
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label={"notify"+"\n"+"start"}
          onPress={() => {

            BleManager.startNotification(raspId, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              console.log('### Started notification on ' + raspId);
            }).catch((error) => { // startNotification
              console.log('> startNotification error', error);
            });

          }}
        />
        <Button
          style={{ flex: 1 }}
          label={"notify"+"\n"+"stop"}
          onPress={() => {

            BleManager.stopNotification(raspId, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              console.log('> stopNotification ' + raspId);
            }).catch((error) => { // stopNotification
              console.log('> stopNotification error', error);
            });

          }}  
        />
      </ButtonContainer>
      <ButtonContainer>
        <Button
          style={{ flex: 1 }}
          label="Connected"
          onPress={() => {
            _RetrieveConnected();
            console.log("id");
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="Info"
          onPress={() => {
            BleManager.retrieveServices(raspId).then((peripheralInfo) => {
              console.log("### retrieveServices");
              console.log(peripheralInfo);
            });
          }}  
        />
        <Button
          style={{ flex: 1 }}
          label="read"
          onPress={() => {
            BleManager.read(raspId, RASP_SERVICE_UUID, RASP_READ_CHARACTERISTIC_UUID)
            .then((readData) => {
              console.log('Read : ');
              console.log(readData);
              // console.log('Read: ' + readData[1]);
            })
            .catch((error) => {
              console.log(error);
            });

          }}
        />
        <Button
          style={{ flex: 1 }}
          label="wirte"
          onPress={() => {
            if(raspId != ''){
              // // 'b' array
              const test = [2,2,2,2,3,3,-1];
              BleManager.write(raspId, RASP_SERVICE_UUID, RASP_WRITE_CHARACTERISTIC_UUID, test)
              .then(() => {
                // Success code
              })
              .catch((error) => {
                // Failure code
                console.log(error);
              });
            }
          }}  
        />
      </ButtonContainer> */}
      <TestText>{restring ? restring.slice(restring.length-2, restring.length-1):""}</TestText>
    </Container>
  );
};
export default List;
