import React, { useContext } from "react";
import { BigdataContext } from "../BigdataContainer";
import Sleep from "./chart/Sleep"
import Sudden from "./chart/Sudden";
import Accident from "./chart/Accident";
import {Map_api} from "./google_map/Map_api.js";
export default () => {
    const {
        action,
        age_data
    } = useContext(BigdataContext);
    console.log(age_data);
    console.log(action);
    //제일 마지막에 렌더된 값이 있을 때
    return age_data ? (
        <section id="intro" className="section intro" style={{paddingTop:"50px", background:"#F0F0F0"}}>
            <div className="container px-3 py-5 p-md-5">
                <div className="card">
                    <div className="card-header">
                        <p>
                            {action == "sleep" ? (
                                "최근 7일간의 졸음운전 위치"
                            ) : action == "sudden" ? (
                                "최근 7일간의 급가속, 급정거 위치"   
                            ) : (
                                "최근 7일간의 사고 위치"
                            )}
                        </p>
                    </div>
                    <div className="card-body" style={{width:"100%", height:"500px"}}>
                        {/* 구글맵 */}
                        <Map_api/>

                        {action == "sleep" ? (
                            <div>
                                <img src="/icon/blue_map_icon.png"/>
                                <span>졸음 구간</span>
                            </div>
                        ) : action == "sudden" ? (
                            <div>
                                <img src="/icon/orange_map_icon.png"/>
                                <span>급가속 구간</span>
                                <img src="/icon/green_map_icon.png"/>
                                <span>급감속 구간</span>
                            </div>

                        ) : (
                            <div>
                                <img src="/icon/red_map_icon.png"/>
                                <span>신고 구간</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* 차트 */}
            {
                action == "sleep" 
                ? <Sleep/> 
                : action == "sudden" 
                ? <Sudden/>
                : <Accident/>
            }
        </section>
    ) : null
}