const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const monthlybudgeterror = document.querySelector(
  "#monthlybudgeterror",
) as HTMLElement;

const totalIncomeError = document.querySelector(
  "#totalIncomeError",
) as HTMLElement;

const yearlybudgeterror = document.querySelector(
  "#yearlybudgeterror",
) as HTMLElement;
let form = document.querySelector("#budget") as HTMLFormElement;
const monthlybudgetdiv = document.querySelector(
  "#budgetval",
) as HTMLInputElement;
const totalIncomediv = document.querySelector(
  "#totalincome",
) as HTMLInputElement;
const yearlybudgetdiv = document.querySelector(
  "#yearlybudget",
) as HTMLInputElement;

let monthlybudget: number = 0;
let totalIncome: number = 0;
let yearlybudget: number = 0;
const API_URL = "https://personal-finance-tracker-7r8z.onrender.com/budget";

async function createBudget(Budgetval: {}) {
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
  monthlybudget = parseFloat(monthlybudgetdiv.value);
  totalIncome = parseFloat(totalIncomediv.value);
  yearlybudget = parseFloat(yearlybudgetdiv.value);

  const BudgetVal = {
    MonthlyBudget: monthlybudget,
    TotalIncome: totalIncome,
    YearlyBudget: yearlybudget,
  };

  const bool = validate(
    monthlybudget.toString(),
    totalIncome.toString(),
    yearlybudget.toString(),
  );

  if (!bool) {
    return;
  }
  try {
    await createBudget(BudgetVal);
    form.reset();
    window.location.href = "index.html";
    alert("budget added successfully");
  } catch (err: any) {
    alert(err.message);
  }
});

function validate(
  monthlybudget: string,
  totalIncome: string,
  yearlybudget: string,
) {
  monthlybudgeterror.innerText = "";
  totalIncomeError.innerText = "";
  yearlybudgeterror.innerText = "";
  let istrue = true;
  if (monthlybudget.trim() === "") {
    istrue = false;
    monthlybudgeterror.innerText = "monthly budget cannot be empty";
  } else if (
    Number.isNaN(parseFloat(monthlybudget.trim())) ||
    parseFloat(monthlybudget.trim()) < 0
  ) {
    monthlybudgeterror.innerText = "monthly budget should be zero or more";
    istrue = false;
  }

  if (totalIncome.trim() === "") {
    istrue = false;
    totalIncomeError.innerText = "Total Income cannot be empty";
  } else if (
    Number.isNaN(parseFloat(totalIncome.trim())) ||
    parseFloat(totalIncome.trim()) < 0
  ) {
    totalIncomeError.innerText = "Total Income must be zero or more";
    istrue = false;
  }

  if (yearlybudget.trim() === "") {
    istrue = false;
    yearlybudgeterror.innerText = "Yearly Budget cannot be empty";
  } else if (
    Number.isNaN(parseFloat(yearlybudget.trim())) ||
    parseFloat(yearlybudget.trim()) < 0
  ) {
    yearlybudgeterror.innerText = "Yearly Budget must be zero or more";
    istrue = false;
  }

  return istrue;
}
