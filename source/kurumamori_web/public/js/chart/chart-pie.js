// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: [day_5[4], day_5[3],day_5[2],day_5[1],day_5[0]],
        datasets: [
            {
                data: [
                    day_5_danger_count[4].count_danger, 
                    day_5_danger_count[3].count_danger, 
                    day_5_danger_count[2].count_danger, 
                    day_5_danger_count[1].count_danger, 
                    day_5_danger_count[0].count_danger
                ],
                backgroundColor: ["orange", "green", "blue", "red", "black"],
                hoverBackgroundColor: ["orange", "green", "blue", "red", "black"],
                hoverBorderColor: "rgba(234, 236, 244, 1)"
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
        },
        legend: {
            display: true,
            position: 'bottom',

        },
        cutoutPercentage: 80,
        yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                // return '$' + number_format(value);
                return value + "%";
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
    }
});
