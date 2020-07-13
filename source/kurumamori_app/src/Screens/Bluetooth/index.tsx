import React, {useContext, useEffect} from 'react';
import Styled from 'styled-components/native';
import List from '~/Screens/Bluetooth/List';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  background-color: #EFEFEF;
`;

type NavigationProp = StackNavigationProp<MainThirdStackNavi, 'List'>;

interface Props {
  navigation: NavigationProp;
}

const Bluetooth = ({navigation}: Props) => {

  useEffect(() => {
    console.log("--- --- Bluetooth");
  }, []);

  return (
    <Container>
      <List navigation={navigation} />
    </Container>
  );
};

export default Bluetooth;
