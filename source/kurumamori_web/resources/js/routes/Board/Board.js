import React, {Fragment, useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import ReactSearchBox from 'react-search-box'

import { BoardContext } from "./BoardContanier";
import Loader from '../../components/Loader';
import Auth from "./partial/Auth";
import Axios from "axios";

export default () => {

    const {
        user,
        data,
        setData,
        setAction,
        setSelect,
        history,
        onShow,
        categoryHover,
        setCategoryHover,
    } = useContext(BoardContext);
     
    const page_count = [];
    console.log(data.questions.last_page);
    for(var i = 0; i < data.questions.last_page; i++){
        page_count.push([i]);
    }
    // setCategoryHover('no');
    console.log(categoryHover);

    if(categoryHover=='yes'){
        
    }
    else{

    }

    return (
        data  ? 
            data && localStorage.getItem('userToken') == null ? 
            <Auth/> 
            : <Fragment>
            <div id="main-question">
                <div className="contaienr px-3 py-5 p-md-5">
                    <div className="row m-3 justify-content-around">
                        <div className="col-xs-10 col-sm-10 col-lg-10 card px-3 py-3">
                            <div className="px-3 pt-3">
                                <h2 style={{fontSize:3+"em"}}>고객 문의</h2>
                            </div>
                            {/* 네비게이션 */}
                            <div className="row justify-content-center py-3"> 

                                {/* 카테고리 선택 항목 */}
                                <div id="category-tab" className="col-sm-11 col-lg-11 py-2 px-0 mx-0 w-100" 
                                    onMouseEnter={()=>{setCategoryHover('yes')}}
                                    onMouseLeave={()=>{setCategoryHover('no')}}>
                                    <button id="" className="btn-toggle-tab" >
                                        <span>ALL</span>
                                        <ul id="mobile-only">
                                        </ul>
                                    </button>

                                    <div className="in-wrap row mx-0 px-0 justify-content-center"
                                        style={{
                                            // display:"none",
                                        }}
                                    >
                                        <div id="in-wrap" className="col-sm-11 col-lg-11 pt-3 bg-white row mx-0 px-0">
                                            <div className="col-sm-12 col-lg-12">
                                                <h2 id="" className="" style={{
                                                    fontSize:1.5+"em"
                                                }}>질문 게시판</h2>
                                            </div>
                                            <div className="col-sm-12 col-lg-12">
                                                <ul className="row mx-0 px-0 ">
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link  to="/boards/questions" id="" className="category-text" >ALL</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >공지사항</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >업데이트</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >제품구매</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >제품오류</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >소프트웨어</Link>
                                                    </li>
                                                    <li className="col-sm-12 col-lg-4 py-2">
                                                        <Link to="/boards/questions" id="" className="category-text" >기타문의</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 검색 및 글 쓰기 */}
                                <div id="supplementary-tab" className="col-sm-11 col-lg-11 py-2 px-0 mx-0 w-100">
                                    {/* 검색 항목 */}
                                    {/* <div className="input-group">
                                        <input type="text" className="form-control" placeholder="필요한 내용을 검색하세요." aria-label="Recipient's username" aria-describedby="input_value"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="input_button">검색</span>
                                        </div>
                                    </div> */}
                                    <div className="row justify-content-end px-0 mx-0 w-100">
                                        {/* 글 검색 항목 */}
                                        <div className="pr-3 ">
                                            {/* <ReactSearchBox 
                                                className="search-box"
                                                placeholder="검색어를 입력해 주세요."
                                                value=""
                                                // inputBoxBorderColor=""
                                            /> */}
                                            <span className="row px-0 mx-0">
                                                <input
                                                className="search-box"
                                                placeholder="검색어를 입력해 주세요."
                                                >
                                                </input>
                                                <Link className="search-botton">
                                                    <img className="search-img" src="../icon/search.png"></img>
                                                </Link>
                                            </span>
                                        </div>

                                        {/* 글 작성 항목 */}
                                        <div id="" className="my-0 py-0 text-center">
                                            <Link className="btn-create " to="/boards/questions/" onClick={()=>{setAction("create")}}>글쓰기</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 질문 리스트 */}
                            <div className="row justify-content-center py-3">
                                <div className="col-sm-11 col-lg-11">
                                    <table className="table table-hover .table-responsive">
                                        <thead className="">
                                            <tr>
                                                <td>No</td>
                                                <td></td>
                                                <td>Category</td>
                                                <td>Title</td>
                                                <td>Writer</td>
                                                <td>Date</td>
                                                <td>HIT</td>
                                            </tr>
                                        </thead>
                                        <tbody className="col-12">
                                            {data && data.questions.data ? data.questions.data.map( (value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="align-middle text-nowrap">{value.id}</td>
                                                        {/* <td className="align-middle">{value.comment ?  "O": "x"}</td>  */}
                                                        <td className="align-middle">X</td> 
                                                        
                                                        <td className="align-middle">{data.category[index]}</td> 
                                                        <td className="align-middle question-index-name">
                                                            {/* 온 쇼 추가 할 것 */}
                                                            <Link to={`/boards/questions/`} id="" onClick={()=>{setAction("show"),setSelect(value.id), onShow()}} className="btn btn-intro text-dark">{value.title}
                                                            </Link>
                                                        </td>
                                                        <td className="align-middle">{data.board_user[index]}</td>
                                                        <td className="align-middle text-nowrap">{moment(value.created_at).format("YYYY-MM-DD")}</td>
                                                        <td className="align-middle text-nowrap">{value.view_count}</td>
                                                    </tr>
                                                )
                                            })
                                            :   (
                                                <tr>
                                                    <td className="text-center" style={{color:"blue"}}>작성된 글이 없습니다.</td>
                                                </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    <div className="col-sm-12 col-lg-12 text-center">
                                        {page_count.length ? page_count.map( (value, index) => {
                                            return <Link key={index} className="btn btn-primary" to="/boards/questions?page=2" 
                                                onClick={
                                                    () => {
                                                        Axios.get(`/get/boards/questions?page=${index+1}`).then(res => {
                                                            console.log(res);
                                                            setData(res.data);
                                                        })
                                                    }
                                                }>
                                                {index+1}   
                                            </Link>
                                        }) : null}    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        : <Loader/>
    )

}