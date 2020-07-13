import React, {useContext} from "react";
import { DriveContext } from "../DriveContainer";
import AnimationCount from 'react-count-animation';
import 'react-count-animation/dist/count.min.css';
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
    const {
        score
    } = useContext(DriveContext);

    const count_set_main = {
        start: 0,           //시작 숫자
        count: (score[0] + score[1] + score[2] + score[3]) / score.length,      //끝 숫자
        duration: 1500,    //지속시간
        // decimals: 4,    //소수점
        useGroup: true,
        animation: 'roll',
    };
    const count_set_1 = {
        start: 0,
        count: score[0],
        duration: 1500,
        // decimals: 2,    
        useGroup: true,
        animation: 'roll',
    };
    const count_set_2 = {
        start: 0,
        count: score[1],
        duration: 1500,
        // decimals: 2,    
        useGroup: true,
        animation: 'roll',
    };
    const count_set_3 = {
        start: 0,
        count: score[2],
        duration: 1500,
        // decimals: 2,
        useGroup: true,
        animation: 'roll',
    };
    const count_set_4 = {
        start: 0,
        count: score[3],
        duration: 1500,
        // decimals: 2,
        useGroup: true,
        animation: 'roll',
    };

    const drive_score = ( text , count_set, index) => {
        return (
            <div className="col-xs-2 col-sm-2 col-md-2">
                <ScrollAnimation animateIn='zoomIn' animateOnce={true} delay={200}>
                    <div className="card btn text-dark shadow">
                        <div className="pt-3 pb-3">
                            {score[index] >= 90 ? (
                                <img src="/icon/모범.png"/>
                            ) : score[index] >= 50 ? (
                                <img src="/icon/양호.png"/>
                            ) : (
                                <img src="/icon/주의.png"/>
                            )}
                        </div>
                        <h1 className="pb-3" style={{fontSize:"20px", fontColor:"#222222", fontWeight:"600"}}>{text}</h1>
                        <h1 className="pb-3" style={{fontSize:"20px", fontColor:"#222222", fontWeight:"600"}}>
                            <AnimationCount {...count_set}/>
                        </h1>
                    </div>
                </ScrollAnimation>
            </div>
        )
    }

    return  score.length ? (
        <div>
            <div className="row">
                {/* 총 점수 */}
                <div className="col-xs-4 col-sm-4 col-md-4">
                    <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
                        <div className="card btn text-dark shadow"> 
                            <div className="pt-3 pb-3">
                                {(score[0] + score[1] + score[2] + score[3]) / score.length >= 90 ? (
                                    <img src="/icon/모범.png"/>
                                ) : (score[0] + score[1] + score[2] + score[3]) / score.length >= 50 ? (
                                    <img src="/icon/양호.png"/>
                                ) : (
                                    <img src="/icon/주의.png"/>
                                )}
                            </div>
                            <h1 className="pb-3" style={{fontSize:"48px", fontColor:"#222222", fontWeight:"500"}}>총 점수</h1>
                            <h1 className="pb-3" style={{fontSize:"48px", fontColor:"#222222", fontWeight:"500"}}>
                                <AnimationCount {...count_set_main}/>
                            </h1>
                        </div>
                    </ScrollAnimation>
                </div>
                {drive_score("급가속 점수", count_set_1, 0)}
                {drive_score("급감속 점수", count_set_2, 1)}
                {drive_score("졸음 점수", count_set_3, 2)}
                {drive_score("사고 점수", count_set_4, 3)}
            </div>
            <br/>
        </div>
    ) : null
}