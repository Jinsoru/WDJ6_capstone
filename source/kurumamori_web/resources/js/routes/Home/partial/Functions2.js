import React from "react";
import AnimationCount from 'react-count-animation';
import 'react-count-animation/dist/count.min.css';
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
    const main_text = {
        fontSize: "32px",
        fontWeight: "bold",
        textTransform: "uppercase",
        // marginBottom: "20px",
        // paddingBottom: "20px",
        position: "relative",
        color:"black",
    }

    const count_set1 = {
        start: 0,           //시작 숫자
        count: 220000,      //끝 숫자
        duration: 7000,    //지속시간
        // decimals: 4,    //소수점
        useGroup: true,
        animation: 'up',
    };
    const count_set2 = {
        start: 0,
        count: 3782,
        duration: 7000,
        // decimals: 2,    
        useGroup: true,
        // animation: 'roll',
        animation: 'up',

    };
    const count_set3 = {
        start: 0,
        count: 40500000000000,
        duration: 7000,
        // decimals: 2,
        useGroup: true,
        // animation: 'slide',
        animation: 'up',

    };

    const a_func = (img, title_1, title_2, count_set) => {
        return (
            <div key={count_set.count} className="col-lg-4 col-md-3 col-sm-12 col-12 text-center">
                <ScrollAnimation animateIn="fadeIn" delay={500} animateOnce={true}>                
                    <img src={img} alt="img" style={{width:"50%"}}/>
                    <p className="py-0 my-0" style={{fontSize:"1.25em", color:"black", fontWeight:"600"}}>{title_1}</p>
                    <p className="py-0 my-0" style={{fontSize:"1.25em", color:"black", fontWeight:"600"}}>{title_2}</p>
                    <div style={{fontSize:"1.5em", color:"red"}}>
                        <AnimationCount {...count_set}/>
                    </div>
                </ScrollAnimation>
            </div>
        )
    }

    return (
        <section id="intro function2" className="section intro" style={{background:"#F9F8FF"}}>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2"/>
                <div className="col-lg-8 col-md-8 col-sm-10">
                    <div className="row justify-content-around pt-5">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                            <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
                                <h3 style={main_text}>damage caused by traffic accidents</h3>
                                <h3 style={{color:"black"}}>──────────────────────────────</h3>
                            </ScrollAnimation>
                        </div>
                        {a_func("/images/home/index_img_chapter01.png", "연간 교통사고", "발생 건 수", count_set1)}
                        {a_func("/images/home/index_img_chapter02.png", "연간 교통사고", "사망자 수", count_set2)}
                        {a_func("/images/home/index_img_chapter03.png", "교통사고로 인한", "연간 경제적 손실", count_set3)}
                    </div>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-2"/>
            </div>
        </section>
    );
}