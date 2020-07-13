import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';

import {DrivingDataContext} from '~/Contexts/DrivingData';
import {UserContext} from '~/Contexts/User';

import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  background-color: #EFEFEF;
  padding-top: 24px;
  padding-bottom: 24px;
`;
const BackContainer = Styled.View`
  width: 80%;
  background-color: #FCFCFC;
  margin-top: 8px;
  padding: 12px;
  border-width: 1px;
  margin-bottom: 16px;
  border-color: #AAAA;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
`;
const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const Label = Styled.Text`
  color: #000000;
  font-size: 24px;
`;
const Text = Styled.Text`
  color: #555;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;
const View = Styled.View`
  flex: 1;
  width: 80%;
  margin-top: 16px;
`;
const ViewCenter = Styled.View`

`;

const TouchableOpacity = Styled.TouchableOpacity``;

const BR:string = '\n';

type NavigationProp = StackNavigationProp<MainFourthStackNavi, 'Setting'>;

interface Props {
  navigation: NavigationProp;
}

const Setting = ({navigation}: Props) => {
  const {userInfo2, settingSearchRes, settingSearch} = useContext<IUserContext>(UserContext);
  const {drivingDelete} = useContext(DrivingDataContext);

  useEffect(() => {
    console.log("--- --- Setting");
    if(userInfo2){
      if(userInfo2.key != -1 && userInfo2.key != undefined){
        settingSearch();
      }
    }
    return () => {
      console.log("--- --- MapTest return");
    };
  },[]);

  return (
    <Container>
      <BackContainer>
        <LabelContainer>
          <Label>기기 정보</Label>
        </LabelContainer>
        {settingSearchRes ? 
          <>
            <Text>
              기기 코드 : {settingSearchRes.product_key}
            </Text>
            <Text>
              구입 날짜 : {settingSearchRes.created_at.slice(0,10)}
            </Text>
          </>
          :
          <>
            <Text>
              기기 코드 :
            </Text>
            <Text>
              구입 날짜 :
            </Text>
          </>

        }
            
      </BackContainer>
      <BackContainer>
        <TouchableOpacity onPress={()=>drivingDelete()}>
          <LabelContainer>
            <Label>이용약관</Label>
          </LabelContainer>
            <Text>
            본 약관은 쿠루마모리가 제공하는 
            </Text>
            <Text>
            모든 서비스의 이용조건 및 절차, 
            </Text>
            <Text>
            이용자와 당 사이트의 권리, 의무,
            </Text>
            <Text>
            책임사항과 기타 필요한 사항을
            </Text>
            <Text>
            규정함을 목적으로 합니다.
            </Text>
        </TouchableOpacity>
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>버전 정보</Label>
        </LabelContainer>
        <Text>
          현재버전 : 1. 0. 2
          {BR}
          최신버전 : 1. 0. 2
        </Text>
      </BackContainer>
      <View>
        <LottieView
            style={{flex:1, backgroundColor:'#EFEFEF'}}
            resizeMode={'contain'}
            source={require('~/Assets/Lottie/dev1.json')}
            autoPlay
            imageAssetsFolder={'images'}
          />
      </View>
    </Container>
  );
};

export default Setting;
