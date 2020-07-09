let postIt = document.querySelector('.post-it')
let spendingTable = document.querySelector('.spending-table')
let calendarDate = document.querySelector('.dates')
let arr = []
let totalDisplay = document.querySelector('.grand-total')
let spendingBody = document.getElementById('spending-body')
let spendingRow = document.querySelector('.spending-row')
let sp = document.querySelector('.add-spending-form')
let hideSeek = document.querySelector('.hide-seek')
let expenseAmount = document.getElementById('expense-amount')




function getExpenditures(){
    fetch('http://localhost:3000/api/v1/expenditures')
    .then(resp => resp.json())
    // .then(console.log)
    .then(expenditures => {expenditures.data.forEach(function(expenditure){
        render(expenditure)     
    })
})
}
document.addEventListener('click', function(e){
    if(e.target.className === 'dates')
    sp.id = e.target.id
})

function render(expenditure){
    document.addEventListener('click', function(e){
        // sp.id = e.target.id
        // console.log(sp)

        let spent = document.createElement("tr")
        spent.className = 'spending-row'
        spent.dataset.id = expenditure.id
        // console.log(spent)
        if(parseInt(e.target.id) === expenditure.attributes.date){
            // spendingBody.children[0].remove()  
            // if(spent){
            //     spendingBody.remove(spent)
            // }
          
            
            // let spendingCategory = document.createElement('td')
            // let spendingDetail = document.createElement('td')
            // let spendingAmount = document.createElement('td')
            // let totalDisplay = document.querySelector('.grand-total')

            // let selectedDay = document.querySelector('.current-day')
            // selectedDay.id = e.target.id
            // console.log(selectedDay.id)

            // spent.innerHTML = ""
      
            spent.innerHTML = `
            <td class='expense-category'>${expenditure.attributes.category.name}</td>
            <td class='expense-detail'>${expenditure.attributes.detail}</td>
            <td id='expense-amount'>${expenditure.attributes.amount}</td>
            <button>Edit</button>
            <button>x</button>
            `

            // spendingCategory.innerText = `${expenditure.attributes.category.name}`
            // spendingDetail.innerText = `${expenditure.attributes.detail}`
            // spendingAmount.innerText = `${expenditure.attributes.amount}`
            // spent.append(spendingCategory, spendingDetail, spendingAmount)

            // spent.appendChild(spendingCategory)
            // spent.appendChild(spendingDetail)

            spendingBody.append(spent)

            // calculateTotal()

            arr.push(expenditure.attributes.amount)
            let totalSpending = arr.reduce(function(a, b){
                return parseFloat(a + b);
            }, 0);
            totalDisplay.textContent=`${totalSpending}`  
        }
    })
}

function postExpenditures(){
    sp.addEventListener('submit', function(e){
        let spendingObj = {
            date: sp.id,
            category_id: parseInt(sp.categories.value),
            category: sp.categories.value,
            detail: sp.detail.value,
            amount: parseFloat(sp.amount.value)
        }
 
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/expenditures', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(spendingObj)
        })

        let objId = spendingObj.category
        if(hideSeek.id === objId){
            let newSpent = document.createElement('tr')
            newSpent.className = 'spending-row'
            console.log(spendingRow)
            // console.log(newSpent)
            // newSpent.dataset.id = 
        newSpent.innerHTML = `
        <td class='expense-category'>${hideSeek.textContent}</td>
        <td class='expense-detail'>${spendingObj.detail}</td>
        <td class='expense-amount'>${spendingObj.amount}</td>
        <button>Edit</button>
        <button>x</button>
        `
        spendingBody.append(newSpent)
        }

        // calculateTotal()

        arr.push(spendingObj.amount)
        let totalSpending = arr.reduce(function(a, b){
            return parseFloat(a + b);
        }, 0);
        totalDisplay.textContent=`${totalSpending}`  

        sp.reset()
    })
}

// function calculateTotal(){
//     console.log(expenseAmount)
//     arr.push(parseFloat(expenseAmount.textContent))
//     let totalSpending = arr.reduce(function(a, b){
//         return parseFloat(a + b);
//     }, 0);
//     totalDisplay.textContent=`${totalSpending}`  
// }

function deleteExpenditures(){
    document.addEventListener('click', function(e){
        if(e.target.textContent === 'x'){
            const deletingSpending = e.target.parentNode
            let spendingId = deletingSpending.dataset.id
            deletingSpending.remove()

        fetch(`http://localhost:3000/api/v1/expenditures/${spendingId}`,{
          method: "DELETE"
        })
        }

        // arr.push(spendingObj.amount)
        // let totalSpending = arr.reduce(function(a, b){
        //     return parseFloat(a + b);
        // }, 0);
        // totalDisplay.textContent=`${totalSpending}`  
        // calculateTotal()
    })
}


postExpenditures()
getExpenditures()
deleteExpenditures()

