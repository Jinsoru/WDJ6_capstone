import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableWithoutFeedback`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

const BlackBackground = Styled.View`
  background-color: #000;
  opacity: 0.75;
  width: 100%;
  height: 100%;
`;

interface Props {
  onPress: () => void;
}

const Background = ({ onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <BlackBackground />
    </Container>
  );
};
export default Background;
