import React from 'react';
import Styled from 'styled-components/native';

import Background from './Background';
import TextInput from './TextInput';

const Container = Styled.KeyboardAvoidingView`
  position: absolute;
  top: 0px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  justify-content: flex-end;
`;

interface Props {
  hideURLInput: () => void;
}

const URLInput = ({ hideURLInput }: Props) => {
  return (
    <Container behavior="padding">
      <Background onPress={hideURLInput} />
      <TextInput hideURLInput={hideURLInput} />
    </Container>
  );
};
export default URLInput;
