import React, {useState} from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 4px;
  border-bottom-width: 2px;
  border-bottom-color: #000000;
`;
const Text = Styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #555;
  width: 60%;
`;

interface Props {
  title?: string;
  btnLabel: string;
  onPress?: () => void;
}

const Subtitle = ({ title, btnLabel, onPress }: Props) => {

  return (
    <Container>
      <Text>{title}</Text>
      <Button style={{flex:1, margin:4, padding:4}} label={btnLabel} onPress={onPress} />
    </Container>
  );
};
export default Subtitle;
