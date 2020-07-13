import React, { useEffect, useState, useContext, createContext } from "react";
import DriveView from "./DriveView";
import {AppContext} from "../../components/App";
import moment from "moment";
import Axios from 'axios';
import Geocode from "react-geocode";

export const DriveContext = createContext();

export default () => {
    const { user } = useContext(AppContext);
    //선택한 날짜
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    //선택한 날짜의  운전정보
    const [drive_info, setDrive_info] = useState([]);
    //선택한 날짜의 신고위치
    const [reports, setReports] = useState([]);
    //선택한 날짜의 운전 점수
    const [score, setScore] = useState([]);

    //최근 5일 날짜
    const [day_5, setDay_5] = useState([]);
    //최근 5일의 운전시간
    const [day_5_sec, setDay_5_sec] = useState([]);
    //최근 5일의 운전감지 정보
    const [day_5_drive_detection, setDay_5_drive_detection] = useState([]);
    //최근 5일의 위험 카운트
    const [day_5_danger_count, setDay_5_danger_count] = useState([]);
    
    //Geocode 마법소스
    const [arr_reports, setArr_reports] = useState([]);

    useEffect(()=> {               
        if(user.id){
            Axios.get(`/info/drive_score/`, {
                params : {
                    user_id : user.id,
                    date
                }
            }).then( res => {
                // console.log(res);
                if(user.id){
                    const arr_drive_info = [];  //선택한 날짜의 운전정보
                    const arr_score = []; //선택한 날짜의 운전 점수

                    const arr_day_5 = [];   //최근 5일
                    const arr_day_5_sec = []; //최근 5일의 운전시간
                    const arr_day_5_drive_detection = []; //최근 5일의 운전감지 정보
                    const arr_day_5_danger_count = []; //최근 5일의 위험 카운트                    

                    //선택한 날짜의 운전정보 get
                    for(var i = 0; i < res.data.drive_info.length; i++){
                        arr_drive_info.push(res.data.drive_info[i]);
                    }                    
                    //선택한 날짜의 신고위치 get
                    // for(var i = 0; i < res.data.reports.length; i++){
                    //     arr_reports.push(res.data.reports[i]);
                    // }                    

                    //선택한 날짜의 운전점수 get
                    for(var i = 0; i < res.data.score.length; i++){
                        arr_score.push(res.data.score[i]);
                    }
                    //최근 5일의 해당 정보 get
                    for(var i = 0; i < res.data.day_5.length; i++){
                        arr_day_5.push(res.data.day_5[i]);
                        arr_day_5_sec.push(res.data.day_5_sec[i]);
                        arr_day_5_drive_detection.push(res.data.day_5_drive_detection[i]);
                        arr_day_5_danger_count.push(res.data.day_5_danger_count[i]);
                    }
                    setDay_5_drive_detection(arr_day_5_drive_detection);
                    setDrive_info(arr_drive_info);
                    // setReports(arr_reports);
                    setScore(arr_score);
                    setDay_5(arr_day_5);
                    setDay_5_sec(arr_day_5_sec);
                    setDay_5_danger_count(arr_day_5_danger_count);

                    // if(res.data.reports){
                    //     for(var i = 0; i < res.data.reports.length; i++){
                    //         console.log(i);
                    //         Geocode.setApiKey(process.env.MIX_GCP_API_KEY);
                    //         Geocode.setLanguage("ko");
                    //         Geocode.fromLatLng(res.data.reports[i].latitude, res.data.reports[i].longitude).then(
                    //             res => {
                    //                 setArr_reports(arr_reports.push(res.results[0].formatted_address));
                    //                 setReports(arr_reports);
                    //             }
                    //         )
                    //     }
                    // }
                }
            });
        }

    }, [user, date])
    // console.log(date);
    // console.log(drive_info);
    console.log(reports);
    // console.log(score);
    // console.log(day_5);
    // console.log(day_5_sec);
    // console.log(day_5_drive_detection);
    // console.log(day_5_danger_count);



    return (
        <DriveContext.Provider value={{
            date,
            setDate,
            drive_info,
            reports,
            score,
            day_5,
            day_5_sec,
            day_5_drive_detection,
            day_5_danger_count,
        }}>
            <DriveView/>
        </DriveContext.Provider>
    )
}