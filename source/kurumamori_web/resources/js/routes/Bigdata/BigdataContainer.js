import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";
import BigdataView from "./BigdataView";


export const BigdataContext = createContext();

export default () => {
    
    const [action, setAction] = useState("index");

    const time_set = [0, 6, 12, 18, 24];      //시간대별 셋팅
    const [day_7, setDay_7] = useState([]);     //최근 7일
    const [day_7_drive_detection, setDay_7_drive_detection] = useState([]);    //최근 7일의 위험 카운트
    const [time_set_data, setTime_set_data] = useState([]); //시간대별 선택한 위험 카운트
    const [age_data, setAge_data] = useState("");   //나이대별 선택한 위험 카운트

    // const [time_set, setTime_set] = useState([]);

    useEffect(()=> {
        if(location.pathname.split('/')[2]){
            if(location.pathname.split('/')[2] == "sleep"){
                setAction("sleep");
            }
            else if(location.pathname.split('/')[2] == "sudden"){
                setAction("sudden");
            }
            else if(location.pathname.split('/')[2] == "accident"){
                setAction("accident");
            }
            //detail페이지면 axios 요청
            Axios.get(`/api/bigdata/`,{
                params : {
                    option : location.pathname.split('/')[2]
                }
            }).then( (res) => {
                console.log(res.data);
                const arr_day_7 = []
                const arr_day_7_drive_detection = []
                const arr_time_set_data = [];

                //최근 7일, 최근 7일의 위험 카운트 get
                for(var i = 0; i < res.data.day_7.length; i++){
                    arr_day_7.push(res.data.day_7[i]);
                    arr_day_7_drive_detection.push(res.data.day_7_drive_detection[i]);
                }
                //시간대별 위험 카운트 get
                for(var i = 0; i < res.data.time_set_data.length; i++){
                    arr_time_set_data.push(res.data.time_set_data[i]);
                }
                setDay_7(arr_day_7);
                setDay_7_drive_detection(arr_day_7_drive_detection);
                setTime_set_data(arr_time_set_data);
                setAge_data(res.data.age_data);
            });
        }else{
            setAction("index");
        }
    }, [location.pathname])
    
    return (
        <BigdataContext.Provider value={{
            action,
            setAction,
            time_set,
            day_7,
            day_7_drive_detection,
            time_set_data,
            age_data
        }}>
            <BigdataView/>
        </BigdataContext.Provider>

    )
}
