// new Chart("myChart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     title: {
//       display: true,
//       text: "World Wine Production 2018"
//     }
//   }
// });

const createChart = (dataRecord) => {
  const ctx = document.getElementById("myChart");
  const xValues = Object.keys(dataRecord);
  const yValues = Object.values(dataRecord).map((val) => parseInt(val));

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          data: yValues,
          backgroundColor: "#9BD0F5",
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true, // Ensures the axis starts at 0
              suggestedMin: 0, // Forces the minimum value to be 0
            },
            gridLines: {
                drawOnChartArea: false // Hide the y-axis gridlines
            }
          },
        ],
        xAxes: [
          {
             gridLines: {
                    drawOnChartArea: false // Hide the y-axis gridlines
                }
          },
        ],
      },
      elements: {
        line: {
            borderWidth: 2, // Change the width of axis lines
            borderColor: 'red' // Change the color of axis lines
        }
    }
    },
  });

  
};

const fetchData = async () => {
  const res = await fetch(
    "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
  );
  const data = await res.text();
  const dataArr = data.split("\n").filter((val) => val != "");

  const dataRecord = dataArr.reduce((acum, val) => {
    acum[val] = acum[val] ? acum[val] + 1 : 1;
    return acum;
  }, {});
  return dataRecord;
};

fetchData().then((res) => {
  createChart(res);
}).catch(()=>{
    alert("something wrong please try later.");
})
