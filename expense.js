function saveToLocalStorage(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    let obj= {
        amount,
        description,
        category
    }

    localStorage.setItem(obj.description,JSON.stringify(obj));
    showExpenseOnScreen(obj);
}
//When reloaded
window.addEventListener('DOMContentLoaded',() => {
    const localStorageObj = localStorage;
    const localStorageKeys =Object.keys(localStorageObj)

    for(let i=0;i<localStorageKeys.length;i++) {
        const key = localStorageKeys[i];
        const expenseDetailsString= localStorageObj[key]
        const expenseDetailsObj =JSON.parse(expenseDetailsString);
        showExpenseOnScreen(expenseDetailsObj);
    }
})

//Show Expense on Screen

function showExpenseOnScreen(expense) {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';

    const parentNode = document.getElementById('list');
    const childHTML = `<li id=${expense.description}>${expense.amount} - ${expense.description} - ${expense.category}
     <button onclick=deleteExpense('${expense.description}')>Delete Expense</button>
     <button onclick= editExpenseDetails('${expense.amount}','${expense.description}')>Edit Expense</button>     
    </li>`

    parentNode.innerHTML=parentNode.innerHTML +childHTML;
}

//Delete Expense
function deleteExpense(desc) {
    localStorage.removeItem(desc)
    deleteExpenseOnScreen(desc)
}

//Delete expense on screen
function deleteExpenseOnScreen(desc) {
    const parentNode = document.getElementById('list');
    const childNode = document.getElementById(desc);

    if(childNode) {
        parentNode.removeChild(childNode);
    }
}

//Edit Expense Details
function editExpenseDetails(amount,desc) {
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = desc;

    deleteExpense(desc);
}