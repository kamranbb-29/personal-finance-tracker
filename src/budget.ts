let monthlybudgeterror = document.querySelector(
  "#monthlybudgeterror",
) as HTMLInputElement;

let totalIncomeError = document.querySelector(
  "#totalIncomeError",
) as HTMLInputElement;

let yearlybudgeterror = document.querySelector(
  "#yearlybudgeterror",
) as HTMLInputElement;
let form = document.querySelector("#budget") as HTMLInputElement;

let monthlybudget: number = 0;
let totalIncome: number = 0;
let yearlybudget: number = 0;

let monthlybudgetstring = localStorage.getItem("monthlybudget");
let totalIncomestring = localStorage.getItem("totalIncome");
let yearlybudgetstring = localStorage.getItem("yearlybudget");

if (monthlybudgetstring) {
  monthlybudget = parseFloat(monthlybudgetstring);
}

if (totalIncomestring) {
  totalIncome = parseFloat(totalIncomestring);
}

if (yearlybudgetstring) {
  yearlybudget = parseFloat(yearlybudgetstring);
}

form.addEventListener("submit", () => {
  let monthlybudgetdiv = document.querySelector(
    "#budgetval",
  ) as HTMLInputElement;

  monthlybudget = parseFloat(monthlybudgetdiv.value);

  let totalIncomediv = document.querySelector(
    "#totalincome",
  ) as HTMLInputElement;

  totalIncome = parseFloat(totalIncomediv.value);

  let yearlybudgetdiv = document.querySelector(
    "#yearlybudget",
  ) as HTMLInputElement;

  yearlybudget = parseFloat(yearlybudgetdiv.value);

  let bool = validate(
    monthlybudget.toString(),
    totalIncome.toString(),
    yearlybudget.toString(),
  );

  if (!bool) {
  } else if (bool) {
    alert("budget Added Successfully");

    localStorage.setItem("monthlybudget", monthlybudget.toString());

    localStorage.setItem("totalIncome", totalIncome.toString());

    localStorage.setItem("yearlybudget", yearlybudget.toString());
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
  if (monthlybudget.trim() == "") {
    istrue = false;
    monthlybudgeterror.innerText = "monthly budget cannot be empty";
  } else if (isNaN(parseFloat(monthlybudget.trim()))) {
    monthlybudgeterror.innerText = "monthly budget should be a number";
    istrue = false;
  }

  if (totalIncome.trim() == "") {
    istrue = false;
    totalIncomeError.innerText = "Total Income cannot be empty";
  } else if (isNaN(parseFloat(totalIncome.trim()))) {
    totalIncomeError.innerText = "Total Income must be a number";
    istrue = false;
  }

  if (yearlybudget.trim() == "") {
    istrue = false;
    yearlybudgeterror.innerText = "Yearly Budget cannot be empty";
  } else if (isNaN(parseFloat(yearlybudget.trim()))) {
    yearlybudgeterror.innerText = "Yearly Budget must be a number";
    istrue = false;
  }

  return istrue;
}
