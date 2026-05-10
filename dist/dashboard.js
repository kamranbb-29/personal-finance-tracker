let balance = document.querySelector("#balance");
let income = document.querySelector("#income");
let expense = document.querySelector("#expense");
let monthbudget = document.querySelector("#mbudget");
let yearbudget = document.querySelector("#ybudget");
let rtransaction = document.querySelector("#recent-transactions");
let totalincome = 0;
let totalamount = 0;
let totalexpense = 0;
let mbudget = 0;
let ybudget = 0;
let saved = localStorage.getItem("totalamount");
let a = localStorage.getItem("monthlybudget");
let b = localStorage.getItem("totalIncome");
let c = localStorage.getItem("yearlybudget");
let recent = localStorage.getItem("transactions");
if (saved && expense) {
    totalamount = parseFloat(saved);
    expense.innerText = `Total Expense : ${totalamount}`;
}
if (b) {
    totalincome = parseFloat(b);
    income.innerText = `Total Income : ${totalincome}`;
    let remaining = totalincome - totalamount;
    balance.innerText = `Total Balance : ${remaining}`;
}
if (a) {
    mbudget = parseFloat(a);
    monthbudget.innerText = `Monthly Budget : ${mbudget}`;
}
if (c) {
    ybudget = parseFloat(c);
    yearbudget.innerText = `Yearly Budget : ${ybudget}`;
}
if (recent) {
    let maintransac = JSON.parse(recent);
    let recentarray = maintransac.slice(-5).reverse();
    rtransaction.innerHTML = recentarray
        .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
      <br/>`)
        .join("\n");
}
export {};
