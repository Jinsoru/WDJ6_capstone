import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = styled.div`
    position:relative;
    bottom:0px; 
    left:0px;
    right: 0px; 
    height:50px; 
    width:100%; 
    background-color: #F1F3FF;
    color: black; 
    text-align: center;
    opacity:1;
`;
const up = () => {
    window.scrollTo(0,0);
}
export default () => {
    return (
        <Footer>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2">
                            <p style={{fontSize:"16px"}}>© Copyright MIRO.</p>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7">

                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1">
                            <a href="https://www.youtube.com/channel/UCTLr43DTgWut2lSQ2vFcXAw/featured">
                                <img src="/icon/youtube.png" style={{width:"30px"}}/>
                            </a>

                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                            <button className="btn btn-success" onClick={()=>up()} style={{
                                position: "fixed",
                                // bottom:"70px",
                                bottom: "10px",
                                right:"30px",       
                            }}>
                               ↑<br/>TOP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>

    )
}