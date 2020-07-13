//input태그 역할
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//인풋 상자
const Container = styled.input`
  border: 0;
  width: 95%;
  border: 1px solid #ced4da;
  border-radius: .25rm;
  background-color: #fff;
  height: 35px;
  font-size: 16px;
  padding: 0px 15px;
`;

//input함수에 인자로 받은 값들을 Container태그에 알맞은 값으로 주기
const Input = ({
  placeholder, //설명 값
  required = true, //반드시 입력되어야하는지를 묻는 값( ex - 주소는 반드시 입력되어야합니다.(유효성 검사))
  value, //입력 값
  onChange, //변화가 일어나면 실행할 것들(즉, 입력해서 값이 바뀌면 실행)
  type = "text", //입력 값의 유효성검사
  className
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    className={className}
  />
);

//유효성검사
Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default Input;
