import { Transaction } from "./types";
let amount = document.querySelector("#amount") as HTMLInputElement;

let expensecategory = document.querySelector("#dropdown") as HTMLInputElement;

let date = document.querySelector("#date") as HTMLInputElement;

let form = document.querySelector("#add-expense") as HTMLFormElement;

let amountError = document.querySelector("#amount-error") as HTMLElement;

let categoryError = document.querySelector("#category-error") as HTMLElement;

let dateError = document.querySelector("#date-error") as HTMLElement;

let recentTransactions = document.querySelector(
  "#recent-transactions",
) as HTMLElement;

let data = localStorage.getItem("totalamount");

let transac = localStorage.getItem("transactions");

let totalamount: number = data ? parseFloat(data) : 0;

let transactions: Transaction[] = transac ? JSON.parse(transac) : [];

let totalexpense = transactions.reduce((sum, t) => sum + t.amount, 0);

localStorage.setItem("totalamount", JSON.stringify(totalexpense));

form.addEventListener("submit", (event) => {
  let bool = validate();

  if (!bool) {
    event.preventDefault();
  } else if (bool) {
    transactions.push({
      amount: parseFloat(amount.value),
      category: expensecategory.value,
      date: date.value,
    });
    let expenditureCategory = transactions.reduce(
      (total: any, t: Transaction) => {
        let category = t.category;
        let amountdash = t.amount;
        if (!total[category]) {
          total[category] = 0;
        }
        total[category] += t.amount;
        return total;
      },
      {},
    );
    localStorage.setItem("categoryamount", JSON.stringify(expenditureCategory));

    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Expense Added Successfully");
    let value = parseFloat(amount.value);
    totalamount = value + totalamount;
    localStorage.setItem("totalamount", totalamount.toString());
  }
});

function validate() {
  amountError.innerText = "";
  dateError.innerText = "";
  categoryError.innerText = "";
  let istrue = true;
  if (amount.value.trim() == "") {
    istrue = false;
    amountError.innerText = "Amount cannot be empty";
  } else if (isNaN(parseFloat(amount.value.trim()))) {
    amountError.innerText = "Amount must be a number";
    istrue = false;
  }
  if (date.value.trim() == "") {
    dateError.innerText = "date cannot be empty";
    istrue = false;
  }

  if (expensecategory.value == "") {
    categoryError.innerText = "Category cannot be empty";
    istrue = false;
  }

  return istrue;
}
