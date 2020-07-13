import React from "react";
import styled from "styled-components";
import "../../../public/css/sb-admin-2.css";
import {Link} from "react-router-dom";

const Info_menu = styled.div`
    background-color:white;
    height:100%;
`;

export default () => {
    const info_menu = {
        background : "white",
        height : "100%"
    }
    const text_color = {
        color:"black",
        fontWeight: "800",
        fontSize: "20px"
    }
    // console.log(location.pathname.split('/')[2])
    return (
        <div className="card-header" style={{background:"white"}}>
            <ul className="nav nav-tabs card-header-tabs">
                {/* <span className="pt-2" style={{fontSize:"20px", color:"black", marginLeft:"10px"}}>내 정보 - &nbsp;&nbsp;&nbsp;</span> */}
                <li className="nav-item">
                    {/* 액티브! */}
                    <Link to="/info/index" className={`nav-link ${location.pathname.split('/')[2] == 'index' ? "active" : ""}`}>
                        {/* <i className="fas fa-fw fa-wrench" style={{color:"blue"}}></i> */}
                        <span className="text-color" style={text_color}>개인정보</span>
                    </Link>                  
                </li>
                <li className="nav-item">
                    <Link to="/info/medical_info" className={`nav-link ${location.pathname.split('/')[2] == 'medical_info' ? "active" : ""}`}>
                        {/* <i className="fas fa-fw fa-wrench" style={{color:"blue"}}></i> */}
                        <span className="text-color" style={text_color}>의료정보</span>
                    </Link>                      
                </li>
                <li className="nav-item">
                    <Link to="/info/drive_score" className={`nav-link ${location.pathname.split('/')[2] == 'drive_score' ? "active" : ""}`}>
                        {/* <i className="fas fa-fw fa-wrench" style={{color:"blue"}}></i> */}
                        <span className="text-color" style={text_color}>운전점수</span>
                    </Link> 
                </li>
            </ul>
    </div>
    )
}