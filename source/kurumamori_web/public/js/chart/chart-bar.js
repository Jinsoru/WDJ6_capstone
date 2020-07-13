// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function time_format(sec){
  var hours =  Math.floor(sec / 3600);
  var minutes =  Math.floor( (sec - (hours * 3600)) / 60);
  var seconds = sec - (hours * 3600) - (minutes * 60);
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  // console.log(hours+':'+minutes+':'+seconds);
  // return hours+'시 '+minutes+'분 '+seconds+'초';
  return hours+'시 '+minutes+'분 '+seconds+'초';
}

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      day_5[4],
      day_5[3],
      day_5[2], 
      day_5[1], 
      day_5[0],
    ],
    datasets: [{
      label: "운전시간",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [
        day_5_sec[4],
        day_5_sec[3],
        day_5_sec[2],
        day_5_sec[1],
        day_5_sec[0]
      ],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'day'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          // min: time_format(0),
          // max: time_format(10800),
          maxTicksLimit: 4,
          padding: 10,
          fontSize: 16,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return value+ "s";
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
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        fontSize:15,
    }

  },
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
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + time_format(tooltipItem.yLabel);
        }
      }
    },
  }
});
