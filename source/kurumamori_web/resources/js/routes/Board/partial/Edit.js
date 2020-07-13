import React, {Fragment, useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";

import { BoardContext } from "../BoardContanier";

export default () => {

    const {
        data,
        select,
        user,
        onUpdate,
        setTitle,
        setCategory,
        setContent,
        register,
        handleSubmit,
        setAction,
        history,
    } = useContext(BoardContext);

    console.log("board update form call")

    return (
        <Fragment>
            {data && data.questions.data ? data.questions.data.map( (value, index) => {
                return (
                    value.id == select ? 
                    <div className="container mt-5 pt-5">
                <h1 className="">글 수정</h1>
                <hr/>
                <form onSubmit={handleSubmit(onUpdate)}>
                    <div className="px-3">
                        <div className="form-group">
                                <label className="">제목</label>
                                <input className="form-control" type="text" id="title" name="title" 
                                placeholder={value.title}
                                onChange={ e => {
                                    const {
                                    target: { value }
                                    } = e;
                                    setTitle(value);
                                }}/>
                        </div>
                        {/* <div>
                            <select className="form-group form-control-sm" name="category_id" id="category_id"
                            onChange={ e => {
                                const {
                                target: { value }
                                } = e;
                                setCategory(value);
                            }}>
                                {user && user.id == 3 ? `` : 
                                `<option defaultValue>공지사항</option>
                                <option>업데이트</option>`}
                                <option>제품구매</option>
                                <option>제품오류</option>
                                <option>소프트웨어</option>
                                <option>기타문의</option>
                            </select>
                        </div> */}
                        <div className="form-group">
                            <label className="">본문</label>
                            <textarea className="form-control" name="content" id="content" cols="30" rows="10"
                            onChange={ e => {
                                const {
                                target: { value }
                                } = e;
                                setContent(value);
                            }}
                            >{value.content}</textarea>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group d-flex justify-content-end pb-3">
                        <span className="pr-3">
                            <button className="btn-nomal" type="submit">저장하기</button>
                        </span>
                        <span>
                            <Link to="/boards/questions"onClick={()=>{setAction("index")}} className="btn-nomal">뒤로가기</Link>
                        </span>
                    </div>
                </form>
            </div>
                    :
                    <div></div>
                )
            })
            :   (
                <div></div>
                )
            }
        </Fragment>
    )

}