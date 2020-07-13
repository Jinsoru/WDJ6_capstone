import React, {useContext} from "react";
import Info_menu from "../../layout/Info_menu";
import Show_medical from "./partial/Show_medical.js";
import Create_medical from "./partial/Create_medical.js";
import "./good.css";
import {AppContext} from "../../components/App";
import { MedicalContext } from "./MedicalContainer";
import Loader from "../../components/Loader";
export default () => {
    const { user } = useContext(AppContext);
    const { form } = useContext(MedicalContext);
    return (
        <div className="row mt-5 mb-5">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                <section id="intro" className="section intro" style={{background: "#f7f7f7"}}>
                    <div className="card">
                        <Info_menu/>
                        {user && user.id && form  ? (
                            <div className="card-body">
                                    {form == "view" ? (
                                        <Show_medical/>
                                    ) : (
                                        <Create_medical/>
                                    )}
                            </div>
                        ) : <Loader/>}
                    </div>
                </section>
            </div>
        </div>
    )
}