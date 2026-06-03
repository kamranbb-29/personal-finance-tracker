import { Transaction } from "./types";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

let form = document.querySelector("#update-Expense") as HTMLFormElement;

let amount = document.querySelector("#amount") as HTMLInputElement;

let category = document.querySelector("#dropdown") as HTMLInputElement;

let date = document.querySelector("#date") as HTMLInputElement;

let editingExpenseID = "";

const totalTransactions = document.querySelector(
  "#totalTransactions",
) as HTMLElement;

const old = document.querySelector("#oldfirst") as HTMLButtonElement;
const latest = document.querySelector("#newfirst") as HTMLButtonElement;

const searched = document.querySelector("#searchbar") as HTMLInputElement;

const mostexpensive = document.querySelector(
  "#mostexpensive",
) as HTMLButtonElement;
const leastexpensive = document.querySelector(
  "#leastexpensive",
) as HTMLButtonElement;

let transactions: Transaction[] = [];

let API_URL = "https://personal-finance-tracker-7r8z.onrender.com/expense";

async function getExpense() {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  transactions = data.expense;

  render(transactions.slice().reverse());
}

getExpense();

async function updateExpense(id: any) {
  form.style.display = "block";
  editingExpenseID = id;

  const input = transactions.find((t) => t._id == id);
  if (input) {
    amount.value = input.amount.toString();
    date.value = input.date.toString();
    category.value = input.category.toString();
  }
}
async function deleteExpense(id: any) {
  const token = localStorage.getItem("token");

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getExpense();
  } catch (err) {
    console.log(err);
  }
}

(window as any).updateExpense = updateExpense;
(window as any).deleteExpense = deleteExpense;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");
  if (editingExpenseID == "") {
    return;
  }

  try {
    await fetch(`${API_URL}/${editingExpenseID}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount.value,
        date: date.value,
        category: category.value,
      }),
    });
    editingExpenseID = "";
    form.style.display = "none";
    form.reset();

    getExpense();
  } catch (err) {
    console.log(err);
  }
});

old.addEventListener("click", () => {
  render([...transactions].sort((a, b) => a.date.localeCompare(b.date)));
});

latest.addEventListener("click", () => {
  render([...transactions].sort((a, b) => b.date.localeCompare(a.date)));
});

searched.addEventListener("input", () => {
  const query = searched.value.toLowerCase().trim();
  const results = transactions.filter((t) => {
    return (
      t.category.toLowerCase().includes(query) ||
      t.date.includes(query) ||
      t.amount.toString().includes(query)
    );
  });

  render(results);
});

mostexpensive.addEventListener("click", () => {
  render([...transactions].sort((a, b) => b.amount - a.amount));
});

leastexpensive.addEventListener("click", () => {
  render([...transactions].sort((a, b) => a.amount - b.amount));
});

function render(items: Transaction[]) {
  if (items.length === 0) {
    totalTransactions.innerHTML =
      "<h1>Transactions</h1><p>No transactions found.</p>";
    return;
  }

  totalTransactions.innerHTML = [
    "<h1>Transactions</h1>",
    ...items.map(
      (t) =>
        `<li><strong>${formatAmount(t.amount)}</strong> ${formatCategory(
          t.category,
        )} ${t.date}</li>
        <button id="Update" onclick="updateExpense('${t._id}')">Update</button> 
        <button id="delete" onclick="deleteExpense('${t._id}')">delete</button>`,
    ),
  ].join("\n");
}

function formatAmount(amount: number) {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

function formatCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
