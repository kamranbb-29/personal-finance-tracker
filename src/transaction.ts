import { Transaction } from "./types";

let totalTransactions = document.querySelector(
  "#totalTransactions",
) as HTMLElement;

let old = document.querySelector("#oldfirst") as HTMLElement;
let latest = document.querySelector("#newfirst") as HTMLElement;

let searched = document.querySelector("#searchbar") as HTMLInputElement;

let mostexpensive = document.querySelector("#mostexpensive") as HTMLElement;
let leastexpensive = document.querySelector("#leastexpensive") as HTMLElement;

let All = localStorage.getItem("transactions");

if (All) {
  let maintransac = JSON.parse(All);

  totalTransactions.innerHTML = maintransac
    .map(
      (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
    )
    .join("\n");
}

old.addEventListener("click", (event) => {
  if (All) {
    let maintransac = JSON.parse(All);

    totalTransactions.innerHTML = maintransac
      .map(
        (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
      )
      .join("\n");
  }
});
function render() {
  if (All) {
    let maintran = JSON.parse(All);

    let maintransac = maintran.reverse();

    totalTransactions.innerHTML = maintransac
      .map(
        (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
      )
      .join("\n");
  }
}

latest.addEventListener("click", (event) => {
  render();
});
if (All) {
  searched.addEventListener("input", () => {
    let maintransac = JSON.parse(All);
    let query = searched.value.toLowerCase();

    let results = maintransac.filter((t: any) => {
      return (
        t.category.toLowerCase().includes(query) ||
        t.date.includes(query) ||
        t.amount.toString().includes(query)
      );
    });
    totalTransactions.innerHTML = results
      .map(
        (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
      )
      .join("\n");
  });
  render();
}

if (All) {
  mostexpensive.addEventListener("click", () => {
    let maintransac = JSON.parse(All);

    let results = maintransac.sort((a: any, b: any) => {
      return b.amount - a.amount;
    });
    totalTransactions.innerHTML = results
      .map(
        (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
      )
      .join("\n");
  });

  leastexpensive.addEventListener("click", () => {
    let maintransac = JSON.parse(All);

    let results = maintransac.sort((a: any, b: any) => {
      return a.amount - b.amount;
    });
    totalTransactions.innerHTML = results
      .map(
        (t: Transaction) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`,
      )
      .join("\n");
  });
}
