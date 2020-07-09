
document.addEventListener("DOMContentLoaded", function(e){


    function addData(chart, data) {
    console.log(chart)
    console.log(data)
    console.log(chart.data.datasets[0].data)

   
       


    let newArr = []

    newArr.push(expenseCategory.Food, expenseCategory.Utilities, expenseCategory.Entertainment, 
        expenseCategory.Housing, expenseCategory.Transportation, expenseCategory.PersonalCare, 
        expenseCategory.Gift, expenseCategory.Miscellaneous, expenseCategory.Travel, 
        expenseCategory.Medical, expenseCategory.PetCare)
    console.log(newArr)

       
    let chartArray = chart.data.datasets[0].data
    chartArray.splice(0, chartArray.length, ... newArr) 
    console.log(chartArray)

    chart.update();


    }


    
let chartData = {
    labels: [
        "Food","Utilities","Entertainment",
        "Housing", "Transportation", "Personal Care", 
        "Gift", "Miscellaneous", "Travel", "Groceries", 
        "Medical"
        ],

    datasets: [{
        data: [20, 30, 40, 10, 20, 30, 40, 10,20, 30, 40],
        backgroundColor: ["#00FFFF", "#7FFFD4", "#DEB887","#FF7F50","#CD5C5C","#6495ED", "#FF8C00","#E0FFFF", "#8FBC8F", "#00CED1", "#FF7F50","#FF8C00"]
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
  

    let donut = document.getElementById("donut").getContext("2d");
    
    const donutChart2= 
    new Chart(donut, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions
    });




// let donutLabels = chartData.labels //will give an array
// const donutChart = renderDonutChart() //will give chart
// let donutData = chartData.dataset  //data array

function fetchData(url){
    fetch(url)
    .then(resp => resp.json())
    .then(expenditureData => {
        expenditureData.data.forEach(expenditureObj => {
            let categoryName = expenditureObj.attributes.category.name
            let categoryAmount = expenditureObj.attributes.amount
            // console.log(categoryAmount)

            if(categoryName === "Food"){
                expenseCategory.Food += categoryAmount
                //console.log(expenseCategory.Food += categoryAmount)
            }
            else if(categoryName === "Utilities"){
                expenseCategory.Utilities += categoryAmount
            }
            else if(categoryName === "Entertainment"){
                expenseCategory.Entertainment += categoryAmount
            }
            else if(categoryName === "Housing"){
                expenseCategory.Housing += categoryAmount
            }
           
            else if(categoryName === "Transportation"){
                expenseCategory.Transportation += categoryAmount
            }
           
            else if(categoryName === "Personal Care"){
                expenseCategory.PersonalCare += categoryAmount
            }
           
            else if(categoryName === "Gift"){
                expenseCategory.Gift += categoryAmount
            }
           
            else if(categoryName === "Miscellaneous"){
                expenseCategory.Miscellaneous += categoryAmount
            }

            else if(categoryName === "Travel"){
                expenseCategory.Travel += categoryAmount
            }
            
            else if(categoryName === "Groceries"){
                expenseCategory.Groceries += categoryAmount
            }
            else if(categoryName === "Medical"){
                expenseCategory.Medical += categoryAmount
            }

            else if (categoryName === "Pet Care"){
                expenseCategory.PetCare += categoryAmount
            }

            
                
            })
            // console.log(expenseCategory)
            addData(donutChart2,expenseCategory )
          
        })
    
    }


fetchData("http://localhost:3000/api/v1/expenditures")

  //iterate through array and grab category name DONE
  //create counter for every category to get total
  //total will replace value of matching key in expense Object


  
  // console.log(expenseCategory)


  let expenseCategory = {
    Food:0,
    Utilities: 0, 
    Entertainment: 0, 
    Housing: 0, 
    Transportation:0, 
    PersonalCare: 0, 
    Gift:0, 
    Miscellaneous: 0, 
    Travel:0,
    Groceries:0,
    Medical:0, 
    PetCare:0
  }


})