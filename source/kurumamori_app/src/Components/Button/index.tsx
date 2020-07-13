import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 8px;
  border-width: 1px;
  border-color: #000000;
`;
const Label = Styled.Text`
  font-size: 16px;
`;

interface Props {
  label: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
}

const Button = ({label, style, color, onPress}: Props) => {
  return (
    <Container style={style} onPress={onPress}>
      <Label style={{ color: color ? color:'#000000' }}>{label}</Label>
    </Container>
  );
};

export default Button;
