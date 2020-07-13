import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import {AppContext} from "../../components/App";
import moment from "moment";
import Info_menu from "../../layout/Info_menu";
import Product_modal from "./partial/Product_modal";
import Loader from "../../components/Loader";
import ScrollAnimation from "react-animate-on-scroll";

export default ( {
    history,
    data,
    setProduct_key_input,
    error_text,
    onSubmit,
    reports,
}) => {
    const { user, setUser } = useContext(AppContext);

    return (
        <div>
            <div className="row mt-5 mb-5">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <section id="intro" className="section intro" style={{background: "#f7f7f7"}}>
                        <div className="card text-center" /*style={{borderColor:"black"}} */>
                            <Info_menu/>
                            {data && user.id ? (
                                <div className="card-body">
                                {/* <Info_menu/> */}
                                <div className="row">
                                    {/* 개인 정보 */}
                                    <div className="col-sm-6 col-lg-6">
                                        <ScrollAnimation animateIn='fadeIn' delay={200} animateOnce={true}>
                                            <div className="card">
                                                <div className="card-header" style={{background:"blue", color:"white"}}>
                                                    개인 정보
                                                </div>
                                                <div className="card-body py-3">
                                                    <div className="row">
                                                        <div className="col-lg-6 mb-3">
                                                            <p className="card-text"><b>이메일</b><br/>{data.user.email}</p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <p className="card-text"><b>이름</b><br/>{data.user.name}</p>
                                                        </div>
                                                        
                                                        <div className="col-lg-6 mb-3">
                                                            <p className="card-text"><b>생년월일</b><br/>{data.user.birth}</p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <p className="card-text"><b>성별</b><br/>{data.user.gender}</p>
                                                        </div>
                                                        
                                                        <div className="col-lg-6 mb-3">
                                                            <p className="card-text"><b>휴대폰 번호</b><br/>{data.user.phone}</p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <p className="card-text"><b>가입날짜</b><br/>{moment(data.user.created_at).format("YYYY-MM-DD")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    {/* 사고 이력 */}
                                    <div className="col-sm-6 col-lg-6">
                                        <ScrollAnimation animateIn='fadeIn' delay={400} animateOnce={true}>
                                            <div className="card">
                                                <div className="card-header" style={{background:"red", color:"white"}}>
                                                    사고 이력
                                                </div>
                                                <div className="card-body py-3">
                                                    {data.reports.data.length ? data.reports.data.map( (value, index) => {
                                                        return (
                                                            <div className="row" key={index}>
                                                                <div className="col-sm-6 col-lg-6 mb-3">
                                                                    <p className="card-text"><b>접수날짜</b><br/>{moment(value.created_at).format("YYYY-MM-DD hh:mm:ss")}</p>
                                                                </div>
                                                                <div className="col-sm-6 col-lg-6 mb-3">
                                                                    <p className="card-text"><b>사고지역</b><br/>{reports[index]}</p>        
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :   (
                                                        <p className="text-center text-danger" style={{fontSize:"20px"}}>
                                                            이력이 없습니다.
                                                        </p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                                
                                <div className="row mt-5">
                                    {/* 제품 등록 정보 */}
                                    <div className="col-sm-6 col-lg-6" style={{zIndex:1}}>
                                        <ScrollAnimation animateIn='fadeIn' delay={600} animateOnce={true}>

                                            <div className="card">
                                                <div className="card-header" style={{background:"green", color:"white"}}>
                                                    제품 등록 정보
                                                </div>
                                                <div className="card-body py-3">
                                                    {data.product ? (
                                                        <div>                                                      
                                                            <p className="card-text"><b>제품 키</b><br/>{data.product.product_key}</p>
                                                            <p className="card-text"><b>구입 날짜</b><br/>{moment(data.product_buy.created_at).format("YYYY-MM-DD")}</p>
                                                            <p className="card-text"><b>무상 AS기한</b><br/>구입 후 1년까지</p>
                                                            {/* float 정렬때문에 삭제가 뒤로감 */}
                                                            <button style={{marginLeft:"5px", float:"right"}} type="button" onClick={() => onSubmit("delete")} className="btn btn-danger btn__delete__product">
                                                                제품 삭제
                                                            </button>
                                                            <button style={{float:"right"}}type="button" className="btn btn-success" data-toggle="modal" data-target="#productModal">
                                                                제품 재등록
                                                            </button>
                                                        </div>
                                                        ) : (
                                                        <div>
                                                            <p className="text-center text-danger">등록한 제품이 없습니다.</p>
                                                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                                                data-target="#productModal">
                                                                제품 등록
                                                            </button>
                                                        </div>
                                                    )}
                                                    <Product_modal 
                                                        product={data.product}
                                                        setProduct_key_input={setProduct_key_input}
                                                        error_text={error_text}
                                                        history={history}
                                                        onSubmit={onSubmit}
                                                        />
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    {/* 제품 구매이력 */}
                                    <div className="col-sm-6 col-lg-6">
                                        <ScrollAnimation animateIn='fadeIn' delay={800} animateOnce={true}>
                                            <div className="card">
                                                <div className="card-header" style={{background:"green", color:"white"}}>
                                                    제품 구매 이력
                                                </div>
                                                <div className="card-body py-3">
                                                        {data.user_product_buy_key.length ? data.user_product_buy_key.map( (value, index) => {
                                                            return (
                                                                <div className="row" key={index}>
                                                                    <div className="col-lg-6">
                                                                        <p className="card-text"><b>구매한 제품키</b><br/>{value.product_key}</p>
                                                                    </div>
                                                                    <div className="col-lg-6 mb-3">
                                                                        <p className="card-text"><b>구매 날짜</b><br/>{moment(value.created_at).format("YYYY-MM-DD")}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : (
                                                            <p className="text-center text-danger" style={{fontSize:"20px"}}>
                                                                이력이 없습니다.
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-lg-12">
                                    <ScrollAnimation animateIn='fadeIn' animateOnce={true}>

                                            <h4 className="text-center">문의 이력 </h4>
                                            <table className="table" style={{borderTop: "3px solid blue", borderBottom: "3px solid blue"}}>
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>#</th>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>제목</th>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>카테고리</th>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>작성날짜</th>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>조회수</th>
                                                        <th className="text-center" scope="col" style={{fontSize:"20px"}}>대답여부</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {data.boards.data ? data.boards.data.map( (value, index) => {
                                                        return (
                                                            <tr key={index} onClick={()=> history.push(`/boards/${data.board_categories[index].category == "유저리뷰" ? "reviews" : "questions"}/${value.id}`)} style={{cursor:"pointer"}}>
                                                                <th className="text-center" scope="row">{value.id}</th>
                                                                <td className="text-center" scope="row">{value.title}</td>
                                                                <td className="text-center" scope="row">{data.board_categories[index].category}</td>
                                                                <td className="text-center" scope="row">{moment(value.created_at).format("YYYY-MM-DD")}</td>
                                                                <td className="text-center" scope="row">{value.view_count}</td>
                                                                <td className="text-center" scope="row">{data.board_comments[index] ? "O" : "X"}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    :   (
                                                        <p className="text-center text-danger" style={{fontSize:"20px"}}>
                                                            이력이 없습니다.
                                                        </p>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <p className="text-danger">최근 5건만 표시됩니다.</p>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                            ) : <Loader/>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}