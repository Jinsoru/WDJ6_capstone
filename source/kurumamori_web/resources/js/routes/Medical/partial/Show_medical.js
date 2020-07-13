import React, {useContext} from "react";
import {AppContext} from "../../../components/App";
import {MedicalContext} from "../MedicalContainer";
import {Link} from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
    const { user } = useContext(AppContext);
    const {
        setForm,
        medical_id,
        past_sickness_name,
        past_sickness_supplementation,
        sickness_name,
        medicine,
        symptom,
        hospital,
        blood_type,
        disability_status,
        report_request,
        guardian_phone,
        insurance_bool,
        insurance_name,
        insurance_phone,
        subscription_date,
        expiration_date 
    } = useContext(MedicalContext);

    return (
        <div>
            {/* <a className="btn btn-success" href={`/info/medical_info/${medical_id}/edit`}>의료정보 수정</a> */}
            
            <div className="row justify-content-around">
                <div className="col-lg-11">
                    <div className="row">
                        <div className="col-lg-12 py-3">
                            <Link to={`/info/medical_info/${medical_id}/edit`} style={{float:"right"}} className="btn btn-success" onClick={() => setForm("update")}>의료정보 수정</Link>
                        </div>
                    </div>

                    <div className="row justfity-content-around">
                        <div className="card shadow mb-3 col-lg-12 col-md-12 col-sm-12 mx-0 px-0">
                            <div className="card-header" style={{backgroundColor:"#002EF0"}}>
                                <h3 style={{fontSize:"1.725em", color:"white"}}>기저질환</h3>
                            </div>
                            <div className="card-body">
                                <div className="row col-lg-12 col-md-12 col-sm-12">
                                    {sickness_name.length && sickness_name[0] != "" ? sickness_name.map( (value, index) => {
                                        return (
                                            <div key={index} className="col-lg-4 col-md-4 col-sm-4">
                                                <ScrollAnimation animateIn='fadeIn' delay={index * 200} animateOnce={true}>
                                                    <div className="card shadow mb-4" style={{backgroundColor:"#002EF0"}}>
                                                        <div className="card-body" style={{color:"white"}}>{sickness_name[index]}</div>
                                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                                            <div className="row text-truncate">
                                                                <p className="col-lg-12 col-md-12 col-sm-12">복용중인 약 : {medicine[index] ? medicine[index] : "없음"}</p>
                                                                <p className="col-lg-12 col-md-12 col-sm-12">증상 : {symptom[index] ? symptom[index] : "없음"}</p>
                                                                <p className="col-lg-12 col-md-12 col-sm-12">다니는 병원 : {hospital[index] ? hospital[index] : "없음"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ScrollAnimation>
                                            </div>
                                        )
                                    }) : (
                                        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                            <p className="text-danger">이력이 없습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="card shadow mb-3 col-lg-12 col-md-12 col-sm-12 mx-0 px-0">
                            <div className="card-header" style={{backgroundColor:"orange"}}>
                                <h3 style={{fontSize:"1.725em", color:"white"}}>과거 병력</h3>
                            </div>
                            <div className="card-body">
                                <div className="row col-lg-12 col-md-12 col-sm-12">
                                    {past_sickness_name.length && past_sickness_name[0] != "" ? past_sickness_name.map( (value, index) => {
                                        return (
                                            <div key={index} className="col-lg-4 col-md-4 col-sm-4">
                                                <ScrollAnimation animateIn='fadeIn' delay={index * 200} animateOnce={true}>
                                                    <div className="card shadow mb-4" style={{backgroundColor:"orange"}}>
                                                        <div className="card-body" style={{color:"white"}}>{past_sickness_name[index]}</div>
                                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                                            <div className="row text-truncate">
                                                                {/* <p className="col-lg-12 col-md-12 col-sm-12">기저 질환 : {past_sickness_name[index]}</p> */}
                                                                <p className="col-lg-12 col-md-12 col-sm-12">보충설명 : {past_sickness_supplementation[index] ? past_sickness_supplementation[index] : "없음"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ScrollAnimation>
                                            </div>
                                        )
                                    }) : (
                                        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                            <p className="text-danger">이력이 없습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 mx-0 px-0 row justify-content-around">
                            <div className="card shadow mb-3 col-lg-5 col-md-5 col-sm-12 mx-0 px-0">
                                <div className="card-header" style={{backgroundColor:"#28A745"}}>
                                    <h3 style={{fontSize:"1.725em", color:"white"}}>기타 정보</h3>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <div className="row text-truncate">
                                        <p className="col-lg-12 col-md-12 col-sm-12">보호자 휴대폰 : {guardian_phone ? guardian_phone : "없음"}</p>
                                        <p className="col-lg-12 col-md-12 col-sm-12">혈액형 : {blood_type}</p>
                                        <p className="col-lg-12 col-md-12 col-sm-12">장애 여부 : {disability_status ? "예" : "아니오"}</p>
                                        <p className="col-lg-12 col-md-12 col-sm-12">신고시 요청사항 : {report_request ? report_request : "없음"}</p>     
                                    </div>
                                </div>
                            </div>

                            <div className="card shadow mb-3 col-lg-5 col-md-5 col-sm-12 mx-0 px-0">
                                <div className="card-header" style={{backgroundColor:"#DC3545"}}>
                                    <h3 style={{fontSize:"1.725em", color:"white"}}>보험사 정보</h3>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-between">
                                        {insurance_name ? (
                                    <div className="row text-truncate">
                                            <div>
                                                <p className="col-lg-12 col-md-12 col-sm-12">보험사 명 : {insurance_name}</p>
                                                <p className="col-lg-12 col-md-12 col-sm-12">가입일 : {subscription_date}</p>
                                                <p className="col-lg-12 col-md-12 col-sm-12">만기일 : {expiration_date}</p>
                                                <p className="col-lg-12 col-md-12 col-sm-12">보험사 전화번호 : {insurance_phone}</p> 
                                            </div>
                                    </div>
                                        ) : (
                                            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                                <p className="text-danger">이력이 없습니다.</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>

                        <p className="text-danger">위의 작성하신 의료정보는 운전 중 사고발생시 119센터에 보내는 메시지입니다.</p>
                        <p className="text-danger">작성한 정보에 틀린 점이 없는지 확인해 주세요.</p>
                    </div>
                </div>
            </div>
    </div>
    )
}