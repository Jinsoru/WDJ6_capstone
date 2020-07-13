import React, {useContext, useState, useEffect} from 'react';
import {Platform, Linking, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {UserContext} from '~/Contexts/User';
import {StackNavigationProp} from '@react-navigation/stack';

import {Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/Components/Button';
import Input from '~/Components/Input';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import URLInput from './URLInput';

const TouchableWithoutFeedback = Styled.TouchableWithoutFeedback``;
const Container = Styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #EFEFEF;
  justify-content: center;
  align-items: center;
`;
// border-width: 10px;
// border-top-width: 50px;
// border-bottom-width: 50px;
// border-color: #002EF0CC;
const View = Styled.View`
  width: 100%;
  align-items: center;
`;
const TextRowView = Styled.View`
  flex-direction: row;
`;

const KrumamoText = Styled.Text`
  font-size: 60px;
  color: #000000;
  font-weight: 900;
`;
const Ri9Text = Styled.Text`
  font-weight: 700;
  font-size: 60px;
  color: #FF0000;
`;
const FormContainer = Styled.View`
  width: 80%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = Styled.View`
  flex: 1;
  flex-direction: row;
`;
const ButtonMargin = Styled.View`
  width: 16px;
`;

const TouchableOpacityView = Styled.View`
`;
const TouchableOpacity = Styled.TouchableOpacity`
  margin: 1px;
  padding: 8px;
  border: 1px;
`;
const TouchableOpacityViewRow = Styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  flex: 1;
  margin: 1px;
  padding: 8px;
  border: 1px;
  justify-content: center;
`;

const TouchableOpacity3 = Styled.TouchableOpacity`
  flex:1;
`;
const Label = Styled.Text`
  font-size: 16px;
  text-align: center;
  color: #000000;
`;
const TopLeftView = Styled.View`
  position: absolute;
  top: 4px;
  left: 4px;
  right: 54px;
`;
const TopRighView = Styled.View`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 50px;
  height: 50px;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {URL, updateURL, login, login2} = useContext<IUserContext>(UserContext);
  let loginNum = 0;

  const [inputEmail, setInputEamil] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const [showMaster, setShowMaster] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View>
          <TextRowView>
            <KrumamoText> クルマモ</KrumamoText><Ri9Text>リ9 </Ri9Text>
          </TextRowView>
          <Icon
            style={{margin: 36}}
            name="account-circle"
            color={'#002EFF'}
            size={200}
          />
          <FormContainer>
            <Input
              style={{flex:1, backgorunColr:"#F00", marginBottom: 8}}
              placeholder={'이메일'}
              keyboardType={'email-address'}
              onChangeText={e=>setInputEamil(e)}
            />
            <Input
              style={{ marginBottom: 8 }}
              secureTextEntry={true}
              placeholder={'비밀번호'}
              onChangeText={e=>setInputPassword(e)}
            />
            <Button
              // label="Sign In"
              style={{ backgroundColor:"#DDDDDD", marginBottom: 8 }}
              label="로그인"
              onPress={()=>{
                if(inputEmail.trim() && inputPassword.trim()){
                  let inputE = inputEmail.trim();
                  let inputP = inputPassword.trim();
                  login2(inputE, inputP);
                }else{
                  Alert.alert("내용을 잘못입력했습니다");
                }
              }}
              // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
            />
            <ButtonContainer>
              <Button
                style={{ backgroundColor:"#DDDDDD" }}
                label="회원가입"
                // onPress={() => navigation.navigate('SignUp')}
                // onPress={() => Linking.openURL(URL+"/auth/signup")}
                onPress={() => Linking.openURL(URL+"/auth/register")}
              />
              {/* <ButtonMargin />
              <Button
                style={{ backgroundColor:"#DDDDDD" }}
                label="비밀번호 재설정"
                // onPress={() => navigation.navigate('ResetPassword')}
                onPress={() => Linking.openURL('https://yju.ac.kr')}
              /> */}
            </ButtonContainer>
          </FormContainer>
        </View>
        {showMaster &&
        <TopLeftView style={{marginTop: getStatusBarHeight()}}>
          <TouchableOpacityView>
            <TouchableOpacity onPress={() => setShowInput(true)}>
              <Label>
                URL : {URL}
              </Label>
            </TouchableOpacity>
            <TouchableOpacityViewRow>
              <TouchableOpacity2 onPress={()=>login('WDJ@YJU', 'password')}>
                <Label>
                  MASTER
                </Label>
              </TouchableOpacity2>
              <TouchableOpacity2 onPress={()=>updateURL("http://kurumamori.iptime.org:80")}>
                <Label>
                  reset URL{'\n'}kuru:80
                </Label>
              </TouchableOpacity2>
              <TouchableOpacity2 onPress={()=>updateURL("http://kurumamori.iptime.org:8080")}>
                <Label>
                  reset URL{'\n'}kuru:8080
                </Label>
              </TouchableOpacity2>
            </TouchableOpacityViewRow>
          </TouchableOpacityView>
        </TopLeftView>}
        <TopRighView style={{marginTop: getStatusBarHeight()}}>
          <TouchableOpacity3 onPress={()=>setShowMaster(!showMaster)}/>
        </TopRighView>
      {showInput && <URLInput hideURLInput={() => setShowInput(false)} />}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;