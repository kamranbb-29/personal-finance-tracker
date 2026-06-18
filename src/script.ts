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
const description = document.querySelector("#description") as HTMLInputElement;
const amountError = document.querySelector("#amount-error") as HTMLElement;
const categoryError = document.querySelector("#category-error") as HTMLElement;
const dateError = document.querySelector("#date-error") as HTMLElement;
const btn = document.querySelector("button") as HTMLButtonElement;

const API_URL = "https://personal-finance-tracker-7r8z.onrender.com/expense";

let msg: string;

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
    const data = await response.json();
    msg = data.msg;
    return;
  }

  return await response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  btn.disabled = true;

  if (!validate()) {
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  if (date.value > today) {
    alert("Date cannot be in future");
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
  } finally {
    btn.disabled = false;
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
    amountError.innerText = msg;
  } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    amountError.innerText = msg;
    istrue = false;
  }

  if (date.value.trim() === "") {
    dateError.innerText = msg;
    istrue = false;
  }

  if (expensecategory.value === "") {
    categoryError.innerText = msg;
    istrue = false;
  }

  if (description.value.length > 200) {
    categoryError.innerText = msg;
    istrue = false;
  }

  return istrue;
}
