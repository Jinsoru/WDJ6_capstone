import React, { useState, useContext} from "react";
import { toast } from "react-toastify";
import AuthView from "./AuthView";
import Axios from "axios";
import {AppContext} from "../../components/App";

export default ({ location, history }) => {
  const {setUser, setIsLoggedIn} = useContext(AppContext);
  // console.log(isLoggedIn);  

//현재 로그인인지 회원가입인지 등의 상태
  let [action, setAction] = useState(
    location.pathname === "/auth/login" ? "login": location.pathname === "/auth/register" ? "register" : "logout"
  );      
  // console.log(action);
  const [email, setEmail] = useState("");                     //이메일
  const [password, setPassword] = useState("");               //비밀번호
  const [password_check, setPassword_check] = useState("");   //비밀번호 확인
  const [name, setName] = useState("");                       //이름
  const [birth, setBirth] = useState("");                     //생년월일
  const [phone, setPhone] = useState("");                     //휴대폰 번호
  const [gender, setGender] = useState("");                   //성별
  const [confirm_code, setConfirm_code] = useState("");       //승인코드
  const [danger_message, setDanger_message] = useState("");   //경고메시지
  //회원가입 함수
  const addUser = async () => {
    const url = "/api/register";
    const body = {
      email: email,
      password: password,
      // password_check: password_check,
      name: name,
      birth: birth,
      gender: gender,
      phone: phone
    };
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    return Axios.post(url, body, config)
      .then(res => {
        //회원가입 성공시
        console.log(res);
        if (res.data.error){
          if(res.data.error == "users_email_unique"){
            setDanger_message("이미 가입한 이메일입니다");
          }
          else if(res.data.error == "users_phone_unique"){
            setDanger_message("이미 가입한 휴대폰 번호입니다.");
          }
        }
        else {
          //로그인 창으로 이동
          setAction("confirm");
        }
    });;
  }

  //로그인 함수
  const loginUser = async () => {
    const url = "/api/login";
    const body = {
      email: email,
      password: password,      
    };
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    
    // const defaults = {headers: headers};
    // const options = Object.assign({}, defaults, url, body);

    return Axios.post(url, body, config)
      .then(res => {
        console.log(res);

        if(res.data.token){
          localStorage.setItem('userToken', res.data.token);

          history.push('/');
          setIsLoggedIn(true);
        }
        else{
          setDanger_message("잘못된 이메일 또는 비밀번호 입니다.");
        }
        
      });
  }


  //승인코드 확인 함수
  const check_confirm_code = async () =>{
    const url = "/confirm";
    const body = {
      email: email,
      password: password,
      confirm_code :confirm_code
    };
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    return Axios.post(url, body, config)
    .then(res => {
      console.log(res);
      // console.log(res);
      if(res.data.token){
        // let userData = {
        //   // name: res.data.name,
        //   // id: res.data.id,
        //   // isLoggedIn: res.data.isLoggedIn,
        //   token: res.data.token,
        //   // timestamp: new Date().toString()
        // };

        // localStorage["userToken"] = JSON.stringify(userData);
        localStorage.setItem('userToken', res.data.token);
        // console.log(User);
        // setAction("");
        history.push('/');
        setIsLoggedIn(true);
        // console.log(isLoggedIn);
      }
      else{
        setDanger_message("잘못된 이메일 또는 비밀번호 입니다.");
      }
      
    });;;
  }

  //로그아웃일 때
  if(action === "logout"){
    console.log("good");
    localStorage.removeItem("userToken");
    history.push("/");
    setUser(false);
    setIsLoggedIn(false);
  }

  //회원가입이나 로그인 버튼 클릭시
  const onSubmit = async e => {
    // e.preventDefault();

    //로그인 창일 때
    if(action === "login"){
      // console.log("login");
      if(email !== "" && password !== ""){
        loginUser();
      }
    }
    else if(action === "register"){
      // console.log(email);

      //값을 전부 입력한 경우
      if (
        email !== "" &&
        password !== "" &&
        password_check !== "" &&
        name !== "" &&
        birth !== "" &&
        gender !== "" &&
        phone !== ""
      ) {
        try {
          //비밀번호 체크
          // if (password !== password_check) {
          //   toast.error("비밀번호 확인이 맞지않습니다.");
          //   return;
          // }

          //회원가입 요청
          addUser();
        } catch (error) {
          console.log("메일건 오류");
        }
      }
      //값을 다 넣지 않은 경우
      else {
        toast.error("값을 전부 넣어주세요!");
      }
    }
    //액션이 승인코드 입력일 때
    else if(action = "confirm"){
      check_confirm_code();
    }
  };

  return (
      <AuthView
      action={action}
      setAction={setAction}
      // email={email} 
      setEmail={setEmail}
      // password={password}
      setPassword={setPassword}
      // password_check={password_check}
      setPassword_check={setPassword_check}
      // name={name}
      setName={setName}
      // birth={birth}
      setBirth={setBirth}
      gender={gender}
      setGender={setGender}
      // phone={phone}
      setPhone={setPhone}
      onSubmit={onSubmit}
      setGender={setGender}
      setConfirm_code={setConfirm_code}
      danger_message={danger_message}
      setDanger_message={setDanger_message}
      />
  );
};