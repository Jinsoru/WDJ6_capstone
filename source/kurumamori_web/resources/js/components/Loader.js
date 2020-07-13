//로딩 화면
import React from "react";
import styled, { keyframes } from "styled-components";
// import { Logo } from "./Icons";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

//로딩 퍼센트에 따른 글자 밝기 값
const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

//로딩 애니메이션
const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`;

export default () => (
    <Wrapper>
        <Loader>
            <img src="/icon/logo_curumamori.png" width="150"/>
        </Loader>   
    </Wrapper>
);
