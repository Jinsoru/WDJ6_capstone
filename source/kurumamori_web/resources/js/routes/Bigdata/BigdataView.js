import React, { useContext } from "react";
import { BigdataContext } from "./BigdataContainer";
import { Link } from "react-router-dom";
import Detail from "./partial/Detail";


export default () => {

    const {
        action,
        setAction
    } = useContext(BigdataContext);


    return action == "index" ? (
        <section id="intro" className="section intro" style={{paddingTop:"50px"}}>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 mb-3">
                    <div className="bigdata-card-menu mt-5">
                        <p className="bigdata-text">쿠루마모리119에서 제공되는 졸음운전 데이터입니다.</p>
                        <div className="card sleep-chart border-info">
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <img src="/images/graph1.png" alt="" className="card-img card-img-view"/>
                                </div>
                                <div className="col-8 text-right">
                                    <div className="card-body">
                                        <h5 className="card-title">졸음운전</h5>
                                        <p className="card-text">현재 우리나라의 교통사고 사망원인 중 가장 높은 비율을 차지하는 것이 바로 졸음운전입니다. 졸음운전으로 인한 교통사고의 발생은 일반 교통사고보다 8배 정도 높게 나타납니다.</p>
                                        <p className="card-text">우리 서비스를 이용하는 운전자들은 언제, 어떤 사람들이, 어디에서 졸음운전을 할까요??</p>
                                        <p className="card-text"> 빅데이터 자료실에서 지금 확인해보세요!!!</p>                            
                                        <Link to="/bigdata/sleep" onClick={() => setAction("sleep")} className="btn btn-primary">자세히 보기</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bigdata-card-menu mt-5">
                        <p className="bigdata-text">쿠루마모리119에서 제공되는 급가속 급정거 데이터입니다.</p>
                        <div className="card sudden-chart border-warning">
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <img src="/images/graph2.png" alt="" className="card-img card-img-view"/>
                                </div>
                                <div className="col-8 text-right">
                                    <div className="card-body">
                                        <h5 className="card-title">급정거 급가속</h5>
                                        <p className="card-text">급정거와 급가속은 자동차의 수명을 단축시킬 뿐만 아니라, 브레이크 제동거리에 의해 보행자나 자동차와의 접촉사고가 발생할 수도 있습니다. 급정거와 급가속은 지속적으로 운전에 집중하며 조심해야합니다!</p>
                                        <p className="card-text">우리 서비스를 이용하는 운전자들은 어떤 사람들이 언제, 어디에서 급가속 / 급정거를 할까요??</p>
                                        <p className="card-text">빅데이터 자료실에서 지금 확인해보세요!!!</p>
                                        <Link to="/bigdata/sudden" onClick={() => setAction("sudden")} className="btn btn-primary">자세히 보기</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bigdata-card-menu mt-5">
                        <p className="bigdata-text">쿠루마모리119에서 제공되는 교통사고 데이터입니다.</p>
                        <div className="card accident-chart border-danger">
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <img src="/images/graph3.png" alt="" className="card-img card-img-view"/>
                                </div>
                                <div className="col-8 text-right">
                                    <div className="card-body">
                                        <h5 className="card-title">교통사고</h5>
                                        <p className="card-text">연간 교통사고 발생 건 수는 220,000건을 넘고, 이로 인한 교통사고 사망자 수는 3,700명을 넘습니다. 또한 이로 인해 교통사고로 인한 경제적 손실은 40조 5000억원을 초과하고 있습니다.</p>
                                        <p className="card-text">우리 서비스를 이용하는 운전자들은 언제, 어떤 사람들이, 어디에서 교통사고를 내고 있을까요?</p>
                                        <p className="card-text"> 빅데이터 자료실에서 지금 확인해보세요!!!</p>                            
                                        <Link to="/bigdata/accident" onClick={() => setAction("accident")} className="btn btn-primary">자세히 보기</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </section>
    ) : <Detail/>
    // ) : action == "sleep" ? (
    //     <Sleep/>
    // ) : action == "sudden" ? (
    //     <Sudden/>
    // ) : <Accident/>
}
