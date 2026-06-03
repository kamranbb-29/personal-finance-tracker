const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const monthbudget = document.querySelector("#mbudget");
const yearbudget = document.querySelector("#ybudget");
let transactions = [];
let totalamount = 0;
const API_URL1 = "https://personal-finance-tracker-7r8z.onrender.com/expense";
const API_URL2 = "https://personal-finance-tracker-7r8z.onrender.com/budget";
const rtransaction = document.querySelector("#recent-transactions");
async function getExpense() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL1, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    transactions = data.expense;
    totalamount = transactions.reduce((sum, t) => sum + t.amount, 0);
    expense.innerText = `Total Expenses : ${formatAmount(totalamount)}`;
    const recentarray = transactions.slice(-5).reverse();
    rtransaction.innerHTML =
        recentarray.length === 0
            ? "Recent Transactions : No expenses added yet."
            : [
                "Recent Transactions :",
                ...recentarray.map((t) => `<li><strong>${formatAmount(t.amount)}</strong> ${formatCategory(t.category)} ${t.date}</li>
              `),
            ].join("\n");
    await getBudget();
}
getExpense();
async function getBudget() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL2, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }
    const data = await response.json();
    income.innerText = `Total Income : ${data.budget.TotalIncome}`;
    monthbudget.innerText = `Monthly Budget : ${data.budget.MonthlyBudget}`;
    yearbudget.innerText = `Yearly Budget : ${data.budget.YearlyBudget}`;
    balance.innerText = `Total Balance : ${data.budget.TotalIncome - totalamount}`;
}
function formatAmount(amount) {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    });
}
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}
export {};
//# sourceMappingURL=dashboard.js.map