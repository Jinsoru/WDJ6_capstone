//useInput함수(값을 변경할 수 있게 onChange를 달아줌)
import { useState } from "react";

export default defaultValue => {
  const [value, setValue] = useState(defaultValue);

  //입력한 값으로 바꿔주는 함수
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };
  //userInput으로 값을 초기화하면 그 값 + onChange함수가 달려서 리턴됨
  return { value, onChange, setValue };
};
