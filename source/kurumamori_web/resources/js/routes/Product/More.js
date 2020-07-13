import React, {Fragment, useState, useEffect, setState}from "react";
import ReactPlayer from 'react-player';
import Loader from "../../components/Loader";
import ScrollAnimation from "react-animate-on-scroll";

export default () => {

    return (
        true == 1 ? 
        <Fragment>
            <div className="" id="More">
                <div className="col-sm-12 col-lg-12 text-center d-table" style={{height: 100 + 'vh',backgroundColor: 'white'}}>
                    <div className="d-table-cell align-middle">
                        <div className="py-2 pt-5">
                            <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
                                <div className="my-4 row px-0 mx-0 justify-content-center ">
                                    <img className="col-sm-8 col-lg-4" src="../icon/logo_curumamori.png" style={{width:100+'%',zIndex:100}}></img>
                                </div>
                                <div>
                                    <p className="" style={{fontSize:2.25+"em",color:"black"}}>내 차가 사고를 스스로 예방하고 사고를 스스로 신고한다!</p>
                                </div>
                            </ScrollAnimation>
                        </div>

                        <ScrollAnimation animateIn='fadeIn' delay={500} animateOnce={true}>
                            <div className="my-2 row px-0 mx-0 justify-content-center">
                                    <img className="col-sm-8 col-lg-4" src="../product/product_image.png" style={{width:100+'%',zIndex:100}}></img>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn='fadeIn' delay={700} animateOnce={true}>
                            <div className="py-5 row justify-content-around">
                                <div className="row col-sm-12 col-lg-9 justify-content-around">
                                    <div className="col-sm-12 col-lg-5 text-left">
                                        <hr style={{backgroundColor:'#636363',height:2+'px'}}/>
                                        <div className="px-2">
                                            <h4 className="" style={{color:"black"}}>교통사고 사망원인 1위</h4>
                                            <h4 className="" style={{color:"black"}}>졸음 운전 예방</h4>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-5 text-left">
                                        <hr style={{backgroundColor:'#636363',height:2+'px'}}/>
                                        <div className="px-2">
                                            <h4 className="" style={{color:"black"}}>전방주시 태만 방지</h4>
                                            <h4 className="" style={{color:"black"}}>운전자 시선 추적 감지</h4>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-5 text-left py-3">
                                        <hr style={{backgroundColor:'#636363',height:2+'px'}}/>
                                        <div className="px-2">
                                            <h4 className="" style={{color:"black"}}>사고를 스스로 감지</h4>
                                            <h4 className="" style={{color:"black"}}>SMS 자동 사고 신고</h4>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-5 text-left py-3">
                                        <hr style={{backgroundColor:'#636363',height:2+'px'}}/>
                                        <div className="px-2">
                                            <h4 className="" style={{color:"black"}}>사고 사망율 감소</h4>
                                            <h4 className="" style={{color:"black"}}>조기 신고. 사용자 정보.</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                    </div>
                </div>

                {/* 쿠루마모리 홍보  */}
                <div className="col-sm-12 col-lg-12 text-center d-table" style={{height: 700 + 'px',backgroundColor: '#F5F5F5'}}>
                    <div className="d-table-cell align-middle">
                        <div className="row justify-content-around">
                            <div className="col-sm-12 col-lg-10 text-left" style={{paddingTop:100+'px'}}>
                                <div className="row justify-content-around">
                                    
                                    {/* 졸음운전 예방 */}
                                    <div className="col-sm-12 col-lg-10">
                                        <div>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
                                                <div>
                                                    <h2 style={{fontWeight:900,color:'#3E3E45'}}>졸음 운전 예방</h2>
                                                    <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>혹시 모르는 실수. 이젠 안전히 운전.</h2>
                                                    <h4 className="py-3" style={{fontWeight:500,color:'#3E3E45'}}>
                                                        Kurumamori 119는 운전자의 눈을 감지해서 사용자의 졸음 운전을 탐지하고 예방합니다.
                                                        운전자가 혹시 모르게 졸음 운전을 할 경우 강력한 경고음 발생시켜 사용자의 안전을 보장합니다.
                                                        당신이 운전을 하면서 발생하는 혹시 모르는 실수! 이제는 Kurumamori 119로 예방하세요.
                                                    </h4>
                                                </div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>
                                                <div className="row justify-content-around mx-0 px-0">
                                                    <ReactPlayer className="col-sm-11 col-lg-9" url='https://www.youtu.be/H4hTGm87JTw' width="100%" height="600px" onReady={()=>{valueUp()}}/>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>

                                    {/* 전방주시태만 */}
                                    <div className="col-sm-12 col-lg-10">
                                        <div className="pt-5 ">
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
                                                <div>
                                                    <h2 style={{fontWeight:900,color:'#3E3E45'}}>전방 주시 태만 감지</h2>
                                                    <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>더 운전에 집중. 더 안전한 운전.</h2>
                                                    <h4 className="py-3" style={{fontWeight:500,color:'#3E3E45'}}>
                                                        Kurumamori 119는 더 운전에 집중할 수 있도록 더 안전한 운전을 할 수 있도록 서포트합니다.
                                                        전방 주시 태만 감지 서비스를 통해서 사용자의 운전 집중도를 최대화 할 수 있습니다.
                                                        Kurumamori 119를 통해서 더 안전하고 더 집중된 운전을 경험하세요.
                                                    </h4>
                                                </div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>
                                                <div className="row justify-content-around mx-0 px-0">
                                                    <ReactPlayer className="col-sm-11 col-lg-9" url='https://www.youtu.be/u7QIokPUbS8' width="100%" height="600px"/>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>

                                    {/* 자동신고 */}
                                    <div className="col-sm-12 col-lg-10">
                                        <div className="py-5">
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
                                                <div>
                                                    <h2 style={{fontWeight:900,color:'#3E3E45'}}>자동 신고 서비스</h2>
                                                    <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>골든타임. 혼자라도.</h2>
                                                    <h4 className="py-3" style={{fontWeight:500,color:'#3E3E45'}}>
                                                        Kurumamori 119는 당신이 혼자라더라도 외지에 있더라도 운전자 사고 신고를 할 수 있습니다. 
                                                        사고시 무엇보다 중요한 골든타임을 확보에 도움을 드립니다. 
                                                        자동 신고시 위치정보, 의료정보 전송으로 더 빠른 조치 더 확실한 조치를 받을 수 있도록 서포트합니다.
                                                    </h4>
                                                </div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.8}>
                                                <div className="row justify-content-around mx-0 px-0 pb-3">
                                                    <ReactPlayer className="col-sm-11 col-lg-9" url='https://www.youtu.be/CGDO4qMb3dk' width="100%" height="600px"/>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* 알고리즘 간단 설명  */}
                <div className="col-sm-12 col-lg-12 text-center d-table" style={{height: 700 + 'px',backgroundColor: 'white'}}>
                    <div className="d-table-cell align-middle">
                        <div className="row justify-content-around">
                            <div className="col-sm-12 col-lg-10 text-left" style={{paddingTop:100+'px'}}>
                                <ScrollAnimation animateIn='fadeInLeft' animateOnce={true} duration={0.5}>
                                    <h1 className="pb-5" style={{color:"black",fontWeight:800}}>알고리즘</h1>       
                                </ScrollAnimation>
                                <div className="row justify-content-around">
                                    <div className="col-sm-12 col-lg-10">

                                        <div>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>    
                                                <div>
                                                    <h2 style={{fontWeight:900,color:'#3E3E45'}}>사고 예방</h2>
                                                    <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>졸음 운전 예방.</h2>
                                                    <h4 className="py-3" style={{fontWeight:500,color:'#3E3E45'}}>졸음운전방지 서비스는 하드웨어의 카메라를 통해서 운전자가 눈을 뜨고있는지 감고있는지 감지합니다. 
                                                        감지여부에 따라서 Kurumamori 119의 알고리즘에 의해서 졸음운전 판단을 실시합니다. 
                                                        졸음운전이 판단되면 경고 음성 제공을 통해서 졸음 운전을 예방합니다.</h4>
                                                </div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.9}>  
                                                <div className="row justify-content-around mx-0 px-0">
                                                    <img className="col-sm-11 col-lg-9" src="../product/sleep.jpg" style={{width:100+'%',zIndex:100}}></img>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                        <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>  
                                            <div className="row justify-content-around mx-0 px-0 py-5">
                                                <h3 style={{fontWeight:900,color:'#3E3E45'}}>졸음 운전에 의한 사망율</h3>
                                                <h3 className="py-1" style={{color:"black",fontWeight:900,fontSize:2+'em'}}>고속도로 사망원인 중 1위</h3>
                                                <img className="" src="../product/sl1.png" style={{width:100+'%',zIndex:100}}></img>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-sm-12 col-lg-10">
                                        <div className="pt-5 ">
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>  
                                            <div>
                                                <h2 style={{fontWeight:900,color:'#3E3E45'}}>사고 예방</h2>
                                                <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>전방 주시 태만 감지.</h2>
                                                <h4 className="py-3" style={{fontWeight:500,color:'#3E3E45'}}>전방 주시 태만 감지 서비스는 하드웨어의 카메라를 통해 운전자의 시선을 추적하여 감지합니다. 
                                                    감지여부에 따라서 Kurumamori 119의 알고리즘에 의해서 전방 주시 태만 감지를 실시합니다. 
                                                    전방 주시 태만이 판단되면 음성 경고 제공을 통해서 전방 주시 태만을 방지합니다.</h4>
                                            </div> 
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.9}>
                                                <div className="row justify-content-around mx-0 px-0">
                                                    <img className="col-sm-11 col-lg-9" src="../product/danger.jpg" style={{width:100+'%',zIndex:100}}></img>
                                                </div>  
                                            </ScrollAnimation>
                                        </div>

                                    </div>
                                    <div className="col-sm-12 col-lg-10">
                                        <div className="pt-5">
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
                                                <div>
                                                    <h2 style={{fontWeight:900,color:'#3E3E45'}}>골든 타임의 중요성</h2>
                                                    <h2 className="py-1" style={{color:"black",fontWeight:900,fontSize:2.5+'em'}}>자동 신고 서비스</h2>
                                                    <div className="py-3">
                                                        <h4 style={{fontWeight:500,color:'#3E3E45'}}>자동 신고 서비스는 돌발적으로 발생하는 사고 상황을 하드웨어가 판단하여 자동으로 119에 신고해주는 서비스입니다.</h4>
                                                        <h4 style={{fontWeight:500,color:'#3E3E45'}}>사고가 발생하면 경보가 울리게 되는데 제한시간내에 운전자가 하드웨어의 취소버튼을 누르지 않으면 운전자가 취소를 할 수 없는 상태로 판단하여 자동으로 119에 신고를 하게 됩니다.</h4>
                                                        <h4 style={{fontWeight:500,color:'#3E3E45'}}>신고 시 등록했던 의료 정보와 현재 사고 위치 정보를 함께 119에 전송함으로써 현장 출동의 골든 타임이 보장될 수 있도록 돕습니다.</h4>
                                                    </div>   
                                                </div>  
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={0.9}>
                                                <div className="row justify-content-around mx-0 px-0">
                                                    <img className="col-sm-11 col-lg-9" src="../product/resque.jpg" style={{width:100+'%',zIndex:100}}></img>
                                                </div>  
                                            </ScrollAnimation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{height:100 +'px'}}></div>
                    </div>
                </div>


            </div>
        </Fragment>
        : <Loader/>
    )
}