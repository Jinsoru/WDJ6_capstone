//텍스트를 나타내는 것(텍스트 태그)
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  font-weight: 600;
`;

const FatText = ({ text }) => <Text>{text}</Text>;

//유효성 검사
FatText.propTypes = {
  text: PropTypes.string.isRequired
};

export default FatText;
