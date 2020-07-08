document.addEventListener("DOMContentLoaded", function(e){

   const dataContainer = document.querySelector("#data-container")

//    function render(expenditure){
//             let spent = document.createElement("tr")
//             let spendingCategory = document.createElement('td')
//             let spendingDetail = document.createElement('td')
//             let spendingAmount = document.createElement('td')
//             let totalDisplay = document.querySelector('.grand-total')

   function renderExpenditure(expenditure){
       const expenditureDiv = document.createElement("div");
       expenditureDiv.id = `${expenditure.attributes.id}`
       expenditureDiv.innerText= `
        ${expenditure.attributes.date} 
        ${expenditure.attributes.detail} 
        ${expenditure.attributes.amount} 
        ${expenditure.attributes.category.name} 
       `
       dataContainer.append(expenditureDiv);
   }

   function renderAllExpenditures(dataObject){
       dataObject.data.forEach(expenditure => {
        renderExpenditure(expenditure)
       }) 
   }

   function getExpenditures(){
        fetch('http://localhost:3000/api/v1/expenditures')
        .then(resp => resp.json())
        .then(expenditures => {expenditures.data.forEach(expenditure => {
            renderExpenditure(expenditure) 
            })        
        })
    }
    getExpenditures()

   
    let chartData = {
        labels: [
            "Utilities","Entertainment",
            "Housing", "Transportation", "Personal Care", 
            "Gift", "Miscellaneous", "Travel", "Groceries", 
            "Medical", "Pet Care"
            ],

        datasets: [{
            data: [20, 30, 40, 10, 20, 30, 40, 10,20, 30, 40],
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
    

    let donutLabels = chartData.labels //will give an array
    const donutChart = renderDonutChart() //will give chart
    let donutData = chartData.dataset  //data array

    function addData(chart, label, data) {
        //console.log(chart.data.labels)
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    addData(donutChart, "Food", 85)
    
   


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