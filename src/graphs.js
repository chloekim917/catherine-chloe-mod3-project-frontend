document.addEventListener("DOMContentLoaded", function(e){
    

console.log("loaded")

    
    let chartData = {
        labels: [
            "Food","Utilities","Entertainment",
            "Housing", "Transportation", "Personal Care", 
            "Gift", "Miscellaneous", "Travel", "Groceries", 
            "Medical", "Pet Care"
            ],

        datasets: [{
            data: [20, 30, 40, 10],
            backgroundColor: ["#8FBC8F", "#00CED1", "#00BFFF","#E0FFFF"]
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
      
    // Get the context of the canvas element we want to select
    //to compile this we will need to be adding to a total every time an expenditure is added
    let donut = document.getElementById("donut").getContext("2d");
    new Chart(donut, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions
    });

    // const donutChartId = document.getElementsByTagName("script")[1].dataset.id
    // const ComparisonChartId = document.getElementsByTagName("script")[2].dataset.id

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

      let bar = document.getElementById("bar-graph").getContext("2d");
      new Chart(bar, {
        type: 'bar',
        data: barData,
        options: barOptions
    }); 


})