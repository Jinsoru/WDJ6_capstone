import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border-width: 1px;
  border-color: #000000;
`;
const InputField = Styled.TextInput`
  flex: 1;
  width: 100%;
  color: #292929;
  margin: 0px;
  padding: 0px;
`;

interface Props {
  placeholder?: string;
  // 기본, 이메일, numeric(정수 또는 소수값 가능한 숫자), 십진패드
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  onChangeText?: (text: string) => void;
}

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
}: Props) => {
  
return (
  <Container style={style}>
    <InputField
      // defaultValue 초기 값
      // multiline 여러줄 입력
      // editable 수정가능한가
      // maxLength 문자수 넘어가면 깜빡임 처리 number값
      // onBlur() // 포커스 잃으면 실행
      // onfocus() // 포커스 얻으면 실행
      // onSubmitEditing() 완료시 호출
      // onchange 교체시 호출
      multiline={false}
      selectionColor="#292929" // 내용을 복사하거나 붙여 넣기 위해 사용하는 색상
      secureTextEntry={secureTextEntry} // 입력 내용을 숨길지 여부를 설정
      keyboardType={keyboardType ? keyboardType : 'default'} // 입력 타입을 설정
      autoCapitalize="none" // 대문자 자동 변경
      autoCorrect={false} // 스펠링 교정
      allowFontScaling={false} // 단말기 설정을 통해 수정한 폰트 크기를 적용할지
      placeholderTextColor="#999" // 입력 내용이 없는 동안 보여줄 색상
      placeholder={placeholder} // 입력 내용이 없는 동안 보여줄 내용
      clearButtonMode={clearMode ? 'while-editing' : 'never'} // 입력 내용이 있을 때, 우측에 전체 삭제 버튼 여부
      onChangeText={onChangeText} // 입력창의 내용이 변경될 때 호출되는 콜백
      // onSubmitEditing={({ nativeEvent }) => {

      //   const Data = createContext<IContext>(
      //     addData:(data: string):viod => {},
      //   )
      //   addData(nativeEvent.text);
      // }}
    />
  </Container>
  );
};

export default Input;
