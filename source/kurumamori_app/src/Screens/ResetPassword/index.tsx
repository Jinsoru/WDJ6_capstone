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

const ResetPassword = () => {
  return (
    <Container>
      <Text
        onPress={() => {
            Linking.openURL('https://yju.ac.kr');
        }}>
        비밀번호 재설정
      </Text>
    </Container>
  );
};

export default ResetPassword;
