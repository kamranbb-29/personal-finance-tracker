"use strict";
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const monthlybudgeterror = document.querySelector("#monthlybudgeterror");
const totalIncomeError = document.querySelector("#totalIncomeError");
const yearlybudgeterror = document.querySelector("#yearlybudgeterror");
let form = document.querySelector("#budget");
const monthlybudgetdiv = document.querySelector("#budgetval");
const totalIncomediv = document.querySelector("#totalincome");
const yearlybudgetdiv = document.querySelector("#yearlybudget");
const btn = document.querySelector("button");
let monthlybudget = 0;
let totalIncome = 0;
let yearlybudget = 0;
const API_URL = "https://personal-finance-tracker-7r8z.onrender.com/budget";
async function createBudget(Budgetval) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Budgetval),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}
async function getBudget() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    btn.disabled = true;
    monthlybudget = parseFloat(monthlybudgetdiv.value);
    totalIncome = parseFloat(totalIncomediv.value);
    yearlybudget = parseFloat(yearlybudgetdiv.value);
    const BudgetVal = {
        MonthlyBudget: monthlybudget,
        TotalIncome: totalIncome,
        YearlyBudget: yearlybudget,
    };
    const bool = validate(monthlybudget.toString(), totalIncome.toString(), yearlybudget.toString());
    if (!bool) {
        return;
    }
    try {
        await createBudget(BudgetVal);
        form.reset();
        window.location.href = "index.html";
        alert("budget added successfully");
    }
    catch (err) {
        alert(err.message);
    }
    finally {
        btn.disabled = false;
    }
});
function validate(monthlybudget, totalIncome, yearlybudget) {
    monthlybudgeterror.innerText = "";
    totalIncomeError.innerText = "";
    yearlybudgeterror.innerText = "";
    let istrue = true;
    if (monthlybudget.trim() === "") {
        istrue = false;
        monthlybudgeterror.innerText = "monthly budget cannot be empty";
    }
    else if (Number.isNaN(parseFloat(monthlybudget.trim())) ||
        parseFloat(monthlybudget.trim()) < 0) {
        monthlybudgeterror.innerText = "monthly budget should be zero or more";
        istrue = false;
    }
    if (totalIncome.trim() === "") {
        istrue = false;
        totalIncomeError.innerText = "Total Income cannot be empty";
    }
    else if (Number.isNaN(parseFloat(totalIncome.trim())) ||
        parseFloat(totalIncome.trim()) < 0) {
        totalIncomeError.innerText = "Total Income must be zero or more";
        istrue = false;
    }
    if (yearlybudget.trim() === "") {
        istrue = false;
        yearlybudgeterror.innerText = "Yearly Budget cannot be empty";
    }
    else if (Number.isNaN(parseFloat(yearlybudget.trim())) ||
        parseFloat(yearlybudget.trim()) < 0) {
        yearlybudgeterror.innerText = "Yearly Budget must be zero or more";
        istrue = false;
    }
    return istrue;
}
//# sourceMappingURL=budget.js.map