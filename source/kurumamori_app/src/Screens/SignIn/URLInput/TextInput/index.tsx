import React, { useContext } from 'react';
import Styled from 'styled-components/native';

import {UserContext} from '~/Contexts/User';

const Input = Styled.TextInput`
  background-color: #FFF;
  width: 100%;
  height: 100px;
  padding: 16px;
  font-size: 16px;
`;

interface Props {
  hideURLInput: () => void;
}

const TextInput = ({ hideURLInput }: Props) => {
  const BR:string = '\n';
  const { updateURL } = useContext<IUserContext>(UserContext);
  return (
    <Input
      autoFocus={true}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={"새로운 URL 입력  (예시) --> http://localhost:8000"}
      returnKeyType="done"
      placeholderTextColor="#00F"
      onSubmitEditing={({ nativeEvent }) => {
        console.log("서치 ->> ", nativeEvent.text.indexOf("http://"));
        if(nativeEvent.text.indexOf("http://") == 0){
          updateURL(nativeEvent.text);
          console.log("good > "+nativeEvent.text);
        }else{
          updateURL("http://"+nativeEvent.text);
          console.log("no > http://"+nativeEvent.text);
        }
        hideURLInput();
      }}
    />
  );
};
export default TextInput;
