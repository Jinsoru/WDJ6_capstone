import React, {useContext} from "react";
import Dropdown from "react-dropdown";
import DataPicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from "moment"
import { useForm } from "react-hook-form";
import Past_sickness from "./Past_sickness";
import Sickness from "./Sickness";
import {AppContext} from "../../../components/App";
import {MedicalContext} from "../MedicalContainer";

export default () => {
    const { user } = useContext(AppContext);
    const {
        blood_type_list,
        insurance_name_list,
        // insurance_phone_list,
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
        insurance_phone,
        setInsurance_phone,
        setInsurance_name,
        subscription_date,
        setSubscription_date,
        expiration_date,
        setExpiration_date,
        validation,
        blood_type_message,
        insurance_name_message,
        subscription_date_message,
        expiration_date_message
    } = useContext(MedicalContext);
    // console.log(insurance_name_list);
    // console.log(insuranc);
    // console.log(subscription_date);

    const { handleSubmit, register, errors, watch } = useForm();


    return (
        insurance_name_list ? (
            <form onSubmit={handleSubmit(validation)}>
            <div className="row py-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="text-center card-header card-main" style={{color:"white", background:"blue"}}>
                            질병 사항
                        </div>
                            <br/>
                            {/* {{-- 과거 질환 --}} */}
                            <Past_sickness/>
                            <hr style={{background:"darkgray"}}/>
                            {/* {{-- 현재 질환 --}} */}
                            <Sickness/>
                    </div>
                </div>
            </div>

            {/* {{-- 신청자 인적사항 --}} */}
            <div className="row py-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="text-center card-header card-main" style={{color:"white", background:"blue"}}>
                            신청자 인적사항
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-1"></div>
                            {/* 혈액형 글 */}
                            <div className="col-md-2 text-center p-1">
                                <span style={{color:"red", fontSize:"30px"}}>*</span>
                                <span className="medical_text"style={{marginTop:"13px"}}>
                                    혈액형
                                </span>
                            </div>
                            {/* 혈액형 드롭다운버튼 */}
                            <div className="col-md-2 text-center p-2">
                                <Dropdown options={blood_type_list} name="blood_type"
                                    onChange={
                                        (data) => {
                                            setBlood_type(data.value);
                                        }
                                    } value={blood_type ? blood_type : ""} placeholder="선택" style={{width:"200px"}}
                                    
                                    />
                                    <div className="text-danger">
                                        {blood_type_message}
                                    </div>
                            </div>                
                            {/* {{-- 장애 여부 --}} */}
                            <div className="col-md-1"></div>
                            <div className="col-md-2 text-center p-1">
                                <span style={{color:"red", fontSize:"30px"}}>*</span>
                                <span className="medical_text" style={{marginTop:"13px"}}>
                                    장애여부
                                </span>
                            </div>
                                
                            <div className="col-md-4 pt-2">
                                <div className="form-group">
                                    {disability_status ? (
                                        <fieldset style={{fontSize:"20px", marginTop:"6px"}} key="1">
                                            예
                                            <input type="radio" onChange={()=> setDisability_status(true)} checked={true}/>
                                            아니오
                                            <input type="radio" onChange={()=> setDisability_status(false)}/>
                                        </fieldset>
                                    ) : (
                                        <fieldset style={{fontSize:"20px", marginTop:"6px"}} key="2">
                                            예
                                            <input type="radio" onChange={()=> setDisability_status(true)}/>
                                            아니오
                                            <input type="radio" onChange={()=> setDisability_status(false)} checked={true}/>
                                        </fieldset>
                                    )}
                                    <span style={{color:"red"}}>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* 신고시 요청사항 */}
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-3 text-center p-1">
                                <span className="medical_text" style={{marginTop:"13px"}}>
                                신고시 요청사항
                                </span>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="○○를 가져와주세요!"
                                    onChange={(e) => setReport_request(e.target.value)}
                                     value={report_request ? report_request : ""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {{-- 보호자 정보 --}} */}
            <div className="row py-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="text-center card-header card-main" style={{color:"white"}}>
                            보호자 정보
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-2 text-center p-1">
                                <span className="medical_text" style={{marginTop:"13px", marginRight:"15px"}}>
                                보호자 번호
                                </span>
                            </div>
                            <br/>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="응급시 연락가능한 보호자 휴대폰 번호" 
                                    onChange={(e)=> setGuardian_phone(e.target.value)}
                                    value={guardian_phone ? guardian_phone : ""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 보험사 */}
            <div className="row py-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="text-center card-header card-main" style={{background:"darkgray", color:"white"}}>
                            보험 정보
                        </div>
                        <br/>
                        {/* 보험 여부 */}
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-2 text-center p-1">
                                <span className="medical_text" style={{marginTop:"13px", marginRight:"15px"}}>
                                    보험 여부
                                </span>
                            </div>
                            <div className="col-md-4 p-1">
                                <div className="form-group">
                                    {insurance_bool ? (
                                        <fieldset style={{fontSize:"20px", marginTop:"6px"}} key="3">
                                            예
                                            <input type="radio" onChange={()=> setInsurance_bool(true)} checked={true}/>
                                            아니오
                                            <input type="radio" onChange={()=> setInsurance_bool(false)}/>
                                        </fieldset>
                                    ) : (
                                        <fieldset style={{fontSize:"20px", marginTop:"6px"}} key="4">
                                            예
                                            <input type="radio" onChange={()=> setInsurance_bool(true)}/>
                                            아니오
                                            <input type="radio" onChange={()=> setInsurance_bool(false)} checked={true}/>
                                        </fieldset>
                                    )}
                                    <span style={{color:"red"}}>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* 보험 정보 */}
                        <div className="row" id="insurance_table" style={insurance_bool ? {display:"flex"} : {display:"none"} }>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 text-center p-3">
                                <span className="medical_text" style={{marginTop:"13px",marginRight:"25px"}}>
                                보험사 명
                                </span>
                            </div>
                            <div className="col-md-3 text-center p-2">
                                <Dropdown options={insurance_name_list} 
                                    onChange={
                                        (data) => {
                                            setInsurance_name(data.value);
                                        }
                                    } value={insurance_name ? insurance_name : ""} placeholder="선택" style={{width:"200px"}}/>
                                <div className="text-danger text-center">
                                    {insurance_name_message}
                                </div>
                            </div>

                            <div className="col-md-6"></div>
                            <div className="col-md-1"></div>
                                    
                            <div className="col-md-2 text-center p-1">
                                <span className="medical_text" style={{marginTop:"13px",marginRight:"25px"}}>
                                보험 가입일
                                </span>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <DataPicker onChange={(date) => setSubscription_date(moment(date).format("YYYY-MM-DD"))} value={subscription_date}/>
                                    <div className="text-danger">
                                        {subscription_date_message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-2 text-center p-1">
                                <span className="medical_text" style={{marginTop:"13px",marginRight:"25px"}}>
                                보험 만기일
                                </span> 
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <DataPicker onChange={(date) => setExpiration_date(moment(date).format("YYYY-MM-DD"))} value={expiration_date}/>
                                    <div className="text-danger">
                                    {expiration_date_message}
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                    <div className="form-group">
                        <button className="btn btn-success btn-lg btn-block" type="submit" style={{width:"150px"}}>
                            등록하기
                        </button>
                    </div>
                </div>
                <div className="col-md-5"></div>
            </div>
        </form>
        ) : null

    )
}
