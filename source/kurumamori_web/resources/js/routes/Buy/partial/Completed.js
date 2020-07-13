import React, {Fragment,useContext, useState, useEffect} from "react";
import { Route, Link, BrowserRouter} from "react-router-dom";

export default ({product_key}) => {

    return (
        // css 개선 
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-sm-10 col-lg-10 py-5 text-center">
                    <div className="row justify-content-center" style={{height:80+"vh"}}>
                        <div className="col-sm-12 col-lg-10 py-3">
                            <h4 style={{fontSize:"3.5em", color:"black"}}>구매해주셔서 감사합니다.</h4>
                            <div className="pt-4">
                                <p style={{fontSize:2.0+"em"}}>kurumamori 119 사용을 위해서 아래 두가지 사항을 미리 준비해주세요!</p>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-8 py-2 mb-4 card">
                            <div className="row mx-0 px-0 justify-content-letf pt-3 pl-3 d-flex flex-row align-items-center">
                                <p className="py-0" style={{fontSize:"3em", color:"black"}}>01.</p>
                                <p className="py-0" style={{fontSize:"1.75em", color:"#34394D"}}>제품 등록 및 의료정보 등록하기</p>

                            </div>
                            <div className="row mx-0 px-0 justify-content-around pb-3" >
                                <div className="col-sm-12 col-lg-5 py-3">
                                    <div className="py-1" style={{fontSize:2.5+"em", color:"black"}}>구매한 제품 코드</div>
                                    <div className="py-1" style={{fontSize:2+"em", color:"black"}}>{product_key}</div>
                                </div>
                                <div className="col-sm-12 col-lg-5 btn btn-dark text-center"                                 
                                style={{ display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column"}}
                                >
                                    <Link to="/info/index" className="nav-link" style={{fontSize:2+"em",color:"white"}}>제품 등록하러 가기</Link> 
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-8 py-2 card">
                            <div className="row mx-0 px-0 justify-content-letf pt-3 pl-3 d-flex flex-row align-items-center">
                                <p className="py-0" style={{fontSize:"3em", color:"black"}}>02.</p>
                                <p className="py-0" style={{fontSize:"1.75em", color:"#34394D"}}>스마트폰 앱스토어에서 쿠루마모리 앱 설치 하기</p>
                            </div>
                            <div className="row mx-0 px-0 justify-content-around pb-3" >
                                <div className="col-sm-12 col-lg-4">
                                    <img className="" src="/icon/googlePlay.png" style={{width:100+'%',zIndex:100}}></img>
                                </div>
                                <div className="col-sm-12 col-lg-4">
                                    <img className="" src="/icon/appStore.png" style={{width:100+'%',zIndex:100}}></img>
                                </div>
                                <div className="col-sm-12 col-lg-4">
                                    <img className="" src="/icon/oneStore.png" style={{width:100+'%',zIndex:100}}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}