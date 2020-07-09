let setBudget= false;

let budgetBtn = document.querySelector('#edit-budget-btn')
let budgeting = document.querySelector('.budgeting')
budgetBtn.addEventListener("click", () => {
    setBudget = !setBudget
    if (setBudget) {
        budgeting.style.display = "block"
    } else {
        budgeting.style.display = "none"
    }
})

document.addEventListener('submit', function(e){
    let budgetForm = document.querySelector('.budget-form')
    let budgetCategory = document.getElementById('categories')
    if(e.target === budgetForm){
        e.preventDefault()

        console.log(parseInt(budgetCategory.value))
        console.log(budgetForm.bamount.value)

        fetch(`http://localhost:3000/api/v1/categories/${parseInt(budgetCategory.value)}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                budget_amount: budgetForm.bamount.value
            })
        })
    }
 
})