const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const amount = document.querySelector("#amount");
const expensecategory = document.querySelector("#dropdown");
const date = document.querySelector("#date");
const form = document.querySelector("#add-expense");
const amountError = document.querySelector("#amount-error");
const categoryError = document.querySelector("#category-error");
const dateError = document.querySelector("#date-error");
const API_URL = "http://localhost:3000/expense";
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
        alert(data.msg);
        return;
    }
    return await response.json();
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validate()) {
        return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date.value > today) {
        alert("Date cannot be in future");
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
    }
    else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
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
export {};
//# sourceMappingURL=script.js.map