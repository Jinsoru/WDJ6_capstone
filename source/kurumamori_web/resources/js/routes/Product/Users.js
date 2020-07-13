import React, {Fragment}from "react";
import ReactPlayer from 'react-player';
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
    return (
        <Fragment>
            <div className="mt-5 pt-2">
                <div className="col-sm-12 col-lg-12 text-center d-table">
                    <div className="d-table-cell align-middle">
                        <ScrollAnimation animateIn='fadeIn' animateOnce={true}>  
                            <div className="pt-5">
                                <div className="pt-4 pb-2">
                                    <h4 style={{fontWeight:700}}>kurumamori 119의 생생한 후기.</h4>
                                </div>
                                <div>
                                    <h1 style={{fontSize:3.25+'em',fontWeight:900, color:"black"}}>실제 사용자의 생생한 영상을 만나보세요!</h1>
                                </div>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn='fadeIn' delay={500} animateOnce={true}>  
                            <div className="row justify-content-around px-0 mx-0 pb-5">
                                <div className="py-5 row col-sm-10 col-lg-10 justify-content-around px-0 mx-0">
                                    <ReactPlayer className="col-sm-11 col-lg-8" url='https://youtu.be/Dwhl9HT3dVY' width="100%" height="450px"/>
                                </div>
                                <div className="row col-sm-10 col-lg-10 justify-content-around px-0 mx-0">
                                    <div className="col-sm-12 col-lg-4 text-left">
                                        <h1 style={{fontSize:2.75+'em',fontWeight:800, color:"black"}}>
                                            24세 임성훈씨의 코멘트
                                        </h1>
                                    </div>
                                    <div className="col-sm-12 col-lg-8 text-left">
                                        <h4>
                                            사실 처음 사용할 때는 많이 필요가 없다고 생각을 하고 사용했습니다.
                                            안전을 위해서 어느 정도 투자한다는 생각으로 가볍게 구매했는데
                                            써보니까 생각보다 더 좋더라구요. kurumamori 119 저는 강력하게 추천합니다.
                                            운전 습관을 고치니까 연비도 더 절약하게 되었고 장거리 운전을 하는 저로서는 
                                            졸음 운전 걱정이 많았는데 확실히 해결 되었구요. 
                                            여러모로 두번 추천합니다.
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                    </div>
                </div>
                <div className="row justify-content-around px-0 mx-0 py-5" style={{backgroundColor: '#F5F5F5'}}>
                    <div className="row justify-content-around px-0 mx-0 py-5 col-lg-10 col-sm-10">
                        <div lassName="pt-5 col-sm-12 col-lg-12">
                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>  
                                <div>
                                    <h1 style={{fontSize:3.25+'em',fontWeight:900}}>더 많은 사용자의 후기들.</h1>
                                </div>
                            </ScrollAnimation> 
                        </div>
                        <div className="row col-sm-12 col-lg-12 justify-content-around px-0 mx-0 pb-5">
                            <div className="py-5 col-sm-12 col-lg-5">
                                <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>  
                                    <div>
                                        <ReactPlayer className="w-100" url='https://youtu.be/jiUOJYn7Gqg' />
                                    </div>
                                </ScrollAnimation> 
                            </div>
                            <div className="py-5 col-sm-12 col-lg-5">
                                <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>  
                                    <div>
                                        <ReactPlayer className="w-100" url='https://youtu.be/nxddtUfBAQ0' />    
                                    </div>
                                </ScrollAnimation> 
                            </div>
                            <div className="py-5 col-sm-12 col-lg-5">
                                <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>  
                                    <div>
                                        <ReactPlayer className="w-100" url='https://youtu.be/gHjO0vB4JNg' />
                                    </div>
                                </ScrollAnimation> 
                            </div>
                            <div className="py-5 col-sm-12 col-lg-5">
                                <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>  
                                    <div>
                                        <ReactPlayer className="w-100" url='https://youtu.be/Dwhl9HT3dVY' />
                                    </div>
                                </ScrollAnimation> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}