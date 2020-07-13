window.onload = function () {
    console.log("a : " + day_5[0])
    var chart = new CanvasJS.Chart("myPieChart", {
        theme: "white",
        exportFileName: "Doughnut Chart",
        // exportEnabled: true,
        // animationEnabled: true,
        // title:{
        //     text: "도넛차트!"
        // },
        legend:{
            cursor: "pointer",
            fontSize: 15
        },
        data: [{
            type: "doughnut",
            innerRadius: 60,
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y}회 (#percent%)",
            // indexLabel: "{name} - #percent%",
            indexLabel: "#percent%",
            indexLabelFontSize : 18,
            fontSize: 15,
            dataPoints: [
                { y: day_5_percent[4], name: day_5[4] },   
                { y: day_5_percent[3], name: day_5[3] },
                { y: day_5_percent[2], name: day_5[2] },
                { y: day_5_percent[1], name: day_5[1] },
                { y: day_5_percent[0], name: day_5[0] },

            ]
        }]
    });
    chart.render();

    // function explodePie (e) {
    //     if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
    //         e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    //     } else {
    //         e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    //     }
    //     e.chart.render();
    // }

}