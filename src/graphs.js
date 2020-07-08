document.addEventListener("DOMContentLoaded", function(e){

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
    //define chartData[labels]
    //define chart
    //define chartData[dataset]

    let chartData = {
        labels: [
            "Food","Utilities","Entertainment",
            "Housing", "Transportation", "Personal Care", 
            "Gift", "Miscellaneous", "Travel", "Groceries", 
            "Medical", "Pet Care"
            ],

        datasets: [{
            data: [20, 30, 40, 10, 20, 30, 40, 10,20, 30, 40, 10],
            backgroundColor: ["#8FBC8F", "#00CED1", "#00BFFF","#E0FFFF","#8FBC8F", "#00CED1", "#00BFFF","#E0FFFF", "#8FBC8F", "#00CED1", "#00BFFF","#E0FFFF"]
        }]
    };

    let chartOptions = {
        legend: {
          position: 'left'
        },
        animation: {
          animateRotate: false,
          animateScale: true
        }
      };
      
    function renderDonutChart(){
        let donut = document.getElementById("donut").getContext("2d");
        new Chart(donut, {
            type: 'doughnut',
            data: chartData,
            options: chartOptions
        });
    }
    renderDonutChart();
    
   


//bar comparison chart below
    let barData = {
        labels: [
            "Food",
            "Utilities",
            "Entertainment", 
            "Personal Care"],
        datasets: [
        {
          label: "Budgeted Amount",
          backgroundColor: "#90EE90",
          data: [133,221,83,78]
        }, {
          label: "Actual Spending",
          backgroundColor: "#66CDAA",
          data: [408,547,75,34]
        }
      ]
    };

    let barOptions = {
        legend: {
          position: 'left'
        }
      };

      function renderBarChart(){
        let bar = document.getElementById("bar-graph").getContext("2d");
        new Chart(bar, {
          type: 'bar',
          data: barData,
          options: barOptions
        }); 
      }
      renderBarChart();

     

   

    

})