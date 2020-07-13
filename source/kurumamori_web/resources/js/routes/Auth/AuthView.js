import React, {useState} from "react";
import styled from "styled-components";
import Input from "../../components/Input";
// import Button from "../../components/Button";
import FatText from "../../components/FatText";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Auth.css";

const Wrapper = styled.div`
  min-height:90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
//로고 이미지 센터
const Img_center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
//login box
const LoginBox = styled.div`
  margin-top: 110px;
  text-align: center;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  background-color: white;
  width: 100%;
  max-width: 550px;
`;

//Register box
const RegisterBox = styled.div`
  margin-top: 70px;
  text-align: center;
  border: 1px solid #e6e6e6;
  border-radius: 0px;
  background-color: white;
  width: 100%;
  max-width: 500px;
`;
const ConfirmBox = styled.div`
  margin-top: 150px;
  text-align: center;
  border: 1px solid #e6e6e6;
  border-radius: 0px;
  background-color: white;
  width: 100%;
  max-width: 500px;
`

// 로그인 회원가입 컨펌코드입력창 체인저
const StateChanger = styled.div`
  text-align: center;
  padding: 20px 0px;
`;
//
const Link_qwe = styled.span`
  color: blue;
  cursor: pointer;
`;
//로그인 폼
const LoginForm = styled(LoginBox)`
  padding: 40px;
  
`;
//회원가입 폼
const RegisterForm = styled(RegisterBox)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
`;

//승인코드 폼
const ConfirmForm = styled(ConfirmBox)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
`

export default ({
  action,
  setAction,
  // email,
  setEmail,
  // password,
  setPassword,
  // password_check,
  setPassword_check,
  // name,
  setName,
  // birth,
  setBirth,
  gender,
  setGender,
  // phone,
  setPhone,
  onSubmit,
  setConfirm_code,
  danger_message,
  setDanger_message,
}) => {
  const { handleSubmit, register, errors, watch } = useForm();
  const input_form = {
    width: "100%",
    border: '1px solid #d1d3e2',
    paddingLeft:"5px",
  }
  const [sub_status, setSub_status] = useState(false);

  return (
    <Wrapper>
      {action === "login" ? (
//로그인
        <LoginForm>
          {/* 로고 이미지 */}
          <div style={{}}>
            <Img_center>
              <Link to="/">
                <img src="/icon/logo_curumamori.png" style={{width:"250px", marginBottom:"10px"}}/>
              </Link>
            </Img_center>
          </div>

          <h2 style={{fontWeight:"bold", color:"black"}}>{action === "login" ? "SignIn" : "SignUp"}</h2>
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend" style={{width:"100%"}}>
                  <div className="input-group-text text-center">
                    <span className="fa fa-user"/>
                  </div>
                  <input 
                      name ="email" 
                      placeholder={"UserEmail"}
                      style={input_form}
                      onChange={ e => {
                        const {
                          target: { value }
                        } = e;
                        setEmail(value);
                      }}
                      ref={register({
                        required: "Required",
                      })} 
                  />
                </div>
              </div>
            </div>
            <p className="text-danger">
              {errors.email && errors.email.message}
            </p>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend" style={{width:"100%"}}>
                  <div className="input-group-text text-center">
                    <span className="fa fa-lock"/>
                  </div>
                  <input 
                    name ="password" 
                    type="password"
                    placeholder={"Password"}
                    style={input_form}
                    onChange={ e => {
                      const {
                        target: { value }
                      } = e;
                      setPassword(value);
                    }}
                    ref={register({
                      required: "Required"
                    })}
                  />
                </div>
              </div>
            </div>
            <p className="text-danger">
              {errors.password && errors.password.message}
              {danger_message ? danger_message : null}
            </p>
            <div className="form-group">
              <button className="btn btn-primary btn-lg btn-block">
                로그인
              </button>
            </div>
          </form>
        </LoginForm>
      ) : action === 'register' ? (
//회원가입
        <RegisterForm>
          {/* 로고 이미지 */}
          <Img_center>
            <Link to="/">
              <img src="/icon/logo_curumamori.png" style={{width:"350px", marginBottom:"10px"}}/>
            </Link>
          </Img_center>
          <h2 style={{fontWeight:"bold", color:"black"}}>{action === "login" ? "SignIn" : "SignUp"}</h2>
          <br/>
          {/* 제출 폼 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-center" style={{color:"black"}}>로그인 정보</h5>
            <br />
            
            {/* 이메일 */}
            <div className="form-group">
              <input 
                name ="email"
                type="email"
                placeholder={"이메일"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setEmail(value);
                }}
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "이메일 형식(@)이 아닙니다."
                  }
                })} 
              />
              <p className="text-danger">
                {errors.email && errors.email.message}
              </p>
            </div>
            {/* 비밀번호 */}
            <div className="form-group">
              <input 
                name ="password"
                type="password"
                placeholder={"비밀번호"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setPassword(value);
                }}
                ref={register({
                  required: "Required"
                })}
              />
              <p className="text-danger">
                {/* {errors.password && errors.password.type === "required" ? "빈칸을 채워주세요" : ""} */}
                {errors.password && errors.password.message}
              </p>
            </div>
            {/* 비밀번호 체크 */}
            <div className="form-group">
              <input 
                name ="password_confirmation"
                type="password"
                placeholder={"비밀번호 확인"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setPassword_check(value);
                }}
                ref={register({
                  required: "Required",
                  validate: (value) => {
                    // console.log(watch('password'));
                    // console.log(value);
                    return value === watch('password');
                  }
                })}
              />
              <p className="text-danger">
                {errors.password_confirmation && errors.password_confirmation.type === "validate" ? "비밀번호가 맞지않습니다" : ""}
                {/* {errors.password_confirmation && errors.password_confirmation.type === "required" ? "빈칸을 채워주세요" : ""} */}
                {errors.password_confirmation && errors.password_confirmation.message}
              </p>
            </div>
            <hr />
            <h5 className="text-center" style={{color:"black"}}>유저 정보</h5>
            <br />
            {/* 이름 */}
            <div className="form-group">
              <input 
                name ="name" 
                placeholder={"이름"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setName(value);
                }}
                ref={register({
                  required: "Required"
                })}
              />
              <p className="text-danger">
                {errors.name && errors.name.message}
              </p>
            </div>
            {/* 생년월일 */}
            <div className="form-group">
              <input 
                name ="birth" 
                placeholder={"생년월일"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setBirth(value);
                }}
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{4}-(0[1-9]|1[012])-(0[1-3]|1[0-9])/,
                    message: "올바른 생년월일 형식이 아닙니다."
                  }
                })}
              />
              <p className="text-danger">
                {errors.birth && errors.birth.message}
              </p>
            </div>
            {/* 휴대폰 번호 */}
            <div className="form-group">
              <input 
                name ="phone" 
                placeholder={"휴대폰 번호"}
                style={input_form}
                onChange={ e => {
                  const {
                    target: { value }
                  } = e;
                  setPhone(value);
                }}
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{3}-[0-9]{4}-[0-9]{4,4}/,
                    message: "올바른 휴대폰 번호 형식이 아닙니다."
                  }
                })}
              />
              <p className="text-danger">
                {errors.phone && errors.phone.message}
              </p>
            </div>

            <div className="form-group text-center">
              <fieldset>
                남성
                <input type="radio" name="gender" ref={register({})} onClick={() => setGender("남")}/>
                여성
                <input type="radio" name="gender" ref={register({})} onClick={() => setGender("여")}/>
              </fieldset>
            </div>
            {/* {console.log(watch('gender'))} */}
            {/* {watch('gender') ? "" : "성별을 선택해주세요."} */}
            
            {/* 제출 버튼을 눌렀는데 성별을 선택하지 않았으면 */}
            {sub_status && !gender ? (
              <p className="text-danger">
                성별을 입력해주세요
              </p>
            ) : "" }
              {console.log(sub_status)}
            {/* 에러메시지 */}
            <p className="text-danger">
              {danger_message}
            </p>
            <div className="form-group">
              <button className="btn btn-primary btn-lg btn-block" onClick={()=> setSub_status(true)}>가입하기</button>
            </div>
          </form>
        </RegisterForm>
      ) : action === 'confirm' ? (
// 컨펌코드
        <div>
          <ConfirmForm>
            {/* 로고 이미지 */}
            <Img_center>
              <Link to="/">
                <img src="/icon/logo_curumamori.png" style={{width:"250px"}}/>
              </Link>
            </Img_center>
            <h2>승인코드 입력</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group text-center">
                <h5 style={{color:"black"}}>이메일로 보낸 승인코드를 입력해 주세요</h5>
                <input 
                    name ="confirm_code" 
                    placeholder={"승인코드 입력"}
                    style={input_form}
                    onChange={ e => {
                      const {
                        target: { value }
                      } = e;
                      setConfirm_code(value);
                    }}
                    ref={register({
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{4,4}/i,
                        message: "승인코드를 다시 확인해주세요."
                      }
                    })} 
                />
              </div>
              {danger_message ? (
                <div className="text-danger">
                  {danger_message}
                </div>
                ) : null}
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-block">확인</button>
              </div>
            </form>
          </ConfirmForm>
        </div>
      ) : (
        <div>
          로그인 중입니다....
        </div>
      )}
        
      {/* 입력창 체인저 */}
      <StateChanger>
        {action === "login" ? (
          <>
            계정이 없습니까?{" "}
            <Link to="/auth/register">
              <Link_qwe onClick={() => setAction('register')}>회원가입</Link_qwe>
            </Link>
          </>
        ) : action === 'register' ? (
          <>
            로그인 하시겠습니까?{" "}
            <Link to="/auth/login">
              <Link_qwe onClick={() => setAction("login")}>로그인</Link_qwe>
            </Link>
          </>
        ) : null}
      </StateChanger>
      <br/>
      <br/>
    </Wrapper>
  );
};
