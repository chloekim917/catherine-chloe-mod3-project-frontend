let postIt = document.querySelector('.post-it')
let spendingTable = document.querySelector('.spending-table')
let arr = []

function getExpenditures(){
    fetch('http://localhost:3000/api/v1/expenditures')
    .then(resp => resp.json())
    // .then(console.log)
    .then(expenditures => {expenditures.data.forEach(function(expenditure){
        render(expenditure)     
    })
})
}

function render(expenditure){
    document.addEventListener('click', function(e){
        if(parseInt(e.target.id) === expenditure.attributes.date){
            e.preventDefault()
            let spent = document.createElement("tr")
            let spendingCategory = document.createElement('td')
            let spendingDetail = document.createElement('td')
            let spendingAmount = document.createElement('td')
            let totalDisplay = document.querySelector('.grand-total')

            spendingCategory.innerText = `${expenditure.attributes.category.name}`
            spendingDetail.innerText = `${expenditure.attributes.detail}`
            spendingAmount.innerText = `${expenditure.attributes.amount}`
            spent.append(spendingCategory, spendingDetail, spendingAmount)
            spendingTable.appendChild(spent)

            
            arr.push(parseInt(spendingAmount.textContent))
            let totalSpending = arr.reduce(function(a, b){
                return a + b;
            }, 0);
            totalDisplay.textContent=`${totalSpending}`
        }
    })
}

function postExpenditures(){
    document.addEventListener('submit', function(e){
        if(e.target.className === 'add-spending-form'){
            e.preventDefault()
            
            // fetch('http://localhost:3000/api/v1/expenditures',{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //         'Accept': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         category:
            //     })
            // })
            
        }
    })
}

getExpenditures()
postExpenditures()