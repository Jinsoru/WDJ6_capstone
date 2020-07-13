import React, {useContext, useState, useEffect} from "react";
import {AppContext} from "../../components/App";
import Axios from "axios";
import Buy from "./Buy";
import Completed from "./partial/Completed";

export default ({ history }) => {
    const { user } = useContext(AppContext);

    const [name, setName] = useState(""); //setName 이름
    const [state, setState] = useState(""); //setState 지역
    const [address, setAddress] = useState(""); //setAddress 주소
    const [postal, setPostal] = useState(""); //buy_postal 우편번호
    const [detail_address, setDetailAddress] = useState(""); //buy_detail_address 상세주소
    const [access_code, setAccessCode] = useState(""); //buy_access_code 상세주소
    const [email, setEmail] = useState(""); //buy_email 상세주소
    const [phone, setPhone] = useState(""); //buy_phone 휴대전화
    const [product_key, setProduct_key] = useState("");
    useEffect(()=>{
        setName("김영진")
        setState("대구광역시")
        setAddress("복현동360-23")
        setPostal("41234")
        setDetailAddress("청솔맨션 301호")
        setAccessCode("0310")
        setEmail("kim@youngjin.com")
        setPhone("010-7374-6119")
    },[])
        //post
    const onSubmit = async () => {
        const url = "/buy";
        const body = {
            user_id : user.id,
            name: name,
            state: state,
            address: address,
            postal: postal,
            detail_address: detail_address,
            access_code: access_code,
            email: email,
            phone: phone,
        };
        console.log
        const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
        }

        return Axios.post(url, body, config)
        .then(res => {
            if(res.data){
                setProduct_key(res.data.buy.product_key);
                history.push("/products/buy/completed");
            }
            else{
                console.log('실패');
            }
            
        });
    }

    return (
        product_key ? (
            <Completed
                product_key={product_key}
            />
            
        ) : <Buy 
        user={user}
        onSubmit={onSubmit}
        setName={setName}
        setState={setState}
        setAddress={setAddress}
        setPostal={setPostal}
        setDetailAddress={setDetailAddress}
        setAccessCode={setAccessCode}
        setEmail={setEmail}
        setPhone={setPhone}
        name={name}
        state={state}
        address={address}
        postal={postal}
        detail_address={detail_address}
        access_code={access_code}
        email={email}
        phone={phone}
        product_key={product_key}
        />
      
  );
};