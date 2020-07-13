//버튼 태그 역할
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//버튼 박스
const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

//Button함수에 인자로 text받은 값이 있으면 그 값을 Container태그의 value로 주기
const Button = ({ text }) => <Container>{text}</Container>;

//유효성 검사
Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
