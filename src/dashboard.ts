import { Transaction } from "./types";

let balance = document.querySelector("#balance") as HTMLElement;

let income = document.querySelector("#income") as HTMLElement;

let expense = document.querySelector("#expense") as HTMLElement;

let monthbudget = document.querySelector("#mbudget") as HTMLElement;

let yearbudget = document.querySelector("#ybudget") as HTMLElement;

let rtransaction = document.querySelector(
  "#recent-transactions",
) as HTMLElement;

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
    .map(
      (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
      <br/>`,
    )
    .join("\n");
}
