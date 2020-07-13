import React, { useContext } from "react";
import Info_menu from "../../layout/Info_menu";
import DataPicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from "moment"
import { AppContext } from "../../components/App";
import { DriveContext } from "./DriveContainer";
import Drive_score_icon from "./partial/Drive_score_icon";
import Drive_score_chart from "./partial/Drive_score_chart";
import GoogleMap from "./partial/GoogleMap";
import Loader from "../../components/Loader";
export default () => {
    const { user } = useContext(AppContext);
    const {
        date,
        setDate,
        day_5,
        day_5_sec,
        day_5_danger_count,
    } = useContext(DriveContext);
    return (
        <div className="row mt-5 mb-5">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                <section id="intro" className="section intro" style={{background: "#f7f7f7"}}>
                    <div className="card">
                        <Info_menu/>
                        {day_5_danger_count.length ? (
                            <div className="card-body">
                                <div className="row justify-content-around">
                                    <div className="col-xs-8 col-lg-7 col-md-6 col-sm-6"></div>
                                    <div className="col-xs-2 col-lg-3 col-md-3 col-sm-3 text-right">
                                        <p style={{fontSize:"20px", marginRight:"15px", color:"green", fontWeight:"800"}}>
                                        운전날짜 검색
                                        </p>
                                    </div>
                                    <br />
                                    <div className="col-xs-2 col-lg-2 col-md-3 col-sm-3">
                                        <div className="form-group">
                                            {/* <!-- 시작시 기본 날짜 설정은 value를 이용 --> */}
                                            <DataPicker onChange={
                                                (date) => {
                                                    setDate(moment(date).format("YYYY-MM-DD"));
                                                }
                                            } value={date}/>
                                        </div>
                                    </div>
                                    <br />
                                    {day_5_sec[0] ? (
                                        <div>
                                            <Drive_score_icon/>
                                            <GoogleMap/>
                                            <Drive_score_chart/>
                                        </div>
                                    ) : (
                                        <div style={{height:"65vh"}}>
                                            <p className="text-danger">운전 데이터가 없습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : <Loader/>}
                    </div>
                </section>
            </div>
        </div>
    )
}