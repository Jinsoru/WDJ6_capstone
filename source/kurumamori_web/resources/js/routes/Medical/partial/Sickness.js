import React, { useState, useContext } from "react";
import Dropdown from "react-dropdown";
import {AppContext} from "../../../components/App";
import {MedicalContext} from "../MedicalContainer";

export default () => {
    const { user } = useContext(AppContext);
    const { 
        sickness_list,
        sickness_name,
        setSickness_name,
        medicine,
        setMedicine,
        symptom,
        setSymptom,
        hospital,
        setHospital
     } = useContext(MedicalContext);
    //  console.log(sickness_name);
    //  console.log(medicine);
    //  console.log(symptom);
    //  console.log(hospital);
     
     const add_sickness = () => {
        if(sickness_name.length < 3){
            
            setMedicine(sickness_name => [...sickness_name, null]);
            setSickness_name(medicine => [...medicine, null]);
            setSymptom(symptom => [...symptom, null]);
            setHospital(hospital => [...hospital, null]);
        }
    }
    const minus_sickness = (index) => {
        // const index = 1;
        if(index != 0){
            setSickness_name(sickness_name.slice(0, index).concat(sickness_name.slice(index+1, sickness_name.length)));
            setMedicine(medicine.slice(0, index).concat(medicine.slice(index+1, medicine.length)));
            setSymptom(symptom.slice(0, index).concat(symptom.slice(index+1, symptom.length)));
            setHospital(hospital.slice(0, index).concat(hospital.slice(index+1, hospital.length)));

        }
    }
    if(!sickness_name.length){
        sickness_name.push("");
    }
    return (
        sickness_name ? sickness_name.map( (value, index) => {
            return (
                <div key={index} className="row" style={{marginTop:"10px"}}>
                    {/* +,- 아이콘 */}
                    <div className="col-md-1" >
                        {index == 0 ? 
                            <img src="/icon/plus.png" style={{marginLeft:"50%"}} onClick={() => add_sickness()}/>
                        :
                            <img src="/icon/minus.png" style={{marginLeft:"50%"}} onClick={() => minus_sickness(index)}/>
                        }
                    </div>
                    {/* 현재질환 글자 */}
                    <div className="col-md-2 text-center p-3">
                        <span className="medical_text"style={{marginTop:"13px"}}>현재 질환{index + 1}</span>
                    </div>
                    {/* 현재 질환 드롭다운버튼 */}
                    <div className="col-md-2 text-center p-2">
                        <Dropdown options={sickness_list} 
                            onChange={
                                (data) => {
                                    // console.log(data.value);
                                    let newArr = [...sickness_name];
                                    newArr[index] = data.value;
                                    setSickness_name(newArr)
                                }
                            } value={sickness_name[index] ? sickness_name[index] : ""} placeholder="선택" style={{width:"200px"}}/>
                    </div>
                    {/* 복용중인 약 글자 */}
                    <div className="col-md-2 text-center p-3">
                        <span className="medical_text"style={{marginTop:"13px"}}>복용중인 약</span>
                    </div>
                    {/* 복용중인 약 input */}
                    <div className="col-md-4">
                        <div className="form-group pt-2">
                                <input style={{fontSize:"1em", width:"100%"}} type="text" 
                                value={medicine[index] ? medicine[index] : ""}
                                onChange={
                                    (e) => {
                                        let newArr = [...medicine];
                                        newArr[index] = e.target.value;
                                        setMedicine(newArr);
                                    }
                                }
                                className="form-control" placeholder="복용중인 약"/> 
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    {/* 증상 글*/}
                    <div className="col-md-1"></div>
                    <div className="col-md-2 text-center p-2">
                        <span className="medical_text"style={{marginTop:"13px"}}>증상</span>
                    </div>
                    {/* 증상 input */}
                    <div className="col-md-8">
                            <input style={{fontSize:"1em", width:"100%"}} type="text" 
                                    className="form-control" placeholder="증상을 적어주세요"
                                    value={symptom[index] ? symptom[index] : ""}
                                    onChange={
                                        (e) => {
                                            let newArr = [...symptom];
                                            newArr[index] = e.target.value;
                                            setSymptom(newArr);
                                        }
                                    }
                            />
                            <span className="text-danger" style={{fontSize:"16px"}}>
                                증상은 최대한 자세히 적어주세요!
                            </span>
                    </div>
                    <div className="col-md-1"></div>
                    {/* 진료기관 글 */}
                    <div className="col-md-1"></div>
                    <div className="col-md-2 text-center pt-2 pb-3">
                        <span className="medical_text"style={{marginTop:"13px"}}>진료기관</span>
                    </div>
                    {/* 진료기관 input */}
                    <div className="col-md-8 pt-2 pb-3">
                            <input style={{fontSize:"1em", width:"100%"}} type="text" 
                                    className="form-control" placeholder="진료기관 명을 적어주세요"
                                    value={hospital[index] ? hospital[index] : ""}
                                    onChange={
                                        (e) => {
                                            let newArr = [...hospital];
                                            newArr[index] = e.target.value;
                                            setHospital(newArr);
                                        }
                                    }
                            />
                    </div>
                </div>
            )
        }) : null
    )
}