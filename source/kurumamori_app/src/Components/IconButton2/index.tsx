import React from 'react';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = Styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {
  icon: string;
  icon2: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
  size?: string;
}

const IconButton = ({icon, icon2, style, color, onPress, size}: Props) => {
  return (
    <>
      <Container style={style} onPress={onPress}>
        <Icon
          name={icon}
          color={color ? color : 'white'} 
          size={size ? parseInt(size) : 24}
        />
        <Icon
          name={icon2}
          color={color ? color : 'white'} 
          size={size ? parseInt(size) : 24}
        />
      </Container>
    </>
  );
};

export default IconButton;
