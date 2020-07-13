import React from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
    const main_text = {
        fontSize: "32px",
        fontWeight: "bold",
        textTransform: "uppercase",
        // marginBottom: "20px",
        // paddingBottom: "20px",
        position: "relative",
        color:"white"
    }
    const service_main_text = {
        paddingTop:"10px",
        color:"#00BA94", 
        fontWeight:"bold", 
        fontSize:"24px"
    }
    
    const service_sub_text = {
        fontSize:"18px", 
        color:"black", 
        fontWeight:"bold"
    }

    const service_func = (img, main_text, sub_text, aos_position, index) => {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12 align-items-stretch">
                <ScrollAnimation animateIn={`fadeIn${aos_position}`} animateOnce={true} delay={100*index}>                
                    <div className="icon-box iconbox-blue mb-5" style={{borderRadius:"25px", height:"80%"}}>
                        <div className="thumbnail">
                            {index == 3 ? (
                                <img src={img} alt="img" style={{width:"35%"}}/>
                            ) : (
                                <img src={img} alt="img" style={{width:"50%", height:"50%"}}/>
                            )}
                            <div className="caption">
                                <p style={service_main_text}>{main_text}</p>
                                <span style={service_sub_text}>
                                    {sub_text}
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        )
    }

    return (
        <section id="intro" className="section intro" style={{background:"#2D405F"}}>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-1"/>

                <div className="col-lg-8 col-md-8 col-sm-10">
                    <div className="row justify-content-around pt-5">
                        <div className="col-lg-12 text-center">
                            <ScrollAnimation animateIn="fadeIn" delay={300} animateOnce={true}>                
                                <h3 style={main_text}>Services</h3>
                                <h3 style={{color:"#00ba94"}}>──────</h3>

                            </ScrollAnimation>
                        </div>
                            {service_func("/images/home/예방.png", "사고 예방", "운전 중 졸음운전과 전방 주시 태만 등으로 인해 발생하는 교통사고를 손쉽게 예방가능", "Right", 1)}
                            {service_func("/images/home/신고.png", "자동 신고", "돌발상황 발생 시 사용자의 의료·위치정보를 제공하는 자동 신고로 골든타임 확보가능", "Down", 2)}
                            {service_func("/images/home/search.png", "빅 데이터", "사용자의 운전습관을 파악하여 사고, 졸음 다발지역 등을 통계자료를 통해 확인가능", 'Left', 3)}
                    </div>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-1"/>
            </div>
        </section>
    );
}