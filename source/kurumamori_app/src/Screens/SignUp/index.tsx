import React from 'react';
import Styled from 'styled-components/native';

import {Linking} from 'react-native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

const SignUp = () => {
  return (
    <Container>
      <Text
        onPress={() => {
          Linking.openURL('https://yju.ac.kr');
        }}>
        회원가입
      </Text>
    </Container>
  );
};

export default SignUp;
