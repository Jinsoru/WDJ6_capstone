// // Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

// 연령대 그래프
var ctx = document.getElementById("sleepAgeChart");   //bigdata/bigdata_chart/chart.blade.php의 canvas id
var sleepAgeChart = new Chart(ctx, {
    type: "line",
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
                    bigdata_age["20"]["bool_sleep"][day_7[6]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[5]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[4]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[3]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[2]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[1]].bool_sleep_count,
                    bigdata_age["20"]["bool_sleep"][day_7[0]].bool_sleep_count,
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
                    bigdata_age["30"]["bool_sleep"][day_7[6]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[5]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[4]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[3]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[2]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[1]].bool_sleep_count,
                    bigdata_age["30"]["bool_sleep"][day_7[0]].bool_sleep_count,
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
                    bigdata_age["40"]["bool_sleep"][day_7[6]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[5]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[4]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[3]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[2]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[1]].bool_sleep_count,
                    bigdata_age["40"]["bool_sleep"][day_7[0]].bool_sleep_count,
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
                    bigdata_age["50"]["bool_sleep"][day_7[6]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[5]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[4]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[3]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[2]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[1]].bool_sleep_count,
                    bigdata_age["50"]["bool_sleep"][day_7[0]].bool_sleep_count,
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
                    bigdata_age["60"]["bool_sleep"][day_7[6]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[5]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[4]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[3]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[2]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[1]].bool_sleep_count,
                    bigdata_age["60"]["bool_sleep"][day_7[0]].bool_sleep_count,
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
            displayColors: true,
        },
        legend: {
            display: true, 
            position: 'right',
        },
    }
});

// 시간대 그래프
var ctx = document.getElementById("sleepTimeChart");   //bigdata/bigdata_chart/chart.blade.php의 시간대 canvas id
var sleepTimeChart = new Chart(ctx, {
    type: "bar",
    data: {
    labels: ["00시 ~ 06시", "06시 ~ 12시", "12시 ~ 18시", "18시 ~ 24시"],    // 기준
        datasets: [
            {
                label: "졸음운전",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                hoverBorderColor: "rgba(234, 236, 244, 1)",
                data: [
                    bigdata_time[0]["bool_sleep"].bool_sleep_count,
                    bigdata_time[1]["bool_sleep"].bool_sleep_count,
                    bigdata_time[2]["bool_sleep"].bool_sleep_count,
                    bigdata_time[3]["bool_sleep"].bool_sleep_count,
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
});

