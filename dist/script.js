const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const amount = document.querySelector("#amount");
const expensecategory = document.querySelector("#dropdown");
const date = document.querySelector("#date");
const form = document.querySelector("#add-expense");
const description = document.querySelector("#description");
const amountError = document.querySelector("#amount-error");
const categoryError = document.querySelector("#category-error");
const descError = document.querySelector("#description-error");
const dateError = document.querySelector("#date-error");
const btn = document.querySelector("button");
const API_URL = "https://personal-finance-tracker-7r8z.onrender.com/expense";
let msg;
async function createExpense(expenseData) {
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
        alert(msg);
        throw new Error("Invalid Data");
    }
    return await response.json();
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    btn.disabled = true;
    if (!validate()) {
        btn.disabled = false;
        return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date.value > today) {
        alert("Date cannot be in future");
        btn.disabled = false;
        return;
    }
    const expenseData = {
        amount: parseFloat(amount.value),
        category: expensecategory.value,
        date: date.value,
    };
    try {
        await createExpense(expenseData);
        alert("expense added successfully");
        form.reset();
    }
    catch (err) {
        alert(err);
    }
    finally {
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
        amountError.innerText = "Amount is required";
    }
    else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        amountError.innerText = "Amount must be a positive number";
        istrue = false;
    }
    if (date.value.trim() === "") {
        dateError.innerText = "Date cannot be empty";
        istrue = false;
    }
    if (expensecategory.value === "") {
        categoryError.innerText = "Expense Category cannot be empty";
        istrue = false;
    }
    if (description.value.length > 200) {
        descError.innerText =
            "The description should not contain more than 200 characters";
        istrue = false;
    }
    return istrue;
}
export {};
//# sourceMappingURL=script.js.map