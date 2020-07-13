import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { Text, Button } from 'react-native';
import {DrivingDataContext} from '~/Contexts/DrivingData';
import IconButton from '~/Components/IconButton';
import ReactInterval from 'react-interval';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #EFEFEF;
`;
const TextNew = Styled.Text`
  font-size: 32px;
`;
const TextOld = Styled.Text`
  font-size: 30px;
  color: #FF0000;
`;
const View = Styled.View`
  background-color: #00F3;
  height: 55%;
  width: 90%;
  margin-top: 40px;
  margin-bottom: 5%;
`;

const DrivingButtonContainer = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 10px;
  border-width: 3px;
  bottom: 2%;
  right: 4%;
  padding: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
`;
const DeviceButtonContainer = Styled.View`
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 10px;
  border-width: 3px;
  bottom: 2%;
  left: 4%;
  padding: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
`;
const Bt = Styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const BtLabel = Styled.Text`
  font-size: 20px;
  font-weight: 900;
`;

const TText = Styled.Text`
  color: #080;
  font-size: 24px;
  font-weight: 900;
`;
// color: #EFEFEF;

type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {

  const {defaultInfo} = useContext<IDrivingData>(DrivingDataContext);
  useEffect(() => {
  },[]);

  return (
    <Container>
        {defaultInfo[3] == 1? (
          <TextNew>
            안전하게 달려볼까요 ~!
          </TextNew>
        ):(
          <TextOld>
            블루투스를 연결해 주세요
          </TextOld>
        )}
      <View>
        <LottieView
          style={{flex:1, backgroundColor:'#EFEFEF'}}
          resizeMode={'contain'}
          source={require('~/Assets/Lottie2/main_car.json')}
          autoPlay={true}
          imageAssetsFolder={'images'}
        />
      </View>
      <DeviceButtonContainer style={{borderColor: defaultInfo[3] == 1?'#000000':'#111111'}}>
        <Bt
          onPress={() => {
            if(defaultInfo[3] != 1){
              navigation.navigate('MainThirdStackNavi');
            } else {
            }
          }}
        >
          {defaultInfo[3] == 1? (
            <IconButton
              style={{
                backgroundColor: "#FFFFFF",
              }}
              size="72"
              icon="bluetooth-connect"
              color="#0000FF"
              onPress={() => {
                navigation.navigate('MainThirdStackNavi');
              }}
            />
          ) : (
            <IconButton
              style={{
                backgroundColor: "#FFFFFF",
              }}
              size="72"
              icon="bluetooth-off"
              color="#000000"
              onPress={() => {
                navigation.navigate('MainThirdStackNavi');
              }}
            />
          )}
          <BtLabel>{defaultInfo[3] == 1?'페어링':'신호없음'}</BtLabel>
        </Bt>
      </DeviceButtonContainer>
      <DrivingButtonContainer style={{borderColor: defaultInfo[4] == 1?'#000000':'#000000'}}>
        <Bt
          onPress={() => {
            if(defaultInfo[3] == 1){
              navigation.navigate('MapTabNavi');
            }
            else{
              navigation.navigate('MainThirdStackNavi');
            }
          }}
        >
          {defaultInfo[3] == 1? (
            <IconButton
              style={{
                backgroundColor: "#FFFFFF",
              }}
              size="72"
              icon="car"
              color="#008800"
              onPress={() => {
                navigation.navigate('MapTabNavi');
              }}
            />
          ) : (
            <IconButton
              style={{
                backgroundColor: "#FFFFFF",
              }}
              size="72"
              icon="car"
              color="#000000"
              onPress={() => {
                if(defaultInfo[3] == 1){
                  navigation.navigate('MapTabNavi');
                }
                else{
                  navigation.navigate('MainThirdStackNavi');
                }
              }}
            />
          )}
          <BtLabel>{defaultInfo[4] == 1?'운전중':'운전하기'}</BtLabel>
        </Bt>
      </DrivingButtonContainer>
    </Container>
  );
};

export default Driving;
