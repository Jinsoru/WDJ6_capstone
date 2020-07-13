import React, { useContext } from "react";
import { BigdataContext } from "../../BigdataContainer";
import { MDBContainer } from "mdbreact";
import { Line, Bar } from "react-chartjs-2";
export default () => {
    const {
        day_7,
        time_set_data,
        age_data,
    } = useContext(BigdataContext);

    const AccidentAgeChart = {
        data: {
            labels: [day_7[6], day_7[5], day_7[4], day_7[3], day_7[2], day_7[1], day_7[0]],    // 제목
            datasets: [
                {   // 20대
                    label: "20대",
                    borderColor: "purple",   //선 색깔
                    pointRadius: 3,
                    pointBackgroundColor: "purple",  //꼭짓점 색깔
                    pointBorderColor: "purple",  //꼭짓점 바탕색깔
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    data: [
                        age_data["20"]["bool_report"][day_7[6]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[5]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[4]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[3]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[2]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[1]].bool_report_count,
                        age_data["20"]["bool_report"][day_7[0]].bool_report_count,
                    ],
                },
                {   // 30대
                    label: "30대",
                    borderColor: "orange",   //선 색깔
                    pointRadius: 3,
                    pointBackgroundColor: "orange",  //꼭짓점 색깔
                    pointBorderColor: "orange",  //꼭짓점 바탕색깔
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    data: [
                        age_data["30"]["bool_report"][day_7[6]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[5]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[4]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[3]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[2]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[1]].bool_report_count,
                        age_data["30"]["bool_report"][day_7[0]].bool_report_count,
                    ],
                },
                {   // 40대
                    label: "40대",
                    borderColor: "green",   //선 색깔
                    pointRadius: 3,
                    pointBackgroundColor: "green",  //꼭짓점 색깔
                    pointBorderColor: "green",  //꼭짓점 바탕색깔
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    data: [
                        age_data["40"]["bool_report"][day_7[6]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[5]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[4]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[3]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[2]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[1]].bool_report_count,
                        age_data["40"]["bool_report"][day_7[0]].bool_report_count,
                    ],
                },
                {   // 50대
                    label: "50대",
                    borderColor: "blue",   //선 색깔
                    pointRadius: 3,
                    pointBackgroundColor: "blue",  //꼭짓점 색깔
                    pointBorderColor: "blue",  //꼭짓점 바탕색깔
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    data: [
                        age_data["50"]["bool_report"][day_7[6]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[5]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[4]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[3]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[2]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[1]].bool_report_count,
                        age_data["50"]["bool_report"][day_7[0]].bool_report_count,
                    ],
                },
                {   // 60대 이상
                    label: "60대 이상",
                    borderColor: "red",   //선 색깔
                    pointRadius: 3,
                    pointBackgroundColor: "red",  //꼭짓점 색깔
                    pointBorderColor: "red",  //꼭짓점 바탕색깔
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    data: [
                        age_data["60"]["bool_report"][day_7[6]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[5]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[4]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[3]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[2]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[1]].bool_report_count,
                        age_data["60"]["bool_report"][day_7[0]].bool_report_count,
                    ],
                },
            ]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                titleFontColor: '#6e707e',
                backgroundColor: "white",
                bodyFontColor: "black",
                borderWidth: 1,
                displayColors: false,
            },
            legend: {
                display: true, 
                position: 'right',
            },
        }
    }

    const AccidentTimeChart = {
        data: {
            labels: ["00시 ~ 06시", "06시 ~ 12시", "12시 ~ 18시", "18시 ~ 24시"],    // 기준
            datasets: [
                {
                    label: "교통사고",
                    backgroundColor: "red",
                    hoverBackgroundColor: "#2e59d9",
                    borderColor: "red",
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                    data: [
                        time_set_data[0]["bool_report"].bool_report_count,
                        time_set_data[1]["bool_report"].bool_report_count,
                        time_set_data[2]["bool_report"].bool_report_count,
                        time_set_data[3]["bool_report"].bool_report_count,
                    ],
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                titleFontColor: '#6e707e',
                backgroundColor: "white",
                bodyFontColor: "black",
                borderWidth: 1,
                displayColors: false,
            },
            legend: {
                display: true, 
                position: 'right',
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true   // minimum value will be 0.
                    }
                }]
            },
        }
    }
    return (
        <div className="chart-container">
            {/* 그래프 */}
            <div className="container px-3 py-5 p-md-5">
                <div className="pt-5">
                    {/* 연령대 그래프 */}
                    <div className="card">
                        <div className="card-header">
                            최근 7일간의 교통사고 발생 건수
                        </div>
                        <div className="card-body">
                            <div className="age-chart-container">
                                <MDBContainer>
                                    <Line data={AccidentAgeChart.data} options={AccidentAgeChart.options} width={313} height={253}/>
                                </MDBContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 시간대 그래프 */}
                <div className="pt-5">
                    <div className="card">
                        <div className="card-header">
                            시간대별 교통사고 발생 건수
                        </div>
                        <div className="card-body">
                            <div className="age-chart-container">
                                <MDBContainer>
                                    <Bar data={AccidentTimeChart.data} options={AccidentTimeChart.options} width={313} height={253}/>
                                </MDBContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}