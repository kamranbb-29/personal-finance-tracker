import { Transaction } from "./types";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}
const amount = document.querySelector("#amount") as HTMLInputElement;
const expensecategory = document.querySelector(
  "#dropdown",
) as HTMLSelectElement;
const date = document.querySelector("#date") as HTMLInputElement;
const form = document.querySelector("#add-expense") as HTMLFormElement;
const amountError = document.querySelector("#amount-error") as HTMLElement;
const categoryError = document.querySelector("#category-error") as HTMLElement;
const dateError = document.querySelector("#date-error") as HTMLElement;

const API_URL = "http://localhost:3000/expense";

async function createExpense(expenseData: Omit<Transaction, "_id">) {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return await response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  const expenseData: Omit<Transaction, "_id"> = {
    amount: parseFloat(amount.value),
    category: expensecategory.value,
    date: date.value,
  };

  try {
    await createExpense(expenseData);

    alert("expense added successfully");
    form.reset();
  } catch (err) {
    console.log(err);
  }
});

function validate() {
  amountError.innerText = "";
  dateError.innerText = "";
  categoryError.innerText = "";
  let istrue = true;
  const parsedAmount = parseFloat(amount.value.trim());

  if (amount.value.trim() === "") {
    istrue = false;
    amountError.innerText = "Amount cannot be empty";
  } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    amountError.innerText = "Amount must be a positive number";
    istrue = false;
  }

  if (date.value.trim() === "") {
    dateError.innerText = "date cannot be empty";
    istrue = false;
  }

  if (expensecategory.value === "") {
    categoryError.innerText = "Category cannot be empty";
    istrue = false;
  }

  return istrue;
}
