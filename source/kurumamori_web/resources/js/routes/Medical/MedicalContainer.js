import React, { useEffect, useState, useContext, createContext } from "react";
import {AppContext} from "../../components/App";
import Axios from 'axios';
import MedicalView from "./MedicalView";

export const MedicalContext = createContext();

export default ({history}) => {
    const { user } = useContext(AppContext);
    let [form, setForm] = useState("");
    //drop_down list
    const sickness_list = ["없음", "고혈압", "당뇨", "결핵", "심장질환", "알러지", "천식", "심부전증", "페렴", "디스크", "간경화", "관절염", "협심증", "암", "갑상선염", "고지혈증", "골다공증", "과민성 대장", "기관지염", "뇌졸중", "신장질환", "간암"];
    const blood_type_list = ["A형", "B형", "AB형", "O형"];
    const [insurance_name_list, setInsurance_name_list]= useState("");
    // const [insurance_phone_list, setInsurance_phone_list]= useState("");
    
    //기저질환 관련(past_sickness)
    const [past_sickness_name, setPast_sickness_name] = useState([]);
    const [past_sickness_supplementation, setPast_sickness_supplementation] = useState("");
   
    //현재질환 관련(sickness)
    const [sickness_name, setSickness_name] = useState([]);
    const [medicine, setMedicine] = useState("");
    const [symptom, setSymptom] = useState("");
    const [hospital, setHospital] = useState("");

    //기본 의료정보(medical_info)
    const [medical_id, setMedical_id] = useState("");
    const [blood_type, setBlood_type] = useState("");
    const [disability_status, setDisability_status] = useState(false);
    const [report_request, setReport_request] = useState("");
    const [guardian_phone, setGuardian_phone] = useState("");
    //보험사 정보(insurance)
    const [insurance_bool, setInsurance_bool] = useState(false);
    const [insurance_phone, setInsurance_phone] = useState(false);
    const [insurance_name, setInsurance_name] = useState("");
    const [subscription_date, setSubscription_date] = useState("");
    const [expiration_date, setExpiration_date] = useState("");


    //에러 메시지
    const [blood_type_message, setBlood_type_message] = useState("");
    const [insurance_name_message, setInsurance_name_message] = useState("");
    const [subscription_date_message, setSubscription_date_message] = useState("");
    const [expiration_date_message, setExpiration_date_message] = useState("");
    
    const validation = () => {
        //validation
        // if(!blood_type){
        //     setBlood_type_message("필수 항목입니다.");
        //     return null;
        // }

        // if(insurance_bool){
        //     setInsurance_name_message(insurance_name ? "" : "필수항목입니다.");
        //     setSubscription_date_message(subscription_date ? "" : "필수항목입니다.");
        //     setExpiration_date_message(expiration_date ? "" : "필수항목입니다.");
        //     if(subscription_date_message){
        //         setSubscription_date_message(expiration_date >= subscription_date ? "" : "필수항목입니다.");
        //     }

        //     if(insurance_name && subscription_date && expiration_date && expiration_date ){
        //         onSubmit();
        //     }else{
        //         return null;
        //     }
        // }else if(blood_type){
            onSubmit();
        // }
    }

    const onSubmit = () => {
        past_sickness_name == "없음" ? setPast_sickness_name([]) :  past_sickness_name;
        sickness_name == "없음" ? setSickness_name([]) :  sickness_name;

        const body = {
            user_id : user.id,
            past_sickness_name,
            past_sickness_supplementation,
            sickness_name,
            medicine,
            symptom,
            hospital,
            medical_id,
            blood_type,
            disability_status,
            report_request,
            guardian_phone,
            insurance_bool,
            insurance_name,
            subscription_date,
            expiration_date
        }
        const config = {
            headers: {
                'Content-Type' : 'application/json'
              }
        }

        if(form == "create"){
            const url = "/info/medical_info"
            return Axios.post(url, body, config).then( res => {
                if(res.data.success){
                    window.alert("의료정보를 등록하였습니다.");
                    setForm("view");
                }
            })
        }else if(form == "update"){
            const url = `/info/medical_info/${medical_id}`;
            return Axios.post(url, {
                data : body,
                _method: 'patch',
            }, config).then( res => {
                if(res.data.success){
                    history.push("/info/medical_info");
                }
            })
        }
    }
    console.log(form);
    //값 받기
    useEffect(()=>{
        console.log("medical useEffect");
        Axios.get(`/info/medical_info/${user.id}`).then(res => {
            if(user.id){
                // url이 edit면
                if(location.pathname.split('/')[4] == "edit"){
                    setForm("update");
                }
                //의료정보가 있으면
                else if(res.data.medical_info){
                    setForm("view");
                }
                //의료정보가 없으면
                else{
                    setForm("create");
                }


                const arr_insurance_name_list = [];            
                for(var i = 0; i < res.data.insurance_list.length; i++){
                    arr_insurance_name_list.push(res.data.insurance_list[i].insurance_name);
                    // arr_insurance_phone_list.push(res.data.insurance_list[i].insurance_phone);
                }
                setInsurance_name_list(arr_insurance_name_list);
                // setInsurance_phone_list(arr_insurance_phone_list);
                //past_sickness
                if(res.data.past_sickness || (form && form != "create") ){
                    console.log(res.data.past_sickness);
                    console.log(form);
                    const arr_past_sickness_name = [];
                    const arr_past_sickness_supplementation = [];
                    for(var i = 0; i < res.data.past_sickness.length; i++){
                        arr_past_sickness_name.push(res.data.past_sickness[i].past_sickness_name);
                        arr_past_sickness_supplementation.push(res.data.past_sickness[i].past_sickness_supplementation);
                    }
                    setPast_sickness_name(arr_past_sickness_name);
                    setPast_sickness_supplementation(arr_past_sickness_supplementation);
                }
                //시연용
                else{   
                    setPast_sickness_name(["허리디스크", "과민성 대장"]);
                    setPast_sickness_supplementation(["5년전 허리디스크 수술", "지속적 복부팽만"]);
                }

                //sickness
                if(res.data.sickness || (form && form != "create") ){
                    const arr_sickness_name = [];
                    const arr_medicine = [];
                    const arr_symptom = [];
                    const arr_hosptial = [];
                    for(var i = 0; i < res.data.sickness.length; i++){
                        arr_sickness_name.push(res.data.sickness[i].sickness_name);
                        arr_medicine.push(res.data.sickness[i].medicine);
                        arr_symptom.push(res.data.sickness[i].symptom);
                        arr_hosptial.push(res.data.sickness[i].hospital);
                    }
                    setSickness_name(arr_sickness_name);
                    setMedicine(arr_medicine);
                    setSymptom(arr_symptom);
                    setHospital(arr_hosptial);
                }
                //시연용
                else{
                    setSickness_name(["당뇨", "고혈압", "위암"]);
                    setMedicine(["인슐린", "암로디핀, 니페디핀", ""]);
                    setSymptom(["저혈당 쇼크 및 경련", "현기증", "메스꺼움, 구토"]);
                    setHospital(["경북대병원 내과", "영대병원 내과", "경북대병원 내과"]);
                }

                //medical_info
                if(res.data.medical_info || (form && form != "create") ){
                    setMedical_id(res.data.medical_info.id);
                    setBlood_type(res.data.medical_info.blood_type);
                    setDisability_status(res.data.medical_info.disability_status);
                    setReport_request(res.data.medical_info.report_request);
                    setGuardian_phone(res.data.medical_info.guardian_phone);
                }
                //시연용
                else{
                    setBlood_type("A형");
                    setDisability_status(false);
                    setReport_request("인슐린 필요합니다.");
                    setGuardian_phone("010-8382-1192");
                }

                //insurance
                if(res.data.insurance || (form && form != "create") ){
                    setInsurance_bool(true);
                    setInsurance_name(res.data.insurance_list_my.insurance_name);
                    setInsurance_phone(res.data.insurance_list_my.insurance_phone);
                    setSubscription_date(res.data.insurance.subscription_date);
                    setExpiration_date(res.data.insurance.expiration_date);
                }
                //시연용
                else{
                    setInsurance_bool(true);
                    setInsurance_name("하나보험사")
                    setInsurance_phone("010-5096-5198");
                    setSubscription_date("2010-08-21");
                    setExpiration_date("2030-08-20");
                }
            }


        })
    }, [user, location.pathname]);
    // const medical_update = () => {
    //     console.log("update");
    // }
    // console.log(past_sickness_name);
    // console.log(past_sickness_supplementation);
    // console.log(sickness_name);
    // console.log(medicine);
    // console.log(symptom);
    // console.log(hospital);
    // console.log(blood_type);
    // console.log(disability_status);
    // console.log(report_request);
    // console.log(guardian_phone);
    // console.log(insurance_bool);
    // console.log(insurance_name);
    // console.log(subscription_date);
    // console.log(expiration_date);

    return (
        <MedicalContext.Provider value={{
            form,
            setForm,
            sickness_list,
            blood_type_list,
            insurance_name_list,
            // insurance_phone_list,
            medical_id,            
            past_sickness_name,
            setPast_sickness_name,
            past_sickness_supplementation,
            setPast_sickness_supplementation,
            sickness_name,
            setSickness_name,
            medicine,
            setMedicine,
            symptom,
            setSymptom,
            hospital,
            setHospital,
            blood_type,
            setBlood_type,
            disability_status,
            setDisability_status,
            report_request,
            setReport_request,
            guardian_phone,
            setGuardian_phone,
            insurance_bool,
            setInsurance_bool,
            insurance_name,
            setInsurance_name,
            insurance_phone,
            setInsurance_phone,
            subscription_date,
            setSubscription_date,
            expiration_date,
            setExpiration_date,
            validation,
            blood_type_message,
            insurance_name_message,
            subscription_date_message,
            expiration_date_message
        }}>
        <MedicalView/>
    </MedicalContext.Provider>
    )
}