import React, {useContext} from "react";
import { DriveContext } from "../../DriveContainer";
import { Doughnut } from "react-chartjs-2";
// import CanvasJSReact from "./canvasjs.react";

export default () => {

    const {
        day_5,
        day_5_danger_count
    } = useContext(DriveContext);
    let day_5_danger_sum = 0;
    const day_5_danger_percent = [];

    //총 합 구하기
    for (var i = 0; i < day_5_danger_count.length; i++){
        day_5_danger_sum += day_5_danger_count[i].count_danger;
    }

    //퍼센트 구하기
    for(var i = 0; i < day_5_danger_count.length; i++){
        day_5_danger_percent.push(
            (day_5_danger_count[i].count_danger / day_5_danger_sum * 100).toFixed(2)
        )
    }
    // dataPoints: [
    //     { y: day_5_danger_count[4].count_danger, name: day_5[4] },   
    //     { y: day_5_danger_count[3].count_danger, name: day_5[3] },
    //     { y: day_5_danger_count[2].count_danger, name: day_5[2] },
    //     { y: day_5_danger_count[1].count_danger, name: day_5[1] },
    //     { y: day_5_danger_count[0].count_danger, name: day_5[0] },

    // ]
    //라인차트 값
    const DoughnutChart =  {
        data: {
            labels: [day_5[4], day_5[3],day_5[2],day_5[1],day_5[0]],
            datasets: [
                {
                    labels: "위험요소 빈도",
                    backgroundColor: "#4e73df",
                    hoverBackgroundColor: "#2e59d9",
                    // borderColor: "#4e73df",
                    data: [
                        day_5_danger_percent[4],
                        day_5_danger_percent[3],
                        day_5_danger_percent[2],
                        day_5_danger_percent[1],
                        day_5_danger_percent[0],
                    ],
                    backgroundColor: ["orange", "green", "blue", "red", "black"],
                    hoverBackgroundColor: ["orange", "green", "blue", "red", "black"],
                    hoverBorderColor: "rgba(234, 236, 244, 1)"
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom',
    
            },
            cutoutPercentage: 80,
            tooltips: { //차트 바 클릭시 나오는 창
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 16,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "black",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                    // var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    // console.log(chart.datasets);
                    // console.log(tooltipItem.index);
                    return chart.datasets[0].labels + " : " + chart.datasets[0].data[tooltipItem.index] +  "%";
                    }
                }
            },
        }
    }
    return(
        <Doughnut data={DoughnutChart.data} options={DoughnutChart.options} width={693} height={320}/>      
    )
}