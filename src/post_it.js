let postIt = document.querySelector('.post-it')
let spendingTable = document.querySelector('.spending-table')
let calendarDate = document.querySelector('.dates')
let arr = []
let totalDisp = document.querySelector('.grand-total')
let spendingBod = document.getElementById('spending-body')
let spendingRow = document.querySelector('.spending-row')
let sp = document.querySelector('.add-spending-form')
let hideSeek = document.querySelector('.hide-seek')


function getExpenditures(){
    fetch('http://localhost:3000/api/v1/expenditures')
    .then(resp => resp.json())
    .then(expenditures => {expenditures.data.forEach(function(expenditure){
        render(expenditure)     
    })
})

}
document.addEventListener('click', function(e){
    if(e.target.className === 'dates')
    sp.id = e.target.id
})

// let spendingBody = document.getElementById('spending-body')
// spendingBod.innerHTML = ''
// let totalDisplay = document.querySelector('.grand-total')
// totalDisplay.innerHTML = ''

function render(expenditure){
    document.addEventListener('click', function(e){
        if(parseInt(e.target.id) === expenditure.attributes.date){

            // spendingBod.innerHTML = ''
            console.log(e.target)

            let spent = document.createElement("tr")
            spent.className = 'spending-row'
            spent.dataset.id = expenditure.id
      
            spent.innerHTML = `
            <td class='expense-category'>${expenditure.attributes.category.name}</td>
            <td class='expense-detail'>${expenditure.attributes.detail}</td>
            <td class='expense-amount'>${expenditure.attributes.amount}</td>
            <button>x</button>
            `
            spendingBod.append(spent)
    
            arr.push(expenditure.attributes.amount)
            let totalSpending = arr.reduce(function(a, b){
                return parseFloat(a + b);
            }, 0);
            totalDisp.textContent=`${totalSpending}`  
  
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
            
        newSpent.innerHTML = `
        <td class='expense-category'>${hideSeek.textContent}</td>
        <td class='expense-detail'>${spendingObj.detail}</td>
        <td class='expense-amount'>${spendingObj.amount}</td>
        <button>x</button>
        `
        spendingBod.append(newSpent)
        }
        
        arr.push(spendingObj.amount)
        let totalSpending = arr.reduce(function(a, b){
            return parseFloat(a + b);
        }, 0);
        totalDisp.textContent=`${totalSpending}`  

        sp.reset()
    })
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
        let newAmount = currentTotal-deletedAmount
        totalDisp.textContent=`${newAmount}`  
        }
    })
}

getExpenditures()
postExpenditures()
deleteExpenditures()

