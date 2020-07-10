document.addEventListener('submit', function(e){
    let budgetForm = document.querySelector('.budget-form')
    let budgetCategory = document.getElementById('categories')
    if(e.target === budgetForm){
        e.preventDefault()
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