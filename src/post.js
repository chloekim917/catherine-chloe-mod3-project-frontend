let calendarDate = document.querySelector('.dates')
let arr = []
let totalDisp = document.querySelector('.grand-total')
let spendingBody = document.getElementById('spending-body')
let sp = document.querySelector('.add-spending-form')
let hideSeek = document.querySelector('.hide-seek')
let calendarBody = document.getElementById('calendar-body')


calendarBody.addEventListener('click', function(e){
    if(document.querySelector('.hidden-p2')){
    let sel = document.querySelector('.selected-day')
    sel.className = "each-month"
    }
    e.target.className = 'selected-day'
    sp.id = e.target.id
    let newpp = document.createElement('p')
    newpp.className = 'hidden-p2'
    newpp.hidden = true
    calendarDate.append(newpp)
});

document.addEventListener('click', function(e){
    // console.log(e.target)
    if(e.target.className === 'selected-day'){
        spendingBody.innerHTML = "" 
        arr = []

        let selDate = e.target.id
        fetch(`http://localhost:3000/api/v1/expenditures_by_date?q=${selDate}`)
        .then(resp => resp.json())
        .then(expenditures =>{expenditures.forEach(function(expenditure){
            renderExpenditure(expenditure)
        })
    })
    }  
})


function renderExpenditure(expenditure){
    let spent = document.createElement("tr")
    spent.className = 'spending-row'
    spent.dataset.id = expenditure.id

    spent.innerHTML = `
    <td class='expense-category'>${expenditure.category.name}</td>
    <td class='expense-detail'>${expenditure.detail}</td>
    <td class='expense-amount'>${expenditure.amount}</td>
    <button>x</button>
    `
    spendingBody.append(spent)

    arr.push(expenditure.amount)
    let totalSpending = arr.reduce(function(a, b){
        return parseFloat(a + b);
    }, 0);
    totalSpending = Math.round( totalSpending* 100 + Number.EPSILON ) / 100
    totalDisp.textContent=`${totalSpending}` 
}


document.addEventListener('click', function(e){
    if(e.target.className === 'selected-day')
    sp.id = e.target.id
})


sp.addEventListener('submit', function(e){
    e.preventDefault()
    let spendingObj = {
        date: sp.id,
        category_id: parseInt(sp.categories.value),
        category: sp.categories.value,
        detail: sp.detail.value,
        amount: parseFloat(sp.amount.value)
    }
    postExpenditures(spendingObj)
})
    
   
function postExpenditures(spendingObj){
    fetch('http://localhost:3000/api/v1/expenditures', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(spendingObj)
        })

        let objId = spendingObj.category
        let newSpent = document.createElement('tr')
        newSpent.className = 'spending-row'

            let cateName = 'Default'
            if(spendingObj.category_id === 1){
                cateName = 'Food'
            }else if(spendingObj.category_id === 2){
                cateName = 'Utility'
            }else if(spendingObj.category_id === 3){
                cateName = 'Entertainment'
            }else if(spendingObj.category_id === 4){
                cateName = 'Housing'
            }else if(spendingObj.category_id === 5){
                cateName = 'Transportation'
            }else if(spendingObj.category_id === 6){
                cateName = 'Personal Care'
            }else if(spendingObj.category_id === 7){
                cateName = 'Gift'
            }else if(spendingObj.category_id === 8){
                cateName = 'Miscellaneous'
            }else if(spendingObj.category_id === 9){
                cateName = 'Travel'
            }else if(spendingObj.category_id === 10){
                cateName = 'Groceries'
            }else if(spendingObj.category_id === 11){
                cateName = 'Medical'
            }else if(spendingObj.category_id === 12){
                cateName = 'Pet Care'
            }
            newSpent.innerHTML = `
            <td class='expense-category'>${cateName}</td>
            <td class='expense-detail'>${spendingObj.detail}</td>
            <td class='expense-amount'>${spendingObj.amount}</td>
            <button>x</button>
            `
        spendingBody.append(newSpent)
        // }
        
        arr.push(spendingObj.amount)
        let totalSpending = arr.reduce(function(a, b){
            return parseFloat(a + b);
        }, 0);
        totalSpending = Math.round( totalSpending* 100 + Number.EPSILON ) / 100
        totalDisp.textContent=`${totalSpending}`  

        sp.reset()
    }


function deleteExpenditures(){
    document.addEventListener('click', function(e){
        if(e.target.textContent === 'x'){
            const deletingSpending = e.target.parentNode
            let spendingId = deletingSpending.dataset.id
            deletingSpending.remove()

        fetch(`http://localhost:3000/api/v1/expenditures/${spendingId}`,{
          method: "DELETE"
        })

        let deletedAmount = parseFloat(deletingSpending.children[2].textContent)
        let currentTotal = parseFloat(totalDisp.textContent)
        // console.log(currentTotal)
        let newAmount = currentTotal-deletedAmount
        newAmount = Math.round( newAmount* 100 + Number.EPSILON ) / 100
        totalDisp.textContent=`${newAmount}`  
        }
    })
}

// getExpenditures()
// render()
// postExpenditures()
deleteExpenditures()

