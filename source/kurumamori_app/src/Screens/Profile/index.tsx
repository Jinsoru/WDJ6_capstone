import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContext} from '~/Contexts/User';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '~/Components/Button';

const Container = Styled.View`
  flex: 1;
  align-items: center;
  padding-top: 24px;
  background-color: #EFEFEF;
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
  color: #000;
  font-size: 24px;
`;
const Text = Styled.Text`
  color: #555;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;
const BR:string = '\n';

const CRUDButtonContainer = Styled.View`
  background-color: #00F;
  position: absolute;
  right: 12px;
  bottom: 24px;
  padding: 4px;
  border-radius: 12px;
`;

type NavigationProp = StackNavigationProp<MainSecondStackNavi, 'Profile'>;

interface Props {
  navigation: NavigationProp;
}

const Profile = ({navigation}: Props) => {
  const {userInfo2, profileSearchRes, profileSearch} = useContext<IUserContext>(UserContext);

  useEffect(() => {
    console.log("--- --- Profile");
    if(userInfo2){
      if(userInfo2.key != -1 && userInfo2.key != undefined){
        profileSearch();
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
          <Label>회원 정보</Label>
        </LabelContainer>
        {profileSearchRes ? 
          <>
            <Text>
              이름 : {profileSearchRes[0].name ? profileSearchRes[0].name.toString() : ""}
            </Text>
            <Text>
              성별 : {profileSearchRes[0].gender ? profileSearchRes[0].gender.toString() : ""}
            </Text>
            <Text>
              생일 : {profileSearchRes[0].birth ? profileSearchRes[0].birth.toString() : ""}
            </Text>
            <Text>
              연락처 : {profileSearchRes[0].phone ? profileSearchRes[0].phone.toString() : ""}
            </Text>
          </>
          :
          <>
            <Text>
              이름 : 
            </Text>
            <Text>
              성별 : 
            </Text>
            <Text>
              생일 : 
            </Text>
            <Text>
              연락처 : 
            </Text>
          </>
        }
      </BackContainer>

      <BackContainer>
        <LabelContainer>
          <Label>비상연락망</Label>
        </LabelContainer>
        <Text>
          연락처 : {profileSearchRes && profileSearchRes[1] ? profileSearchRes[1] : "" }
        </Text>
      </BackContainer>

      <BackContainer>
        <LabelContainer>
          <Label>의료 정보</Label>
        </LabelContainer>
        {profileSearchRes && profileSearchRes[2] ? 
          <>
            <Text>
              다니는 병원 : {profileSearchRes[2].hospital}
            </Text>
            <Text>
              병력 : {profileSearchRes[2].sickness_name}
            </Text>
            <Text>
              복용 약 : {profileSearchRes[2].medicine}
            </Text>
            <Text>
              증상 : {profileSearchRes[2].symptom}
            </Text>
          </>
          :
          <>
            <Text>
              다니는 병원 : 
            </Text>
            <Text>
              병력 : 
            </Text>
            <Text>
              복용 약 : 
            </Text>
            <Text>
              증상 : 
            </Text>
          </>
        }
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>손해보험사</Label>
        </LabelContainer>
        {profileSearchRes && profileSearchRes[3] && profileSearchRes[4] ?
          <>
            <Text>
              보험사 : {profileSearchRes[3].insurance_name}
            </Text>
            <Text>
              연락처 : {profileSearchRes[3].insurance_phone}
            </Text>
            <Text>
              가입일 : {profileSearchRes[4].subscription_date}
            </Text>
            <Text>
              만기일 : {profileSearchRes[4].expiration_date}
            </Text>
          </>
          :
          <>
            <Text>
              보험사 : 
            </Text>
            <Text>
              연락처 : 
            </Text>
            <Text>
              가입일 : 
            </Text>
            <Text>
              만기일 : 
            </Text>
          </>
        }
      </BackContainer>
      
      {/* <Button label="Open Full Modal" onPress={() => navigation.navigate('FullModal')} /> */}
      {/* <CRUDButtonContainer>
        <Button style={{flex:1, padding:8}} color='#000' label="업데이트" onPress={() => {
          navigation.navigate("InfoList", {
            id: 123,
            // memo: 'abc',
            memo: ['abc',],
            list: ['회원정보','비상연락망','의료 정보','손해보험사']
          });
        }} />
      </CRUDButtonContainer> */}
    </Container>
  );
};

export default Profile;
