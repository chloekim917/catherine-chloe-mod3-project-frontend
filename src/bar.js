
document.addEventListener("DOMContentLoaded", function(e){

    function addData(chart, data) {
     //console.log(chart)
    //console.log(data)
    // console.log(chart.data.datasets[0].data)

    let newArr = []

    newArr.push(expenseCategory.Food, expenseCategory.Utilities, expenseCategory.Entertainment, 
        expenseCategory.Housing, expenseCategory.Transportation, expenseCategory.PersonalCare, 
        expenseCategory.Gift, expenseCategory.Miscellaneous, expenseCategory.Travel, 
        expenseCategory.Medical, expenseCategory.PetCare)
    // console.log(newArr)

       
    let chartArray =  chart.data.datasets[0].data
    chartArray.splice(0, chartArray.length, ... newArr) 
    //console.log(chartArray)

    chart.update();
    }

   
    function addBarData(chart, data) {
        //console.log(chart)
    //console.log(data)
     //console.log(chart.data.datasets[1].data)

        let newArray = []
    
        newArray.push(budgetExpenses.Food, budgetExpenses.Utilities, budgetExpenses.Entertainment, 
            budgetExpenses.Housing, budgetExpenses.Transportation, budgetExpenses.PersonalCare, 
            budgetExpenses.Gift, budgetExpenses.Miscellaneous, budgetExpenses.Travel, 
            budgetExpenses.Medical, budgetExpenses.PetCare)
        //console.log(newArray)
    
           
        let barChartArray = chart.data.datasets[1].data
        barChartArray.splice(0, barChartArray.length, ... newArray) 
        //console.log(barChartArray)
    
        chart.update();
        }


let barData = {
    labels: [
        "Food","Utilities","Entertainment",
        "Housing", "Transportation", "Personal Care", 
        "Gift", "Miscellaneous", "Travel", "Groceries", 
        "Medical"
        ],

    datasets: [{
        label:"Actual Spending",
        data: [20, 30, 40, 10, 20, 30, 40, 10,20, 30, 40],
        backgroundColor: ["#1E90FF", "#1E90FF", "#1E90FF","#1E90FF",
        "#1E90FF","#1E90FF", "#1E90FF","#1E90FF", "#1E90FF", "#1E90FF",
        "#1E90FF","#1E90FF"]
    }, 
    {   label: "Budgeted Amount",
        data2:[11, 3, 14, 10, 21, 35, 47, 11, 26, 32, 41],
        backgroundColor: ["#00CED1", "#00CED1", "#00CED1", "#00CED1", 
        "#00CED1", "#00CED1", "#00CED1", "#00CED1",  "#00CED1",  "#00CED1", 
        "#00CED1", "#00CED1"]
    }]
};

let barOptions = {
    legend: {
      position: 'left'

    },
    animation: {
      animateRotate: false,
      animateScale: true
    }
  };
  

    let barGraph = document.getElementById("bar-graph").getContext("2d");
    
    const barChart2= 
    new Chart(barGraph, {
        type: 'bar',
        data: barData,
        options: barOptions
    });


function fetchData(url){
    fetch(url)
    .then(resp => resp.json())
    .then(expenditureData => {
        expenditureData.data.forEach(expenditureObj => {
            let categoryName = expenditureObj.attributes.category.name
            let categoryAmount = expenditureObj.attributes.amount
            let budgetAmount = expenditureObj.attributes.category.budget_amount
            
            
            if(categoryName === "Food"){
                expenseCategory.Food += categoryAmount
                budgetExpenses.Food += budgetAmount
                //console.log(budgetExpenses.Food += budgetAmount)
            }
            else if(categoryName === "Utility"){
                expenseCategory.Utilities += categoryAmount
                budgetExpenses.Utilities += budgetAmount
            }
            else if(categoryName === "Entertainment"){
                expenseCategory.Entertainment += categoryAmount
                budgetExpenses.Entertainment += budgetAmount
            }
            else if(categoryName === "Housing"){
                expenseCategory.Housing += categoryAmount
                budgetExpenses.Housing += budgetAmount
            }
           
            else if(categoryName === "Transportation"){
                expenseCategory.Transportation += categoryAmount
                budgetExpenses.Transportation += budgetAmount
            }
           
            else if(categoryName === "Personal Care"){
                expenseCategory.PersonalCare += categoryAmount
                budgetExpenses.PersonalCare += budgetAmount
            }
           
            else if(categoryName === "Gift"){
                expenseCategory.Gift += categoryAmount
                budgetExpenses.Gift += budgetAmount
            }
           
            else if(categoryName === "Miscellaneous"){
                expenseCategory.Miscellaneous += categoryAmount
                budgetExpenses.Miscellaneous += budgetAmount
            }

            else if(categoryName === "Travel"){
                expenseCategory.Travel += categoryAmount
                budgetExpenses.Travel += budgetAmount
            }
            
            else if(categoryName === "Groceries"){
                expenseCategory.Groceries += categoryAmount
                budgetExpenses.Groceries += budgetAmount
            }
            else if(categoryName === "Medical"){
                expenseCategory.Medical += categoryAmount
                budgetExpenses.Medical += budgetAmount
            }

            })
            
            addData(barChart2,expenseCategory)
            addBarData(barChart2,budgetExpenses)
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

  let budgetExpenses = {
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